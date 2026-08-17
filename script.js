/* =============================================
   SONAR — Cosmic Edition Script
   Zero dependencies. Pure Vanilla JS.
   ============================================= */

// ===== CUSTOM CURSOR =====
const cur = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function cursorLoop() {
  tx += (mx - tx) * 0.15;
  ty += (my - ty) * 0.15;
  if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
  if (trail) { trail.style.left = tx + 'px'; trail.style.top = ty + 'px'; }
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

// Hover effect on interactive elements
document.querySelectorAll('button, a, .game-card, .feat-card, .dl-card, .sdot, .nav-link').forEach(el => {
  el.addEventListener('mouseenter', () => { cur && cur.classList.add('hover'); trail && trail.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cur && cur.classList.remove('hover'); trail && trail.classList.remove('hover'); });
});


// ===== COSMIC CANVAS BACKGROUND =====
(function cosmos() {
  const c = document.getElementById('cosmos');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H;

  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  // Stars
  const stars = [];
  for (let i = 0; i < 350; i++) {
    stars.push({
      x: Math.random() * 2000 - 500,
      y: Math.random() * 2000 - 500,
      z: Math.random() * 1500,
      size: Math.random() * 1.8 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.3 + 0.05
    });
  }

  // Nebula clouds
  const nebulae = [];
  for (let i = 0; i < 5; i++) {
    nebulae.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 300 + 150,
      dx: (Math.random() - 0.5) * 0.15,
      dy: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.025 + 0.008
    });
  }

  // Floating geometric shapes (wireframe)
  const shapes = [];
  for (let i = 0; i < 8; i++) {
    const sides = Math.floor(Math.random() * 4) + 3;
    shapes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 60 + 20,
      sides: sides,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.003,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.06 + 0.02
    });
  }

  // 3D wireframe sphere (main centerpiece)
  const phi = (1 + Math.sqrt(5)) / 2;
  const rawV = [[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]];
  const SR = 120;
  let sVerts = rawV.map(v => { const l = Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]); return [v[0]/l*SR,v[1]/l*SR,v[2]/l*SR]; });
  const sFaces = [[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];

  // Subdivide
  function subdiv(verts, faces, iter) {
    let v = verts.map(a=>[...a]), f = faces.map(a=>[...a]);
    for (let it = 0; it < iter; it++) {
      const nf = [], mc = {};
      function mid(i1,i2) {
        const k = Math.min(i1,i2)+'_'+Math.max(i1,i2);
        if (mc[k] !== undefined) return mc[k];
        const m = [(v[i1][0]+v[i2][0])/2,(v[i1][1]+v[i2][1])/2,(v[i1][2]+v[i2][2])/2];
        const l = Math.sqrt(m[0]*m[0]+m[1]*m[1]+m[2]*m[2]);
        m[0]=m[0]/l*SR; m[1]=m[1]/l*SR; m[2]=m[2]/l*SR;
        v.push(m); mc[k]=v.length-1; return v.length-1;
      }
      for (const fa of f) {
        const a=mid(fa[0],fa[1]),b=mid(fa[1],fa[2]),cc=mid(fa[2],fa[0]);
        nf.push([fa[0],a,cc],[fa[1],b,a],[fa[2],cc,b],[a,b,cc]);
      }
      f=nf;
    }
    return {v,f};
  }
  const sphere = subdiv(sVerts, sFaces, 2);
  const origSV = sphere.v.map(a=>[...a]);

  // Edges
  const eSet = new Set(), sEdges = [];
  for (const fa of sphere.f) {
    [[fa[0],fa[1]],[fa[1],fa[2]],[fa[2],fa[0]]].forEach(([a,b])=>{
      const k=Math.min(a,b)+'_'+Math.max(a,b);
      if(!eSet.has(k)){eSet.add(k);sEdges.push([a,b]);}
    });
  }

  function rotY(v,a){const c=Math.cos(a),s=Math.sin(a);return[v[0]*c+v[2]*s,v[1],-v[0]*s+v[2]*c]}
  function rotX(v,a){const c=Math.cos(a),s=Math.sin(a);return[v[0],v[1]*c-v[2]*s,v[1]*s+v[2]*c]}
  function proj(v,cx,cy,fov){const sc=fov/(fov+v[2]);return[v[0]*sc+cx,v[1]*sc+cy,sc]}

  let scrollY = 0;
  window.addEventListener('scroll', ()=>{ scrollY = window.scrollY; });

  function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() * 0.0006;
    const cx = W / 2, cy = H / 2;

    // Nebulae
    for (const n of nebulae) {
      n.x += n.dx; n.y += n.dy;
      if (n.x < -n.r) n.x = W + n.r;
      if (n.x > W + n.r) n.x = -n.r;
      if (n.y < -n.r) n.y = H + n.r;
      if (n.y > H + n.r) n.y = -n.r;
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, `rgba(255,255,255,${n.opacity})`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2);
    }

    // Stars with parallax
    for (const s of stars) {
      s.z -= s.speed;
      if (s.z <= 0) s.z = 1500;
      const sx = (s.x - W/2) * (300 / s.z) + cx;
      const sy = (s.y - H/2) * (300 / s.z) + cy - scrollY * 0.05;
      const sz = s.size * (300 / s.z) * 0.5;
      const twinkle = Math.sin(t * 3 + s.twinkle) * 0.3 + 0.7;
      const alpha = Math.min(1, (1 - s.z / 1500)) * twinkle;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.3, sz), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }

    // Wireframe shapes
    for (const sh of shapes) {
      sh.x += sh.dx; sh.y += sh.dy; sh.rot += sh.rotSpeed;
      if (sh.x < -100) sh.x = W + 100;
      if (sh.x > W + 100) sh.x = -100;
      if (sh.y < -100) sh.y = H + 100;
      if (sh.y > H + 100) sh.y = -100;
      ctx.beginPath();
      for (let i = 0; i <= sh.sides; i++) {
        const a = sh.rot + (i / sh.sides) * Math.PI * 2;
        const px = sh.x + Math.cos(a) * sh.r;
        const py = sh.y + Math.sin(a) * sh.r - scrollY * 0.08;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255,255,255,${sh.opacity})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // 3D Sphere
    const smx = (mx / W - 0.5) * 0.4;
    const smy = (my / H - 0.5) * 0.4;
    const sphCx = cx, sphCy = cy - scrollY * 0.12;
    const fov = 400;

    const deformed = origSV.map(ov => {
      const noise = Math.sin(ov[0]*0.02+t*2)*Math.cos(ov[1]*0.02+t*1.5)*Math.sin(ov[2]*0.02+t);
      const sc = 1 + noise * 0.15;
      return [ov[0]*sc, ov[1]*sc, ov[2]*sc];
    });

    const projected = deformed.map(v => {
      let rv = rotY(v, t * 0.25 + smx);
      rv = rotX(rv, Math.sin(t * 0.4) * 0.15 + smy);
      return proj(rv, sphCx, sphCy, fov);
    });

    for (const [a, b] of sEdges) {
      const pa = projected[a], pb = projected[b];
      const avg = (pa[2] + pb[2]) / 2;
      const alpha = Math.max(0.015, Math.min(0.1, avg * 0.04));
      ctx.beginPath();
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = Math.max(0.2, avg * 0.3);
      ctx.stroke();
    }

    for (const p of projected) {
      const alpha = Math.max(0.03, Math.min(0.25, p[2] * 0.1));
      ctx.beginPath();
      ctx.arc(p[0], p[1], Math.max(0.4, p[2] * 0.8), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }

    // Center glow
    const cg = ctx.createRadialGradient(sphCx, sphCy, 0, sphCx, sphCy, 200);
    cg.addColorStop(0, 'rgba(255,255,255,0.015)');
    cg.addColorStop(1, 'transparent');
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(sphCx, sphCy, 200, 0, Math.PI * 2);
    ctx.fill();
  }
  draw();
})();


// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ===== NAVIGATION =====
function go(i) {
  const secs = document.querySelectorAll('.sec');
  if (secs[i]) secs[i].scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(l.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

const sdots = document.querySelectorAll('.sdot');
const secs = document.querySelectorAll('.sec');
sdots.forEach(d => {
  d.addEventListener('click', () => {
    const i = parseInt(d.dataset.i);
    if (secs[i]) secs[i].scrollIntoView({ behavior: 'smooth' });
  });
});

const secObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const i = Array.from(secs).indexOf(en.target);
      sdots.forEach(d => d.classList.remove('active'));
      if (sdots[i]) sdots[i].classList.add('active');
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const al = document.querySelector(`.nav-link[href="#${en.target.id}"]`);
      if (al) al.classList.add('active');
    }
  });
}, { threshold: 0.35 });
secs.forEach(s => secObs.observe(s));


// ===== REVEAL =====
const revObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const d = en.target.dataset.delay || 0;
      setTimeout(() => en.target.classList.add('visible'), d * 110);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.feat-card, .stat-card, .game-card').forEach(el => revObs.observe(el));


// ===== COUNTERS =====
function animCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const dec = parseInt(el.dataset.decimal) || 0;
  const dur = 2200, start = performance.now();
  function up(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    const cur = e * target;
    if (dec > 0) el.textContent = cur.toFixed(dec) + suffix;
    else if (target >= 1e6) el.textContent = (cur / 1e6).toFixed(cur >= target ? 0 : 1) + 'M' + suffix;
    else if (target >= 1e3) el.textContent = Math.floor(cur).toLocaleString('ru-RU') + suffix;
    else el.textContent = Math.floor(cur) + suffix;
    if (p < 1) requestAnimationFrame(up);
  }
  requestAnimationFrame(up);
}

const cntObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting && !en.target.dataset.done) {
      en.target.dataset.done = '1';
      animCount(en.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => cntObs.observe(el));

function heroCount(el, target, dur) {
  dur = dur || 2000;
  const start = performance.now();
  function up(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString('ru-RU');
    if (p < 1) requestAnimationFrame(up);
  }
  requestAnimationFrame(up);
}
setTimeout(() => {
  const h1 = document.getElementById('hc1'), h2 = document.getElementById('hc2');
  if (h1) heroCount(h1, 847293);
  if (h2) heroCount(h2, 12847);
}, 400);


// ===== FAKE UPLOAD =====
function fakeUpload() {
  const prog = document.getElementById('uzProgress');
  const fill = document.getElementById('uzFill');
  const pct = document.getElementById('uzPct');
  prog.classList.add('active');
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 8 + 2;
    if (p >= 78) { clearInterval(iv); p = 78; }
    fill.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
    if (p >= 78) {
      setTimeout(() => {
        fill.style.width = '0%';
        pct.textContent = '0%';
        prog.classList.remove('active');
        toast('⚠️ Загрузка недоступна в демо-режиме. Это концепт-сайт.');
      }, 800);
    }
  }, 200);
}


// ===== FAKE PLAY =====
function fakePlay(name) {
  toast('🎮 ' + name + ': Запуск невозможен в демо-режиме.');
}


// ===== FAKE DOWNLOAD =====
function fakeDl(btn, name) {
  const orig = btn.innerHTML;
  btn.classList.add('loading');
  btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:sp 1s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg><span>Загрузка...</span>';
  if (!document.getElementById('spst')) {
    const s = document.createElement('style'); s.id = 'spst';
    s.textContent = '@keyframes sp{from{transform:rotate(0)}to{transform:rotate(360deg)}}';
    document.head.appendChild(s);
  }
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = orig;
    toast('⚠️ ' + name + ': Сервер временно недоступен.');
  }, 2000);
}


// ===== FAKE SIGNUP =====
function fakeSignup() {
  const inputs = document.querySelectorAll('.ginput');
  let ok = true;
  inputs.forEach(i => { if (!i.value.trim()) ok = false; });
  if (!ok) { toast('⚠️ Заполните все поля.'); return; }
  const btn = document.querySelector('.form-btn');
  const orig = btn.textContent;
  btn.textContent = 'Создание...'; btn.style.opacity = '.6';
  setTimeout(() => {
    btn.textContent = orig; btn.style.opacity = '1';
    toast('🔒 Регистрация недоступна в демо-режиме.');
    inputs.forEach(i => i.value = '');
  }, 1600);
}


// ===== TOAST =====
function toast(msg) {
  const box = document.getElementById('toastBox');
  if (!box) return;
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => {
    t.style.transition = 'opacity .4s,transform .4s';
    t.style.opacity = '0'; t.style.transform = 'translateY(8px)';
    setTimeout(() => t.remove(), 400);
  }, 3200);
}


// ===== COPY CODE =====
function copyCode(btn) {
  const code = document.querySelector('.cw-body code');
  if (!code) return;
  navigator.clipboard.writeText(code.textContent).then(() => {
    const o = btn.innerHTML;
    btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
    btn.style.color = '#4ade80';
    setTimeout(() => { btn.innerHTML = o; btn.style.color = ''; }, 2000);
  }).catch(() => toast('Не удалось скопировать'));
}


// ===== PARALLAX HERO CARDS =====
const hv = document.querySelector('.hero-right');
if (hv) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    const main = document.querySelector('.hero-card-main');
    const notif = document.querySelector('.hf-notif');
    const badge = document.querySelector('.hf-badge');
    if (main) main.style.transform = `translate(calc(-50% + ${x*.4}px), calc(-50% + ${y*.4}px))`;
    if (notif) notif.style.transform = `translate(${x*.7}px,${y*.7}px) rotate(1.5deg)`;
    if (badge) badge.style.transform = `translate(${-x*.5}px,${-y*.5}px) rotate(-2deg)`;
  });
}
