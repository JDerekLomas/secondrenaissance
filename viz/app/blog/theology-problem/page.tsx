import { generateBlogMetadata, generateArticleJsonLd } from "@/lib/blogMetadata";
import ClientContent from "./ClientContent";

const postMeta = {
  title: "The Elephant in the Room: 170,000 Latin Theological Works",
  description: "Theology is the largest category in the Latin corpus--and the most misunderstood. Why we don't lead with it, and why it still matters.",
  slug: "theology-problem",
  date: "2025-12-04",
};

export const metadata = generateBlogMetadata(postMeta);
const jsonLd = generateArticleJsonLd(postMeta);

export default function TheologyProblem() {
  return <ClientContent jsonLd={jsonLd} />;
}
