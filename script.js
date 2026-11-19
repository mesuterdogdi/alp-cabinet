const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');
const picker = menu.closest('.page-picker');
let pinned = false;
function showMenu(open) {
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.querySelector('span').textContent = open ? '−' : '+';
  if (!open) pinned = false;
}
menu.addEventListener('click', () => {
  pinned = !pinned;
  showMenu(pinned);
});
picker.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') showMenu(true);
});
picker.addEventListener('pointerleave', () => {
  if (!pinned && !nav.contains(document.activeElement)) showMenu(false);
});
picker.addEventListener('focusout', event => {
  if (!picker.contains(event.relatedTarget)) showMenu(false);
});
document.addEventListener('click', event => {
  if (!picker.contains(event.target)) showMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    showMenu(false);
    if (picker.contains(document.activeElement)) menu.focus();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
const legacyRoutes = { '#services': '/services', '#approach': '/process', '#about': '/about', '#contact': '/contact' };
if (location.pathname === '/' && legacyRoutes[location.hash]) location.replace(legacyRoutes[location.hash]);
