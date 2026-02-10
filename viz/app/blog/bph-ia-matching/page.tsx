import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";
import BphIaMatchingContent from "./ClientContent";

const postMeta = {
  title: "From 2% to 26%: The Journey to Match Historical Catalogs",
  description: "How we evolved from prefix matching (2%) to fuzzy strings (18.6%) to semantic embeddings (65%) to multi-signal matching (26%). Matching the BPH catalog against the Internet Archive.",
  slug: "bph-ia-matching",
  date: "2025-12-10",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function BphIaMatching() {
  return <BphIaMatchingContent jsonLd={jsonLd} />;
}
