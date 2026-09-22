import Link from "next/link";
import { WritingData } from "@/app/types/sanity";

interface ArticleListItemProps {
  article: WritingData;
}

export default function ArticleListItem({ article }: ArticleListItemProps) {
  const href = article.slug?.current
    ? `/writings/${article.slug.current}`
    : article.externalUrl || "/writings";

  const isExternal = !article.slug?.current && (article.externalUrl?.startsWith("http://") || article.externalUrl?.startsWith("https://"));

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recent";

  const content = (
    <article className="group py-6 border-b border-brand-border-container last:border-b-0 flex flex-col gap-2 transition-all duration-200">
      {/* Meta Row: Date & Reading Time */}
      <div className="flex items-center gap-3 text-[12px] font-mono text-brand-secondary">
        <time dateTime={article.publishedAt}>{formattedDate}</time>
        <span className="w-1 h-1 rounded-full bg-brand-secondary opacity-40" />
        <span>{article.readingTime || "5 min read"}</span>
      </div>

      {/* Article Title */}
      <h3 className="text-[19px] md:text-[22px] font-semibold text-brand-primary group-hover:text-brand-primary transition-colors flex items-center justify-between gap-2">
        <span className="group-hover:underline underline-offset-4 decoration-brand-border-toggle">
          {article.title}
        </span>
        <span className="text-[16px] text-brand-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0">
          {isExternal ? "↗" : "→"}
        </span>
      </h3>

      {/* Excerpt */}
      {(article.excerpt || article.description) && (
        <p className="text-[14px] md:text-[15px] leading-relaxed text-brand-secondary line-clamp-2 mt-0.5">
          {article.excerpt || article.description}
        </p>
      )}

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-surface-color text-brand-secondary border border-brand-border-container/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="block no-underline">
      {content}
    </Link>
  );
}
