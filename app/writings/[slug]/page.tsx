import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/app/lib/sanity";
import { WRITING_BY_SLUG_QUERY, WRITINGS_QUERY, PROFILE_QUERY } from "@/app/lib/sanity.queries";
import { WritingData, ProfileData } from "@/app/types/sanity";
import { fallbackWritings } from "@/app/lib/fallback-data";
import { urlFor } from "@/app/lib/sanity";
import SubPageLayout from "@/app/components/SubPageLayout";
import CustomPortableText from "@/app/components/CustomPortableText";
import CodeBlock from "@/app/components/CodeBlock";
import BackButton from "@/app/components/BackButton";
import Card from "@/app/components/Card";

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

  return fallbackWritings
    .filter((w) => w.slug?.current)
    .map((w) => ({ slug: w.slug.current }));
}

export async function generateMetadata({ params }: WritingDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  let article: WritingData | null = null;

  try {
    article = await client.fetch<WritingData>(WRITING_BY_SLUG_QUERY, { slug });
  } catch (e) {
    // fallback
  }

  if (!article) {
    article = (fallbackWritings.find((w) => w.slug?.current === slug) as unknown as WritingData) || null;
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
    article = (fallbackWritings.find((w) => w.slug?.current === slug) as unknown as WritingData) || null;
    allWritings = fallbackWritings as unknown as WritingData[];
  }

  if (!article) {
    notFound();
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "September 2026";

  const imageUrl = article.coverImage
    ? urlFor(article.coverImage).width(1200).height(600).auto("format").url()
    : null;

  // More Writings (Filter out current article, take up to 3)
  const moreWritings = allWritings
    .filter((w) => w.slug?.current !== slug)
    .slice(0, 3);

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
        <div className="w-full mt-8 md:mt-10 prose prose-neutral dark:prose-invert max-w-none text-brand-secondary">
          {article.content && article.content.length > 0 ? (
            <CustomPortableText value={article.content} />
          ) : (
            <div className="flex flex-col gap-6 text-[16px] md:text-[17px] leading-[1.85]">
              <p className="text-lg md:text-xl font-medium text-brand-primary leading-relaxed">
                {article.excerpt || article.description || "Building modern user interfaces requires balancing aesthetics, accessibility, and high performance."}
              </p>

              <p>
                In recent years, the web development ecosystem has undergone monumental shifts. From component-driven architectures to reactive state synchronization and edge computing, crafting digital interfaces has become both immensely expressive and technically demanding.
              </p>

              <h2 className="text-2xl font-bold text-brand-primary mt-6 mb-2 tracking-tight">
                1. Principles of Intentional Engineering
              </h2>

              <p>
                When architecting modern applications, every abstraction should justify its overhead. Rather than reaching for complex third-party libraries prematurely, leveraging native browser standards and standard CSS custom properties frequently yields superior longevity and minimal runtime friction.
              </p>

              <blockquote className="border-l-3 border-(--primary-color) pl-5 py-2 my-4 italic text-brand-primary bg-surface-color rounded-r-xl">
                "Simplicity is prerequisite for reliability. Software that is straightforward to reason about is inherently less vulnerable to regression."
              </blockquote>

              <h2 className="text-2xl font-bold text-brand-primary mt-6 mb-2 tracking-tight">
                2. Practical Implementation
              </h2>

              <p>
                Consider a standard animation wrapper designed with clean spring physics using React and Framer Motion:
              </p>

              <CodeBlock
                code={`import { motion } from "framer-motion";

export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.4,
      delay,
      ease: [0.16, 1, 0.3, 1], // Smooth custom cubic bezier
    }}
  >
    {children}
  </motion.div>
);`}
                language="typescript"
                filename="FadeIn.tsx"
              />

              <h2 className="text-2xl font-bold text-brand-primary mt-6 mb-2 tracking-tight">
                3. Conclusion & Takeaways
              </h2>

              <p>
                Continuous refinement, strict typography hierarchies, and intentional interaction design distinguish unforgettable software from ordinary web applications. By paying relentless attention to subtle nuances, we create experiences that feel effortless and joyful.
              </p>
            </div>
          )}
        </div>

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
                  : (w as any).imageSrc || "/example.jpg";
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
