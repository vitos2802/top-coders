const scrollRevealSelectors = [
  '.section-header-title',
  '.section-header-text',
  '.about-item',
  '.about-picture-box',
  '.lesson-card',
  '.proposal-card-wrap',
  '.teacher-card',
  '.reviews-item',
  '.contact-us-title',
  '.contact-us-text',
  '.contact-us-promo',
  '.contact-us-form',
];

scrollRevealSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach(element => {
    element.setAttribute('data-scroll', '');
  });
});

ScrollOut({
  once: true,
});

const reviewsSwiperElement = document.querySelector('.reviews-swiper');

if (reviewsSwiperElement) {
  const reviewsSlidesCount =
    reviewsSwiperElement.querySelectorAll('.swiper-slide').length;

  new Swiper(reviewsSwiperElement, {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 500,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    resizeObserver: true,
    enabled: reviewsSlidesCount > 1,
    pagination: {
      el: reviewsSwiperElement.querySelector('.reviews-pagination'),
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
  });
}

// Attention shake: a CTA shakes once it has been on screen for 2.5s.
const initButtonShake = () => {
  const DWELL = 2500;
  const BUTTON_SELECTOR =
    '.hero-btn, .lesson-btn, .proposal-btn, .contact-us-btn';
  const buttons = document.querySelectorAll(BUTTON_SELECTOR);
  if (!buttons.length || !('IntersectionObserver' in window)) return;

  const timers = new WeakMap();

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const btn = entry.target;

        if (!entry.isIntersecting) {
          clearTimeout(timers.get(btn));
          timers.delete(btn);
          return;
        }
        if (timers.has(btn)) return;

        timers.set(
          btn,
          setTimeout(() => {
            btn.classList.remove('shake-y');
            void btn.offsetWidth; // restart the animation
            btn.classList.add('shake-y');
          }, DWELL)
        );
      });
    },
    { threshold: 0.9 }
  );

  buttons.forEach(btn => observer.observe(btn));
};

initButtonShake();

// mobile menu toggle
const mobileMenu = document.querySelector('.overlay');
const mobileMenuOpenBtn = document.querySelector('.burger');
const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

mobileMenuOpenBtn.addEventListener('click', () => {
  mobileMenu.classList.add('is-open');
  document.body.classList.add('menu-open');
});

mobileMenuCloseBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
});

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});
