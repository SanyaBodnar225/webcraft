// Always enter the site at the top, even when the shared URL carries a section hash
// or the browser restores an old scroll position. In-page navigation still works.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', () => {
  if (window.location.hash) {
    history.replaceState(history.state, '', `${window.location.pathname}${window.location.search}`);
  }
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  requestAnimationFrame(() => document.documentElement.style.removeProperty('scroll-behavior'));
});

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Відкрити меню' : 'Закрити меню');
    mobileNav.classList.toggle('is-open', !isOpen);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Відкрити меню');
      mobileNav.classList.remove('is-open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
