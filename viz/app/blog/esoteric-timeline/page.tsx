import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";
import ClientContent from "./ClientContent";

const postMeta = {
  title: "Rivers of Esoteric Life: Interactive Timeline",
  description: "A visual journey through 280 years of occult, mystical, and hermetic publishing in early modern Europe (1469-1750).",
  slug: "esoteric-timeline",
  date: "2025-11-01",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function EsotericTimelinePage() {
  return <ClientContent jsonLd={jsonLd} />;
}
