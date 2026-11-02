/**
 * A10: header state. The header is transparent while the dark hero (or page header)
 * marked [data-hero] is under it, and turns solid once the visitor scrolls past.
 * Pages with no [data-hero] keep the solid header.
 */
const header = document.querySelector<HTMLElement>('[data-header]');
const hero = document.querySelector<HTMLElement>('[data-hero]');

if (header) {
  if (!hero) {
    header.classList.add('is-solid');
  } else {
    const headerHeight = header.offsetHeight;
    const observer = new IntersectionObserver(
      ([entry]) => header.classList.toggle('is-solid', !entry.isIntersecting),
      { rootMargin: `-${headerHeight + 12}px 0px 0px 0px` },
    );
    observer.observe(hero);
  }
}
