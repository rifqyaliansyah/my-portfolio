import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-page px-4 md:px-6 flex flex-col justify-start">
      <main className="w-full max-w-[1120px] mx-auto my-8 md:my-[64px] bg-container rounded-[32px] md:rounded-[64px] border border-brand-border-container p-6 sm:p-12 md:p-[80px] flex flex-col gap-16 transition-all duration-300">
        {/* Navigation Header */}
        <Header />

        {/* Hero Section Placeholder (Content Area) */}
        <section className="flex flex-col items-start justify-center py-16 md:py-24 animate-fade-in">
          <span className="text-[14px] md:text-[16px] font-semibold text-brand-primary uppercase tracking-widest bg-brand-primary/5 dark:bg-brand-primary/10 px-4 py-2 rounded-full mb-6">
            Welcome to my Portfolio
          </span>
          <h1 className="text-[36px] md:text-[54px] font-semibold tracking-tight text-brand-primary max-w-2xl leading-[1.15] mb-6">
            {"Hi, I'm Rifqy."} <br />
            Building digital products, brands & experiences.
          </h1>
          <p className="text-[16px] md:text-[18px] text-brand-secondary max-w-lg font-normal leading-relaxed mb-8">
            This is a placeholder for your hero section. The container and header styles match your design guidelines exactly.
          </p>
          <div className="flex gap-4">
            <a
              href="#project"
              className="px-6 py-3 rounded-full bg-brand-primary text-container font-medium hover:opacity-90 transition-opacity"
            >
              View Work
            </a>
            <a
              href="#about"
              className="px-6 py-3 rounded-full border border-brand-border-toggle text-brand-primary font-medium hover:bg-brand-primary/5 transition-colors"
            >
              About Me
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

