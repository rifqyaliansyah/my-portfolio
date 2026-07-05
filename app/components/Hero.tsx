import Image from "next/image";
import ImageStack from "./ImageStack";
import Testimonials from "./Testimonials";

const skills = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
    label: "React / Next.js",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5Z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    label: "TypeScript",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
        <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
      </svg>
    ),
    label: "Figma",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" y1="22" x2="12" y2="12" />
      </svg>
    ),
    label: "Node.js",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    label: "Tailwind CSS",
  },
];

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between mt-10 md:mt-16 gap-8 md:gap-12">
      <div className="flex flex-col items-start w-full md:w-auto min-w-0">
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            className="flex items-center justify-center rounded-xl shrink-0"
            style={{
              width: 80,
              height: 80,
              backgroundColor: "rgba(242, 240, 239, 0.2)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Image
              src="/profile.png"
              alt="Rifqy Aliansyah"
              width={70}
              height={70}
              className="rounded-xl object-cover"
              style={{ width: 70, height: 70 }}
              priority
            />
          </div>

          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-brand-primary leading-tight">
            Rifqy Aliansyah
          </h1>
        </div>

        <p
          className="mt-5 md:mt-6 text-[18px] sm:text-[20px] md:text-[24px] leading-6.5 sm:leading-7 md:leading-8 font-medium text-brand-primary text-left"
        >
          Design Engineer who ships products,
          <br />
          not just mockups. Part of
          <br />
          <span className="text-brand-secondary">Google Indonesia</span>
        </p>

        <a
          href="#contact"
          className="mt-5 md:mt-6 inline-flex items-center justify-center gap-2 rounded-full font-semibold select-none hover:opacity-90 transition-opacity"
          style={{
            width: 156,
            height: 45,
            paddingTop: 4,
            paddingBottom: 4,
            background: "linear-gradient(to top, #252525 0%, #252525 85%, #4a4a4a 100%)",
            color: "#F2F0EF",
            fontSize: 12,
            lineHeight: "32px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Discuss a project
        </a>

        <div className="mt-6 md:mt-8 flex flex-wrap gap-2.5 md:gap-3 items-start w-full md:max-w-104.25">
          {skills.map((skill) => (
            <div
              key={skill.label}
              className="skill-badge flex items-center rounded-full cursor-default select-none text-brand-secondary"
              style={{
                width: 129,
                height: 33,
                gap: 12,
                paddingLeft: 14,
                paddingRight: 14,
                border: "1px solid rgba(74, 74, 74, 0.1)",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
                fontSize: 10,
                fontWeight: 600,
                lineHeight: "32px",
              }}
            >
              {skill.icon}
              <span>{skill.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-14 w-full">
          <Testimonials />
        </div>
      </div>

      <div className="hidden md:block">
        <ImageStack />
      </div>
    </section>
  );
}
