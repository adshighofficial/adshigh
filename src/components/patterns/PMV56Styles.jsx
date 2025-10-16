import React from "react";

export default function PMV56Styles() {
  return (
    <style>{`

        /* —— Cam/holografik görünüm —— */
.pmv56{
  --ink:#e9e9ef; --ink-muted:#c6c9e9;
  --panel: var(--popup-bg, #13133a);
  --field: var(--popup-field, #0e0f30);
  --line:  var(--popup-line, rgba(255,255,255,.14));
  --line2: var(--popup-line-2, rgba(255,255,255,.10));
  --g1: var(--popup-grad-1,#7C3AED);
  --g2: var(--popup-grad-2,#A855F7);
  --radius:16px;
  color:var(--ink);
  background: transparent;
  font-family: Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
}
.pmv56 .container{ width:min(1200px,93vw); margin:0 auto }
.pmv56 .reveal{ opacity:0; transform:translateY(26px); transition:opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1)}
.pmv56 .reveal.in{ opacity:1; transform:none }

/* HERO */
.pmv56 .hero{
  position:relative; padding:86px 0 72px; overflow:hidden;
  border-bottom:1px solid var(--line);
  background:
    radial-gradient(900px 320px at 50% -220px, color-mix(in srgb, var(--g1) 22%, transparent), transparent 70%),
    var(--popup-bg,#13133a);
}
.pmv56 .hero .container{ position:relative; z-index:2; text-align:left }
.pmv56 .hero .breadcrumb, .pmv56 .hero h1, .pmv56 .hero .lede{ color:#fff }
.pmv56 .hero .hero-grad{
  position:absolute; inset:0; opacity:0; background-size:200% 200%;
  animation:pan 12s ease-in-out infinite; mix-blend-mode:screen;
}
@keyframes pan{ 0%{ background-position:0% 50% } 50%{ background-position:100% 50% } 100%{ background-position:0% 50% } }
.pmv56 .breadcrumb{ font-size:14px; margin-bottom:8px; opacity:.9 }
.pmv56 h1{ margin:6px 0 12px; font:900 clamp(38px,6vw,58px)/1.08 Inter; letter-spacing:-.8px }
.pmv56 .lede{ max-width:85ch; font-size:17px; margin:0; color:var(--ink-muted) }
.pmv56 .actions{ display:flex; gap:12px; margin-top:26px }
.pmv56 .btn{
  height:48px; padding:0 22px; border-radius:12px; font-weight:800; letter-spacing:.2px;
  background:linear-gradient(135deg,var(--g1),var(--g2)); border:0; color:#fff;
  box-shadow:0 10px 30px rgba(124,58,237,.22); transition:transform .18s ease, box-shadow .18s ease;
}
.pmv56 .btn:hover{ transform:translateY(-2px); box-shadow:0 14px 36px rgba(124,58,237,.30) }
.pmv56 .btn.ghost{
  background:transparent; border:1px solid rgba(255,255,255,.22); color:#fff; box-shadow:none;
}

/* SECTIONS */
.pmv56 .section{
  padding:92px 0; border-bottom:1px solid var(--line);
  background: color-mix(in srgb, var(--panel) 92%, #0b0f2d 8%);
}
.pmv56 h2{
  margin:0 0 12px; font:900 clamp(28px,4.5vw,42px)/1.18 Inter; text-align:center; letter-spacing:-.5px; color:#EEF2FF;
}
.pmv56 .subheader{ max-width:85ch; margin:0 auto 56px; text-align:center; color:var(--ink-muted); font-size:15.5px }

/* USP/LIST kartları – cam */
.pmv56 .list-grid, .pmv56 .usp-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:18px }
.pmv56 .list-card, .pmv56 .usp-card{
  padding:20px; border-radius:14px; background: rgba(255,255,255,.04);
  border:1px solid var(--line2); box-shadow: 0 10px 28px rgba(0,0,0,.26), inset 0 0 0 1px rgba(255,255,255,.05);
  backdrop-filter: blur(6px);
}
.pmv56 .list-card h3, .pmv56 .usp-card h3{ margin:0 0 6px; font-size:17px; font-weight:800; color:#EAF0FF }
.pmv56 .list-card p, .pmv56 .usp-card p{ margin:0; font-size:13.5px; color:var(--ink-muted); white-space:pre-line }

/* WHY-US bandı – koyu cam panel */
.pmv56 .why-us-section{
  padding:82px 0; background: linear-gradient(180deg, #141a2e, #0f1626);
  border-top:1px solid var(--line2); border-bottom:1px solid var(--line2);
}
.pmv56 .why-us-content{ display:grid; grid-template-columns:1.08fr .92fr; gap:32px; align-items:center }
.pmv56 .why-us-content.reverse{ grid-template-columns:.92fr 1.08fr }
.pmv56 .why-us-section h2{ color:#fff; text-align:left; margin-bottom:10px }
.pmv56 .why-us-content p{ font-size:15.5px; line-height:1.7; color:rgba(255,255,255,.88) }

/* Cam animasyon paneli (telefon + metrik) */
.pmv56 .why-us-image{
  position:relative; min-height:320px; border-radius:16px;
  background:
    radial-gradient(600px 260px at 80% -40%, rgba(124,58,237,.20), transparent 70%),
    radial-gradient(600px 260px at 0% 120%, rgba(34,211,238,.12), transparent 70%),
    rgba(19, 25, 46, .76);
  border:1px solid rgba(255,255,255,.12);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.05), 0 14px 34px rgba(0,0,0,.35);
  backdrop-filter: blur(6px); overflow:hidden;
}

/* Telefon */
.pmv56 .ad-phone{ position:absolute; left:22px; top:22px; width:190px; height:272px; border-radius:22px; background:#0B0F1E; box-shadow:inset 0 0 0 2px rgba(255,255,255,.08), 0 14px 28px rgba(0,0,0,.35); overflow:hidden }
.pmv56 .ad-notch{ position:absolute; left:50%; transform:translateX(-50%); top:0; width:90px; height:16px; background:#0B0F1E; border-bottom-left-radius:10px; border-bottom-right-radius:10px }
.pmv56 .ad-slider{ position:absolute; inset:10px 10px; border-radius:14px; overflow:hidden; background:#111827 }
.pmv56 .ad-track{ position:absolute; left:0; top:0; right:0; height:300%; animation:adscroll 9s linear infinite }
@keyframes adscroll{ 0%{transform:translateY(0)} 33%{transform:translateY(-33.333%)} 66%{transform:translateY(-66.666%)} 100%{transform:translateY(-100%)} }
.pmv56 .ad-slide{ height:33.333%; display:grid; place-items:center; padding:12px; color:#fff; position:relative }
.pmv56 .ad-tag{ position:absolute; right:12px; top:12px; background:#fff; color:#0B0F1E; font-weight:900; font-size:10.5px; padding:6px 10px; border-radius:999px }

/* Metrik kutuları */
.pmv56 .metric-row{ position:absolute; right:18px; bottom:18px; display:grid; gap:10px; width:calc(100% - 230px); grid-template-columns:repeat(3,1fr) }
.pmv56 .metric{ background:rgba(255,255,255,.10); border:1px solid rgba(255,255,255,.18); border-radius:12px; padding:12px; color:#fff; backdrop-filter:blur(4px) }
.pmv56 .metric h4{ margin:0 0 6px; font-size:12px; letter-spacing:.4px; opacity:.85 }
.pmv56 .metric strong{ font-size:20px }

/* Süreç alanı – timeline (eski) */
.pmv56 .process-content-wrapper{ display:grid; grid-template-columns:1fr .9fr; gap:38px; max-width:1200px; margin:0 auto; align-items:start }
.pmv56 .process-list{ display:grid; grid-template-columns:repeat(2,1fr); gap:16px }
.pmv56 .process-step{
  padding:18px; border-radius:14px;
  background: rgba(255,255,255,.04); border:1px solid var(--line2);
  box-shadow: 0 8px 22px rgba(0,0,0,.28), inset 0 0 0 1px rgba(255,255,255,.05);
  backdrop-filter: blur(6px);
}
.pmv56 .step-header-group{ display:flex; align-items:center; gap:10px; margin-bottom:6px }
.pmv56 .step-number-tag{ background:linear-gradient(135deg,var(--g1),var(--g2)); color:#fff; padding:4px 9px; border-radius:6px; font-weight:900; font-size:12px }
.pmv56 .step-title{ font-size:16px; font-weight:800; color:#EAF0FF }
.pmv56 .process-animation-area{
  position:relative; border-radius:16px; min-height:360px;
  background: radial-gradient(800px 400px at 20% -10%, rgba(255,255,255,.10), transparent 40%), radial-gradient(1000px 500px at 120% 120%, rgba(255,255,255,.10), transparent 45%), linear-gradient(135deg,var(--g1),var(--g2));
  color:#fff; font-weight:800; font-size:18px; padding:24px; box-shadow:0 10px 34px rgba(0,0,0,.28); overflow:hidden
}
.pmv56 .tl-wrap{ position:absolute; inset:0; padding:24px }
.pmv56 .kpi{ position:absolute; bottom:24px; left:24px; right:24px; display:flex; gap:10px }
.pmv56 .kpi .bar{ flex:1; height:10px; border-radius:8px; background:rgba(255,255,255,.18); overflow:hidden }
.pmv56 .kpi .bar::after{ content:""; display:block; height:100%; width:0%; background:#fff; animation:grow 3.2s ease-in-out infinite }
.pmv56 .kpi .bar:nth-child(2)::after{ animation-delay:.45s }
.pmv56 .kpi .bar:nth-child(3)::after{ animation-delay:.9s }
@keyframes grow{ 0%,100%{ width:28% } 50%{ width:92% } }
.pmv56 .runner{ position:absolute; top:92px; left:24px; right:24px; height:18px }
.pmv56 .runner .dot{ position:absolute; top:0; width:18px; height:18px; border-radius:50%; background:#fff; box-shadow:0 8px 24px rgba(0,0,0,.25); animation:run 7s cubic-bezier(.65,.05,.36,1) infinite }
.pmv56 .runner .trail{ position:absolute; top:8px; left:0; right:0; height:2px; background:linear-gradient(90deg, rgba(255,255,255,.0), rgba(255,255,255,.9), rgba(255,255,255,.0)); opacity:.7 }
@keyframes run{ 0%{ left:0% } 45%{ left:92% } 50%{ left:92% } 95%{ left:0% } 100%{ left:0% } }
.pmv56 .labels{ position:absolute; top:120px; left:24px; right:24px; display:flex; justify-content:space-between; font-size:11px; font-weight:900; letter-spacing:.2px; opacity:.92 }
.pmv56 .labels span{ background:rgba(255,255,255,.15); padding:6px 10px; border-radius:8px; backdrop-filter:blur(2px) }

/* CTA kartı */
.pmv56 .final-cta-section{
  padding:68px 0; background: color-mix(in srgb, var(--panel) 92%, #0b0f2d 8%); border-top:1px solid var(--line); border-bottom:1px solid var(--line);
  text-align:center
}
.pmv56 .cta-form-card{
  background: rgba(255,255,255,.04); color:#fff; padding:24px; border-radius:16px; max-width:420px; margin:0 auto;
  border:1px solid var(--line2); box-shadow:0 10px 34px rgba(0,0,0,.30); backdrop-filter: blur(6px)
}
.pmv56 .cta-form-card h3{ font-size:26px; margin:0 0 8px; font-weight:900 }
.pmv56 .cta-form-card p{ font-size:14.5px; color:var(--ink-muted); margin:0 0 16px }
.pmv56 .cta-form-card input{ width:100%; height:44px; padding:0 14px; border-radius:10px; border:1px solid rgba(255,255,255,.18); background:var(--field); color:#fff; font-size:14.5px; margin-bottom:12px }

/* Tablet (≤ 992px) */
@media (max-width: 992px){
  .pmv56 .container{ width:min(1160px,92vw) }
  .pmv56 .section{ padding:78px 0 }
  .pmv56 .why-us-content{ grid-template-columns:1fr; gap:22px }
  .pmv56 .process-content-wrapper{ grid-template-columns:1fr; gap:26px }
  .pmv56 .process-list{ grid-template-columns:1fr 1fr }
  .pmv56 .why-us-image{ min-height:280px }
  .pmv56 .ad-phone{ position:static; margin:10px auto 0; width:180px; height:258px }
  .pmv56 .metric-row{ position:static; width:auto; grid-template-columns:repeat(3,1fr); margin:14px 0 0 }
}

/* Mobile (≤ 640px) */
@media (max-width: 640px){
  .pmv56 .hero{ padding:56px 0 36px }
  .pmv56 h1{ font:900 clamp(26px,8.5vw,34px)/1.12 Inter; letter-spacing:-.4px }
  .pmv56 .lede{ font-size:14.5px }
  .pmv56 .actions{ flex-direction:column; align-items:stretch; gap:10px; margin-top:16px }
  .pmv56 .actions .btn{ height:44px; padding:0 18px }

  .pmv56 .section{ padding:56px 0 }
  .pmv56 .usp-grid{ grid-template-columns:1fr; gap:12px }
  .pmv56 .usp-card{ padding:16px }

  .pmv56 .why-us-section{ padding:56px 0 }
  .pmv56 .why-us-content{ grid-template-columns:1fr; gap:14px }
  .pmv56 .why-us-section h2{ font-size:22px; text-align:left }
  .pmv56 .why-us-content p{ font-size:14.5px }
  .pmv56 .why-us-image{ min-height:220px; border-radius:12px }
  .pmv56 .ad-phone{ width:150px; height:220px; border-radius:18px }
  .pmv56 .ad-notch{ width:70px; height:14px }
  .pmv56 .metric-row{ grid-template-columns:1fr 1fr; gap:8px; margin:12px }
  .pmv56 .metric{ padding:10px; border-radius:10px }
  .pmv56 .metric h4{ font-size:11px }
  .pmv56 .metric strong{ font-size:16px }

  .pmv56 .process-list{ grid-template-columns:1fr; gap:12px }
  .pmv56 .process-step{ padding:14px; border-radius:12px }
  .pmv56 .step-number-tag{ font-size:12px; padding:3px 8px }
  .pmv56 .step-title{ font-size:16px }
  .pmv56 .process-animation-area{ min-height:260px; font-size:16px; padding:18px; border-radius:12px }
  .pmv56 .tl-wrap{ padding:18px }
  .pmv56 .runner{ top:74px }
  .pmv56 .runner .dot{ width:14px; height:14px }
  .pmv56 .runner .trail{ top:6px }
  .pmv56 .labels{ top:104px; font-size:10.5px }
  .pmv56 .labels span{ padding:5px 8px; border-radius:7px }
  .pmv56 .kpi{ bottom:18px; left:18px; right:18px; gap:10px }
  .pmv56 .kpi .bar{ height:8px }

  .pmv56 .final-cta-section{ padding:48px 0 }
  .pmv56 .cta-form-card{ max-width:94vw; padding:20px; border-radius:12px }
  .pmv56 .cta-form-card h3{ font-size:22px }
  .pmv56 .cta-form-card p{ font-size:14px; margin-bottom:14px }
  .pmv56 .cta-form-card input{ height:42px; font-size:14px }
}

/* Hareket azaltma */
@media (prefers-reduced-motion: reduce){
  .pmv56 .hero .hero-grad, .pmv56 .ad-track, .pmv56 .runner .dot{ animation:none !important }
}
/* ====== LIST (ALT TASARIM) ====== */
.pmv56 .usp-grid.look-accent{
  gap:20px;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
}

.pmv56 .usp-grid.look-accent .usp-card{
  position:relative;
  padding:22px 18px 18px 18px;
  border-radius:16px;
  background:#0c1127;               /* anasayfadan daha koyu */
  border:1px solid rgba(148,163,255,.14);
  box-shadow:
    inset 0 0 0 1px rgba(124,58,237,.08),
    0 10px 28px rgba(2,6,23,.35);
  transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;
  overflow:hidden;
}
.pmv56 .usp-grid.look-accent .usp-card::before{
  content:"";
  position:absolute; inset:-1px; border-radius:16px;
  background:
    conic-gradient(from 140deg,
      rgba(124,58,237,.5),
      rgba(99,102,241,.4),
      rgba(34,211,238,.35),
      rgba(124,58,237,.5));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  padding:1px; opacity:.22; pointer-events:none;
  filter: blur(.2px);
}
.pmv56 .usp-grid.look-accent .usp-card:hover{
  transform: translateY(-3px);
  box-shadow:
    inset 0 0 0 1px rgba(124,58,237,.10),
    0 18px 40px rgba(2,6,23,.42);
  border-color: rgba(148,163,255,.28);
}
.pmv56 .usp-grid.look-accent .usp-card h3{
  margin:0 0 6px; font-size:16.5px; font-weight:900; color:#eaf0ff;
}
.pmv56 .usp-grid.look-accent .usp-card p{
  margin:0; font-size:13.6px; color:var(--ink-muted); white-space:pre-line;
}
.pmv56 .usp-grid.look-accent .usp-card .badge-num{
  position:absolute; top:12px; right:12px;
  display:inline-grid; place-items:center;
  width:28px; height:28px; border-radius:999px;
  font: 900 12px/1 Inter; color:#0b0f1e; letter-spacing:.2px;
  background:linear-gradient(135deg,var(--g1),var(--g2));
  box-shadow:0 8px 18px rgba(124,58,237,.28);
}

/* Kompakt “chips” görünümü (isteğe bağlı) */
.pmv56 .usp-grid.look-chips{ grid-template-columns:1fr; gap:12px }
.pmv56 .usp-grid.look-chips .usp-card{
  border-radius:999px; padding:12px 16px; background:rgba(255,255,255,.05);
}
.pmv56 .usp-grid.look-chips .usp-card .badge-num{ display:none }
.pmv56 .usp-grid.look-chips .usp-card h3{ font-size:14.5px; margin:0 }
.pmv56 .usp-grid.look-chips .usp-card p{ display:none }
/* ==== ALT TASARIM: Accent kutular ==== */
.pmv56 .usp-grid.look-accent,
.pmv56 section[data-look="accent"] .usp-grid{
  gap:20px;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
}

.pmv56 .usp-grid.look-accent .usp-card,
.pmv56 section[data-look="accent"] .usp-grid .usp-card{
  position:relative;
  padding:22px 18px 18px 18px;
  border-radius:16px;
  background:#0c1127 !important;
  border:1px solid rgba(148,163,255,.14) !important;
  box-shadow: inset 0 0 0 1px rgba(124,58,237,.08), 0 10px 28px rgba(2,6,23,.35) !important;
  transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;
  overflow:hidden;
}
.pmv56 .usp-grid.look-accent .usp-card::before,
.pmv56 section[data-look="accent"] .usp-grid .usp-card::before{
  content:"";
  position:absolute; inset:-1px; border-radius:16px; padding:1px;
  background: conic-gradient(from 140deg, rgba(124,58,237,.5), rgba(99,102,241,.4), rgba(34,211,238,.35), rgba(124,58,237,.5));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite: exclude;
  opacity:.22; pointer-events:none; filter:blur(.2px);
}
.pmv56 .usp-grid.look-accent .usp-card:hover,
.pmv56 section[data-look="accent"] .usp-grid .usp-card:hover{
  transform: translateY(-3px);
  box-shadow: inset 0 0 0 1px rgba(124,58,237,.10), 0 18px 40px rgba(2,6,23,.42) !important;
  border-color: rgba(148,163,255,.28) !important;
}
.pmv56 .usp-grid.look-accent .usp-card h3,
.pmv56 section[data-look="accent"] .usp-grid .usp-card h3{
  margin:0 0 6px; font-size:16.5px; font-weight:900; color:#eaf0ff;
}
.pmv56 .usp-grid.look-accent .usp-card p,
.pmv56 section[data-look="accent"] .usp-grid .usp-card p{
  margin:0; font-size:13.6px; color:var(--ink-muted); white-space:pre-line;
}
.pmv56 .usp-grid.look-accent .usp-card .badge-num,
.pmv56 section[data-look="accent"] .usp-grid .usp-card .badge-num{
  position:absolute; top:12px; right:12px;
  display:inline-grid; place-items:center;
  width:28px; height:28px; border-radius:999px;
  font: 900 12px/1 Inter; color:#0b0f1e;
  background:linear-gradient(135deg,var(--g1),var(--g2));
  box-shadow:0 8px 18px rgba(124,58,237,.28);
}

/* ===== look: stripe ===== */
.pmv56 .usp-grid.look-stripe{gap:20px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.pmv56 .usp-grid.look-stripe .usp-card{
  position:relative;padding:20px 18px 18px 18px;border-radius:14px;
  background:#0b0f1e;border:1px solid rgba(148,163,255,.12);
  box-shadow:0 10px 24px rgba(2,6,23,.35);transition:transform .18s ease, box-shadow .18s ease
}
.pmv56 .usp-grid.look-stripe .usp-card::before{
  content:"";position:absolute;left:-1px;top:-1px;bottom:-1px;width:6px;border-top-left-radius:14px;border-bottom-left-radius:14px;
  background:linear-gradient(180deg,var(--g1),var(--g2))
}
.pmv56 .usp-grid.look-stripe .usp-card:hover{transform:translateY(-3px);box-shadow:0 18px 38px rgba(2,6,23,.45)}
.pmv56 .usp-grid.look-stripe .usp-card h3{margin:0 0 6px;font-weight:900;color:#eaf0ff}
.pmv56 .usp-grid.look-stripe .usp-card p{margin:0;color:var(--ink-muted);font-size:13.6px;white-space:pre-line}
.pmv56 .usp-grid.look-stripe .usp-card .badge-num{display:none}

/* ===== look: neo ===== */
.pmv56 .usp-grid.look-neo{gap:18px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
.pmv56 .usp-grid.look-neo .usp-card{
  padding:20px;border-radius:18px;background:#0f152b;border:1px solid rgba(255,255,255,.06);
  box-shadow: 10px 10px 24px rgba(2,6,23,.6), -8px -8px 18px rgba(255,255,255,.03) inset;
  transition:transform .18s ease, box-shadow .18s ease
}
.pmv56 .usp-grid.look-neo .usp-card:hover{
  transform:translateY(-3px);
  box-shadow: 14px 14px 30px rgba(2,6,23,.66), -10px -10px 20px rgba(255,255,255,.035) inset
}
.pmv56 .usp-grid.look-neo .usp-card h3{margin:0 0 6px;font-weight:900;color:#eaf0ff}
.pmv56 .usp-grid.look-neo .usp-card p{margin:0;color:var(--ink-muted);font-size:13.6px;white-space:pre-line}

/* ===== look: vivid ===== */
.pmv56 .usp-grid.look-vivid {
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.pmv56 .usp-grid.look-vivid .usp-card {
  position: relative;
  padding: 22px 20px;
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(45,55,100,0.9), rgba(25,30,60,0.9));
  border: 1px solid rgba(180, 200, 255, 0.15);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3),
              inset 0 0 8px rgba(120, 150, 255, 0.08);
  transition: all 0.25s ease;
  overflow: hidden;
}
.pmv56 .usp-grid.look-vivid .usp-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(99,102,241,0.15));
  opacity: 0;
  transition: opacity 0.3s ease;
}
.pmv56 .usp-grid.look-vivid .usp-card:hover::before { opacity: 1; }
.pmv56 .usp-grid.look-vivid .usp-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 10px 26px rgba(0,0,0,0.45),
              0 0 20px rgba(99,102,241,0.25);
  border-color: rgba(180,200,255,0.35);
}
.pmv56 .usp-grid.look-vivid .usp-card h3 {
  margin: 0 0 8px;
  font-size: 16.5px;
  font-weight: 900;
  color: #f4f7ff;
  letter-spacing: 0.2px;
}
.pmv56 .usp-grid.look-vivid .usp-card p {
  margin: 0;
  font-size: 13.6px;
  line-height: 1.5;
  color: rgba(230,235,255,0.85);
}
.pmv56 .usp-grid.look-vivid .usp-card .badge-num {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  font: 900 12px/1 Inter;
  color: #0b0f1e;
  background: linear-gradient(135deg, var(--g1), var(--g2));
  box-shadow: 0 6px 16px rgba(124,58,237,0.35);
}

/* ===== look: vivid-clean (no numbers) ===== */
.pmv56 .usp-grid.look-vivid-clean {
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.pmv56 .usp-grid.look-vivid-clean .usp-card {
  position: relative;
  padding: 24px 22px;
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(50,60,110,0.9), rgba(25,30,55,0.9));
  border: 1px solid rgba(180,200,255,0.15);
  box-shadow: 0 6px 14px rgba(0,0,0,0.32),
              inset 0 0 8px rgba(120,150,255,0.08);
  transition: all 0.25s ease;
  overflow: hidden;
}
.pmv56 .usp-grid.look-vivid-clean .usp-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(99,102,241,0.15));
  opacity: 0;
  transition: opacity 0.3s ease;
}
.pmv56 .usp-grid.look-vivid-clean .usp-card:hover::before { opacity: 1; }
.pmv56 .usp-grid.look-vivid-clean .usp-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 10px 26px rgba(0,0,0,0.45),
              0 0 20px rgba(99,102,241,0.25);
  border-color: rgba(180,200,255,0.35);
}
.pmv56 .usp-grid.look-vivid-clean .usp-card h3 {
  margin: 0 0 8px;
  font-size: 16.5px;
  font-weight: 900;
  color: #f4f7ff;
  letter-spacing: 0.2px;
}
.pmv56 .usp-grid.look-vivid-clean .usp-card p {
  margin: 0;
  font-size: 13.6px;
  line-height: 1.55;
  color: rgba(230,235,255,0.86);
}
.pmv56 .usp-grid.look-vivid-clean .usp-card .badge-num { display: none !important; }

/* ===== look: onair (Ads On Air tarzı, koyu tema uyumlu) ===== */
.pmv56 .usp-grid.look-onair{
  grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
  gap: 16px;
}
.pmv56 .usp-grid.look-onair .usp-card{
  position: relative;
  border-radius: 14px;
  padding: 16px 16px 14px 16px;
  background: linear-gradient(180deg, rgba(14,18,40,.82), rgba(12,16,34,.88));
  border: 1px solid rgba(148,163,255,.14);
  box-shadow:
    0 6px 16px rgba(2,6,23,.35),
    inset 0 0 0 1px rgba(124,58,237,.06);
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
  overflow: hidden;
}
.pmv56 .usp-grid.look-onair .usp-card:hover{
  transform: translateY(-2px);
  border-color: rgba(148,163,255,.22);
  box-shadow:
    0 12px 26px rgba(2,6,23,.45),
    inset 0 0 0 1px rgba(124,58,237,.10);
}
.pmv56 .usp-grid.look-onair .usp-card .toprow{ display:flex; align-items:center; gap:10px; margin-bottom:8px; }
.pmv56 .usp-grid.look-onair .usp-card .card-icon{
  width:18px; height:18px; flex:0 0 18px; border-radius:4px; 
  background: rgba(255,255,255,.08);
  display:grid; place-items:center; overflow:hidden;
}
.pmv56 .usp-grid.look-onair .usp-card .card-icon img{ width:100%; height:100%; object-fit:cover }
.pmv56 .usp-grid.look-onair .usp-card h3{
  margin:0; font-weight:900; letter-spacing:.2px; color:#EEF2FF;
  font-size:15.8px; line-height:1.25;
}
.pmv56 .usp-grid.look-onair .usp-card p{
  margin:8px 0 0; color:rgba(226,232,255,.78); font-size:13.6px; line-height:1.5;
  white-space:pre-line;
}
.pmv56 .usp-grid.look-onair .usp-card .badge-num{
  position:absolute; top:12px; right:12px;
  display:inline-grid; place-items:center;
  min-width:28px; height:22px; padding:0 8px; border-radius:999px;
  font: 900 11px/1 Inter; letter-spacing:.2px; color:#0b0f1e;
  background: linear-gradient(135deg, var(--g1), var(--g2));
  box-shadow: 0 6px 16px rgba(124,58,237,.28);
}
.pmv56 .usp-grid.look-onair .usp-card .meta{ margin-top:10px; display:flex; gap:10px; flex-wrap:wrap; }
.pmv56 .usp-grid.look-onair .usp-card .meta .pill{
  font:700 11.5px/1 Inter; letter-spacing:.2px;
  color:#E2E8F0; padding:6px 10px; border-radius:999px;
  background:rgba(148,163,255,.10); border:1px solid rgba(148,163,255,.18);
}

/* Meta kısa maket & diğerleri */
.pmv56 .psc-wrap.meta{grid-template-columns:1.1fr .9fr;grid-template-rows:auto auto}
.pmv56 .psc-card.feed{padding:10px;grid-column:1/2}
.pmv56 .psc-card.feed .head{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.pmv56 .psc-card.feed .avatar{width:20px;height:20px;border-radius:999px;background:#2b3358}
.pmv56 .psc-card.feed .name{flex:1;height:10px;border-radius:6px;background:linear-gradient(90deg, rgba(180,200,255,.16), rgba(180,200,255,.08))}
.pmv56 .psc-card.feed .img{height:140px;border-radius:10px;background:#1b2244;border:1px solid rgba(255,255,255,.08)}
.pmv56 .psc-card.feed .cta{margin-top:8px;font:900 11px/1 Inter;color:#c7d2fe;opacity:.85}
.pmv56 .psc-card.stories{display:grid;grid-auto-flow:column;gap:8px;padding:10px;background:linear-gradient(180deg,#0c1228,#0b0f1e)}
.pmv56 .psc-card.stories .bubble{width:34px;height:34px;border-radius:999px;background: radial-gradient(circle at 50% 50%, rgba(255,255,255,.22), rgba(255,255,255,.06)); border:2px solid color-mix(in srgb, var(--ac1) 50%, transparent)}
.pmv56 .psc-card.reels{padding:10px;display:grid;grid-template-columns:1fr 40px;gap:8px}
.pmv56 .psc-card.reels .v{border-radius:10px;height:160px;background:#1a2142;border:1px solid rgba(255,255,255,.08)}
.pmv56 .psc-card.reels .actions{display:grid;gap:8px}
.pmv56 .psc-card.reels .actions i{height:26px;border-radius:8px;background:rgba(255,255,255,.08)}

/* Yandex */
.pmv56 .psc-wrap.yandex{grid-template-columns:1fr;grid-auto-rows:auto}
.pmv56 .psc-wrap.yandex .psc-card.banner{display:grid;grid-template-columns:160px 1fr;gap:10px;padding:10px}
.pmv56 .psc-wrap.yandex .psc-card.banner .img{border-radius:10px;background:#1a2444;border:1px solid rgba(255,255,255,.08)}
.pmv56 .psc-wrap.yandex .psc-card.banner .copy i{display:block;height:10px;border-radius:6px;background:linear-gradient(90deg, rgba(180,200,255,.14), rgba(180,200,255,.08));margin:6px 0}
.pmv56 .psc-wrap.yandex .psc-card.banner .copy i.short{width:50%}

/* TikTok / LinkedIn / X / Telegram (özet stiller) */
.pmv56 .psc-wrap.shortvideo .psc-card.tt{position:relative;padding:10px}
.pmv56 .psc-wrap.shortvideo .psc-card.tt .v{height:200px;border-radius:10px;background:#1a2142;border:1px solid rgba(255,255,255,.08)}
.pmv56 .psc-wrap.shortvideo .psc-card.tt .right{position:absolute;right:10px;top:10px;display:grid;gap:8px}
.pmv56 .psc-wrap.shortvideo .psc-card.tt .right i{width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,.08)}
.pmv56 .psc-wrap.shortvideo .psc-card.tt .caption{position:absolute;left:10px;bottom:10px;right:50px}
.pmv56 .psc-wrap.shortvideo .psc-card.tt .caption .wide{display:block;height:12px;border-radius:6px;background:rgba(255,255,255,.14)}

.pmv56 .psc-wrap.linkedin .psc-card.li{padding:10px}
.pmv56 .psc-wrap.linkedin .psc-card.li .row{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.pmv56 .psc-wrap.linkedin .psc-card.li .logo{width:18px;height:18px;border-radius:4px;background:#1d3761}
.pmv56 .psc-wrap.linkedin .psc-card.li .line{flex:1;height:10px;border-radius:6px;background:linear-gradient(90deg, rgba(180,200,255,.14), rgba(180,200,255,.08))}
.pmv56 .psc-wrap.linkedin .psc-card.li .hero{height:140px;border-radius:10px;background:#192449;border:1px solid rgba(255,255,255,.08)}
.pmv56 .psc-wrap.linkedin .psc-card.li .meta i{display:block;height:10px;border-radius:6px;background:linear-gradient(90deg, rgba(180,200,255,.14), rgba(180,200,255,.08));margin:6px 0}
.pmv56 .psc-wrap.linkedin .psc-card.li .meta i.short{width:40%}

.pmv56 .psc-wrap.x .psc-card.tweet{padding:10px}
.pmv56 .psc-wrap.x .psc-card.tweet .meta{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.pmv56 .psc-wrap.x .psc-card.tweet .avatar{width:18px;height:18px;border-radius:999px;background:#1f2c4f}
.pmv56 .psc-wrap.x .psc-card.tweet .name{flex:1;height:10px;border-radius:6px;background:linear-gradient(90deg, rgba(180,200,255,.14), rgba(180,200,255,.08))}
.pmv56 .psc-wrap.x .psc-card.tweet .img{height:140px;border-radius:10px;background:#172143;border:1px solid rgba(255,255,255,.08)}
.pmv56 .psc-wrap.x .psc-card.tweet .cta{margin-top:8px;font:900 11px/1 Inter;color:#c7d2fe;opacity:.85}

.pmv56 .psc-wrap.telegram .psc-card.post{padding:10px}
.pmv56 .psc-wrap.telegram .psc-card.post .ch{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.pmv56 .psc-wrap.telegram .psc-card.post .avatar{width:18px;height:18px;border-radius:6px;background:#1a3c53}
.pmv56 .psc-wrap.telegram .psc-card.post .name{flex:1;height:10px;border-radius:6px;background:linear-gradient(90deg, rgba(180,200,255,.14), rgba(180,200,255,.08))}
.pmv56 .psc-wrap.telegram .psc-card.post .img{height:140px;border-radius:10px;background:#15223f;border:1px solid rgba(255,255,255,.08)}
.pmv56 .psc-wrap.telegram .psc-card.post .btns{display:flex;gap:8px;margin-top:8px}
.pmv56 .psc-wrap.telegram .psc-card.post .btns i{flex:1;height:24px;border-radius:8px;background:rgba(255,255,255,.08)}

/* shimmer etkisi */
.pmv56 .shimmer{position:relative;overflow:hidden}
.pmv56 .shimmer::after{
  content:""; position:absolute; inset:0; transform:translateX(-100%);
  background:linear-gradient(90deg, transparent, rgba(255,255,255,.10), transparent);
  animation:shine 2.6s linear infinite;
}
@keyframes shine{to{transform:translateX(100%)}}

/* onair görünümü için data-look desteği de ver */
.pmv56 section[data-look="onair"] .usp-grid { 
  grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
  gap:16px;
}
.pmv56 section[data-look="onair"] .usp-card{
  position:relative;border-radius:14px;padding:16px 16px 14px 16px;
  background: linear-gradient(180deg, rgba(14,18,40,.82), rgba(12,16,34,.88));
  border:1px solid rgba(148,163,255,.14);
  box-shadow:0 6px 16px rgba(2,6,23,.35), inset 0 0 0 1px rgba(124,58,237,.06);
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
  overflow:hidden;
}
.pmv56 section[data-look="onair"] .usp-card:hover{
  transform: translateY(-2px);
  border-color: rgba(148,163,255,.22);
  box-shadow:0 12px 26px rgba(2,6,23,.45), inset 0 0 0 1px rgba(124,58,237,.10);
}
.pmv56 section[data-look="onair"] .usp-card .toprow{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.pmv56 section[data-look="onair"] .usp-card .card-icon{width:18px;height:18px;flex:0 0 18px;border-radius:4px;background:rgba(255,255,255,.08);display:grid;place-items:center;overflow:hidden}
.pmv56 section[data-look="onair"] .usp-card .card-icon img{width:100%;height:100%;object-fit:cover}
.pmv56 section[data-look="onair"] .usp-card h3{margin:0;font-weight:900;letter-spacing:.2px;color:#EEF2FF;font-size:15.8px;line-height:1.25}
.pmv56 section[data-look="onair"] .usp-card p{margin:8px 0 0;color:rgba(226,232,255,.78);font-size:13.6px;line-height:1.5;white-space:pre-line}
.pmv56 section[data-look="onair"] .usp-card .badge-num{position:absolute;top:12px;right:12px;display:inline-grid;place-items:center;min-width:28px;height:22px;padding:0 8px;border-radius:999px;font:900 11px/1 Inter;letter-spacing:.2px;color:#0b0f1e;background:linear-gradient(135deg,var(--g1),var(--g2));box-shadow:0 6px 16px rgba(124,58,237,.28)}
.pmv56 section[data-look="onair"] .usp-card .meta{margin-top:10px;display:flex;gap:10px;flex-wrap:wrap}
.pmv56 section[data-look="onair"] .usp-card .pill{font:700 11.5px/1 Inter;letter-spacing:.2px;color:#E2E8F0;padding:6px 10px;border-radius:999px;background:rgba(148,163,255,.10);border:1px solid rgba(148,163,255,.18)}
.pmv56 .eco-chip.no-img {
  background: linear-gradient(135deg, rgba(148,163,255,.12), rgba(124,58,237,.10));
  border: 1px solid rgba(148,163,255,.18);
}

/* ===== TYPES (Sol kartlar + Sağ ekosistem) ===== */
.pmv56 .types-section .types-split{
  display:grid; grid-template-columns:1.08fr .92fr; gap:30px; align-items:start;
}
.pmv56 .types-section .types-left h2{ text-align:left }
.pmv56 .types-cards-grid.neo{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px }
.pmv56 .types-card.neo{
  position:relative; padding:18px; border-radius:14px;
  background:rgba(255,255,255,.04); border:1px solid var(--line2);
  box-shadow:0 10px 28px rgba(0,0,0,.26), inset 0 0 0 1px rgba(255,255,255,.05);
  backdrop-filter:blur(6px);
}
.pmv56 .types-card.neo h3{ margin:0 0 6px; font:800 16px/1.3 Inter; color:#EAF0FF }
.pmv56 .types-card.neo p{ margin:0; color:var(--ink-muted); font-size:13.6px }
.pmv56 .types-card.neo .badge-num{
  position:absolute; top:12px; right:12px; min-width:26px; height:22px; padding:0 8px;
  display:inline-grid; place-items:center; border-radius:999px; font:900 11px/1 Inter; color:#0b0f1e;
  background:linear-gradient(135deg,var(--g1),var(--g2)); box-shadow:0 6px 16px rgba(124,58,237,.28);
}

/* Sağ: Google Ads Ekosistemi */
.pmv56 .types-right{ position:relative }
.pmv56 .ecosys{
  position:relative; height:420px; border-radius:16px; overflow:hidden;
  background: radial-gradient(800px 360px at 20% -10%, rgba(124,58,237,.16), transparent 60%),
              radial-gradient(900px 420px at 120% 120%, rgba(34,211,238,.12), transparent 55%),
              rgba(19,25,46,.72);
  border:1px solid rgba(255,255,255,.12);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.05), 0 14px 34px rgba(0,0,0,.35);
  backdrop-filter: blur(6px);
}
.pmv56 .ecosys .eco-bg{
  position:absolute; inset:0;
  background:
    linear-gradient(transparent 24px, rgba(255,255,255,.06) 25px, transparent 26px) 0 0/100% 26px,
    linear-gradient(90deg, transparent 24px, rgba(255,255,255,.06) 25px, transparent 26px) 0 0/26px 100%;
  opacity:.25; filter:blur(.2px);
}
.pmv56 .ecosys .eco-links{ position:absolute; inset:0 }
.pmv56 .ecosys .eco-path{
  stroke:rgba(255,255,255,.65); stroke-width:2; fill:none;
  stroke-dasharray:6 12; filter:url(#soft);
  animation:eco-flow 3s linear infinite;
}
.pmv56 .ecosys .eco-path.p2{ animation-delay:.25s }
.pmv56 .ecosys .eco-path.p3{ animation-delay:.5s }
.pmv56 .ecosys .eco-path.p4{ animation-delay:.75s }
.pmv56 .ecosys .eco-path.p5{ animation-delay:1s }
.pmv56 .ecosys .eco-path.p6{ animation-delay:1.25s }
@keyframes eco-flow{ to{ stroke-dashoffset:-120 } }

/* merkez ve node */
.pmv56 .ecosys .eco-center{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  display:grid; place-items:center; gap:6px; padding:16px 18px; text-align:center;
  color:#fff; border-radius:14px;
  background:linear-gradient(180deg, rgba(14,18,40,.86), rgba(12,16,34,.92));
  border:1px solid rgba(255,255,255,.14);
  box-shadow:0 10px 28px rgba(0,0,0,.35), inset 0 0 0 1px rgba(124,58,237,.06);
}
.pmv56 .ecosys .eco-center img{ width:38px; height:38px; object-fit:contain; filter:drop-shadow(0 4px 10px rgba(0,0,0,.35)) }
.pmv56 .ecosys .eco-center strong{ font:900 14px/1 Inter }
.pmv56 .ecosys .eco-center em{ font:700 11px/1.2 Inter; opacity:.75 }

.pmv56 .ecosys .eco-node{ position:absolute; transform:translate(-50%,-50%) }
.pmv56 .ecosys .eco-badge{
  position:absolute; top:-16px; left:50%; transform:translateX(-50%);
  font:900 10.5px/1 Inter; letter-spacing:.2px; color:#0b0f1e;
  background:linear-gradient(135deg,var(--ac1,#7C3AED),var(--ac2,#22D3EE));
  padding:6px 10px; border-radius:999px; box-shadow:0 6px 16px rgba(124,58,237,.28);
}
.pmv56 .ecosys .eco-chip{
  display:flex; align-items:center; gap:8px; padding:10px 12px; border-radius:12px;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.14);
  box-shadow:0 8px 20px rgba(0,0,0,.28), inset 0 0 0 1px rgba(255,255,255,.05);
  color:#fff; font:800 13.5px/1 Inter;
}
.pmv56 .ecosys .eco-chip img{ width:18px; height:18px; border-radius:4px; object-fit:cover }
.pmv56 .ecosys .eco-chip.no-img span{ padding-left:0 }

/* küçük legend */
.pmv56 .types-right .mini-legend{ color:var(--ink-muted); font-size:12.5px }

/* Responsive */
@media (max-width: 992px){
  .pmv56 .types-section .types-split{ grid-template-columns:1fr; gap:20px }
  .pmv56 .ecosys{ height:380px }
}
@media (max-width: 640px){
  .pmv56 .ecosys{ height:320px; border-radius:12px }
}
  /* === Global: merkez hizalama + pre-line, daha okunaklı metin === */
.pmv56 .section h1,
.pmv56 .section h2,
.pmv56 .section h3,
.pmv56 .section p,
.pmv56 .why-us-text,
.pmv56 .textbody,
.pmv56 .subheader { text-align:center; }

.pmv56 .section p,
.pmv56 .why-us-text p,
.pmv56 .textbody,
.pmv56 .subheader { white-space: pre-line; line-height: 1.55; }

/* === 4. Alan (Types) — Split yerleşim, minimal kartlar, sağda animasyon === */
.pmv56 .types-section { padding: 70px 0 60px; position: relative; }
.pmv56 .types-split {
  display:grid; grid-template-columns: 1.1fr 1fr; gap:36px; align-items:center;
}
.pmv56 .types-left h2 { margin:0 0 8px; font-weight:900; letter-spacing:.2px; }
.pmv56 .types-left .subheader { opacity:.9; margin-bottom:18px; }

/* Kart ızgarası — Google OnAir / View by product esintili, minimal */
.pmv56 .types-cards-grid {
  display:grid; gap:14px;
  grid-template-columns: repeat(3, minmax(0,1fr));
  justify-items:stretch; align-items:stretch;
}
.pmv56 .types-card {
  border-radius:16px; padding:14px 14px 16px;
  background:linear-gradient(180deg, rgba(16,22,45,.92), rgba(14,18,34,.92));
  border:1px solid rgba(148,163,255,.12);
  box-shadow:0 6px 18px rgba(2,6,23,.35), inset 0 1px 0 rgba(255,255,255,.04);
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
  position:relative; overflow:hidden;
}
.pmv56 .types-card:hover {
  transform: translateY(-3px);
  border-color: rgba(148,163,255,.28);
  box-shadow:0 14px 28px rgba(2,6,23,.45), inset 0 1px 0 rgba(255,255,255,.06);
}
.pmv56 .types-card h3 { margin:4px 0 6px; font-size:14.8px; font-weight:800; color:#eaf0ff; }
.pmv56 .types-card p  { margin:0; font-size:13.2px; color:var(--ink-muted,#b6c1ff); opacity:.92; }
/* numara rozetlerini tamamen kaldır */
.pmv56 .types-card .badge-num { display:none !important; }
/* kart üst hat: minimal vurgu */
.pmv56 .types-card::before{
  content:""; position:absolute; left:0; top:0; width:100%; height:2px;
  background:linear-gradient(90deg, var(--ac1,#7C3AED), var(--ac2,#22D3EE));
  opacity:.55;
}

/* Sağ: Ekosistem animasyonu alanı */
.pmv56 .ecosys { position:relative; border-radius:18px; padding:20px; background:radial-gradient(1200px 600px at 50% 110%, rgba(124,58,237,.15), transparent 60%); }
.pmv56 .eco-bg {
  position:absolute; inset:0; border-radius:16px; pointer-events:none;
  background:
    radial-gradient(600px 300px at 50% 120%, rgba(34,211,238,.08), transparent 70%),
    repeating-linear-gradient(0deg, rgba(148,163,255,.06), rgba(148,163,255,.06) 1px, transparent 1px, transparent 24px),
    repeating-linear-gradient(90deg, rgba(148,163,255,.05), rgba(148,163,255,.05) 1px, transparent 1px, transparent 24px);
  mask-image: radial-gradient(85% 80% at 50% 50%, black, transparent);
}

/* Bağlantı yolları + akış animasyonları */
.pmv56 .eco-links { width:100%; height:420px; display:block; }
.pmv56 .eco-path {
  fill:none; stroke:rgba(180,196,255,.55); stroke-width:1.6;
  stroke-linecap:round; filter: url(#soft);
  stroke-dasharray: 5 9; animation: eco-dash 4.8s linear infinite;
}
.pmv56 .eco-path.p2 { animation-duration: 5.2s }
.pmv56 .eco-path.p3 { animation-duration: 4.4s }
.pmv56 .eco-path.p4 { animation-duration: 5.6s }
.pmv56 .eco-path.p5 { animation-duration: 4.6s }
.pmv56 .eco-path.p6 { animation-duration: 5.0s }

@keyframes eco-dash { to { stroke-dashoffset: -280; } }

/* pulse noktaları (hafif parıltı ile) */
.pmv56 .eco-pulse {
  fill: white; filter: drop-shadow(0 0 6px rgba(255,255,255,.65));
  opacity: .0; animation: eco-pulse 2.8s ease-in-out infinite;
}
.pmv56 .eco-pulse.d1{ animation-delay:.0s } .pmv56 .eco-pulse.d2{ animation-delay:.3s }
.pmv56 .eco-pulse.d3{ animation-delay:.6s } .pmv56 .eco-pulse.d4{ animation-delay:.9s }
.pmv56 .eco-pulse.d5{ animation-delay:1.2s } .pmv56 .eco-pulse.d6{ animation-delay:1.5s }

@keyframes eco-pulse {
  0%, 15%   { opacity: 0; transform: translateY(0) scale(.8); }
  30%, 55%  { opacity: .85; transform: translateY(-4px) scale(1); }
  70%, 100% { opacity: 0; transform: translateY(-8px) scale(.9); }
}

/* merkez çip + uydular */
.pmv56 .eco-center {
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  display:flex; flex-direction:column; align-items:center; gap:6px;
  padding:14px 16px; border-radius:14px;
  background:rgba(11,15,30,.6); backdrop-filter: blur(6px);
  border:1px solid rgba(148,163,255,.18);
  box-shadow: 0 12px 28px rgba(2,6,23,.5), inset 0 1px 0 rgba(255,255,255,.05);
}
.pmv56 .eco-center img { width:34px; height:34px; object-fit:contain; }
.pmv56 .eco-center strong { font-size:13.8px; letter-spacing:.2px }
.pmv56 .eco-center em { font-size:12px; opacity:.8; }

/* Tekil uydu */
.pmv56 .eco-node {
  position:absolute; transform: translate(-50%,-50%);
  display:flex; flex-direction:column; align-items:center; gap:6px;
}
.pmv56 .eco-chip {
  display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:999px;
  background: rgba(16,22,45,.85); border:1px solid rgba(148,163,255,.18); backdrop-filter: blur(4px);
  box-shadow: 0 6px 18px rgba(2,6,23,.45);
}
.pmv56 .eco-chip img { width:18px; height:18px; object-fit:contain; filter: drop-shadow(0 0 4px rgba(255,255,255,.2)); }
.pmv56 .eco-chip span { font-size:12.6px; font-weight:700; }
.pmv56 .eco-badge {
  font-size:10.8px; letter-spacing:.4px; padding:4px 8px; border-radius:999px;
  background: linear-gradient(90deg, var(--ac1,#7C3AED), var(--ac2,#22D3EE));
  border: 1px solid rgba(255,255,255,.12);
  color:#fff; opacity:.9;
}

/* === 2. alan listelerin look fallback’leri (hizmetler arası tutarlılık) === */
.pmv56 .usp-grid.look-vivid-clean .usp-card,
.pmv56 .usp-grid.look-accent .usp-card,
.pmv56 .usp-grid.look-onair .usp-card { text-align:left; } /* grid içi local */

/* === Mobil uyum — 1024 / 768 / 560 kırılımları === */
@media (max-width: 1024px){
  .pmv56 .types-split { grid-template-columns: 1fr; gap:22px; }
  .pmv56 .ecosys { order:2 }
}
@media (max-width: 768px){
  .pmv56 .types-cards-grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px; }
}
@media (max-width: 560px){
  .pmv56 .types-cards-grid { grid-template-columns: 1fr; }
  .pmv56 .eco-links { height: 360px; }
  .pmv56 .eco-center { transform:translate(-50%,-50%) scale(.94); }
  .pmv56 .types-section { padding: 56px 0 52px; }
}
  /* ==== PMV56 — Global Typography & Alignment Fix ==== */
.pmv56 {
  --rhythm: 12px;                 /* dikey ritim */
  --lh: 1.6;                      /* metin satır yüksekliği */
  --max-text: 62ch;               /* metin satırı genişliği */
}

/* Başlıklar: tutarlı boşluk ve responsive boyut */
.pmv56 h1, .pmv56 h2, .pmv56 h3 {
  line-height: 1.2;
  letter-spacing: -.01em;
  margin: calc(var(--rhythm)*2) 0 var(--rhythm);
}
.pmv56 h1 { font-size: clamp(28px, 4vw, 44px); }
.pmv56 h2 { font-size: clamp(22px, 3.2vw, 36px); }
.pmv56 h3 { font-size: clamp(16px, 2.2vw, 20px); }

/* Paragraflar: okunaklılık, kelime kırma ve pre-line */
.pmv56 p, .pmv56 .subheader, .pmv56 .textbody,
.pmv56 .usp-card p, .pmv56 .types-card p,
.pmv56 .why-us-text p, .pmv56 .process-step p {
  line-height: var(--lh);
  color: var(--ink-muted);
  white-space: pre-line;       /* içerikteki \n’leri koru */
  word-break: break-word;
  hyphens: auto;
  margin: 0 0 calc(var(--rhythm)*1.25);
  max-width: var(--max-text);
}

/* Genel hizalama: başlık + açıklamalar merkezde */
.pmv56 .section .container > h2,
.pmv56 .section .container > .subheader,
.pmv56 .why-us-section .why-us-text h2,
.pmv56 .why-us-section .why-us-text p,
.pmv56 .final-cta-section .cta-form-card h3,
.pmv56 .final-cta-section .cta-form-card p {
  text-align: center;
  margin-left: auto; margin-right: auto;
}

/* List/kart başlıkları: iki satıra taşınca dengeli görünüm */
.pmv56 .usp-card h3,
.pmv56 .types-card h3 {
  line-height: 1.35;
  letter-spacing: -.01em;
  margin: 0 0 6px;
  color: #eaf0ff;
  text-align: left;            /* kart içinde sola hizalı daha okunur */
  max-width: 36ch;
}

/* Kart metinleri: daha kompakt görünüm */
.pmv56 .usp-card p,
.pmv56 .types-card p {
  font-size: 13.6px;
  margin: 0;
}

/* Gridler: kartların eşit yüksekte durması */
.pmv56 .usp-grid .usp-card,
.pmv56 .types-cards-grid .types-card {
  display: flex; flex-direction: column;
}

/* Hero ve media metin blokları: genişlik ve merkezleme */
.pmv56 .hero-left .copy,
.pmv56 .why-us-text {
  max-width: var(--max-text);
  margin-left: auto; margin-right: auto;
}

/* Form girişleri: satır yüksekliği uyumu */
.pmv56 .final-cta-section input {
  line-height: 1.3;
}

/* Mobil: spacing ve font boyutlarını sıkıştır */
@media (max-width: 768px) {
  .pmv56 { --rhythm: 10px; --lh: 1.55; --max-text: 58ch; }
  .pmv56 .types-split { grid-template-columns: 1fr; gap: 20px; }
  .pmv56 .types-right { order: 2; }
  .pmv56 .types-left { order: 1; }
  .pmv56 .usp-grid.look-neo,
  .pmv56 .usp-grid.look-stripe,
  .pmv56 .types-cards-grid.neo {
    gap: 12px;
    grid-template-columns: 1fr 1fr;    /* iki sütunlu kompakt görünüm */
  }
  .pmv56 .usp-grid .usp-card,
  .pmv56 .types-cards-grid .types-card {
    padding: 14px;
    border-radius: 14px;
  }
  .pmv56 h1 { font-size: clamp(24px, 6vw, 34px); }
  .pmv56 h2 { font-size: clamp(20px, 5vw, 28px); }
  .pmv56 h3 { font-size: clamp(15px, 4vw, 18px); }
  .pmv56 .why-us-section .why-us-content { gap: 18px; }
}
  /* ==== FIX PACK — Why-Us / SectionMedia (desktop + mobile) ==== */

/* 1) Grid ve hizalama: iki kolon, dikeyte ortalı */
.pmv56 .why-us-section .why-us-content{
  display:grid;
  grid-template-columns: 1.2fr 1fr;      /* metin biraz daha geniş */
  align-items:center;
  gap: 32px;
}

/* reverse varyantı (side="left") doğru sırayı korusun */
.pmv56 .why-us-section .why-us-content.reverse{
  grid-template-columns: 1fr 1.2fr;
}

/* 2) Metin bloğu: satır sonlarını normalleştir (enter’ları zorunlu çizgi yapma) */
.pmv56 .why-us-section .why-us-text p{
  white-space: normal;                   /* pre-line yerine normal -> parçalanma biter */
  text-align: center;                    /* senin isteğin: ortalı */
  margin-left:auto; margin-right:auto;
  max-width: 68ch;                       /* uzun satırı dengeler */
  line-height: 1.65;
}

/* Başlık aralığı */
.pmv56 .why-us-section .why-us-text h2{
  margin-top: 0;
  margin-bottom: 12px;
}

/* 3) Görsel/telefon kartı tarafı */
.pmv56 .why-us-section .why-us-image{
  width: 100%;
  max-width: 560px;                      /* taşmayı engelle */
  margin-left:auto; margin-right:auto;
}

/* Telefon maketi ve kart kenarlıkları daha sakin gölge */
.pmv56 .why-us-section .why-us-image .phone,
.pmv56 .why-us-section .why-us-image .slide-phone,
.pmv56 .why-us-section .why-us-image .metric,
.pmv56 .why-us-section .why-us-image .metric-row{
  filter: none;
  box-shadow: 0 10px 24px rgba(2,6,23,.35);
}

/* 4) KPI rozetleri: tek satırda değilse grid’e sarılsın */
.pmv56 .why-us-section .metric-row{
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(120px,1fr));
  gap: 10px;
  margin-top: 14px;
}
.pmv56 .why-us-section .metric{
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(148,163,255,.12);
}
.pmv56 .why-us-section .metric h4{
  font-size: 11.5px;
  margin: 0 0 4px;
  opacity: .85;
  text-transform: uppercase;
  letter-spacing: .02em;
}
.pmv56 .why-us-section .metric strong{
  font-size: 18px;
  line-height: 1.1;
}

/* 5) Mobil düzen: tek kolon, sırayı metin -> görsel yap */
@media (max-width: 960px){
  .pmv56 .why-us-section .why-us-content,
  .pmv56 .why-us-section .why-us-content.reverse{
    grid-template-columns: 1fr;
    gap: 18px;
  }
  /* Görseli alta al, metni üste */
  .pmv56 .why-us-section .why-us-content .why-us-text{ order: 1; }
  .pmv56 .why-us-section .why-us-content .why-us-image{ order: 2; }

  /* Başlık boyutu ve paragraf ritmi */
  .pmv56 .why-us-section .why-us-text h2{ font-size: clamp(20px, 5.4vw, 28px); }
  .pmv56 .why-us-section .why-us-text p{
    max-width: 72ch;
    font-size: 15px;
    line-height: 1.6;
    padding: 0 6px;
  }

  /* Telefon/slide yüksekliğini küçült */
  .pmv56 .why-us-section .why-us-image .v,
  .pmv56 .why-us-section .why-us-image .phone,
  .pmv56 .why-us-section .why-us-image .hero{
    transform: scale(.92);
    transform-origin: center top;
  }

  /* KPI rozetleri iki sütun */
  .pmv56 .why-us-section .metric-row{
    grid-template-columns: repeat(2, minmax(0,1fr));
  }
}

/* 6) Ek: SectionList/Types ile ritmi eşitle (üst/alt boşluklar) */
.pmv56 .section .container > h2 + .subheader{
  margin-top: 6px;
}
.pmv56 .types-section .types-left .subheader{
  white-space: normal; /* 4. alandaki paragraf da satır satır bölünmesin */
}
  .pmv56 .breadcrumb a:hover {
  text-decoration: underline;
  opacity: 1;
}
  /* sadece 3. alan (ilk media) için küçük farklar */
.pmv56 .why-us-section[data-ord="1"] .why-us-image { max-width: 560px; }
.pmv56 .why-us-section[data-ord="1"] .metric-row { grid-template-columns: repeat(3,1fr); }

/* sadece 5. alan (ikinci media) için farklı düzen/ölçü */
.pmv56 .why-us-section[data-ord="2"] .why-us-image { max-width: 600px; }
.pmv56 .why-us-section[data-ord="2"] .metric-row { grid-template-columns: repeat(2,1fr); }
/* ==== Eco node: sadece boyut & hizalama düzeltmeleri ==== */
.pmv56 .types-section .eco-node{
  position: absolute;
  transform: translate(-50%,-50%);
  pointer-events: none;
  /* mevcut renk/stil korunur, background TANIMSIZ bırakıldı */
}

/* pill: sadece spacing — renk/gradyana dokunma */
.pmv56 .types-section .eco-node .eco-badge{
  display:inline-block;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 999px;
  margin-bottom: 6px;
}

/* chip: sadece layout — background/border YOK, böylece mevcut renk kalır */
.pmv56 .types-section .eco-node .eco-chip{
  display:flex; align-items:center; gap:8px;
  padding: 8px 10px;
  border-radius: 14px;
  min-height: 40px;
  max-width: 200px; /* metin taşması için üst sınır */
}

/* ikonları sabitle (renk/filtre yok) */
.pmv56 .types-section .eco-node .eco-chip img{
  width: 20px; height: 20px; flex: 0 0 20px;
  object-fit: contain;
}

/* metin: tek satır + ellipsis (masaüstü) */
.pmv56 .types-section .eco-node .eco-chip span{
  font-size: 14px; line-height: 1.1; font-weight: 700;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: calc(200px - 20px - 16px); /* chip - ikon - boşluklar */
}

/* merkez kart tipografisini hafif sıkılaştır (renge dokunmaz) */
.pmv56 .types-section .eco-center strong{ font-size: 18px; line-height: 1.2; }
.pmv56 .types-section .eco-center em{ font-size: 12px; opacity:.85; }

/* responsive: mobilde 2 satıra izin ver + hafif ölçek */
@media (max-width: 960px){
  .pmv56 .types-section .ecosys{ transform: scale(.94); transform-origin:center top; }
  .pmv56 .types-section .eco-node .eco-chip span{
    white-space: normal;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  }
  .pmv56 .types-section .eco-node{ max-width: 220px; }
}
  /* (ZATEN EKLEDİKLERİN KALSIN) */

/* --- z-index katmanı: SVG çizgiler altta, node’lar üstte --- */
.pmv56 .types-section .ecosys { position: relative; }
.pmv56 .types-section .eco-links { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.pmv56 .types-section .eco-node { z-index: 2; } /* node’lar çizgilerin üstünde kalsın */
/* shared */
.types-right { position: relative; min-height: 420px; }
.types-right .reveal {}
/* GOOGLE (mevcut sınıflarını zaten kullanıyorsun) */

/* META */
.meta-scene { position:relative; height:420px; }
.meta-stack { position:absolute; inset:0; display:grid; place-items:center; perspective:900px; }
.meta-card{
  width:260px; height:150px; border-radius:18px;
  background: linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.08); backdrop-filter: blur(6px);
  transform: rotateY(calc(var(--i)*-6deg)) translateY(calc(var(--i)*-10px)) translateZ(calc(var(--i)*-30px));
  animation: metaFloat 6s ease-in-out infinite calc(var(--i)*.2s);
}
.meta-card-head{ display:flex; align-items:center; gap:8px; padding:10px 12px; }
.meta-logo{ width:20px; opacity:.9 }
.meta-pill{ margin-left:auto; font-size:12px; padding:4px 8px; border-radius:999px; border:1px solid rgba(255,255,255,.2)}
.meta-card-body{ padding:0 12px; }
.meta-card-body strong{ display:block; font-size:18px }
.meta-card-body em{ opacity:.7; font-style:normal }
.meta-float-badge{
  position:absolute; right:10px; bottom:10px; font-size:12px; opacity:.7;
  animation: spinBadge 10s linear infinite;
}
@keyframes metaFloat { 0%,100%{ transform: translateY(calc(var(--i)*-10px)) rotateY(calc(var(--i)*-6deg)); } 50%{ transform: translateY(calc(var(--i)*-2px)) rotateY(calc(var(--i)*-3deg)); } }
@keyframes spinBadge { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }

/* TIKTOK */
.tt-scene{ position:relative; height:420px; }
.tt-phone{ position:absolute; width:210px; height:360px; border-radius:28px; border:6px solid var(--ac2, #22D3EE); background:#0b0b0b; box-shadow:0 10px 40px rgba(0,0,0,.35); }
.tt-phone.center{ left:50%; top:50%; transform:translate(-50%,-50%); border-color:var(--ac2); }
.tt-phone.left{ left:12%; top:54%; transform:translateY(-50%) rotate(-8deg); opacity:.7; border-color:#ff5a76; }
.tt-phone.right{ right:12%; top:54%; transform:translateY(-50%) rotate(8deg); opacity:.7; border-color:#5af3ff; }
.tt-screen{ position:absolute; inset:12px; border-radius:18px; overflow:hidden; background:linear-gradient(180deg,#1b1b1b,#0f0f0f); }
.tt-reel{ position:absolute; inset:0; }
.tt-caption{ position:absolute; top:8px; left:10px; font-size:12px; opacity:.75 }
.tt-play{ position:absolute; width:70px; height:70px; border-radius:50%; left:50%; top:50%; transform:translate(-50%,-50%); border:2px solid rgba(255,255,255,.45); }
.tt-logo{ position:absolute; left:14px; top:14px; width:28px; animation: ttPulse 1.8s infinite; }
@keyframes ttPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}

/* SNAPCHAT */
.snap-scene{ position:relative; height:420px; }
.snap-tiles{ position:absolute; inset:20px; display:grid; grid-template-columns:repeat(3,1fr); gap:10px; filter:saturate(1.1); }
.snap-tile{ background: #FFFC00; border-radius:14px; transform: translateY(calc( (var(--i) % 2) * -6px )); animation: tileFloat 4s ease-in-out infinite calc(var(--i)*.15s); }
@keyframes tileFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.snap-ghost{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); }
.snap-ghost img{ width:76px; filter: drop-shadow(0 8px 28px rgba(0,0,0,.35)); animation: ghostBob 3.2s ease-in-out infinite; }
.snap-ping{ position:absolute; inset: -10px; border-radius:999px; border:2px solid rgba(255,255,255,.5); animation: ping 2.6s infinite; }
@keyframes ghostBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes ping{0%{opacity:.8; transform:scale(.6)}100%{opacity:0; transform:scale(1.6)}}

/* YANDEX */
.ydx-scene{ position:relative; height:420px; }
.ydx-pile{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); perspective:800px; }
.ydx-block{
  width:200px; height:70px; border-radius:12px; margin:8px 0;
  background: linear-gradient(135deg, var(--ac1), var(--ac2));
  transform: rotateX(calc(var(--i)*8deg)) translateZ(calc(var(--i)*20px));
  box-shadow:0 10px 30px rgba(0,0,0,.35);
  display:grid; place-items:center; color:#fff; font-weight:600;
  animation: blockRise 5.6s ease-in-out infinite calc(var(--i)*.2s);
}
@keyframes blockRise{0%,100%{transform:translateY(0) rotateX(calc(var(--i)*8deg))}50%{transform:translateY(-6px) rotateX(calc(var(--i)*6deg))}}
.ydx-logo{ position:absolute; right:10px; bottom:10px; width:28px; opacity:.85 }

/* DSP GRAPH */
.dsp-scene{ position:relative; height:420px; }
.dsp-graph{ position:absolute; inset:0; }
.dsp-link{ fill:none; stroke-width:2; opacity:.6; animation: dash 3s linear infinite; stroke-dasharray:6 6; }
@keyframes dash{to{stroke-dashoffset:-60}}
.dsp-nodes .dsp-node{
  position:absolute; width:96px; height:40px; border-radius:10px;
  display:grid; place-items:center; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08); backdrop-filter: blur(6px);
}
.dsp-node.n0{ left:50%; top:48%; transform:translate(-50%,-50%); }
.dsp-node.n1{ left:18%; top:22% } .dsp-node.n2{ left:78%; top:22% }
.dsp-node.n3{ left:18%; top:72% } .dsp-node.n4{ left:78%; top:72% }
.dsp-node.n5{ left:50%; top:10%; transform:translateX(-50%) }

/* REPORTING */
.dash-scene{ position:relative; height:420px; display:grid; place-items:center; }
.dash-card{ width:320px; padding:16px; border-radius:16px; border:1px solid rgba(255,255,255,.08); background:rgba(255,255,255,.04); }
.dash-bars{ display:flex; align-items:flex-end; gap:8px; height:90px; margin-bottom:12px; }
.dash-bars i{ display:block; width:18px; height:40px; background: linear-gradient(180deg,var(--ac1),var(--ac2)); border-radius:6px; animation: kpi 1.8s ease-in-out infinite; }
.dash-bars i:nth-child(2){ animation-delay:.15s } .dash-bars i:nth-child(3){ animation-delay:.3s } .dash-bars i:nth-child(4){ animation-delay:.45s } .dash-bars i:nth-child(5){ animation-delay:.6s }
@keyframes kpi{ 0%,100%{height:30px} 50%{height:88px} }
.dash-kpis{ display:flex; justify-content:space-between; opacity:.85 }

/* ORBIT */
.orbit-scene{ position:relative; height:420px; }
.orbit-center{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:90px; height:90px; border-radius:999px; display:grid; place-items:center; background:linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02)); border:1px solid rgba(255,255,255,.1) }
.orbit-center img{ width:42px; opacity:.9 }
.orbit-ring{ position:absolute; left:50%; top:50%; width:260px; height:260px; transform:translate(-50%,-50%); }
.orbit-ring circle{ fill:none; stroke:linear-gradient(var(--ac1), var(--ac2)); stroke:rgba(255,255,255,.18); stroke-width:1 }
.orbit-dot{ position:absolute; width:8px; height:8px; border-radius:999px; background:var(--ac1); animation: orbit 7.2s linear infinite; }
.orbit-dot.d1{ animation-delay:0s } .orbit-dot.d2{ animation-delay:.4s } .orbit-dot.d3{ animation-delay:.8s } .orbit-dot.d4{ animation-delay:1.2s } .orbit-dot.d5{ animation-delay:1.6s } .orbit-dot.d6{ animation-delay:2.0s }
@keyframes orbit{
  from{ transform: rotate(0deg) translate(130px) rotate(0deg) }
  to  { transform: rotate(360deg) translate(130px) rotate(-360deg) }
}
  /* ortak */
.ecosys { position:relative; width:100%; height:420px; }
.eco-bg { position:absolute; inset:0; background: radial-gradient(120% 80% at 50% 50%, color-mix(in oklab, var(--ac1), #000 70%), transparent 60%); filter: blur(30px); opacity:.35; }

/* META */
.meta-stack { position:absolute; inset:0; display:grid; place-items:center; gap:14px; grid-auto-flow:column; }
.meta-card {
  width:140px; height:190px; border-radius:18px; background:#0f1425; border:1px solid rgba(255,255,255,.08);
  box-shadow:0 8px 30px rgba(0,0,0,.35); transform:translateY(20px) scale(.96) rotate(calc(var(--r,0)*1deg));
  animation: metaFloat .9s both ease-out; position:relative; overflow:hidden;
}
.meta-card img { width:100%; height:90px; object-fit:cover; opacity:.85; }
.meta-chip { position:absolute; top:8px; left:8px; font:500 12px/1.2 Inter,system-ui; padding:6px 8px; border-radius:999px; background:linear-gradient(90deg,var(--ac1),var(--ac2)); color:#081018; }
.meta-sub { display:block; padding:10px 12px; font-size:12px; opacity:.7; }
.meta-cta { position:absolute; bottom:10px; left:10px; right:10px; height:34px; border-radius:10px; border:0; color:#0b1020; background:linear-gradient(90deg,var(--ac1),var(--ac2)); font-weight:700; }
@keyframes metaFloat { from{opacity:0; transform:translateY(30px) scale(.92);} to{opacity:1; transform:translateY(0) scale(1);} }

/* SNAPCHAT */
.snap-ghost { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); }
.snap-ghost img { width:84px; filter: drop-shadow(0 6px 20px rgba(255,255,0,.35)); }
.snap-ghost .ring { position:absolute; inset:-10px; border:2px solid #FFE700; border-radius:20px; opacity:.5; animation:snapPulse 2.4s ease-out infinite; }
.snap-ghost .r2{ animation-delay:.35s; inset:-25px; opacity:.35;}
.snap-ghost .r3{ animation-delay:.7s;  inset:-40px; opacity:.2;}
@keyframes snapPulse { from{transform:scale(.8); opacity:.6;} to{transform:scale(1.4); opacity:0;} }

.snap-cards { position:absolute; inset:0; pointer-events:none; }
.snap-card { position:absolute; width:140px; height:260px; border-radius:28px; border:3px solid #FFE70022; background:#0d0f18; left:50%; top:55%; transform:translate(-50%,-50%) rotate(var(--rot,0deg)); animation:snapFloat 1s both; }
.snap-card.s0{ --rot:-12deg; left:40%; }
.snap-card.s1{ --rot:0deg;   left:50%; border-color:#FFE70055;}
.snap-card.s2{ --rot:12deg;  left:60%; }
@keyframes snapFloat { from{opacity:0; transform:translate(-50%,-40%) rotate(var(--rot));} to{opacity:1; transform:translate(-50%,-50%) rotate(var(--rot));} }
.snap-top{height:24px; display:flex; gap:6px; align-items:center; padding:6px 10px;}
.snap-top .dot{width:6px;height:6px;border-radius:999px;background:#fff2;}
.snap-sticker{position:absolute; right:10px; bottom:14px; background:#FFE700; color:#0b0e16; font-weight:800; padding:6px 10px; border-radius:10px;}

/* TELEGRAM */
.tg-window{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:320px; height:260px; background:#0e1a2a; border:1px solid #ffffff12; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,.35); }
.tg-header{ height:46px; display:flex; align-items:center; gap:8px; padding:0 10px; background:linear-gradient(90deg,var(--ac1),var(--ac2)); color:#081018; font-weight:800;}
.tg-header img{ width:22px; }
.tg-body{ position:absolute; inset:46px 10px 10px; display:flex; flex-direction:column; gap:8px; }
.tg-bubble{ max-width:75%; padding:10px 12px; border-radius:14px; background:#101a2d; color:#cfe0ff; animation:tgIn .7s both; }
.tg-bubble.out{ align-self:flex-end; background:#1a2f4d; color:#d9edff; }
@keyframes tgIn{ from{opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }
/* === 4. alan yeni sahneler — hepsi absolute, layout sabit === */
.pmv56 .types-right { position:relative; min-height:420px; }
.pmv56 .types-right > .ecosys { position:absolute; inset:0; }

/* LinkedIn Lead Gen — lki2- */
.lki2-scene{position:relative;height:420px;display:grid;place-items:center}
.lki2-card{width:360px;border-radius:18px;background:#0f172a;border:1px solid #ffffff14;box-shadow:0 10px 28px rgba(2,6,23,.45);overflow:hidden;position:relative}
.lki2-head{display:flex;align-items:center;gap:8px;padding:10px 12px;color:#cfe0ff;font-weight:800}
.lki2-head img{width:18px}
.lki2-pill{margin-left:auto;color:#081018;padding:4px 8px;border-radius:999px;font-size:11px}
.lki2-media{height:170px;margin:8px;border-radius:12px;background:#0b1224;display:grid;place-items:center;border:1px solid #ffffff12;position:relative;overflow:hidden}
.lki2-play{width:58px;height:58px;border-radius:999px;border:3px solid #ffffff66;position:relative}
.lki2-play::after{content:"";position:absolute;left:21px;top:16px;border-style:solid;border-width:10px 0 10px 16px;border-color:transparent transparent transparent #fff;opacity:.9}
.lki2-meta{display:flex;gap:8px;padding:8px 10px}
.lki2-meta i{flex:1;height:10px;border-radius:6px;background:#ffffff1a}
.lki2-meta .short{flex:0 0 30%}
.lki2-cta{position:absolute;left:10px;right:10px;bottom:10px;height:36px;border-radius:10px;border:0;color:#0b1020;font-weight:900}

/* Lead form pop */
.lki2-form{position:absolute;left:10px;right:10px;bottom:-120px;background:#0f172a;border:1px solid #ffffff22;border-radius:12px;padding:12px;box-shadow:0 10px 22px rgba(0,0,0,.4);animation:lki2Slide 4.5s ease-in-out infinite}
.lki2-form h4{margin:0 0 8px;color:#eaf2ff}
.lki2-form .row{display:flex;gap:8px;align-items:center;margin:6px 0}
.lki2-form .in{flex:1;height:28px;border-radius:8px;background:#101a2d;border:1px solid #ffffff10}
.lki2-form .in.short{flex:0 0 40%}
.lki2-form .send{height:30px;border-radius:8px;border:0;background:#60a5fa;color:#0b0f18;font-weight:800;padding:0 12px}
@keyframes lki2Slide{
  0%,20%{transform:translateY(0)}
  25%,55%{transform:translateY(-130px)}
  60%,100%{transform:translateY(0)}
}

/* yüzen aksesuarlar */
.lki2-fab{position:absolute;width:34px;height:34px;border-radius:12px;border:1px solid #ffffff22;background:#0f172a99;animation:lki2Float 4s ease-in-out infinite}
.lki2-fab.f1{left:8%;top:18%}.lki2-fab.f2{right:10%;top:22%}.lki2-fab.f3{left:12%;bottom:16%}
@keyframes lki2Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
/* PROGRAMMATIC FLOW */
.pmv56 .prog-scene .prog-row{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;gap:16px;align-items:center}
.pmv56 .prog-scene .prog-node{position:relative; width:128px; height:58px; border-radius:14px; display:grid; place-items:center;
  background:#0f1425cc; border:1px solid #ffffff1a; backdrop-filter:blur(6px); box-shadow:0 8px 24px rgba(0,0,0,.36)}
.pmv56 .prog-scene .prog-node span{font-weight:800;color:#eaf0ff;font-size:12.6px;text-align:center;padding:0 6px}
.pmv56 .prog-scene .arrow{position:absolute;right:-12px;top:50%;width:24px;height:2px;background:linear-gradient(90deg,var(--ac1),var(--ac2));transform:translateY(-50%)}
.pmv56 .prog-scene .arrow::after{content:"";position:absolute;right:-3px;top:50%;transform:translateY(-50%) rotate(45deg);width:6px;height:6px;border-right:2px solid var(--ac2);border-top:2px solid var(--ac2)}
.pmv56 .prog-scene .prog-tags{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);display:flex;gap:10px}
.pmv56 .prog-scene .prog-tags em{font:700 11px/1 Inter; padding:6px 10px; border-radius:999px; background:#ffffff14; border:1px solid #ffffff22; color:#e5edff}

/* SEO–ASO–GEO */
.pmv56 .seoaso-scene .puzzle{
  position:absolute; width:180px; height:120px; border-radius:18px; display:grid; place-items:center;
  background:linear-gradient(135deg,var(--ac1),var(--ac2)); color:#081018; font:900 32px/1 Inter;
  box-shadow:0 12px 28px rgba(0,0,0,.35);
}
.pmv56 .seoaso-scene .seo{left:32%; top:40%; transform:translate(-50%,-50%) rotate(-3deg); animation:tileFloat 4s ease-in-out infinite}
.pmv56 .seoaso-scene .aso{left:68%; top:60%; transform:translate(-50%,-50%) rotate(3deg); animation:tileFloat 4.4s ease-in-out infinite .2s}
.pmv56 .seoaso-scene .geo-chip{position:absolute;left:50%;top:12%;transform:translateX(-50%);font:700 11.5px/1 Inter;color:#E2E8F0;padding:6px 10px;border-radius:999px;background:#ffffff18;border:1px solid #ffffff28}

/* RAPORLAMA */
.pmv56 .dash2-scene .dash2-wrap{position:absolute; inset:30px; display:grid; grid-template-columns:220px 1fr; gap:14px}
.pmv56 .dash2-scene .met-grid{display:grid; grid-template-columns:1fr 1fr; gap:10px}
.pmv56 .dash2-scene .met{background:#ffffff08;border:1px solid #ffffff14;border-radius:12px;padding:10px}
.pmv56 .dash2-scene .met span{font-size:12px;opacity:.8}
.pmv56 .dash2-scene .met b{display:block;font-size:18px;color:#eaf0ff;margin-top:2px}
.pmv56 .dash2-scene .met .t{font-size:11px;opacity:.8}
.pmv56 .dash2-scene .met .up{color:#86efac} .pmv56 .dash2-scene .met .down{color:#fda4af}
.pmv56 .dash2-scene .chart{position:relative;border:1px solid #ffffff14;border-radius:12px;background:#0e1426;overflow:hidden;display:flex;align-items:flex-end;padding:12px}
.pmv56 .dash2-scene .chart i{width:2.2%; height:var(--h); background:linear-gradient(180deg,var(--ac1),var(--ac2)); margin-right:2px; border-radius:6px 6px 0 0; animation:kpi 1.8s ease-in-out infinite}
.pmv56 .dash2-scene .chart i:nth-child(odd){animation-delay:.12s}

/* YANDEX glass */
.pmv56 .ydx2-scene .screen{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:360px; height:220px; border-radius:14px;
  background:#0f1425; border:1px solid #ffffff12; box-shadow:0 10px 28px rgba(0,0,0,.35); padding:10px;
}
.pmv56 .ydx2-scene .bar{display:flex;align-items:center;gap:8px;color:#fff}
.pmv56 .ydx2-scene .bar b{font-weight:900}
.pmv56 .ydx2-scene .bar span{margin-left:auto;width:60px;height:8px;background:#ffffff1a;border-radius:6px}
.pmv56 .ydx2-scene .row{display:flex;align-items:center;gap:8px;margin-top:10px}
.pmv56 .ydx2-scene .row i{flex:1;height:10px;border-radius:6px;background:#ffffff14}
.pmv56 .ydx2-scene .row i.short{flex:0 0 30%}
.pmv56 .ydx2-scene .row.ad em{font-size:11px;color:#93c5fd;background:#1f2a44;padding:2px 6px;border-radius:6px}
.pmv56 .ydx2-scene .glass{position:absolute; right:12%; top:20%; width:120px; height:120px; border-radius:999px; overflow:hidden; border:3px solid #ffffff55; box-shadow:0 8px 20px rgba(0,0,0,.4); animation:ghostBob 3s ease-in-out infinite}
.pmv56 .ydx2-scene .glass .ring{position:absolute; inset:10px; border-radius:999px; border:2px dashed rgba(255,255,255,.35)}

/* X Premium */
.pmv56 .x2-scene .x-phone{position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:210px; height:360px; border:6px solid #1f2937; border-radius:28px; background:#0b0b0b; box-shadow:0 10px 40px rgba(0,0,0,.35)}
.pmv56 .x2-scene .x-screen{position:absolute; inset:12px; border-radius:18px; background:linear-gradient(180deg,#111827,#0b1020)}
.pmv56 .x2-scene .x-top{height:44px; display:flex; align-items:center; padding:0 12px; color:#cfe0ff; font-weight:800}
.pmv56 .x2-scene .x-card{margin:12px; height:180px; border-radius:12px; border:1px solid #ffffff18; background:#0e1a2a; display:grid; place-items:center}
.pmv56 .x2-scene .tick{width:38px;height:38px;border-radius:999px;border:3px solid #60a5fa;position:relative}
.pmv56 .x2-scene .x-cta{position:absolute; left:12px; right:12px; bottom:14px; height:38px; border-radius:10px; background:linear-gradient(90deg,var(--ac1),var(--ac2)); color:#0b1020; font-weight:900; display:grid; place-items:center}
.pmv56 .x2-scene .x-logo{position:absolute; right:6%; bottom:8%; font:900 42px/1 Inter; opacity:.08; letter-spacing:-.02em}

/* UI/UX split */
.pmv56 .uiux-scene .uiux-card{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:420px; height:220px; border-radius:16px; overflow:hidden;
  display:grid; grid-template-columns:1fr 1fr; border:1px solid #ffffff18; box-shadow:0 10px 28px rgba(0,0,0,.35);
}
.pmv56 .uiux-scene .half{display:flex;flex-direction:column;justify-content:center;gap:6px;padding:18px}
.pmv56 .uiux-scene .half span{font:900 28px/1 Inter}
.pmv56 .uiux-scene .half em{font-size:12px; opacity:.8}
.pmv56 .uiux-scene .ux{background:#0e162c}
.pmv56 .uiux-scene .ui{background:#0d1326;border-left:1px solid #ffffff10}
.pmv56 .uiux-scene .uiux-tags{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);display:flex;gap:8px}
.pmv56 .uiux-scene .uiux-tags i{width:26px;height:8px;border-radius:6px;background:#ffffff1a}

/* CONSULTING roadmap */
.pmv56 .consulting-scene .road{position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); display:flex; gap:12px}
.pmv56 .consulting-scene .step{--shift: calc(var(--i) * 6px); transform: translateY(var(--shift)); width:92px; height:70px; border-radius:12px; background:#0f1425cc; border:1px solid #ffffff14; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; animation:metaFloat 6s ease-in-out infinite}
.pmv56 .consulting-scene .step b{background:linear-gradient(90deg,var(--ac1),var(--ac2));color:#081018;border-radius:999px;padding:2px 6px;font:900 12px/1 Inter}
.pmv56 .consulting-scene .step span{color:#eaf0ff;font-weight:800;font-size:12px}
/* REPORTING Neo+ — rpt3- */
.rpt3-scene{position:relative;height:420px;display:grid;place-items:center}
.rpt3-wrap{width:360px;display:grid;gap:12px}
.rpt3-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.rpt3-kpi{background:#0e1628;border:1px solid #ffffff12;border-radius:12px;padding:10px}
.rpt3-kpi span{font-size:11px;opacity:.8;color:#d5e4ff}
.rpt3-kpi b{display:block;color:#eaf2ff;font-size:20px;margin:4px 0 2px}
.rpt3-kpi i{font-size:11px}
.rpt3-kpi .up{color:#86efac}.rpt3-kpi .down{color:#fda4af}

.rpt3-chart{position:relative;height:200px;border-radius:14px;border:1px solid #ffffff12;background:#0b1222;overflow:hidden;padding:8px}
.rpt3-chart svg{position:absolute;left:0;right:0;top:0;bottom:0}
.rpt3-line{fill:none;stroke:#ffffff55;stroke-width:.8}
.rpt3-fill{opacity:.18;animation:rpt3Wave 3.2s ease-in-out infinite}
@keyframes rpt3Wave{0%,100%{opacity:.18}50%{opacity:.28}}
.rpt3-pulse{position:absolute;left:10px;right:10px;bottom:10px;height:6px;border-radius:8px;animation:rpt3Bar 1.8s ease-in-out infinite}
@keyframes rpt3Bar{0%,100%{transform:scaleX(.85)}50%{transform:scaleX(1)}}
/* === GLOBAL: başlık ve alt metin hizalama === */
.pmv56 .section .container > h2{
  text-align: center;
  margin-left: auto; margin-right: auto;
  max-width: 30ch;
  line-height: 1.2;
}
.pmv56 .section .container > .subheader{
  text-align: center;
  margin-left: auto; margin-right: auto;
  max-width: 72ch;
}

/* === USP grid (SectionList) kart içerikleri ortalı + başlık clamp === */
.pmv56 .usp-card h3{
  text-align: center;
  font-size: clamp(16px, 1.6vw, 20px);  /* uzun başlıklar taşmadan küçülür */
  line-height: 1.25;
}
.pmv56 .usp-card p{
  text-align: center;
  margin-left: auto; margin-right: auto;
  max-width: 62ch;
}
.pmv56 .usp-card p + p{ margin-top: .6em; } /* paragraf arası */
/* === 4. ALAN (SectionTypesAnimated) başlık & açıklama ortalama === */
.pmv56 .types-section .types-left h2{
  text-align:center;
  margin-left:auto; margin-right:auto;
  max-width:28ch; line-height:1.15;
}
.pmv56 .types-section .types-left .subheader{
  text-align:center;
  margin-left:auto; margin-right:auto;
  max-width:72ch;
}
/* Kart metinlerini de ortala */
.pmv56 .types-section .types-card h3,
.pmv56 .types-section .types-card p{
  text-align:center;
}
/* Kart grid’inde hizalama */
.pmv56 .types-section .types-cards-grid{
  justify-items:center;
}
  /* === USP (SectionList) kart metin tipografisi === */
.pmv56 .usp-grid .usp-card{
  display:flex; flex-direction:column; align-items:center;
}
.pmv56 .usp-grid .usp-card h3{
  text-align:center;
  margin: 0 0 8px;
}
.pmv56 .usp-grid .usp-card p{
  /* başlık ortada, metin SOLA */
  text-align:left;
  margin: 0 auto;            /* kart içinde ortalı kutu */
  max-width: 60ch;           /* okunabilir satır uzunluğu */
  line-height: 1.6;
  hyphens: none;             /* hecelemeyi kapat */
  word-break: normal;
  overflow-wrap: anywhere;   /* taşmaları engelle */
}
  /* === 1) Tüm section başlıklarını orta hizala + satırları dengeli kır === */
.pmv56 .section .container > h2{
  text-align:center;
  text-wrap: balance;               /* destekleyen tarayıcılarda başlık satırı dengesi */
  margin-bottom: 14px;
}

/* === 2) Stratejimiz (SectionList / usp-grid) kartları — tipografi ayarı === */
.pmv56 .usp-grid{
  align-items: stretch;             /* tüm kartlar aynı yükseklikte */
  gap: 22px;
}

/* başlık: ortada, biraz daha kompakt, dengeli kırım */
.pmv56 .usp-grid .usp-card h3{
  text-align:center;
  margin: 0 0 10px;
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1.25;
  letter-spacing: .01em;
  text-wrap: balance;
}

/* metin: SOLA, düzgün satır uzunluğu, doğal cümle kırımı */
.pmv56 .usp-grid .usp-card p{
  text-align: left;
  margin: 8px auto 0;
  max-width: 52ch;                  /* 50–60ch aralığı okunabilirlik için ideal */
  font-size: clamp(15px, 1.15vw, 18px);
  line-height: 1.65;
  hyphens: none;
  word-break: normal;
  overflow-wrap: anywhere;
  text-wrap: pretty;                /* (destek varsa) noktalama öncesi kötü kırımları azalt */
}

/* paragraf aralığı */
.pmv56 .usp-grid .usp-card p + p{ margin-top: 10px; }

/* mobilde rahat okunsun */
@media (max-width: 960px){
  .pmv56 .usp-grid .usp-card h3{ font-size: 18px; }
  .pmv56 .usp-grid .usp-card p{ font-size: 15.5px; max-width: 60ch; line-height: 1.62; }
}
  /* MultiP içindeki paragrafların ritmi */
.pmv56 .subheader p,
.pmv56 .lede p { margin: 0 0 12px; }
.pmv56 .subheader p:last-child,
.pmv56 .lede p:last-child { margin-bottom: 0; }
/* ====== MEDIA #1 ve #2: dış panel yok, telefon çerçevesi var ====== */
/* sadece 3. ve 5. alan: data-ord="1" ve data-ord="2" */
.pmv56 .why-us-section[data-ord="1"] .why-us-image,
.pmv56 .why-us-section[data-ord="2"] .why-us-image{
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  padding: 0 !important;
  width: 100%;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

/* Telefon “bezel”ini geri çiz (iç çerçeve) */
.pmv56 .why-us-section[data-ord="1"] .slide-phone,
.pmv56 .why-us-section[data-ord="2"] .slide-phone{
  position: relative;
  border-radius: 28px;
  border: 6px solid rgba(255,255,255,.08);
  background: #0b0f1a;               /* ekran dışındaki gövde */
  box-shadow: 0 12px 36px rgba(2,6,23,.45);
  overflow: hidden;
}

/* Ekran alanı – içerik burada görünüyor */
.pmv56 .why-us-section[data-ord="1"] .slide-phone .screen,
.pmv56 .why-us-section[data-ord="2"] .slide-phone .screen{
  position: relative;
  inset: 0;
  border-radius: 20px;
  overflow: hidden;
}

/* Slayt iç yazılar: tek satır bullet gibi değil, “özlü kalın + alt açıklama yok” */
.pmv56 .why-us-section[data-ord="1"] .slide-phone .slide,
.pmv56 .why-us-section[data-ord="2"] .slide-phone .slide{
  display: grid; place-items: center;
  padding: 18px;
  text-align: center;
  color: #e6eeff;
}
.pmv56 .why-us-section[data-ord="1"] .slide-phone .slide .t,
.pmv56 .why-us-section[data-ord="2"] .slide-phone .slide .t{
  font-size: 18px;
  font-weight: 800;
  letter-spacing: .01em;
}
  /* ===== SectionList: vivid-clean (Google’daki kutular) ===== */
.pmv56 .section[data-look="vivid-clean"] .usp-grid{
  display:grid; grid-template-columns: repeat(3, minmax(0,1fr));
  gap:14px; margin-top:16px;
}
.pmv56 .section[data-look="vivid-clean"] .usp-card{
  border-radius:14px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  box-shadow:0 10px 24px rgba(2,6,23,.35);
  padding:14px;
}
.pmv56 .section[data-look="vivid-clean"] .usp-card h3{
  margin:0 0 6px; font-size:16px; line-height:1.2;
}
.pmv56 .section[data-look="vivid-clean"] .usp-card p{
  margin:0; opacity:.9; line-height:1.5;
}
.pmv56 .section[data-look="vivid-clean"] .badge-num{
  display:inline-block; font:900 11px/1 Inter,system-ui;
  opacity:.7; margin-bottom:6px;
}
@media (max-width: 960px){
  .pmv56 .section[data-look="vivid-clean"] .usp-grid{
    grid-template-columns: 1fr;
  }
}
  /* ===== [TIPOGRAFİ & HİZALAMA] Tüm hizmet sayfaları için tek ayar ===== */

/* Başlıklar her yerde ortalı */
.pmv56 .section .container > h1,
.pmv56 .section .container > h2,
.pmv56 .why-us-section .why-us-text h2,
.pmv56 .types-left h2 {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 28ch;          /* çok uzamasın */
  line-height: 1.15;
}

/* Kart başlıkları ortalı; metinler SOLA hizalı (rahat okunur) */
.pmv56 .usp-card h3 { text-align: center; }
.pmv56 .usp-card p,
.pmv56 .why-us-section .why-us-text p,
.pmv56 .types-left .subheader,
.pmv56 .textbody {
  text-align: left;          /* <— önemli: sol */
  white-space: normal;       /* enter = paragraf; satır içi kırma yok */
  word-break: normal;        /* "yö-" gibi kırılmaları kapat */
  overflow-wrap: normal;     /* zorlamayı kapat */
  hyphens: manual;           /* tarayıcı otomatik tire koymasın */
  max-width: 70ch;           /* satır uzunluğu optimum */
  margin-left: auto;
  margin-right: auto;
  line-height: 1.65;
}

/* 3. ve 5. alan: telefon sahnesi tam ortaya gelsin */
.pmv56 .why-us-section .why-us-content {
  align-items: center;       /* dikey ortalama */
}
.pmv56 .why-us-section .why-us-image{
  display: flex;
  justify-content: center;   /* yatay ortalama */
  align-items: center;
}
.pmv56 .why-us-section .why-us-image .phone,
.pmv56 .why-us-section .why-us-image .slide-phone,
.pmv56 .why-us-section .why-us-image .v,
.pmv56 .why-us-section .why-us-image .hero {
  margin: 0 auto;            /* güvenli merkezleme */
}

/* Dar ekranlarda okunurluk */
@media (max-width: 960px){
  .pmv56 .section .container > h1,
  .pmv56 .section .container > h2,
  .pmv56 .why-us-section .why-us-text h2 { max-width: 22ch; }
  .pmv56 .usp-card p,
  .pmv56 .why-us-section .why-us-text p { max-width: 72ch; line-height: 1.6; }
}
/* ==== SCENE HOTFIX — 3. alan (fan_orbit) görünür kıl ==== */
/* Sadece .media-scene ve .fan-orbit için min. stiller; başka hiçbir şeyi ezmiyor */

.pmv56 .why-us-section .why-us-image .media-scene{
  display:block;
  min-height:340px;
  position:relative;
}

/* 3. alan: fan_orbit */
.pmv56 .media-scene.fan-orbit{
  height:340px;
  border-radius:16px;
  overflow:hidden;
  background:
    radial-gradient(120% 90% at 50% 50%, rgba(148,163,255,.08), transparent 60%),
    linear-gradient(180deg, rgba(14,18,40,.82), rgba(12,16,34,.88));
  border:1px solid rgba(255,255,255,.12);
  box-shadow:0 10px 28px rgba(0,0,0,.32), inset 0 0 0 1px rgba(255,255,255,.04);
}

/* merkez kart */
.pmv56 .media-scene.fan-orbit .fo-core{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  text-align:center; padding:14px 16px; border-radius:14px; color:#fff;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); backdrop-filter: blur(6px);
  box-shadow:0 8px 22px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.06);
}
.pmv56 .media-scene.fan-orbit .fo-core strong{ font:900 14px/1 Inter }
.pmv56 .media-scene.fan-orbit .fo-core em{ font:700 11px/1.2 Inter; opacity:.8 }
.pmv56 .media-scene.fan-orbit .fo-core-ring{
  position:absolute; inset:-18px; border-radius:16px; border:1px dashed rgba(255,255,255,.18);
  -webkit-mask: radial-gradient(70% 70% at 50% 50%, transparent 52%, black 53%);
          mask: radial-gradient(70% 70% at 50% 50%, transparent 52%, black 53%);
  animation: foSpin 16s linear infinite;
}
@keyframes foSpin{ to{ transform: rotate(360deg) } }

/* yelpaze çipleri */
.pmv56 .media-scene.fan-orbit .fo-chip{
  --r: 120px; --rot: 0deg; --delay: 0s;
  position:absolute; left:50%; top:50%;
  transform: rotate(var(--rot)) translate(var(--r)) rotate(calc(var(--rot)*-1));
  transform-origin: center;
  padding:8px 12px; border-radius:999px; z-index:3;
  background: linear-gradient(90deg, var(--ac1, #7C3AED), var(--ac2, #22D3EE));
  color:#0b1020; font:800 12.5px/1 Inter; letter-spacing:.2px;
  box-shadow:0 8px 20px rgba(0,0,0,.34);
  animation: foOrbit 10s linear infinite; animation-delay: var(--delay);
}
.pmv56 .media-scene.fan-orbit .fo-chip span{ display:block }
.pmv56 .media-scene.fan-orbit .c1{ --rot:  -8deg;  --delay: .0s }
.pmv56 .media-scene.fan-orbit .c2{ --rot:  22deg;  --delay: .2s }
.pmv56 .media-scene.fan-orbit .c3{ --rot:  52deg;  --delay: .4s }
.pmv56 .media-scene.fan-orbit .c4{ --rot:  82deg;  --delay: .6s }
.pmv56 .media-scene.fan-orbit .c5{ --rot: 112deg;  --delay: .8s }
.pmv56 .media-scene.fan-orbit .c6{ --rot: 142deg;  --delay: 1.0s }
@keyframes foOrbit{
  0%   { transform: rotate(var(--rot)) translate(var(--r)) rotate(calc(var(--rot)*-1)); }
  50%  { transform: rotate(calc(var(--rot) + 6deg)) translate(calc(var(--r) + 8px)) rotate(calc((var(--rot) + 6deg)*-1)); }
  100% { transform: rotate(var(--rot)) translate(var(--r)) rotate(calc(var(--rot)*-1)); }
}

/* parallax noktalar */
.pmv56 .media-scene.fan-orbit .fo-dot{
  position:absolute; width:8px; height:8px; border-radius:999px; background: var(--ac1, #7C3AED);
  box-shadow: 0 0 14px color-mix(in srgb, var(--ac1, #7C3AED) 70%, transparent);
  opacity:.6; animation: foDot 6s ease-in-out infinite;
}
.pmv56 .media-scene.fan-orbit .fo-dot.d1{ left:18%; top:36% }
.pmv56 .media-scene.fan-orbit .fo-dot.d2{ right:16%; top:48%; animation-delay:.4s }
.pmv56 .media-scene.fan-orbit .fo-dot.d3{ left:26%; bottom:18%; animation-delay:.8s }
@keyframes foDot{ 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-8px) } }  

`}</style>
  );
}