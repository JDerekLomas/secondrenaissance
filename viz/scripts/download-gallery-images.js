#!/usr/bin/env node
/**
 * Download gallery images from Wikimedia Commons
 * Saves thumbnails (400px) and full-res (1200px) versions locally
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const GALLERY_JSON = path.join(__dirname, '../public/gallery_images.json');
const OUTPUT_DIR = path.join(__dirname, '../public/gallery');
const THUMB_DIR = path.join(OUTPUT_DIR, 'thumbs');
const FULL_DIR = path.join(OUTPUT_DIR, 'full');

const THUMB_WIDTH = 400;
const FULL_WIDTH = 1200;

// Create directories if they don't exist
[OUTPUT_DIR, THUMB_DIR, FULL_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Extract filename from Wikimedia URL
function getFilenameFromUrl(wikimediaUrl) {
  const match = wikimediaUrl.match(/File:(.+)$/);
  if (!match) return null;
  return decodeURIComponent(match[1]);
}

// Get Wikimedia direct image URL
function getWikimediaImageUrl(wikimediaUrl, width) {
  const match = wikimediaUrl.match(/File:(.+)$/);
  if (!match) return null;
  const filename = match[1]; // Keep encoded
  if (width) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${width}`;
  }
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}`;
}

// Download file with redirect following
function downloadFile(url, destPath, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      reject(new Error('Too many redirects'));
      return;
    }

    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, {
      headers: {
        'User-Agent': 'SecondRenaissanceBot/1.0 (https://secondrenaissance.vercel.app; research project)'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        // Handle relative redirects
        if (redirectUrl.startsWith('/')) {
          const urlObj = new URL(url);
          redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
        }
        downloadFile(redirectUrl, destPath, maxRedirects - 1)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      const file = fs.createWriteStream(destPath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });

      file.on('error', (err) => {
        fs.unlink(destPath, () => {}); // Delete partial file
        reject(err);
      });
    }).on('error', reject);
  });
}

// Get file extension from URL or content-type
function getExtension(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
    return ext;
  }
  return '.jpg'; // Default
}

// Process single image
async function processImage(image, index, total) {
  const { id, wikimedia_url } = image;

  const originalFilename = getFilenameFromUrl(wikimedia_url);
  if (!originalFilename) {
    console.log(`  [${index + 1}/${total}] SKIP ${id}: Could not parse URL`);
    return { id, success: false, error: 'Could not parse URL' };
  }

  const ext = getExtension(originalFilename);
  const thumbPath = path.join(THUMB_DIR, `${id}${ext}`);
  const fullPath = path.join(FULL_DIR, `${id}${ext}`);

  // Skip if both files exist
  if (fs.existsSync(thumbPath) && fs.existsSync(fullPath)) {
    console.log(`  [${index + 1}/${total}] EXISTS ${id}`);
    return { id, success: true, skipped: true, ext };
  }

  const thumbUrl = getWikimediaImageUrl(wikimedia_url, THUMB_WIDTH);
  const fullUrl = getWikimediaImageUrl(wikimedia_url, FULL_WIDTH);

  try {
    // Download thumbnail
    if (!fs.existsSync(thumbPath)) {
      await downloadFile(thumbUrl, thumbPath);
    }

    // Download full-res
    if (!fs.existsSync(fullPath)) {
      await downloadFile(fullUrl, fullPath);
    }

    console.log(`  [${index + 1}/${total}] OK ${id}`);
    return { id, success: true, ext };
  } catch (error) {
    console.log(`  [${index + 1}/${total}] FAIL ${id}: ${error.message}`);
    return { id, success: false, error: error.message };
  }
}

// Add delay between requests to be nice to Wikimedia
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function
async function main() {
  console.log('Loading gallery data...');
  const data = JSON.parse(fs.readFileSync(GALLERY_JSON, 'utf8'));
  const images = data.images;

  console.log(`Found ${images.length} images to process\n`);

  const results = [];

  for (let i = 0; i < images.length; i++) {
    const result = await processImage(images[i], i, images.length);
    results.push(result);

    // Small delay to be polite to Wikimedia servers
    if (!result.skipped) {
      await delay(200);
    }
  }

  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success);

  console.log(`\n========== SUMMARY ==========`);
  console.log(`Total: ${images.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log(`\nFailed images:`);
    failed.forEach(f => console.log(`  - ${f.id}: ${f.error}`));
  }

  // Update JSON with correct extensions
  console.log(`\nUpdating gallery_images.json with local paths...`);
  const extMap = {};
  results.filter(r => r.success && r.ext).forEach(r => {
    extMap[r.id] = r.ext;
  });

  data.images = data.images.map(img => {
    const ext = extMap[img.id] || '.jpg';
    return {
      ...img,
      thumb_url: `/gallery/thumbs/${img.id}${ext}`,
      image_url: `/gallery/full/${img.id}${ext}`
    };
  });

  fs.writeFileSync(GALLERY_JSON, JSON.stringify(data, null, 2));
  console.log('Done!');
}

main().catch(console.error);
