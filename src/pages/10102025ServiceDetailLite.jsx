// src/pages/ServiceDetailLite.jsx
// Eski TASARIM (cam/holografik + telefon + timeline) birebir korunarak
// Yeni İÇERİK MİMARİSİ (sections) ile birleştirildi.

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/* ===== THEME: hizmete özel renkler + slayt içerikleri ===== */
const SERVICE_THEMES = {
  google: {
    accents: ["#1a73e8", "#fbbc04"],
    gradients: [
      "linear-gradient(135deg,#1a73e8,#4285f4)",
      "linear-gradient(135deg,#4285f4,#34a853)",
      "linear-gradient(135deg,#fbbc04,#ea4335)",
      "linear-gradient(135deg,#34a853,#1a73e8)",
    ],
    slidesPrimary: [
      { tag: "Search",  text: "Exact • Phrase • Negatif", bg: "linear-gradient(135deg,#1a73e8,#34a853)" },
      { tag: "Shopping",text: "Feed • GMC • PMax",        bg: "linear-gradient(135deg,#fbbc04,#ea4335)" },
      { tag: "YouTube", text: "In-Stream • Discovery",    bg: "linear-gradient(135deg,#ea4335,#1a73e8)" },
    ],
    slidesReverse: [
      { tag: "PMax",    text: "Asset Group • Sinyal",     bg: "linear-gradient(135deg,#34a853,#1a73e8)" },
      { tag: "DSA",     text: "Crawl • Long-tail",        bg: "linear-gradient(135deg,#1a73e8,#fbbc04)" },
      { tag: "Brand",   text: "Exact • Geniş Uyum",       bg: "linear-gradient(135deg,#4285f4,#ea4335)" },
    ],
  },
  meta: {
    accents: ["#1877F2","#8b5cf6"],
    gradients: [
      "linear-gradient(135deg,#0b5cff,#1877F2)",
      "linear-gradient(135deg,#1b64f2,#8b5cf6)",
      "linear-gradient(135deg,#8b5cf6,#0b5cff)",
      "linear-gradient(135deg,#1877F2,#1b64f2)",
    ],
    slidesPrimary: [
      { tag: "Reels",   text: "UGC • Hook → Offer",       bg: "linear-gradient(135deg,#0b5cff,#1877F2)" },
      { tag: "Stories", text: "DPA • Öne Çıkan Ürün",     bg: "linear-gradient(135deg,#8b5cf6,#1877F2)" },
      { tag: "Feed",    text: "Creatives • CTA Test",     bg: "linear-gradient(135deg,#1b64f2,#8b5cf6)" },
    ],
    slidesReverse: [
      { tag: "ASC",     text: "Hybrid • Signals",         bg: "linear-gradient(135deg,#1877F2,#0b5cff)" },
      { tag: "Catalog", text: "DPA • Set’ler",            bg: "linear-gradient(135deg,#8b5cf6,#1b64f2)" },
      { tag: "UGC",     text: "Hook • Problem • CTA",     bg: "linear-gradient(135deg,#0b5cff,#8b5cf6)" },
    ],
  },
  tiktok: {
    accents: ["#000000","#ff0050"],
    gradients: [
      "linear-gradient(135deg,#000,#ff0050)",
      "linear-gradient(135deg,#111,#00f2ea)",
      "linear-gradient(135deg,#ff0050,#00f2ea)",
      "linear-gradient(135deg,#000,#111)",
    ],
    slidesPrimary: [
      { tag: "Spark",   text: "Creator Whitelist",        bg: "linear-gradient(135deg,#000,#ff0050)" },
      { tag: "UGC",     text: "Native • Captions",        bg: "linear-gradient(135deg,#111,#00f2ea)" },
      { tag: "Trends",  text: "Sound • Hashtag",          bg: "linear-gradient(135deg,#ff0050,#00f2ea)" },
    ],
    slidesReverse: [
      { tag: "ASC",     text: "Learning • Scale",         bg: "linear-gradient(135deg,#111,#ff0050)" },
      { tag: "Catalog", text: "DPA • PDP",                bg: "linear-gradient(135deg,#000,#00f2ea)" },
      { tag: "Ads",     text: "Hook • Pattern Break",     bg: "linear-gradient(135deg,#ff0050,#000)" },
    ],
  },
  snapchat: {
    accents: ["#fffc00","#121212"],
    gradients: [
      "linear-gradient(135deg,#fffc00,#ffd400)",
      "linear-gradient(135deg,#ffd400,#121212)",
      "linear-gradient(135deg,#fffc00,#121212)",
      "linear-gradient(135deg,#121212,#fffc00)",
    ],
    slidesPrimary: [
      { tag: "Lens",    text: "AR • Fun • Share",         bg: "linear-gradient(135deg,#fffc00,#ffd400)" },
      { tag: "Story",   text: "Swipe-Up • CTA",           bg: "linear-gradient(135deg,#ffd400,#121212)" },
      { tag: "App",     text: "MMP • CPI/ROAS",           bg: "linear-gradient(135deg,#121212,#fffc00)" },
    ],
    slidesReverse: [
      { tag: "AR",      text: "Face • World",             bg: "linear-gradient(135deg,#fffc00,#121212)" },
      { tag: "Video",   text: "6-sec • TopSnap",          bg: "linear-gradient(135deg,#121212,#ffd400)" },
      { tag: "Retarget",text: "Pixel • Events",           bg: "linear-gradient(135deg,#ffd400,#fffc00)" },
    ],
  },
  linkedin: {
    accents: ["#0a66c2","#004182"],
    gradients: [
      "linear-gradient(135deg,#0a66c2,#004182)",
      "linear-gradient(135deg,#004182,#0a66c2)",
      "linear-gradient(135deg,#0a66c2,#2f7dc3)",
      "linear-gradient(135deg,#2f7dc3,#004182)",
    ],
    slidesPrimary: [
      { tag: "ABM",     text: "Account Lists",            bg: "linear-gradient(135deg,#0a66c2,#004182)" },
      { tag: "Lead Gen",text: "Native Forms",            bg: "linear-gradient(135deg,#004182,#2f7dc3)" },
      { tag: "Content", text: "Doc • Carousel",           bg: "linear-gradient(135deg,#2f7dc3,#0a66c2)" },
    ],
    slidesReverse: [
      { tag: "Webinar", text: "MQL → SQL",                bg: "linear-gradient(135deg,#0a66c2,#2f7dc3)" },
      { tag: "Case",    text: "Proof • Value",            bg: "linear-gradient(135deg,#004182,#0a66c2)" },
      { tag: "Nurture", text: "Retarget • CRM",           bg: "linear-gradient(135deg,#2f7dc3,#004182)" },
    ],
  },
  x: {
    accents: ["#0f1419","#1d9bf0"],
    gradients: [
      "linear-gradient(135deg,#0f1419,#1d9bf0)",
      "linear-gradient(135deg,#0f1419,#4c9ff9)",
      "linear-gradient(135deg,#1d9bf0,#0f1419)",
      "linear-gradient(135deg,#4c9ff9,#0f1419)",
    ],
    slidesPrimary: [
      { tag: "Topic",   text: "Trend • Hashtag",          bg: "linear-gradient(135deg,#0f1419,#1d9bf0)" },
      { tag: "Video",   text: "Conversation Ads",         bg: "linear-gradient(135deg,#0f1419,#4c9ff9)" },
      { tag: "Cards",   text: "Site • App • Lead",        bg: "linear-gradient(135deg,#1d9bf0,#0f1419)" },
    ],
    slidesReverse: [
      { tag: "Keyword", text: "Exact • Negatif",          bg: "linear-gradient(135deg,#0f1419,#1d9bf0)" },
      { tag: "Lookalike",text:"Follower-based",           bg: "linear-gradient(135deg,#1d9bf0,#0f1419)" },
      { tag: "Retarget",text:"View • Click",              bg: "linear-gradient(135deg,#4c9ff9,#0f1419)" },
    ],
  },
  telegram: {
    accents: ["#229ed9","#0e7490"],
    gradients: [
      "linear-gradient(135deg,#229ed9,#0e7490)",
      "linear-gradient(135deg,#0e7490,#229ed9)",
      "linear-gradient(135deg,#229ed9,#33b0e6)",
      "linear-gradient(135deg,#33b0e6,#0e7490)",
    ],
    slidesPrimary: [
      { tag: "Channel", text: "Native Sponsorluk",        bg: "linear-gradient(135deg,#229ed9,#0e7490)" },
      { tag: "Bot",     text: "Lead • Quiz",              bg: "linear-gradient(135deg,#0e7490,#229ed9)" },
      { tag: "Post",    text: "Pinned • CTA",             bg: "linear-gradient(135deg,#229ed9,#33b0e6)" },
    ],
    slidesReverse: [
      { tag: "Whitelist",text:"Fraud Check",              bg: "linear-gradient(135deg,#0e7490,#229ed9)" },
      { tag: "Retarget", text:"Click • View",             bg: "linear-gradient(135deg,#229ed9,#0e7490)" },
      { tag: "Report",  text:"Real Engagement",           bg: "linear-gradient(135deg,#33b0e6,#0e7490)" },
    ],
  },
  yandex: {
    accents: ["#ffcc00","#e53935"],
    gradients: [
      "linear-gradient(135deg,#ffcc00,#e53935)",
      "linear-gradient(135deg,#e53935,#ffcc00)",
      "linear-gradient(135deg,#ffb300,#e53935)",
      "linear-gradient(135deg,#e53935,#ffb300)",
    ],
    slidesPrimary: [
      { tag: "Direct",  text: "Phrase • Negatif",         bg: "linear-gradient(135deg,#ffcc00,#e53935)" },
      { tag: "Market",  text: "Feed • Kategoriler",       bg: "linear-gradient(135deg,#e53935,#ffcc00)" },
      { tag: "Display", text: "Banner • Video",           bg: "linear-gradient(135deg,#ffb300,#e53935)" },
    ],
    slidesReverse: [
      { tag: "Metrica", text: "Goal • Segment",           bg: "linear-gradient(135deg,#e53935,#ffcc00)" },
      { tag: "Retarget",text:"Audience • CRM",            bg: "linear-gradient(135deg,#ffcc00,#e53935)" },
      { tag: "Brand",   text:"Rusça Adaptasyon",          bg: "linear-gradient(135deg,#ffb300,#e53935)" },
    ],
  },
  programmatic: {
    accents: ["#111827","#8b5cf6"],
    gradients: [
      "linear-gradient(135deg,#111827,#8b5cf6)",
      "linear-gradient(135deg,#0f172a,#4f46e5)",
      "linear-gradient(135deg,#1f2937,#a78bfa)",
      "linear-gradient(135deg,#111827,#4f46e5)",
    ],
    slidesPrimary: [
      { tag: "PMP",     text: "Whitelisted",              bg: "linear-gradient(135deg,#111827,#8b5cf6)" },
      { tag: "RTB",     text: "Brand Safety",             bg: "linear-gradient(135deg,#0f172a,#4f46e5)" },
      { tag: "DCO",     text: "Dinamik Kreatif",          bg: "linear-gradient(135deg,#1f2937,#a78bfa)" },
    ],
    slidesReverse: [
      { tag: "Data",    text: "1P/3P Segment",            bg: "linear-gradient(135deg,#111827,#4f46e5)" },
      { tag: "Freq",    text: "Cap • Viewability",        bg: "linear-gradient(135deg,#0f172a,#8b5cf6)" },
      { tag: "Lift",    text: "Incremental",              bg: "linear-gradient(135deg,#1f2937,#4f46e5)" },
    ],
  },
  reporting: {
    accents: ["#0ea5e9","#22c55e"],
    gradients: [
      "linear-gradient(135deg,#0ea5e9,#22c55e)",
      "linear-gradient(135deg,#0284c7,#0ea5e9)",
      "linear-gradient(135deg,#22c55e,#16a34a)",
      "linear-gradient(135deg,#0ea5e9,#16a34a)",
    ],
    slidesPrimary: [
      { tag: "GA4",     text: "Events • EC",              bg: "linear-gradient(135deg,#0284c7,#0ea5e9)" },
      { tag: "Blender", text: "Ads + CRM",                bg: "linear-gradient(135deg,#0ea5e9,#22c55e)" },
      { tag: "Alerts",  text: "Anomali • Hedef",          bg: "linear-gradient(135deg,#22c55e,#16a34a)" },
    ],
    slidesReverse: [
      { tag: "Model",   text: "UTM • Schema",             bg: "linear-gradient(135deg,#0ea5e9,#22c55e)" },
      { tag: "Pano",    text: "Role-based",               bg: "linear-gradient(135deg,#0284c7,#16a34a)" },
      { tag: "Actions", text: "Haftalık Plan",            bg: "linear-gradient(135deg,#22c55e,#0ea5e9)" },
    ],
  },
  uiux: {
    accents: ["#0ea5e9","#a855f7"],
    gradients: [
      "linear-gradient(135deg,#0ea5e9,#a855f7)",
      "linear-gradient(135deg,#0891b2,#7c3aed)",
      "linear-gradient(135deg,#38bdf8,#a78bfa)",
      "linear-gradient(135deg,#0ea5e9,#7c3aed)",
    ],
    slidesPrimary: [
      { tag: "Wire",    text: "Akış • Hiyerarşi",         bg: "linear-gradient(135deg,#0891b2,#7c3aed)" },
      { tag: "UI Kit",  text: "Bileşenler",               bg: "linear-gradient(135deg,#0ea5e9,#a855f7)" },
      { tag: "A/B",     text: "CTA • Layout",             bg: "linear-gradient(135deg,#38bdf8,#a78bfa)" },
    ],
    slidesReverse: [
      { tag: "CWV",     text: "Hız • A11y",               bg: "linear-gradient(135deg,#0891b2,#a855f7)" },
      { tag: "Visual",  text: "Hero • Product",           bg: "linear-gradient(135deg,#0ea5e9,#7c3aed)" },
      { tag: "Assets",  text: "Banner • Video",           bg: "linear-gradient(135deg,#38bdf8,#7c3aed)" },
    ],
  },
  consulting: {
    accents: ["#334155","#8b5cf6"],
    gradients: [
      "linear-gradient(135deg,#334155,#8b5cf6)",
      "linear-gradient(135deg,#1f2937,#4f46e5)",
      "linear-gradient(135deg,#475569,#a78bfa)",
      "linear-gradient(135deg,#334155,#4f46e5)",
    ],
    slidesPrimary: [
      { tag: "North Star", text: "KPI • ROAS/CAC",       bg: "linear-gradient(135deg,#334155,#8b5cf6)" },
      { tag: "Roadmap",    text: "Sprint • Öncelik",     bg: "linear-gradient(135deg,#1f2937,#4f46e5)" },
      { tag: "Ops",        text: "Ritim • Dashboard",    bg: "linear-gradient(135deg,#475569,#a78bfa)" },
    ],
    slidesReverse: [
      { tag: "Audit",      text: "Kanal & Ürün",         bg: "linear-gradient(135deg,#334155,#4f46e5)" },
      { tag: "Budget",     text: "Dağılım • Tavan",      bg: "linear-gradient(135deg,#1f2937,#8b5cf6)" },
      { tag: "Scale",      text: "Yeni Pazar",           bg: "linear-gradient(135deg,#475569,#4f46e5)" },
    ],
  },
};

/* -------- Reveal-on-scroll -------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".pmv56 .reveal");
    const io = new IntersectionObserver(
      (ents) =>
        ents.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ===== HERO Gradient Cross-fade ===== */
function HeroGradientCycler({ interval = 4000, fade = 1400, gradients = [] }) {
  const G = gradients.length ? gradients : [
    "linear-gradient(135deg,#5B21B6 0%,#7C3AED 100%)",
    "linear-gradient(135deg,#4C1D95 0%,#7C3AED 100%)",
    "linear-gradient(135deg,#6D28D9 0%,#5B21B6 100%)",
    "linear-gradient(135deg,#7C3AED 0%,#9333EA 100%)",
  ];
  const [front, setFront]   = useState(0);
  const [back, setBack]     = useState(1);
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      const next = ((showFront ? back : front) + 1) % G.length;
      if (showFront) setBack(next);
      else setFront(next);
      setShowFront((s) => !s);
    }, interval);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFront, front, back, interval, gradients.join("|")]);

  return (
    <>
      <div
        className="hero-grad"
        style={{ backgroundImage: G[front], opacity: showFront ? 1 : 0, transition: `opacity ${fade}ms ease` }}
      />
      <div
        className="hero-grad"
        style={{ backgroundImage: G[back], opacity: showFront ? 0 : 1, transition: `opacity ${fade}ms ease` }}
      />
    </>
  );
}
/* ====== Slayt Telefon (ESKİ cam panel) ====== */
function SlidePhoneClassic({ slides = [] }) {
  return (
    <div className="ad-phone">
      <div className="ad-notch" />
      <div className="ad-slider">
        <div className="ad-track">
          {slides.slice(0,3).map((s, i) => (
            <div className={`ad-slide d${i}`} key={i} style={{ background: s.bg }}>
              <div className="ad-tag">{s.tag}</div>
              <strong>{s.text}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
/* -------- Scoped styles (PMV56) — TAM ESKİ TASARIM -------- */
function PMV56Styles() {
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
/* ===== look: vivid-clean ===== */
.pmv56 .usp-grid.look-vivid-clean{gap:20px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.pmv56 .usp-grid.look-vivid-clean .usp-card{
  position:relative;padding:20px;border-radius:16px;background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  box-shadow:0 6px 18px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.05);
  transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.pmv56 .usp-grid.look-vivid-clean .usp-card:hover{
  transform:translateY(-3px);
  border-color:rgba(255,255,255,.18);
  box-shadow:0 12px 28px rgba(0,0,0,.45);
}
.pmv56 .usp-grid.look-vivid-clean .usp-card h3{
  margin:0 0 8px;font-weight:900;color:#eaf0ff;font-size:16px;letter-spacing:.2px;
}
.pmv56 .usp-grid.look-vivid-clean .usp-card p{
  margin:0;color:rgba(226,232,255,.78);font-size:13.6px;line-height:1.55;white-space:pre-line;
}
.pmv56 .usp-grid.look-vivid-clean .usp-card .badge-num{
  position:absolute;top:12px;right:12px;background:linear-gradient(135deg,var(--g1),var(--g2));
  color:#fff;font-weight:800;padding:4px 8px;border-radius:999px;font-size:11px;
}

/* ===== look: clean-minimal ===== */
.pmv56 .usp-grid.look-clean-minimal{gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.pmv56 .usp-grid.look-clean-minimal .usp-card{
  background:transparent;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:18px;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.04);transition:transform .18s ease,box-shadow .18s ease;
}
.pmv56 .usp-grid.look-clean-minimal .usp-card:hover{
  transform:translateY(-2px);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 6px 16px rgba(0,0,0,.25);
}
.pmv56 .usp-grid.look-clean-minimal .usp-card h3{margin:0 0 6px;color:#f0f4ff;font-weight:800;font-size:15px}
.pmv56 .usp-grid.look-clean-minimal .usp-card p{margin:0;color:#cdd4f5;font-size:13.5px}

/* Extra padding fixes */
@media(max-width:768px){
  .pmv56 .usp-grid.look-stripe .usp-card,
  .pmv56 .usp-grid.look-vivid-clean .usp-card,
  .pmv56 .usp-grid.look-clean-minimal .usp-card{
    padding:16px 14px;
  }
}
`}</style>
  );
}