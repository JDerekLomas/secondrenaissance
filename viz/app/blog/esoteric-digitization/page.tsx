import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";
import ClientContent from "./ClientContent";

const postMeta = {
  title: "How Much Esoteric Latin Is Really Missing from the Internet Archive?",
  description: "We matched 10,683 Latin works from Amsterdam's Hermetic library against the Internet Archive. Fuzzy matching found 18.6%--with dramatic variation by century.",
  slug: "esoteric-digitization",
  date: "2025-12-08",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function EsotericDigitization() {
  return <ClientContent jsonLd={jsonLd} />;
}
