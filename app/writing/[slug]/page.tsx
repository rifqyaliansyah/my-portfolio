import { redirect } from "next/navigation";

interface WritingSlugRedirectProps {
  params: Promise<{ slug: string }>;
}

export default async function WritingSlugRedirectPage({ params }: WritingSlugRedirectProps) {
  const { slug } = await params;
  redirect(`/writings/${slug}`);
}
