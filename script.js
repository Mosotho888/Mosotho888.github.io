/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const glow   = document.getElementById('cursor-glow');
let mx = 0, my = 0;
 
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  glow.style.left   = mx + 'px';
  glow.style.top    = my + 'px';
});
 
const hoverEls = document.querySelectorAll('a, button, .chip, .stat, .cert-card, .glass-card, .c-tile');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    cursor.style.opacity = '.6';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    cursor.style.opacity = '1';
  });
});
 
/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
 
/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('[data-section]');
const navAs    = document.querySelectorAll('.nav-links a');
const no = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => { a.style.color = ''; a.style.background = ''; });
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) { a.style.color = 'var(--cyan)'; }
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => no.observe(s));
 
/* ── COUNTER ANIMATION ── */
function animCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const dur = 1400;
  const start = performance.now();
  const isFloat = target % 1 !== 0;
  requestAnimationFrame(function step(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = target * ease;
    el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  });
}
const countEls = document.querySelectorAll('.stat-n[data-target]');
const co = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); co.unobserve(e.target); } });
}, { threshold: 0.5 });
countEls.forEach(el => co.observe(el));
