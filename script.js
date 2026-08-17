/* =============================================
   SONAR — Cosmic Black & White Edition
   Zero external dependencies
   ============================================= */
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --w:#ffffff;--w9:rgba(255,255,255,.9);--w6:rgba(255,255,255,.6);
  --w3:rgba(255,255,255,.3);--w1:rgba(255,255,255,.08);--w05:rgba(255,255,255,.04);
  --bg:#000000;--bg2:#060608;
  --glass:rgba(255,255,255,.03);--glass-b:rgba(255,255,255,.07);
  --blur:28px;--r:22px;--rs:14px;
  --f:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
}
html{scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.08) transparent}
body{font-family:var(--f);background:var(--bg);color:var(--w);overflow-x:hidden;cursor:none}
*{cursor:none!important}
a{color:inherit;text-decoration:none}

/* === CURSOR === */
.cursor{position:fixed;width:12px;height:12px;border-radius:50%;background:#fff;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .25s,height .25s}
.cursor.hover{width:40px;height:40px}
.cursor-trail{position:fixed;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.25);pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:left .15s ease-out,top .15s ease-out,width .3s,height .3s,border-color .3s}
.cursor-trail.hover{width:60px;height:60px;border-color:rgba(255,255,255,.5)}

/* === COSMOS CANVAS === */
#cosmos{position:fixed;inset:0;z-index:0;pointer-events:none}
.vignette{position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.7) 100%)}

/* === GLASS === */
.glass-card{background:var(--glass);backdrop-filter:blur(var(--blur));-webkit-backdrop-filter:blur(var(--blur));border:1px solid var(--glass-b);border-radius:var(--r);box-shadow:0 8px 40px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.04);transition:transform .4s cubic-bezier(.175,.885,.32,1.275),box-shadow .4s,border-color .4s}
.glass-card:hover{transform:translateY(-3px);box-shadow:0 16px 60px rgba(0,0,0,.7),0 0 30px rgba(255,255,255,.03),inset 0 1px 0 rgba(255,255,255,.07);border-color:rgba(255,255,255,.12)}

/* === NAVBAR === */
.navbar{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:16px 44px;background:rgba(0,0,0,.4);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.05);transition:all .4s}
.navbar.scrolled{padding:10px 44px;background:rgba(0,0,0,.75)}
.nav-logo{display:flex;align-items:center;gap:10px}
.logo-svg{width:34px;height:34px}
.logo-text{font-size:1.25rem;font-weight:800;letter-spacing:4px;color:#fff}
.nav-links{display:flex;gap:2px}
.nav-link{padding:8px 15px;border-radius:100px;font-size:.84rem;font-weight:500;color:var(--w6);transition:all .3s}
.nav-link:hover,.nav-link.active{color:#fff;background:rgba(255,255,255,.07)}
.nav-btn{padding:8px 22px;border-radius:100px;font-size:.84rem;font-weight:600;color:#fff;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(10px);transition:all .3s}
.nav-btn:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.25)}

/* === SIDE NAV === */
.side-nav{position:fixed;right:28px;top:50%;transform:translateY(-50%);z-index:999;display:flex;flex-direction:column;gap:14px}
.sdot{width:10px;height:10px;border-radius:50%;border:1.5px solid rgba(255,255,255,.2);background:transparent;transition:all .4s}
.sdot.active{background:#fff;border-color:#fff;box-shadow:0 0 12px rgba(255,255,255,.5);transform:scale(1.3)}
.sdot:hover{border-color:rgba(255,255,255,.6);transform:scale(1.2)}

/* === SECTIONS === */
.sec{min-height:100vh;position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 56px 80px;gap:56px}
.sec-head{text-align:center;max-width:620px}
.tag{display:inline-block;padding:5px 16px;border-radius:100px;font-size:.78rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--w6);border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);margin-bottom:18px}
.sec-title{font-size:clamp(2.4rem,5vw,3.8rem);font-weight:800;line-height:1.1;letter-spacing:-1px;margin-bottom:14px}
.sec-sub{color:var(--w6);font-size:1.05rem;line-height:1.65}
.outline-text{-webkit-text-stroke:1.5px rgba(255,255,255,.85);color:transparent;text-stroke:1.5px rgba(255,255,255,.85)}

/* === BUTTONS === */
.btn-white{display:inline-flex;align-items:center;gap:8px;padding:14px 30px;background:#fff;color:#000;font-weight:700;font-size:.92rem;border:none;border-radius:100px;transition:all .3s;box-shadow:0 4px 24px rgba(255,255,255,.15)}
.btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 40px rgba(255,255,255,.25)}
.btn-ghost{padding:14px 30px;background:transparent;color:#fff;font-weight:600;font-size:.92rem;border:1px solid rgba(255,255,255,.2);border-radius:100px;transition:all .3s}
.btn-ghost:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.4)}

/* === HERO === */
.hero-wrap{display:flex;align-items:center;gap:80px;width:100%;max-width:1200px}
.hero-left{flex:1;max-width:560px}
.badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:100px;font-size:.8rem;font-weight:500;color:var(--w6);border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);margin-bottom:28px}
.badge-dot{width:7px;height:7px;border-radius:50%;background:#fff;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 6px #fff}50%{opacity:.4;box-shadow:none}}
.hero-h1{font-size:clamp(3rem,6.5vw,5.2rem);font-weight:900;line-height:1.02;letter-spacing:-2px;margin-bottom:24px}
.hero-h1 .line{display:block}
.hero-p{color:var(--w6);font-size:1.12rem;line-height:1.7;margin-bottom:36px;max-width:480px}
.hero-btns{display:flex;gap:14px;margin-bottom:44px;flex-wrap:wrap}
.hero-partners{display:flex;flex-direction:column;gap:10px}
.partners-label{font-size:.72rem;color:var(--w3);text-transform:uppercase;letter-spacing:1.5px}
.partner-logos{display:flex;gap:12px}
.p-logo{padding:6px 16px;border-radius:100px;font-size:.8rem;font-weight:600;color:var(--w6);border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03)}

/* Hero Right */
.hero-right{flex:1;max-width:500px;position:relative;height:480px}
.hero-card-main{position:absolute;width:100%;height:370px;top:50%;left:50%;transform:translate(-50%,-50%);overflow:hidden;animation:floatA 6s ease-in-out infinite}
@keyframes floatA{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-10px)}}
.hc-header{display:flex;align-items:center;gap:7px;padding:13px 16px;border-bottom:1px solid rgba(255,255,255,.05)}
.d{width:9px;height:9px;border-radius:50%;display:block}
.d-r{background:#ff5f57}.d-y{background:#ffbd2e}.d-g{background:#28c840}
.hc-title{font-size:.72rem;color:var(--w3);font-family:'Consolas',monospace;margin-left:6px}
.hc-body{padding:16px;display:flex;flex-direction:column;gap:14px}
.hc-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.hc-stat{text-align:center;padding:14px;border-radius:var(--rs);background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05)}
.hc-num{display:block;font-size:1.5rem;font-weight:800;color:#fff}
.hc-lbl{font-size:.65rem;color:var(--w3);text-transform:uppercase;letter-spacing:.5px}
.hc-bars{display:flex;align-items:flex-end;gap:5px;height:55px}
.hbar{flex:1;border-radius:3px 3px 0 0;background:linear-gradient(to top,rgba(255,255,255,.15),rgba(255,255,255,.5));height:var(--h);animation:barUp .8s ease-out calc(var(--d)) both}
@keyframes barUp{from{height:0}}
.hc-users{display:flex;flex-direction:column;gap:7px}
.hc-u{display:flex;align-items:center;gap:9px;font-size:.78rem;color:var(--w6)}
.av{width:24px;height:24px;border-radius:50%;flex-shrink:0}
.av1{background:linear-gradient(135deg,#555,#999)}.av2{background:linear-gradient(135deg,#333,#777)}.av3{background:linear-gradient(135deg,#444,#888)}
.st-on,.st-idle{width:6px;height:6px;border-radius:50%;margin-left:auto}
.st-on{background:#4ade80;box-shadow:0 0 5px #4ade80}.st-idle{background:#facc15}

.hero-float{position:absolute;padding:12px 16px;display:flex;align-items:center;gap:10px}
.hf-notif{bottom:16px;right:-24px;animation:floatB 5s ease-in-out infinite;animation-delay:-2s;min-width:200px}
@keyframes floatB{0%,100%{transform:translateY(0) rotate(1.5deg)}50%{transform:translateY(-8px) rotate(1.5deg)}}
.hf-icon{font-size:1.4rem}
.hf-notif strong{display:block;font-size:.82rem;color:#fff}
.hf-notif small{font-size:.7rem;color:var(--w3)}
.hf-badge{top:16px;left:-16px;flex-direction:column;text-align:center;padding:14px 20px;animation:floatC 7s ease-in-out infinite;animation-delay:-4s}
@keyframes floatC{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-12px) rotate(-2deg)}}
.hf-big{font-size:1.7rem;font-weight:900;color:#fff}
.hf-sm{font-size:.65rem;color:var(--w3);letter-spacing:1.5px;text-transform:uppercase}

/* === FEATURES === */
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;width:100%;max-width:1100px}
.feat-card{padding:30px 26px;display:flex;flex-direction:column;gap:12px;opacity:0;transform:translateY(28px);transition:opacity .6s,transform .6s}
.feat-card.visible{opacity:1;transform:translateY(0)}
.feat-ico{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04)}
.feat-ico svg{width:22px;height:22px;color:#fff}
.fi1{border-color:rgba(255,255,255,.15)}.fi2{border-color:rgba(255,255,255,.12)}.fi3{border-color:rgba(255,255,255,.1)}.fi4{border-color:rgba(255,255,255,.12)}.fi5{border-color:rgba(255,255,255,.1)}.fi6{border-color:rgba(255,255,255,.08)}
.feat-card h3{font-size:1.1rem;font-weight:700;color:#fff}
.feat-card p{color:var(--w6);font-size:.88rem;line-height:1.6;flex:1}
.feat-tag{display:inline-block;padding:3px 11px;border-radius:100px;font-size:.7rem;font-weight:600;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);color:var(--w3);width:fit-content}

/* === UPLOAD === */
.upload-layout{display:grid;grid-template-columns:1.1fr 1fr;gap:24px;width:100%;max-width:1100px;align-items:start}
.upload-zone{padding:48px 36px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:14px;border:2px dashed rgba(255,255,255,.1);transition:border-color .3s}
.upload-zone:hover{border-color:rgba(255,255,255,.25)}
.uz-icon{color:var(--w3);margin-bottom:4px}
.upload-zone h3{font-size:1.15rem;font-weight:700;color:#fff}
.upload-zone p{color:var(--w6);font-size:.9rem}
.uz-formats{font-size:.75rem;color:var(--w3);font-family:'Consolas',monospace}
.uz-fake-input{margin-top:8px}
.uz-fake-input input{display:none}
.uz-btn{font-size:.88rem;padding:12px 28px}
.uz-progress{width:100%;max-width:320px;display:none;flex-direction:column;gap:6px;align-items:center;margin-top:8px}
.uz-progress.active{display:flex}
.uz-bar{width:100%;height:4px;border-radius:2px;background:rgba(255,255,255,.08);overflow:hidden}
.uz-fill{height:100%;width:0;background:#fff;border-radius:2px;transition:width .3s}
.uz-pct{font-size:.78rem;color:var(--w6);font-family:'Consolas',monospace}
.upload-steps{display:flex;flex-direction:column;gap:12px}
.ustep{display:flex;align-items:flex-start;gap:16px;padding:18px 20px}
.ustep-n{font-size:1.3rem;font-weight:900;color:rgba(255,255,255,.15);flex-shrink:0;line-height:1}
.ustep h4{font-size:.92rem;font-weight:700;color:#fff;margin-bottom:3px}
.ustep p{font-size:.8rem;color:var(--w6);line-height:1.5}

/* === CATALOG === */
.catalog-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;width:100%;max-width:1000px}
.game-card{overflow:hidden;display:flex;flex-direction:column}
.gc-big{grid-column:span 2;flex-direction:row}
.gc-big .gc-img{width:280px;min-height:200px;flex-shrink:0}
.gc-big .gc-info{flex:1}
.gc-img{height:160px;background-size:cover;background-position:center;position:relative}
.gc-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.8),transparent)}
.gc-img1{background:linear-gradient(135deg,#111,#1a1a2e,#16213e)}
.gc-img2{background:linear-gradient(135deg,#0a0a0a,#1a1a1a,#222)}
.gc-img3{background:linear-gradient(135deg,#0d0d0d,#1c1c2e,#111)}
.gc-img4{background:linear-gradient(135deg,#080808,#181828,#0f0f1f)}
.gc-img5{background:linear-gradient(135deg,#0b0b0b,#151520,#0a0a15)}
.gc-info{padding:18px 20px;display:flex;flex-direction:column;gap:6px;flex:1}
.gc-genre{font-size:.7rem;font-weight:600;color:var(--w3);text-transform:uppercase;letter-spacing:1px}
.gc-info h3{font-size:1.05rem;font-weight:700;color:#fff}
.gc-info p{font-size:.82rem;color:var(--w6);line-height:1.5}
.gc-meta{display:flex;gap:14px;font-size:.78rem;color:var(--w6);margin-top:auto}
.gc-free{color:#4ade80;font-weight:700}
.gc-play{margin:0 18px 18px;padding:10px;border-radius:12px;background:#fff;color:#000;font-weight:700;font-size:.85rem;border:none;transition:all .3s;text-align:center}
.gc-play:hover{box-shadow:0 4px 20px rgba(255,255,255,.2);transform:translateY(-1px)}
.gc-big .gc-play{margin:18px;max-width:200px}

/* === STATS === */
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;width:100%;max-width:1000px}
.stat-hero{grid-column:span 3}
.stat-card{padding:30px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.stat-num{font-size:2.6rem;font-weight:900;letter-spacing:-1px;color:#fff}
.stat-hero .stat-num{font-size:4.2rem}
.stat-lbl{color:var(--w6);font-size:.88rem}
.stat-bar{width:100%;height:2px;border-radius:1px;background:rgba(255,255,255,.06);margin-top:8px;overflow:hidden}
.stat-fill{height:100%;border-radius:1px;background:#fff;width:0;transition:width 2s ease-out}
.stat-hero.visible .stat-fill{width:100%}

.ticker{display:flex;align-items:center;gap:12px;padding:12px 22px;width:100%;max-width:1000px;overflow:hidden}
.ticker-dot{width:7px;height:7px;border-radius:50%;background:#ef4444;box-shadow:0 0 6px #ef4444;animation:pulse 1.5s infinite;flex-shrink:0}
.ticker-live{font-size:.68rem;font-weight:700;letter-spacing:1px;color:#ef4444;flex-shrink:0}
.ticker-track{overflow:hidden;flex:1}
.ticker-inner{display:flex;gap:36px;white-space:nowrap;animation:tScroll 28s linear infinite;font-size:.82rem;color:var(--w6)}
@keyframes tScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* === API === */
.api-layout{display:grid;grid-template-columns:1.2fr 1fr;gap:24px;width:100%;max-width:1100px;align-items:start}
.code-win{overflow:hidden}
.cw-head{display:flex;align-items:center;gap:10px;padding:13px 16px;border-bottom:1px solid rgba(255,255,255,.05)}
.cw-dots{display:flex;gap:5px}
.cd-r,.cd-y,.cd-g{width:10px;height:10px;border-radius:50%;display:block}
.cd-r{background:#ff5f57}.cd-y{background:#ffbd2e}.cd-g{background:#28c840}
.cw-file{font-size:.75rem;color:var(--w3);font-family:'Consolas',monospace;flex:1}
.cw-copy{display:flex;align-items:center;gap:4px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:var(--w3);padding:4px 10px;border-radius:7px;font-size:.72rem;transition:.3s}
.cw-copy:hover{background:rgba(255,255,255,.1);color:#fff}
.cw-body{padding:20px;font-family:'Consolas','Courier New',monospace;font-size:.8rem;line-height:1.8;overflow-x:auto;color:rgba(255,255,255,.7)}
.ck{color:rgba(255,255,255,.9);font-weight:600}.cs{color:rgba(255,255,255,.5)}.cc{color:rgba(255,255,255,.25);font-style:italic}.cf{color:rgba(255,255,255,.8)}.cn{color:rgba(255,255,255,.6)}
.api-steps{display:flex;flex-direction:column;gap:12px}
.astep{display:flex;align-items:flex-start;gap:14px;padding:18px 20px}
.astep-n{font-size:1.3rem;font-weight:900;color:rgba(255,255,255,.12);flex-shrink:0;line-height:1}
.astep h4{font-size:.9rem;font-weight:700;color:#fff;margin-bottom:3px}
.astep p{font-size:.8rem;color:var(--w6);line-height:1.5}
.icode{display:inline-block;padding:2px 9px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:5px;font-family:'Consolas',monospace;font-size:.78rem;color:var(--w9)}
.plat-row{display:flex;gap:7px;flex-wrap:wrap;padding:2px 0}
.pch{padding:4px 12px;border-radius:100px;font-size:.72rem;font-weight:500;color:var(--w3);border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.03)}

/* === DOWNLOAD === */
.dl-wrap{display:flex;flex-direction:column;align-items:center;gap:44px;width:100%;position:relative}
.dl-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;width:100%;max-width:900px}
.dl-card{padding:34px 26px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;position:relative;overflow:hidden}
.dl-feat{border-color:rgba(255,255,255,.15);box-shadow:0 8px 40px rgba(255,255,255,.04),inset 0 1px 0 rgba(255,255,255,.05)}
.dl-pop{position:absolute;top:14px;right:-26px;background:#fff;color:#000;font-size:.6rem;font-weight:800;padding:3px 32px;transform:rotate(45deg);letter-spacing:1px}
.dl-ico{font-size:2.2rem}
.dl-card h3{font-size:1.05rem;font-weight:700;color:#fff}
.dl-desc{color:var(--w6);font-size:.82rem}
.dl-ver{font-size:.72rem;color:var(--w3);font-family:'Consolas',monospace}
.btn-dl{display:inline-flex;align-items:center;gap:7px;padding:12px 24px;border-radius:100px;font-weight:700;font-size:.85rem;border:none;transition:all .3s;width:100%;justify-content:center;margin-top:6px;background:#fff;color:#000;box-shadow:0 4px 18px rgba(255,255,255,.12)}
.btn-dl:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(255,255,255,.2)}
.btn-dl-ghost{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;box-shadow:none}
.btn-dl-ghost:hover{background:rgba(255,255,255,.1);box-shadow:0 4px 16px rgba(255,255,255,.05)}
.btn-dl.loading{opacity:.6;pointer-events:none}
.signup{padding:32px 36px;width:100%;max-width:900px}
.signup h3{font-size:1.1rem;font-weight:700;margin-bottom:20px;text-align:center;color:#fff}
.form-row{display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap}
.fg{flex:1;min-width:170px;display:flex;flex-direction:column;gap:5px}
.fg label{font-size:.75rem;color:var(--w3);font-weight:500}
.ginput{padding:11px 15px;border-radius:11px;color:#fff;font-size:.88rem;outline:none;transition:all .3s;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.04);backdrop-filter:blur(10px)}
.ginput:focus{border-color:rgba(255,255,255,.25);box-shadow:0 0 16px rgba(255,255,255,.06)}
.ginput::placeholder{color:rgba(255,255,255,.18)}
.form-btn{flex-shrink:0;padding:11px 22px;font-size:.88rem}

/* === FOOTER === */
.footer{position:relative;z-index:10;border-top:1px solid rgba(255,255,255,.06);background:rgba(0,0,0,.5);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.footer-top{display:flex;justify-content:space-between;gap:40px;padding:48px 56px 32px;max-width:1200px;margin:0 auto;flex-wrap:wrap}
.footer-brand{max-width:320px}
.footer-brand .logo-text{font-size:1.4rem;display:block;margin-bottom:12px}
.footer-about{font-size:.85rem;color:var(--w6);line-height:1.6;margin-bottom:16px}
.rebrand-badge{display:inline-block;padding:6px 14px;border-radius:8px;font-size:.78rem;color:var(--w6);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)}
.rebrand-badge strong{color:#fff}
.footer-cols{display:flex;gap:48px;flex-wrap:wrap}
.fcol{display:flex;flex-direction:column;gap:8px}
.fcol h4{font-size:.82rem;font-weight:700;color:#fff;margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px}
.fcol a{font-size:.84rem;color:var(--w6);transition:.3s}
.fcol a:hover{color:#fff}
.footer-partners{display:flex;align-items:center;gap:20px;padding:20px 56px;border-top:1px solid rgba(255,255,255,.05);max-width:1200px;margin:0 auto;flex-wrap:wrap}
.fp-label{font-size:.72rem;color:var(--w3);text-transform:uppercase;letter-spacing:1px}
.fp-logos{display:flex;gap:20px}
.fp-logo{display:flex;align-items:center;gap:7px;font-size:.88rem;font-weight:600;color:var(--w6);transition:.3s}
.fp-logo:hover{color:#fff}
.fp-logo svg{opacity:.6}
.footer-bottom{display:flex;justify-content:space-between;align-items:center;padding:18px 56px;border-top:1px solid rgba(255,255,255,.04);max-width:1200px;margin:0 auto;font-size:.78rem;color:var(--w3);flex-wrap:wrap;gap:8px}
.footer-rebrand-sm{font-style:italic;color:rgba(255,255,255,.2)}

/* === TOAST === */
.toast-box{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:99999;display:flex;flex-direction:column;gap:8px;align-items:center}
.toast{padding:13px 22px;background:rgba(10,10,10,.9);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.1);border-radius:12px;font-size:.85rem;font-weight:500;color:rgba(255,255,255,.7);box-shadow:0 8px 32px rgba(0,0,0,.6);animation:tIn .4s cubic-bezier(.175,.885,.32,1.275) both}
@keyframes tIn{from{opacity:0;transform:translateY(16px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}

/* === RESPONSIVE === */
@media(max-width:900px){
  .sec{padding:100px 22px 60px}
  .hero-wrap{flex-direction:column;gap:40px}
  .hero-right{max-width:100%;height:340px}
  .feat-grid{grid-template-columns:1fr 1fr}
  .stats-grid{grid-template-columns:1fr 1fr}
  .stat-hero{grid-column:span 2}
  .upload-layout,.api-layout{grid-template-columns:1fr}
  .dl-cards{grid-template-columns:1fr;max-width:340px}
  .catalog-grid{grid-template-columns:1fr}
  .gc-big{flex-direction:column}
  .gc-big .gc-img{width:100%;min-height:160px}
  .nav-links{display:none}
  .side-nav{display:none}
  body{cursor:auto}*{cursor:auto!important}
  .cursor,.cursor-trail{display:none}
  .footer-top{flex-direction:column}
  .footer-cols{gap:28px}
}
@media(max-width:600px){
  .feat-grid,.stats-grid{grid-template-columns:1fr}
  .stat-hero{grid-column:span 1}
  .form-row{flex-direction:column}
  .hero-h1{font-size:2.6rem}
  .footer-partners,.footer-bottom{flex-direction:column;align-items:flex-start}
}
