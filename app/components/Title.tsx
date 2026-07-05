import Link from 'next/link';

interface TitleProps {
  title: string;
  description?: string;
  descriptionGap?: string;
  align?: 'left' | 'center' | 'right';
  showLink?: boolean;
  href?: string;
  buttonLabel?: string;
  icon?: React.ReactNode;
}

export default function Title({
  title,
  description,
  descriptionGap = "mt-[4px]",
  align = 'left',
  showLink = true,
  href,
  buttonLabel = "View all",
  icon
}: TitleProps) {

  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const containerJustify = align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-between';

  return (
    <div className={`flex ${containerJustify} items-center w-full`}>
      <div className={`flex flex-col ${alignClass}`}>
        <h2 className="text-[24px] md:text-[32px] font-semibold text-brand-primary leading-tight">{title}</h2>
        {description && (
          <p className={`${descriptionGap} text-[14px] md:text-[16px] font-medium text-brand-secondary`}>
            {description}
          </p>
        )}
      </div>

      {showLink && href && (
        <Link href={href} className="flex items-center gap-3 group shrink-0">
          <span className="text-[12px] font-medium text-brand-secondary group-hover:text-brand-primary transition-all duration-200">
            {buttonLabel}
          </span>
          {icon && (
            <span className="text-brand-secondary group-hover:text-brand-primary transition-all duration-200">
              {icon}
            </span>
          )}
        </Link>
      )}
    </div>
  );
}
