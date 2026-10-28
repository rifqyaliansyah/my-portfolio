// Jarak minimum di bawah sticky header supaya section tidak menempel ke atas.
const HEADER_OFFSET = 96;

/**
 * Scroll ke section berdasarkan id hash, diposisikan sedekat mungkin ke tengah
 * viewport (dengan jarak aman dari sticky header), lalu di-clamp ke batas bawah
 * halaman.
 */
export function scrollToHash(hash: string, behavior?: ScrollBehavior) {
  const target = document.getElementById(hash);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior: ScrollBehavior =
    behavior ?? (prefersReducedMotion ? "auto" : "smooth");

  const rect = target.getBoundingClientRect();
  const targetTop = window.scrollY + rect.top;
  const centeredOffset = Math.max((window.innerHeight - rect.height) / 2, HEADER_OFFSET);
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
  const top = Math.min(Math.max(targetTop - centeredOffset, 0), maxScroll);

  window.scrollTo({ top, left: 0, behavior: scrollBehavior });
}
