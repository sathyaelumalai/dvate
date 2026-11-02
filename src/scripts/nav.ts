/** Services dropdown, full-screen mobile menu and footer year. */

/* ---------- Services dropdown ---------- */
const dropdowns = document.querySelectorAll<HTMLElement>('[data-dropdown]');

function closeDropdown(li: HTMLElement, returnFocus = false) {
  li.classList.remove('open');
  const toggle = li.querySelector<HTMLButtonElement>('.sub-toggle');
  toggle?.setAttribute('aria-expanded', 'false');
  if (returnFocus) toggle?.focus();
}

dropdowns.forEach((li) => {
  const toggle = li.querySelector<HTMLButtonElement>('.sub-toggle');
  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = li.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  li.addEventListener('focusout', (e) => {
    if (!li.contains(e.relatedTarget as Node)) closeDropdown(li);
  });
});

document.addEventListener('click', (e) => {
  dropdowns.forEach((li) => {
    if (!li.contains(e.target as Node)) closeDropdown(li);
  });
});

/* ---------- Mobile menu ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
const menuLabel = menuToggle?.querySelector('.menu-label');

function setMenu(open: boolean) {
  if (!menuToggle || !menu || !header) return;
  menu.classList.toggle('is-open', open);
  header.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  if (menuLabel) menuLabel.textContent = open ? 'Close' : 'Menu';
  document.documentElement.style.overflow = open ? 'hidden' : '';
  if (open) menu.querySelector<HTMLElement>('a')?.focus();
}

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

// Close the menu if the viewport grows past the desktop breakpoint.
window.matchMedia('(min-width: 1180px)').addEventListener('change', (e) => {
  if (e.matches) setMenu(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dropdowns.forEach((li) => {
      if (li.classList.contains('open')) closeDropdown(li, true);
    });
    if (menuToggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
    return;
  }

  // Keep Tab inside the open mobile menu and its toggle button.
  if (e.key === 'Tab' && menu?.classList.contains('is-open') && menuToggle) {
    const focusables = [
      menuToggle,
      ...menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* ---------- Footer year ---------- */
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
