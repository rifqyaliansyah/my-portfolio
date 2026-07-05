"use client";

// import Title from './Title';

const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function AboutMe() {
  return (
    <section className="mt-32 w-full">
      <div className="w-full bg-page rounded-3xl p-8 sm:p-10 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-16">
        <div className="flex-1 max-w-150 flex flex-col items-start">
          <span className="text-[12px] font-semibold tracking-wider text-brand-secondary uppercase">
            About Me
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[30px] font-bold leading-tight text-brand-primary mt-4">
            Design is how I solve problems and create impact.
          </h2>
          <p className="text-[15px] md:text-[16px] leading-6.5 md:leading-7 text-brand-secondary mt-6 font-medium">
            I'm a multidisciplinary designer who loves crafting meaningful and functional digital experiences. With a keen eye for detail and a passion for design, I help brands and products connect with their audience.
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center rounded-full font-semibold select-none hover:opacity-90 transition-opacity"
            style={{
              width: 150,
              height: 45,
              paddingTop: 4,
              paddingBottom: 4,
              background: "linear-gradient(to top, #252525 0%, #252525 85%, #4a4a4a 100%)",
              color: "#F2F0EF",
              fontSize: 12,
              lineHeight: "32px",
            }}
          >
            Discuss a project
          </a>
        </div>

        <div className="w-full md:w-auto md:min-w-90 flex justify-start md:justify-end">
          <div className="flex gap-4">

            <div className="flex flex-col items-center" style={{ width: 14 }}>
              <div style={{ paddingTop: 12, paddingBottom: 12 }}>
                <BriefcaseIcon />
              </div>
              <svg width="2" height="14" style={{ display: 'block', overflow: 'visible' }}>
                <line x1="1" y1="0" x2="1" y2="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
              </svg>
              <div style={{ paddingTop: 12, paddingBottom: 12 }}>
                <MapPinIcon />
              </div>
              <svg width="2" height="14" style={{ display: 'block', overflow: 'visible' }}>
                <line x1="1" y1="0" x2="1" y2="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
              </svg>
              <div style={{ paddingTop: 12, paddingBottom: 12 }}>
                <SendIcon />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="flex items-center text-[13px] md:text-[14px] font-semibold text-brand-primary"
                style={{ height: 18 + 24, minHeight: 18 + 24 }}>
                5+ Years of Experience
              </span>
              <div style={{ height: 14 }} />
              <span className="flex items-center text-[13px] md:text-[14px] font-semibold text-brand-primary"
                style={{ height: 18 + 24, minHeight: 18 + 24 }}>
                Based in Indonesia
              </span>
              <div style={{ height: 14 }} />
              <span className="flex items-center text-[13px] md:text-[14px] font-semibold text-brand-primary"
                style={{ height: 18 + 24, minHeight: 18 + 24 }}>
                Open to freelance & collaborations
              </span>
            </div>

          </div>
        </div>


      </div>
    </section>
  );
}
