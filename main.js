/* ==========================================================================
   SOHAM DUTTA — shared interactions
   Custom cursor · scroll progress · reveal-on-scroll · mobile nav
   hero word rotator · magnetic buttons
   ========================================================================== */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- custom cursor ---- */
  if (finePointer) {
    const dot  = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (dot && ring) {
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
      });
      (function follow() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(follow);
      })();
      document.querySelectorAll('a, button, .card, .xp, .skill-pill').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    }
  }

  /* ---- scroll progress bar ---- */
  const bar = document.querySelector('.scroll-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ---- reveal on scroll ---- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ---- mobile nav ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => { links.classList.remove('open'); toggle.textContent = '☰'; })
    );
  }

  /* ---- hero word rotator (scramble style) ---- */
  const roto = document.querySelector('[data-rotate]');
  if (roto) {
    const words = JSON.parse(roto.getAttribute('data-rotate'));
    const GLYPHS = '▲▼◆●01$#%&×+';
    let i = 0;
    if (reduceMotion) {
      roto.textContent = words[0];
    } else {
      const scrambleTo = (word) => {
        let frame = 0;
        const total = word.length * 4 + 8;
        const t = setInterval(() => {
          let out = '';
          for (let c = 0; c < word.length; c++) {
            const settled = frame > c * 4 + 6;
            out += settled ? word[c] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
          roto.textContent = out;
          if (++frame > total) {
            clearInterval(t);
            roto.textContent = word;
            setTimeout(() => { i++; scrambleTo(words[i % words.length]); }, 2400);
          }
        }, 40);
      };
      scrambleTo(words[0]);
    }
  }

  /* ---- hero chart draw-in ---- */
  const line = document.getElementById('chartLine');
  if (line) {
    const area  = document.getElementById('chartArea');
    const dot   = document.getElementById('chartDot');
    const ring  = document.getElementById('chartPulse');
    const tags  = document.querySelectorAll('.chart-tag');
    if (reduceMotion) {
      if (area) area.style.opacity = '1';
      if (dot)  dot.style.opacity  = '1';
      tags.forEach(t => t.classList.add('on'));
    } else {
      const len = line.getTotalLength();
      line.style.strokeDasharray  = len;
      line.style.strokeDashoffset = len;
      line.getBoundingClientRect(); // force layout
      line.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(.5,0,.2,1)';
      requestAnimationFrame(() => { line.style.strokeDashoffset = '0'; });
      setTimeout(() => {
        if (area) { area.style.transition = 'opacity 1s ease'; area.style.opacity = '1'; }
        if (dot)  { dot.style.opacity = '1'; }
        if (ring) { ring.style.opacity = '1'; ring.style.animation = 'ringPulse 1.8s ease-out infinite'; }
      }, 2100);
      tags.forEach((t, k) => setTimeout(() => t.classList.add('on'), 900 + k * 420));
    }
  }

  /* ---- magnetic buttons ---- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---- active nav link ---- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });
})();
