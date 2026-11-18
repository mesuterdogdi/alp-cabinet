const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.innerHTML = 'Menu <span aria-hidden="true">+</span>';
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.innerHTML = (open ? 'Close' : 'Menu') + '<span aria-hidden="true">' + (open ? '&minus;' : '+') + '</span>';
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeMenu();
});
window.matchMedia('(min-width: 981px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
const legacyRoutes = { '#services': '/services', '#approach': '/process', '#about': '/about', '#contact': '/contact' };
if (location.pathname === '/' && legacyRoutes[location.hash]) location.replace(legacyRoutes[location.hash]);
