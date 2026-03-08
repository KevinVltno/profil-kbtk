// ── TAHUN AJARAN OTOMATIS ──
(function() {
  const year = new Date().getFullYear();
  const label = year + '/' + (year + 1);
  const el = document.getElementById('tahun-ajaran');
  if (el) el.textContent = label;
})();



// ── NAV SCROLL SHADOW ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── HAMBURGER MENU ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

function triggerVisible(el, delay = 0) {
  setTimeout(() => el.classList.add('visible'), delay);
}

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      triggerVisible(entry.target, i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

window.addEventListener('DOMContentLoaded', () => {
  revealEls.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      triggerVisible(el, i * 60);
    } else {
      revealObs.observe(el);
    }
  });
});

window.addEventListener('scroll', () => {
  revealEls.forEach(el => {
    if (el.classList.contains('visible')) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      triggerVisible(el);
      revealObs.unobserve(el);
    }
  });
}, { passive: true });

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── MATCH MAP HEIGHT TO K-INFO ──
function matchMapHeight() {
  const kInfo = document.querySelector('.k-info');
  const mapFrame = document.querySelector('.map-frame');
  if (!kInfo || !mapFrame) return;
  mapFrame.style.height = kInfo.offsetHeight + 'px';
}
window.addEventListener('DOMContentLoaded', matchMapHeight);
window.addEventListener('resize', matchMapHeight);