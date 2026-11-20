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
  if (window.matchMedia('(max-width:980px)').matches && event.pointerType === 'mouse') showMenu(true);
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

const inspiration = document.querySelector('.kitchen-photo');
if (inspiration && inspiration.querySelector('.photo-toggle')) {
  const slides = [
  {
    "src": "/kitchen-inspiration.webp",
    "alt": "Black cabinetry and a marble waterfall island",
    "category": "Kitchen inspiration"
  },
  {
    "src": "/gallery-vanity.webp",
    "alt": "Oak bathroom vanity with a stone countertop",
    "category": "Bathroom inspiration"
  },
  {
    "src": "/gallery-laundry.webp",
    "alt": "Laundry cabinets with a wood folding counter",
    "category": "Laundry inspiration"
  },
  {
    "src": "/gallery-hood.webp",
    "alt": "Wood range hood and floating shelves",
    "category": "Custom cabinet inspiration"
  },
  {
    "src": "/gallery-tray.webp",
    "alt": "Roll-out storage tray for pots and pans",
    "category": "Custom cabinet inspiration"
  }
];
  let photo = inspiration.querySelector('img');
  let decoding = false;
  const caption = inspiration.querySelector('figcaption');
  const toggle = inspiration.querySelector('.photo-toggle');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let remaining = [];
  let timer;
  let playing = !motion.matches;
  async function advance() {
    if (decoding) return;
    if (!remaining.length) remaining = slides.map((_, i) => i).filter(i => i !== active);
    const pick = Math.floor(Math.random() * remaining.length);
    const [index] = remaining.splice(pick, 1);
    const slide = slides[index];
    const next = new Image();
    next.src = slide.src;
    decoding = true;
    try { await next.decode(); } catch { return; } finally { decoding = false; }
    if (!playing || document.hidden) return;
    const previous = photo;
    previous.setAttribute('aria-hidden', 'true');
    next.alt = slide.alt;
    next.className = 'entering';
    previous.after(next);
    next.getBoundingClientRect(); // Establish the starting opacity before the crossfade.
    next.className = 'showing';
    previous.className = 'leaving';
    if (motion.matches) previous.remove();
    else setTimeout(() => previous.remove(), 1250);
    photo = next;
    caption.textContent = slide.category + ' · ' + slide.alt;
    active = index;
  }
  function schedule() {
    clearInterval(timer);
    toggle.textContent = playing ? 'Pause' : 'Play';
    toggle.setAttribute('aria-label', toggle.textContent + ' gallery slideshow');
    if (playing && !document.hidden) timer = setInterval(advance, 4500);
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => { playing = !playing; schedule(); });
  motion.addEventListener('change', () => { playing = !motion.matches; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  schedule();
}
