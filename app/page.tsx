import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-page px-4 md:px-6 flex flex-col justify-start">
      <main className="w-full max-w-[1120px] mx-auto my-8 md:my-[64px] bg-container rounded-[32px] md:rounded-[64px] border border-brand-border-container p-6 sm:p-12 md:p-[80px] flex flex-col transition-all duration-300">
        <Header />
        <Hero />
      </main>
    </div>
  );
}
