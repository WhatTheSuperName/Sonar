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
.fi-3 { background: rgba(236,72,153,0.1); color: var(--pink); border: 1px solid rgba(236,72,153,0.2); }
.fi-4 { background: rgba(59,130,246,0.1); color: var(--blue); border: 1px solid rgba(59,130,246,0.2); }
.fi-5 { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.2); }
.fi-6 { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }

.feature-card h3 { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; }
.feature-card p { color: var(--text-dim); font-size: 0.9rem; line-height: 1.6; flex: 1; }
.feature-tag {
  display: inline-block; padding: 4px 12px;
  border-radius: 100px; font-size: 0.72rem; font-weight: 600;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-dim); width: fit-content;
}

/* ===== STATS ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; width: 100%; max-width: 1000px;
}
.stat-big { grid-column: span 3; }

.stat-card {
  padding: 32px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.stat-number {
  font-family: var(--font-display);
  font-size: 2.8rem; font-weight: 900;
  letter-spacing: -1px;
}
.stat-big .stat-number { font-size: 4.5rem; }
.stat-label { color: var(--text-dim); font-size: 0.9rem; }
.stat-bar {
  width: 100%; height: 3px; border-radius: 2px;
  background: rgba(255,255,255,0.06); margin-top: 8px; overflow: hidden;
}
.stat-bar-fill {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--purple));
  width: 0; transition: width 2s ease-out;
}
.stat-big.visible .stat-bar-fill { width: 100%; }

/* Live Ticker */
.live-ticker {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 24px; width: 100%; max-width: 1000px;
  overflow: hidden;
}
.ticker-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #ef4444; box-shadow: 0 0 8px #ef4444;
  animation: pulse 1.5s infinite; flex-shrink: 0;
}
.ticker-label {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 1px;
  color: #ef4444; flex-shrink: 0;
}
.ticker-track { overflow: hidden; flex: 1; }
.ticker-content {
  display: flex; gap: 40px; white-space: nowrap;
  animation: tickerScroll 30s linear infinite;
  font-size: 0.85rem; color: var(--text-dim);
}
@keyframes tickerScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ===== API SECTION ===== */
.api-layout {
  display: grid; grid-template-columns: 1.2fr 1fr;
  gap: 30px; width: 100%; max-width: 1100px; align-items: start;
}

.code-window { overflow: hidden; }
.code-header {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.code-dots { display: flex; gap: 6px; }
.cd-r, .cd-y, .cd-g { width: 11px; height: 11px; border-radius: 50%; display: block; }
.cd-r { background: #ff5f57; } .cd-y { background: #ffbd2e; } .cd-g { background: #28c840; }
.code-filename { font-size: 0.78rem; color: var(--text-dim); font-family: monospace; flex: 1; }
.code-copy {
  display: flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-dim); padding: 5px 12px; border-radius: 8px;
  font-size: 0.75rem; transition: 0.3s;
}
.code-copy:hover { background: rgba(255,255,255,0.1); color: var(--text); }

.code-body {
  padding: 22px; font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.82rem; line-height: 1.8; overflow-x: auto;
  color: #c9d8f0;
}
.c-kw { color: #c792ea; }
.c-str { color: #c3e88d; }
.c-com { color: #546e7a; font-style: italic; }
.c-fn { color: #82aaff; }
.c-num { color: #f78c6c; }

.api-info { display: flex; flex-direction: column; gap: 14px; }
.api-step {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 20px 22px;
}
.step-num {
  font-family: var(--font-display); font-size: 1.4rem; font-weight: 800;
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  flex-shrink: 0; line-height: 1;
}
.step-content h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 4px; }
.step-content p { font-size: 0.82rem; color: var(--text-dim); line-height: 1.5; }
.inline-code {
  display: inline-block; padding: 3px 10px;
  background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.15);
  border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: var(--cyan);
}

.platforms-row { display: flex; gap: 8px; flex-wrap: wrap; padding: 4px 0; }

/* ===== DOWNLOAD ===== */
#download { padding-bottom: 120px; }
.download-wrapper {
  display: flex; flex-direction: column; align-items: center;
  gap: 50px; width: 100%; position: relative;
}
.download-glow {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,255,0.08), transparent 70%);
  pointer-events: none;
}

.download-cards {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 20px; width: 100%; max-width: 900px;
}

.dl-card {
  padding: 36px 28px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  position: relative; overflow: hidden;
}
.dl-featured {
  border-color: rgba(0,229,255,0.2);
  box-shadow: 0 8px 40px rgba(0,229,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
}
.dl-popular {
  position: absolute; top: 16px; right: -28px;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  color: #000; font-size: 0.65rem; font-weight: 800;
  padding: 4px 36px; transform: rotate(45deg);
  letter-spacing: 1px;
}
.dl-icon { font-size: 2.5rem; }
.dl-card h3 { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; }
.dl-desc { color: var(--text-dim); font-size: 0.85rem; }
.dl-version { font-size: 0.75rem; color: var(--text-dim); font-family: monospace; }

.btn-download {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; border-radius: 100px;
  font-weight: 700; font-size: 0.9rem;
  border: none; transition: all 0.3s; width: 100%;
  justify-content: center; margin-top: 8px;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  color: #000;
  box-shadow: 0 4px 20px rgba(0,229,255,0.3);
}
.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 36px rgba(0,229,255,0.5);
}
.btn-dl-secondary {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text);
  box-shadow: none;
}
.btn-dl-secondary:hover {
  background: rgba(255,255,255,0.1);
  box-shadow: 0 4px 20px rgba(255,255,255,0.05);
}
.btn-download.loading {
  opacity: 0.7; pointer-events: none;
}

/* Signup Form */
.signup-form {
  padding: 36px 40px; width: 100%; max-width: 900px;
}
.signup-form h3 {
  font-family: var(--font-display); font-size: 1.2rem;
  font-weight: 700; margin-bottom: 24px; text-align: center;
}
.form-row { display: flex; gap: 14px; align-items: flex-end; flex-wrap: wrap; }
.form-group { flex: 1; min-width: 180px; display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 0.78rem; color: var(--text-dim); font-weight: 500; }
.glass-input {
  padding: 12px 16px; border-radius: 12px;
  color: var(--text); font-size: 0.9rem;
  outline: none; transition: all 0.3s;
  border: 1px solid rgba(255,255,255,0.08);
}
.glass-input:focus {
  border-color: rgba(0,229,255,0.4);
  box-shadow: 0 0 20px rgba(0,229,255,0.1);
}
.glass-input::placeholder { color: rgba(255,255,255,0.2); }
.form-submit { flex-shrink: 0; padding: 12px 24px; }

/* ===== FOOTER ===== */
.footer {
  position: relative; z-index: 10;
  border-radius: var(--radius) var(--radius) 0 0;
  border-bottom: none;
}
.footer-inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 40px; max-width: 1200px; margin: 0 auto; width: 100%;
}
.footer-logo { display: flex; flex-direction: column; gap: 4px; }
.footer-copy { font-size: 0.75rem; color: var(--text-dim); }
.footer-links { display: flex; gap: 24px; }
.footer-links a {
  color: var(--text-dim); text-decoration: none;
  font-size: 0.85rem; transition: 0.3s;
}
.footer-links a:hover { color: var(--text); }

/* ===== TOAST ===== */
.toast-container {
  position: fixed; bottom: 30px; left: 50%;
  transform: translateX(-50%);
  z-index: 9999; display: flex; flex-direction: column;
  gap: 10px; align-items: center;
}

.toast {
  padding: 14px 24px;
  background: rgba(20,20,30,0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,80,80,0.3);
  border-radius: 14px;
  font-size: 0.88rem; font-weight: 500;
  color: #ff8888;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  animation: toastIn 0.4s cubic-bezier(.175,.885,.32,1.275) both;
  display: flex; align-items: center; gap: 10px;
}
.toast.success { border-color: rgba(34,197,94,0.3); color: #66ffaa; }
@keyframes toastIn {
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ===== SCROLL ANIMATIONS ===== */
.reveal {
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.7s, transform 0.7s;
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .section { padding: 100px 24px 60px; }
  #hero { flex-direction: column; padding-top: 120px; }
  .hero-visual { max-width: 100%; height: 350px; }
  .features-grid { grid-template-columns: 1fr 1fr; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .stat-big { grid-column: span 2; }
  .api-layout { grid-template-columns: 1fr; }
  .download-cards { grid-template-columns: 1fr; max-width: 360px; }
  .nav-links { display: none; }
  .side-nav { display: none; }
  body { cursor: auto; }
  * { cursor: auto !important; }
  .cursor-glow { display: none; }
}

@media (max-width: 600px) {
  .features-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; }
  .stat-big { grid-column: span 1; }
  .form-row { flex-direction: column; }
  .hero-title { font-size: 2.5rem; }
}
