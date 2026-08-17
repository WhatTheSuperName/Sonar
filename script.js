/* ============================================
   SONAR — Liquid Glass Gaming Service
   ============================================ */

*, *::before, *::after {
  margin: 0; padding: 0; box-sizing: border-box;
}

:root {
  --cyan: #00e5ff;
  --purple: #a855f7;
  --pink: #ec4899;
  --blue: #3b82f6;
  --glass-bg: rgba(255,255,255,0.04);
  --glass-border: rgba(255,255,255,0.09);
  --glass-blur: 24px;
  --radius: 24px;
  --radius-sm: 14px;
  --text: #f0f4ff;
  --text-dim: rgba(240,244,255,0.5);
  --font: 'Inter', sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
}

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}

body {
  font-family: var(--font);
  background: #030408;
  color: var(--text);
  overflow-x: hidden;
  cursor: none;
}

/* Custom cursor */
* { cursor: none !important; }

.cursor-glow {
  position: fixed;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%);
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
}

/* ===== BACKGROUND ===== */
.bg-layer {
  position: fixed; inset: 0; z-index: 0; overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.5;
  animation: blobMove 20s ease-in-out infinite;
}

.blob-1 {
  width: 700px; height: 700px;
  background: radial-gradient(circle, #00e5ff, transparent);
  top: -200px; left: -100px;
  animation-delay: 0s;
}
.blob-2 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #a855f7, transparent);
  top: 40%; right: -150px;
  animation-delay: -7s;
  animation-duration: 25s;
}
.blob-3 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #ec4899, transparent);
  bottom: -100px; left: 30%;
  animation-delay: -14s;
  animation-duration: 22s;
}
.blob-4 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #3b82f6, transparent);
  top: 60%; left: -100px;
  animation-delay: -4s;
  animation-duration: 28s;
}

@keyframes blobMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(80px, -60px) scale(1.1); }
  50% { transform: translate(-40px, 80px) scale(0.9); }
  75% { transform: translate(60px, 40px) scale(1.05); }
}

.noise-overlay {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  opacity: 0.4;
  pointer-events: none;
}

#three-canvas {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
}

/* ===== GLASS SYSTEM ===== */
.glass-card, .glass-nav, .glass-pill, .glass-chip,
.glass-input, .glass-btn-small, .glass-inner {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
}

.glass-card {
  border-radius: var(--radius);
  box-shadow:
    0 8px 32px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.06);
  transition: transform 0.4s cubic-bezier(.175,.885,.32,1.275), box-shadow 0.4s;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 60px rgba(0,0,0,0.5),
    0 0 40px rgba(0,229,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.1);
}

.glass-pill {
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-flex; align-items: center; gap: 8px;
}

.glass-chip {
  border-radius: 100px;
  padding: 5px 14px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-dim);
}

.glass-inner {
  border-radius: var(--radius-sm);
  padding: 16px;
}

/* ===== NAVBAR ===== */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 40px;
  border-radius: 0 0 var(--radius) var(--radius);
  border-top: none;
  transition: all 0.4s;
}

.navbar.scrolled {
  padding: 10px 40px;
  background: rgba(3,4,8,0.7);
}

.nav-logo { display: flex; align-items: center; gap: 10px; }
.logo-icon { width: 36px; height: 36px; }
.logo-icon svg { width: 100%; height: 100%; }
.logo-text {
  font-family: var(--font-display);
  font-size: 1.3rem; font-weight: 700;
  letter-spacing: 3px;
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.nav-links { display: flex; gap: 4px; }
.nav-link {
  color: var(--text-dim); text-decoration: none;
  padding: 8px 16px; border-radius: 100px;
  font-size: 0.875rem; font-weight: 500;
  transition: all 0.3s;
}
.nav-link:hover, .nav-link.active {
  color: var(--text);
  background: rgba(255,255,255,0.06);
}

.glass-btn-small {
  border-radius: 100px; padding: 8px 20px;
  font-size: 0.875rem; font-weight: 600;
  color: var(--text); border: 1px solid var(--glass-border);
  transition: all 0.3s;
}
.glass-btn-small:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.2);
}

/* ===== SIDE NAV ===== */
.side-nav {
  position: fixed; right: 32px; top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex; flex-direction: column; gap: 12px;
}

.side-dot {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.6rem; font-weight: 600;
  color: var(--text-dim);
  transition: all 0.4s;
  position: relative;
}
.side-dot span { opacity: 0; transition: 0.3s; }
.side-dot:hover span, .side-dot.active span { opacity: 1; }
.side-dot.active {
  background: rgba(0,229,255,0.15);
  border-color: var(--cyan);
  color: var(--cyan);
  box-shadow: 0 0 20px rgba(0,229,255,0.3);
}
.side-dot::before {
  content: ''; position: absolute;
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor; opacity: 0.5;
  transition: 0.3s;
}
.side-dot.active::before { opacity: 0; }
.side-dot:hover { transform: scale(1.15); }

/* ===== SECTIONS ===== */
.section {
  min-height: 100vh;
  position: relative; z-index: 10;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 120px 60px 80px;
  gap: 60px;
}

.section-header { text-align: center; max-width: 600px; }
.section-tag { margin-bottom: 20px; color: var(--cyan); }
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800; line-height: 1.1;
  letter-spacing: -1px; margin-bottom: 16px;
}
.section-sub { color: var(--text-dim); font-size: 1.1rem; line-height: 1.6; }

.gradient-text {
  background: linear-gradient(135deg, var(--cyan) 0%, var(--purple) 50%, var(--pink) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ===== HERO ===== */
#hero {
  flex-direction: row;
  gap: 80px;
  padding-top: 140px;
}

.hero-content { flex: 1; max-width: 560px; }
.hero-badge { margin-bottom: 28px; color: var(--cyan); }
.badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 8px var(--cyan);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900; line-height: 1.05;
  letter-spacing: -2px; margin-bottom: 24px;
}
.title-line { display: block; }

.hero-sub {
  color: var(--text-dim); font-size: 1.15rem;
  line-height: 1.7; margin-bottom: 36px;
}

.hero-buttons { display: flex; gap: 14px; margin-bottom: 48px; flex-wrap: wrap; }

.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  color: #000; font-weight: 700; font-size: 0.95rem;
  border: none; border-radius: 100px;
  transition: all 0.3s;
  box-shadow: 0 4px 24px rgba(0,229,255,0.3);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 40px rgba(0,229,255,0.5);
}

.btn-glass {
  padding: 14px 28px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text); font-weight: 600; font-size: 0.95rem;
  border-radius: 100px; transition: all 0.3s;
}
.btn-glass:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.2);
}

.hero-clients { display: flex; flex-direction: column; gap: 12px; }
.clients-label { font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; }
.clients-logos { display: flex; gap: 10px; flex-wrap: wrap; }

/* Hero Visual */
.hero-visual {
  flex: 1; max-width: 520px;
  position: relative; height: 500px;
}

.glass-card-float {
  position: absolute;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
}

.card-main {
  width: 100%; height: 380px;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  padding: 0; overflow: hidden;
  animation: floatMain 6s ease-in-out infinite;
}
@keyframes floatMain {
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50% { transform: translate(-50%, -50%) translateY(-12px); }
}

.card-header-row {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.card-dots { display: flex; gap: 6px; }
.card-dots i {
  width: 10px; height: 10px; border-radius: 50%;
  display: block;
}
.card-dots i:nth-child(1) { background: #ff5f57; }
.card-dots i:nth-child(2) { background: #ffbd2e; }
.card-dots i:nth-child(3) { background: #28c840; }
.card-title-bar { font-size: 0.75rem; color: var(--text-dim); font-family: monospace; }

.card-body-mock { padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.mock-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.mock-stat { text-align: center; }
.mock-stat.accent { border-color: rgba(0,229,255,0.2); }
.mock-num {
  display: block; font-family: var(--font-display);
  font-size: 1.6rem; font-weight: 700;
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.mock-label { font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; }

.mock-graph {
  display: flex; align-items: flex-end; gap: 6px;
  height: 60px; padding: 0 4px;
}
.graph-bar {
  flex: 1; border-radius: 4px 4px 0 0;
  background: linear-gradient(to top, var(--cyan), var(--purple));
  height: var(--h); opacity: 0.7;
  animation: barGrow 1s ease-out calc(var(--d)) both;
}
@keyframes barGrow { from { height: 0; } }

.mock-users { display: flex; flex-direction: column; gap: 8px; }
.mock-user {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.8rem; color: var(--text-dim);
}
.avatar {
  width: 26px; height: 26px; border-radius: 50%;
}
.a1 { background: linear-gradient(135deg, #f97316, #ec4899); }
.a2 { background: linear-gradient(135deg, var(--cyan), var(--blue)); }
.a3 { background: linear-gradient(135deg, var(--purple), var(--pink)); }
.status-on, .status-idle {
  width: 7px; height: 7px; border-radius: 50%; margin-left: auto;
}
.status-on { background: #22c55e; box-shadow: 0 0 6px #22c55e; }
.status-idle { background: #f59e0b; }

.card-notification {
  bottom: 20px; right: -30px;
  padding: 14px 18px;
  display: flex; align-items: center; gap: 12px;
  animation: floatNotif 5s ease-in-out infinite;
  animation-delay: -2s;
  min-width: 220px;
}
@keyframes floatNotif {
  0%, 100% { transform: translateY(0) rotate(2deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}
.notif-icon { font-size: 1.5rem; }
.notif-text strong { display: block; font-size: 0.85rem; }
.notif-text span { font-size: 0.72rem; color: var(--text-dim); }

.card-badge-float {
  top: 20px; left: -20px;
  padding: 16px 22px; text-align: center;
  animation: floatBadge 7s ease-in-out infinite;
  animation-delay: -4s;
}
@keyframes floatBadge {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-15px) rotate(-3deg); }
}
.float-badge-num {
  display: block; font-family: var(--font-display);
  font-size: 1.8rem; font-weight: 800;
  background: linear-gradient(135deg, #22c55e, var(--cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.float-badge-label { font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; }

/* ===== FEATURES ===== */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; width: 100%; max-width: 1100px;
}

.feature-card {
  padding: 32px 28px;
  display: flex; flex-direction: column; gap: 14px;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.6s, transform 0.6s;
}
.feature-card.visible { opacity: 1; transform: translateY(0); }

.feature-icon {
  width: 52px; height: 52px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
}
.feature-icon svg { width: 24px; height: 24px; }
.fi-1 { background: rgba(0,229,255,0.1); color: var(--cyan); border: 1px solid rgba(0,229,255,0.2); }
.fi-2 { background: rgba(168,85,247,0.1); color: var(--purple); border: 1px solid rgba(168,85,247,0.2); }
.fi-3 { background: rgba(236,72,153,0.1); color: var(--pink); border: 1px solid rgba(236,72,153,
