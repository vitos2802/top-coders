const overlay = document.getElementById('overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenuOpen = document.getElementById('mobile-menu-open');

if (overlay && mobileMenuClose && mobileMenuOpen) {
  mobileMenuOpen.addEventListener('click', () => {
    overlay.classList.add('is-open');
  });
  mobileMenuClose.addEventListener('click', () => {
    overlay.classList.remove('is-open');
  });
}
