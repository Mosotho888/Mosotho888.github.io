// ── CUSTOM CURSOR ──
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .tag, .hstat, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width  = '18px';
    cur.style.height = '18px';
    ring.style.width  = '52px';
    ring.style.height = '52px';
    ring.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width  = '10px';
    cur.style.height = '10px';
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.opacity = '0.5';
  });
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
