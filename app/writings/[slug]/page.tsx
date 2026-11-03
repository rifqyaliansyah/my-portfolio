import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/app/lib/sanity";
import { WRITING_BY_SLUG_QUERY, WRITINGS_QUERY, PROFILE_QUERY } from "@/app/lib/sanity.queries";
import { WritingData, ProfileData } from "@/app/types/sanity";
import { urlFor } from "@/app/lib/sanity";
import SubPageLayout from "@/app/components/SubPageLayout";
import CustomPortableText from "@/app/components/CustomPortableText";
import BackButton from "@/app/components/BackButton";
import Card from "@/app/components/Card";
import { seededShuffle } from "@/app/lib/seeded-shuffle";

interface WritingDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const writings = await client.fetch<WritingData[]>(WRITINGS_QUERY);
    if (writings && writings.length > 0) {
      return writings
        .filter((w) => w.slug?.current)
        .map((w) => ({ slug: w.slug!.current }));
    }
  } catch (e) {
    console.error("Error generating static params for writings:", e);
  }

  return [];
}

export async function generateMetadata({ params }: WritingDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  let article: WritingData | null = null;

  try {
    article = await client.fetch<WritingData>(WRITING_BY_SLUG_QUERY, { slug });
  } catch (e) {
    article = null;
  }

  if (!article) {
    return {
      title: "Article Not Found | Rifqy Aliansyah",
    };
  }

  return {
    title: `${article.title} | Rifqy Aliansyah`,
    description: article.excerpt || article.description,
  };
}

export default async function WritingDetailPage({ params }: WritingDetailPageProps) {
  const { slug } = await params;
  let article: WritingData | null = null;
  let allWritings: WritingData[] = [];
  let profile: ProfileData | null = null;

  try {
    const [fetchedArticle, fetchedAll, fetchedProfile] = await Promise.all([
      client.fetch<WritingData>(WRITING_BY_SLUG_QUERY, { slug }),
      client.fetch<WritingData[]>(WRITINGS_QUERY),
      client.fetch<ProfileData>(PROFILE_QUERY),
    ]);
    article = fetchedArticle;
    allWritings = fetchedAll || [];
    profile = fetchedProfile;
  } catch (err) {
    console.error("Error fetching writing detail:", err);
  }

  if (!article) {
    notFound();
  }

  const imageUrl = article.coverImage
    ? urlFor(article.coverImage).width(1200).height(600).auto("format").url()
    : null;

  // More Writings (Filter out current article, shuffle deterministically, take up to 3)
  const otherWritings = allWritings.filter((w) => w.slug?.current !== slug);
  const moreWritings = seededShuffle(otherWritings, slug).slice(0, 3);

  return (
    <SubPageLayout profile={profile}>
      <article className="w-full flex flex-col">
        {/* Back Link */}
        <div className="mb-8">
          <BackButton href="/writings" label="Back to all writings" />
        </div>

        {/* Article Header */}
        <header className="flex flex-col gap-4">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          {/* Short Excerpt / Description */}
          {(article.excerpt || article.description) && (
            <p className="text-base sm:text-lg md:text-xl text-brand-secondary leading-relaxed">
              {article.excerpt || article.description}
            </p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-surface-color text-brand-secondary border border-brand-border-container/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Optional Cover Image */}
          {imageUrl && (
            <div className="relative w-full aspect-16/9 rounded-2xl md:rounded-3xl overflow-hidden mt-4 border border-brand-border-container shadow-md">
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* Article Body Content */}
        {article.content && article.content.length > 0 && (
          <div className="w-full mt-8 md:mt-10 prose prose-neutral dark:prose-invert max-w-none text-brand-secondary">
            <CustomPortableText value={article.content} />
          </div>
        )}

        {/* More Articles Section (replacing Next / Previous) */}
        {moreWritings.length > 0 && (
          <div className="mt-20 pt-10 border-t border-brand-border-container flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-primary tracking-tight">
                More Articles
              </h2>
              <BackButton href="/writings" label="View all" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreWritings.map((w, idx) => {
                const imageSrc = w.coverImage
                  ? urlFor(w.coverImage).width(608).height(400).auto("format").url()
                  : undefined;
                const hasExternalUrl = Boolean(w.externalUrl && (w.externalUrl.startsWith("http://") || w.externalUrl.startsWith("https://")));
                const href = hasExternalUrl
                  ? w.externalUrl!
                  : w.slug?.current
                  ? `/writings/${w.slug.current}`
                  : "/writings";

                return (
                  <Card
                    key={w._id || `${w.title}-${idx}`}
                    imageSrc={imageSrc}
                    title={w.title}
                    description={w.excerpt || w.description || ""}
                    href={href}
                  />
                );
              })}
            </div>
          </div>
        )}
      </article>
    </SubPageLayout>
  );
}
