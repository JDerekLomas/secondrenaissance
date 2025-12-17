#!/usr/bin/env node
/**
 * Remove images that failed to download from gallery_images.json
 */

const fs = require('fs');
const path = require('path');

const GALLERY_JSON = path.join(__dirname, '../public/gallery_images.json');
const THUMB_DIR = path.join(__dirname, '../public/gallery/thumbs');

// Load gallery data
const data = JSON.parse(fs.readFileSync(GALLERY_JSON, 'utf8'));

// Check which images actually exist
const existingImages = data.images.filter(img => {
  // Check if thumb exists (if thumb exists, full should too)
  const possibleExts = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
  return possibleExts.some(ext =>
    fs.existsSync(path.join(THUMB_DIR, `${img.id}${ext}`))
  );
});

console.log(`Original: ${data.images.length} images`);
console.log(`With files: ${existingImages.length} images`);
console.log(`Removing: ${data.images.length - existingImages.length} images`);

// Update and save
data.images = existingImages;
fs.writeFileSync(GALLERY_JSON, JSON.stringify(data, null, 2));

console.log('Done!');
