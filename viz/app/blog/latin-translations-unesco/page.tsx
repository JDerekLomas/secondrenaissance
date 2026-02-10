import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";
import ClientContent from "./ClientContent";

const postMeta = {
  title: "What Latin Gets Translated? 4,457 Translations from UNESCO and Beyond",
  description: "We scraped UNESCO's Index Translationum and 50+ publisher catalogs to find every Latin-to-English translation from 1979 to 2025. The results reveal what the modern world wants from 2,000 years of Latin literature.",
  slug: "latin-translations-unesco",
  date: "2025-02-09",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function LatinTranslationsUnesco() {
  return <ClientContent jsonLd={jsonLd} />;
}
