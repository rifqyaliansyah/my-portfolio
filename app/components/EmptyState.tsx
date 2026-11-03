interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

export default function EmptyState({ title, description, className = "" }: EmptyStateProps) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-brand-border-container bg-page px-6 py-14 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-container border border-brand-border-container flex items-center justify-center text-brand-secondary mb-4">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      </div>
      <p className="text-[16px] font-semibold text-brand-primary">{title}</p>
      {description && (
        <p className="mt-1.5 text-[13px] font-medium text-brand-secondary max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
}
