/* ============================================
   SONAR — Main Script
   ZERO external dependencies — Pure Vanilla JS
   Works in Russia without VPN
   ============================================ */

// ===== CUSTOM CURSOR =====
const glow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  if (glow) {
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();


// ===== PURE CANVAS 3D-LIKE BACKGROUND =====
// No Three.js needed — draws a rotating wireframe icosahedron
// with liquid deformation using only Canvas 2D API
(function initCanvas3D() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Generate icosahedron vertices
  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVerts = [
    [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
    [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
    [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
  ];

  // Normalize to radius
  const R = 8;
  const verts = rawVerts.map(v => {
    const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
    return [v[0]/len * R, v[1]/len * R, v[2]/len * R];
  });

  // Subdivide for smoother sphere
  function subdivide(vertices, faces, iterations) {
    let v = vertices.map(arr => [...arr]);
    let f = faces.map(arr => [...arr]);
    for (let iter = 0; iter < iterations; iter++) {
      const newFaces = [];
      const midCache = {};
      function getMid(i1, i2) {
        const key = Math.min(i1,i2) + '_' + Math.max(i1,i2);
        if (midCache[key] !== undefined) return midCache[key];
        const mid = [
          (v[i1][0] + v[i2][0]) / 2,
          (v[i1][1] + v[i2][1]) / 2,
          (v[i1][2] + v[i2][2]) / 2
        ];
        const len = Math.sqrt(mid[0]*mid[0] + mid[1]*mid[1] + mid[2]*mid[2]);
        mid[0] = mid[0]/len * R;
        mid[1] = mid[1]/len * R;
        mid[2] = mid[2]/len * R;
        v.push(mid);
        midCache[key] = v.length - 1;
        return v.length - 1;
      }
      for (const face of f) {
        const a = getMid(face[0], face[1]);
        const b = getMid(face[1], face[2]);
        const c = getMid(face[2], face[0]);
        newFaces.push([face[0], a, c]);
        newFaces.push([face[1], b, a]);
        newFaces.push([face[2], c, b]);
        newFaces.push([a, b, c]);
      }
      f = newFaces;
    }
    return { vertices: v, faces: f };
  }

  // Icosahedron faces
  const icoFaces = [
    [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
    [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
    [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
    [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]
  ];

  const sphere = subdivide(verts, icoFaces, 2);
  const origVerts = sphere.vertices.map(v => [...v]);

  // Build unique edges from faces
  const edgeSet = new Set();
  const edges = [];
  for (const face of sphere.faces) {
    const pairs = [[face[0],face[1]], [face[1],face[2]], [face[2],face[0]]];
    for (const [a, b] of pairs) {
      const key = Math.min(a,b) + '_' + Math.max(a,b);
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([a, b]);
      }
    }
  }

  // Particles
  const particles = [];
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60,
      z: (Math.random() - 0.5) * 60,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.002 + 0.001
    });
  }

  // 3D rotation + projection
  function rotateY(v, angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    return [v[0]*cos + v[2]*sin, v[1], -v[0]*sin + v[2]*cos];
  }
  function rotateX(v, angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    return [v[0], v[1]*cos - v[2]*sin, v[1]*sin + v[2]*cos];
  }
  function project(v, cx, cy, fov) {
    const scale = fov / (fov + v[2]);
    return [v[0] * scale + cx, v[1] * scale + cy, scale];
  }

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  function draw() {
    requestAnimationFrame(draw);
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const t = Date.now() * 0.0008;
    const cx = W / 2;
    const cy = H / 2 - scrollY * 0.15;
    const fov = 300;

    // Mouse influence
    const mx = (mouseX / W - 0.5) * 0.3;
    const my = (mouseY / H - 0.5) * 0.3;

    // Deform vertices (liquid effect)
    const deformed = origVerts.map((ov, i) => {
      const noise = Math.sin(ov[0] * 0.4 + t * 2) *
                    Math.cos(ov[1] * 0.4 + t * 1.5) *
                    Math.sin(ov[2] * 0.4 + t);
      const scale = 1 + noise * 0.2;
      return [ov[0] * scale, ov[1] * scale, ov[2] * scale];
    });

    // Rotate and project vertices
    const projected = deformed.map(v => {
      let rv = rotateY(v, t * 0.3 + mx);
      rv = rotateX(rv, Math.sin(t * 0.5) * 0.2 + my);
      return project(rv, cx, cy, fov);
    });

    // Draw edges
    for (const [a, b] of edges) {
      const pa = projected[a];
      const pb = projected[b];
      const avgScale = (pa[2] + pb[2]) / 2;
      const alpha = Math.max(0.02, Math.min(0.15, avgScale * 0.08));

      ctx.beginPath();
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
      ctx.lineWidth = Math.max(0.3, avgScale * 0.5);
      ctx.stroke();
    }

    // Draw vertices as glowing dots
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      const alpha = Math.max(0.05, Math.min(0.4, p[2] * 0.2));
      const radius = Math.max(0.5, p[2] * 1.2);

      ctx.beginPath();
      ctx.arc(p[0], p[1], radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
      ctx.fill();
    }

    // Draw particles
    for (const p of particles) {
      let rv = rotateY([p.x, p.y, p.z], t * p.speed * 50);
      rv = rotateX(rv, t * p.speed * 30);
      const pp = project(rv, cx, cy, fov);
      const alpha = Math.max(0.05, Math.min(0.35, pp[2] * 0.15));

      ctx.beginPath();
      ctx.arc(pp[0], pp[1], p.size * pp[2], 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
      ctx.fill();
    }

    // Central glow
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 250);
    gradient.addColorStop(0, 'rgba(0, 229, 255, 0.03)');
    gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.015)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);
  }
  draw();
})();


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ===== SMOOTH SCROLL =====
function scrollToSection(index) {
  const sections = document.querySelectorAll('.section');
  if (sections[index]) sections[index].scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});


// ===== SIDE NAV =====
const sideDots = document.querySelectorAll('.side-dot');
const sections = document.querySelectorAll('.section');

sideDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.dataset.index);
    if (sections[idx]) sections[idx].scrollIntoView({ behavior: 'smooth' });
  });
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = Array.from(sections).indexOf(entry.target);
      sideDots.forEach(d => d.classList.remove('active'));
      if (sideDots[idx]) sideDots[idx].classList.add('active');

      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay * 120);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.feature-card, .stat-card, .reveal').forEach(el => {
  revealObserver.observe(el);
});


// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimal = parseInt(el.dataset.decimal) || 0;
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    if (decimal > 0) {
      el.textContent = current.toFixed(decimal) + suffix;
    } else if (target >= 1000000) {
      el.textContent = (current / 1000000).toFixed(current >= target ? 0 : 1) + 'M' + suffix;
    } else if (target >= 1000) {
      el.textContent = Math.floor(current).toLocaleString('ru-RU') + suffix;
    } else {
      el.textContent = Math.floor(current) + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// Hero counters
function animateHeroCounter(el, target, duration) {
  duration = duration || 2000;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('ru-RU');
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

setTimeout(() => {
  const c1 = document.getElementById('counter1');
  const c2 = document.getElementById('counter2');
  if (c1) animateHeroCounter(c1, 847293);
  if (c2) animateHeroCounter(c2, 12847);
}, 500);


// ===== FAKE DOWNLOAD =====
function fakeDownload(btn, name) {
  const originalHTML = btn.innerHTML;
  btn.classList.add('loading');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 1s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg><span>Загрузка...</span>';

  if (!document.getElementById('spin-style')) {
    const style = document.createElement('style');
    style.id = 'spin-style';
    style.textContent = '@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}';
    document.head.appendChild(style);
  }

  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = originalHTML;
    showToast('\u26A0\uFE0F ' + name + ': Сервер временно недоступен. Попробуйте позже.', 'error');
  }, 2200);
}


// ===== FAKE SIGNUP =====
function fakeSignup() {
  const inputs = document.querySelectorAll('.glass-input');
  let filled = true;
  inputs.forEach(i => { if (!i.value.trim()) filled = false; });

  if (!filled) {
    showToast('\u26A0\uFE0F Заполните все поля для продолжения', 'error');
    return;
  }

  const btn = document.querySelector('.form-submit');
  const orig = btn.textContent;
  btn.textContent = 'Создание...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent = orig;
    btn.style.opacity = '1';
    showToast('\uD83D\uDD12 Регистрация недоступна в демо-режиме. Это концепт-сайт.', 'error');
    inputs.forEach(i => i.value = '');
  }, 1800);
}


// ===== TOAST SYSTEM =====
function showToast(message, type) {
  type = type || 'error';
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}


// ===== COPY CODE =====
function copyCode(btn) {
  const codeEl = document.querySelector('.code-body code');
  if (!codeEl) return;
  const code = codeEl.textContent;
  navigator.clipboard.writeText(code).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
    btn.style.color = '#22c55e';
    setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
  }).catch(() => {
    showToast('Не удалось скопировать', 'error');
  });
}


// ===== PARALLAX on mouse for hero cards =====
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const main = document.querySelector('.card-main');
    const notif = document.querySelector('.card-notification');
    const badge = document.querySelector('.card-badge-float');
    if (main) main.style.transform = 'translate(calc(-50% + ' + (x * 0.5) + 'px), calc(-50% + ' + (y * 0.5) + 'px))';
    if (notif) notif.style.transform = 'translate(' + (x * 0.8) + 'px, ' + (y * 0.8) + 'px) rotate(2deg)';
    if (badge) badge.style.transform = 'translate(' + (-x * 0.6) + 'px, ' + (-y * 0.6) + 'px) rotate(-3deg)';
  });
}
