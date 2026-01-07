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
.pmv56 .usp-grid.look-neo .usp-card p{margin:0;color:var(--ink-muted);font-size:13.5px;white-space:pre-line}
.pmv56 .usp-grid.look-neo .usp-card .badge-num{display:none}
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

.pmv56 .usp-grid.look-vivid .usp-card:hover::before {
  opacity: 1;
}

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

.pmv56 .usp-grid.look-vivid-clean .usp-card:hover::before {
  opacity: 1;
}

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

.pmv56 .usp-grid.look-vivid-clean .usp-card .badge-num {
  display: none !important;
}
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

/* Üst başlık satırı */
.pmv56 .usp-grid.look-onair .usp-card .toprow{
  display:flex; align-items:center; gap:10px; margin-bottom:8px;
}

.pmv56 .usp-grid.look-onair .usp-card .card-icon{
  width:18px; height:18px; flex:0 0 18px; border-radius:4px; 
  background: rgba(255,255,255,.08);
  display:grid; place-items:center; overflow:hidden;
}
.pmv56 .usp-grid.look-onair .usp-card .card-icon img{ width:100%; height:100%; object-fit:cover }

/* Başlık & metin */
.pmv56 .usp-grid.look-onair .usp-card h3{
  margin:0; font-weight:900; letter-spacing:.2px; color:#EEF2FF;
  font-size:15.8px; line-height:1.25;
}
.pmv56 .usp-grid.look-onair .usp-card p{
  margin:8px 0 0; color:rgba(226,232,255,.78); font-size:13.6px; line-height:1.5;
  white-space:pre-line;
}

/* Sağ üst küçük numara (Ads On Air’deki gibi) */
.pmv56 .usp-grid.look-onair .usp-card .badge-num{
  position:absolute; top:12px; right:12px;
  display:inline-grid; place-items:center;
  min-width:28px; height:22px; padding:0 8px; border-radius:999px;
  font: 900 11px/1 Inter; letter-spacing:.2px; color:#0b0f1e;
  background: linear-gradient(135deg, var(--g1), var(--g2));
  box-shadow: 0 6px 16px rgba(124,58,237,.28);
}

/* Alt bilgi (opsiyonel meta) */
.pmv56 .usp-grid.look-onair .usp-card .meta{
  margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;
}
.pmv56 .usp-grid.look-onair .usp-card .meta .pill{
  font:700 11.5px/1 Inter; letter-spacing:.2px;
  color:#E2E8F0; padding:6px 10px; border-radius:999px;
  background:rgba(148,163,255,.10); border:1px solid rgba(148,163,255,.18);
}
/* Meta */
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
`}</style>
  );
}

/* -------- SECTION BİLEŞENLERİ (eski düzenle birebir) -------- */
function SectionHero({ title, body, themeKey }) {
  const gradients = (SERVICE_THEMES[themeKey] || {}).gradients || [];
  return (
    <section className="hero">
      <HeroGradientCycler gradients={gradients} />
      <div className="container">
        <p className="breadcrumb reveal"><Link to="/">Anasayfa</Link> › {title}</p>
        <h1 className="reveal">{title}</h1>
        <p className="lede reveal" style={{whiteSpace:"pre-line"}}>{body}</p>
        <div className="actions reveal" style={{ transitionDelay: "0.2s" }}>
          <a className="btn" href="#contact">Hemen Başlayalım</a>
        </div>
      </div>
    </section>
  );
}

function SectionList({ title, desc, items = [], look = "onair" }) {
  return (
    <section className="section" data-look={look}>
      <div className="container">
        {title && <h2 className="reveal">{title}</h2>}
        {desc && (
          <p className="subheader reveal" style={{ transitionDelay: ".08s" }}>
            {desc}
          </p>
        )}

        {/* Önemli: class tam olarak 'usp-grid look-ONAIR' olsun */}
        <div className={`usp-grid look-${look || "onair"}`}>
          {items.map((it, i) => (
            <div
              key={i}
              className="usp-card reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="badge-num">{String(i + 1).padStart(2, "0")}</span>

              <div className="toprow">
                {/* ikon koymadıysan bu span otomatik gizli değil; o yüzden koşullu */}
                {it.icon ? (
                  <span className="card-icon">
                    <img src={it.icon} alt="" />
                  </span>
                ) : null}
                <h3>{it.t}</h3>
              </div>

              {it.d && <p>{it.d}</p>}

              {Array.isArray(it.meta) && it.meta.length ? (
                <div className="meta">
                  {it.meta.map((m, k) => (
                    <span className="pill" key={k}>
                      {m}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* -------- PlacementShowcase: hizmete özgü “reklam alanı” maketleri -------- */
function PlacementShowcase({ themeKey }) {
  const tk = (themeKey || "").toLowerCase();

  // Tema renkleri (sağ panel highlight)
  const t = SERVICE_THEMES[tk] || {};
  const [ac1="#7C3AED", ac2="#22D3EE"] = t.accents || [];

  // Basit güvenlik: bilinmiyorsa Google maketine düş
  const key = ["google","meta","tiktok","linkedin","x","telegram","yandex"].includes(tk) ? tk : "google";

  return (
    <div className="psc" style={{"--ac1": ac1, "--ac2": ac2}}>
{key === "google"   && <InventoryHubGoogle themeKey={themeKey} />}   
   {key === "meta"     && <PSC_Meta     />}
      {key === "yandex"   && <PSC_Yandex   />}
      {key === "tiktok"   && <PSC_TikTok   />}
      {key === "linkedin" && <PSC_LinkedIn />}
      {key === "x"        && <PSC_X        />}
      {key === "telegram" && <PSC_Telegram />}
    </div>
  );
}

/* === MAKETLER === */

/* ==== GOOGLE: Inventory Hub (ikonlu) ==== */
function InventoryHubGoogle({ themeKey }) {
  const t = SERVICE_THEMES[themeKey] || {};
  const [ac1="#1a73e8", ac2="#34a853"] = t.accents || ["#7C3AED","#22D3EE"]; // temadan çek
  return (
    <div className="hub-scene" data-ac1={ac1} data-ac2={ac2}>
      {/* Bağlantı çizgileri (dashed, yumuşak animasyon) */}
      <i className="hub-link l-yt" />
      <i className="hub-link l-display" />
      <i className="hub-link l-search" />
      <i className="hub-link l-discover" />
      <i className="hub-link l-gmail" />
      <i className="hub-link l-maps" />

      {/* Orta: Google Ads “A” logosu */}
      <div className="hub-center">
        <IconGoogleAds />
        <strong>Google Ads</strong>
      </div>

      {/* Uç düğümler */}
      <div className="hub-node n-yt"><div className="tile"><IconYouTube /><span>YouTube</span></div></div>
      <div className="hub-node n-display"><div className="tile"><IconDisplay /><span>Display</span></div></div>
      <div className="hub-node n-search"><div className="tile"><IconSearch /><span>Search</span></div></div>
      <div className="hub-node n-discover"><div className="tile"><IconDiscover /><span>Discover</span></div></div>
      <div className="hub-node n-gmail"><div className="tile"><IconGmail /><span>Gmail</span></div></div>
      <div className="hub-node n-maps"><div className="tile"><IconMaps /><span>Maps</span></div></div>
    </div>
  );
}

/* ==== Basit, telifsiz SVG ikonları (stilize) ==== */
function IconGoogleAds(){ return (
  <svg width="28" height="28" viewBox="0 0 48 48" aria-hidden>
    <defs>
      <linearGradient id="ga1" x1="0" x2="1">
        <stop offset="0" stopColor="#1a73e8"/><stop offset="1" stopColor="#34a853"/>
      </linearGradient>
    </defs>
    {/* stilize A şekli */}
    <path d="M9 38 L24 8 a4 4 0 0 1 7 0 L46 38" fill="none" stroke="url(#ga1)" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="10" cy="38" r="4" fill="#fbbc04"/>
  </svg>
);}

function IconYouTube(){ return (
  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden>
    <rect x="6" y="12" rx="8" ry="8" width="36" height="24" fill="#ff0033"/>
    <polygon points="22,18 33,24 22,30" fill="#fff"/>
  </svg>
);}

function IconDisplay(){ return (
  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden>
    <rect x="6" y="10" width="36" height="24" rx="4" fill="#10b981"/>
    <rect x="10" y="14" width="28" height="8" rx="2" fill="#eafff6" opacity=".85"/>
    <rect x="10" y="24" width="20" height="6" rx="2" fill="#eafff6" opacity=".7"/>
  </svg>
);}

function IconSearch(){ return (
  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden>
    <circle cx="21" cy="21" r="12" fill="#1a73e8" opacity=".22"/>
    <circle cx="21" cy="21" r="10" stroke="#1a73e8" strokeWidth="4" fill="none"/>
    <line x1="30" y1="30" x2="40" y2="40" stroke="#1a73e8" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);}

function IconDiscover(){ return (
  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden>
    <g transform="translate(24,24)">
      <circle r="6" fill="#ffb300"/>
      <g strokeWidth="4" strokeLinecap="round">
        <line y1="-16" y2="-8" stroke="#1a73e8"/>
        <line y1="8" y2="16" stroke="#34a853"/>
        <line x1="-16" x2="-8" stroke="#ea4335"/>
        <line x1="8" x2="16" stroke="#fbbc04"/>
        <line x1="-12" y1="-12" x2="-6" y2="-6" stroke="#34a853"/>
        <line x1="6" y1="6" x2="12" y2="12" stroke="#1a73e8"/>
      </g>
    </g>
  </svg>
);}

function IconGmail(){ return (
  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden>
    <rect x="6" y="12" width="36" height="24" rx="4" fill="#fff"/>
    <path d="M6 16 L24 28 L42 16" fill="none" stroke="#ea4335" strokeWidth="4"/>
    <path d="M10 12 L24 22 L38 12" fill="none" stroke="#34a853" strokeWidth="4"/>
    <path d="M6 12 H42" stroke="#1a73e8" strokeWidth="2" opacity=".4"/>
  </svg>
);}

function IconMaps(){ return (
  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#e0f2fe"/>
    <path d="M10 34 L20 24 L30 30 L38 18" fill="none" stroke="#0284c7" strokeWidth="3"/>
    <g transform="translate(30,20)">
      <path d="M0-8 a6 6 0 1 1 0 12 C-1 6 -3 10 0 14 C3 10 1 6 0 4 Z" fill="#ef4444"/>
      <circle cx="0" cy="-2" r="3" fill="#fff"/>
    </g>
  </svg>
);}

/* Meta: Feed + Stories + Reels */
function PSC_Meta(){
  return (
    <div className="psc-wrap meta">
      <div className="psc-card feed">
        <div className="head"><i className="avatar"/><i className="name"/></div>
        <div className="img shimmer" />
        <div className="cta">Sponsored • Learn More</div>
      </div>

      <div className="psc-card stories">
        {[...Array(7)].map((_,i)=>(<span className="bubble" key={i}/>))}
      </div>

      <div className="psc-card reels">
        <div className="v shimmer" />
        <div className="actions"><i/><i/><i/></div>
      </div>
    </div>
  );
}

/* Yandex: Russian-style SERP + banner */
function PSC_Yandex(){
  return (
    <div className="psc-wrap yandex">
      <div className="psc-card search">
        <div className="hdr">Поиск</div>
        <div className="row ad"><span className="badge">Реклама</span><i className="t"/></div>
        <div className="row"><i className="t"/></div>
        <div className="row"><i className="t short"/></div>
      </div>
      <div className="psc-card banner">
        <div className="img shimmer"/>
        <div className="copy"><i/><i className="short"/></div>
      </div>
    </div>
  );
}

/* Diğer maketler minimal (aynı dil) */
function PSC_TikTok(){
  return (
    <div className="psc-wrap shortvideo">
      <div className="psc-card tt">
        <div className="v shimmer" />
        <div className="right">
          {[...Array(4)].map((_,i)=>(<i key={i}/>))}
        </div>
        <div className="caption"><i className="wide"/></div>
      </div>
    </div>
  );
}
function PSC_LinkedIn(){
  return (
    <div className="psc-wrap linkedin">
      <div className="psc-card li">
        <div className="row"><i className="logo"/><i className="line"/></div>
        <div className="hero shimmer" />
        <div className="meta"><i/><i className="short"/></div>
      </div>
    </div>
  );
}
function PSC_X(){
  return (
    <div className="psc-wrap x">
      <div className="psc-card tweet">
        <div className="meta"><i className="avatar"/><i className="name"/></div>
        <div className="img shimmer"/>
        <div className="cta">Promoted</div>
      </div>
    </div>
  );
}
function PSC_Telegram(){
  return (
    <div className="psc-wrap telegram">
      <div className="psc-card post">
        <div className="ch"><i className="avatar"/><i className="name"/></div>
        <div className="img shimmer"/>
        <div className="btns"><i/><i/></div>
      </div>
    </div>
  );
}

/* -------- 4. ALAN v4: Sol KARTLAR + Sağ “Google Ads Ekosistemi” sahnesi -------- */
function SectionTypesAnimated({ title, desc, items = [], themeKey, basePath="/hizmeticonlar" }) {
  // Sol kartlar (değiştirmene gerek yok)
  const L = (items?.length ? items : [
    { t:"Arama Ağı Reklamları", d:"Niyet sinyali yüksek aramalar." },
    { t:"Görüntülü Reklam Ağı", d:"GDN envanteriyle görünürlük." },
    { t:"YouTube Reklamları",   d:"Video ile dikkat ve etki." },
    { t:"Alışveriş Reklamları", d:"Ürün feed → satın alma." },
    { t:"Uygulama Reklamları",  d:"Kurulum ve in-app aksiyon." },
    { t:"Discovery Reklamları", d:"Keşif akışında çoklu format." }
  ]).slice(0,6);

  // Tema renkleri (ışıma ve vurgu)
  const t = SERVICE_THEMES[themeKey] || {};
  const [ac1 = "#1a73e8", ac2 = "#34a853"] = t.accents || ["#7C3AED","#22D3EE"];

  // İkon yolları
  const ICON = {
    center: `${basePath}/googleadslogo.png`,
    search: `${basePath}/google_search.png`,
    youtube:`${basePath}/google_youtube.png`,
    display:`${basePath}/google_display.svg`,
    discover:`${basePath}/google_discovery.png`,
    gmail:  `${basePath}/google_gmail.png`,
    maps:   `${basePath}/google_maps.png`,
  };

  return (
    <section className="section types-section">
      <div className="container">
        <div className="types-split">
          {/* SOL: kartlar */}
          <div className="types-left reveal">
            <h2>{title || "Reklam Türleri"}</h2>
            {desc ? <p className="subheader" style={{margin:0}}>{desc}</p> : null}
            <div className="types-cards-grid neo">
              {L.map((it,i)=>(
                <div className="types-card neo" key={i} style={{ transitionDelay: `${i*0.05}s` }}>
                  <span className="badge-num">{String(i+1).padStart(2,"0")}</span>
                  {it.t ? <h3>{it.t}</h3> : null}
                  {it.d ? <p>{it.d}</p> : null}
                </div>
              ))}
            </div>
          </div>

          {/* SAĞ: Google Ads ekosistemi sahnesi */}
          <aside className="types-right reveal" style={{transitionDelay:".12s"}}>
            <div className="ecosys" style={{"--ac1":ac1, "--ac2":ac2}}>
              {/* arkaplan ızgara + parlama */}
              <div className="eco-bg" />
              {/* bağlantı çizgileri (SVG) */}
              <svg className="eco-links" viewBox="0 0 560 420" preserveAspectRatio="none">
                {/* merkezden uydulara giden yollar */}
                <defs>
                  <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"  stopColor="rgba(255,255,255,.0)"/>
                    <stop offset="45%" stopColor="rgba(255,255,255,.55)"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,.0)"/>
                  </linearGradient>
                  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" />
                  </filter>
                </defs>

                {/* 6 bağlantı – hafif farklı yollar */}
                <path d="M280,220 C330,180 380,170 440,150" className="eco-path p1"/>
                <path d="M280,220 C330,250 390,265 455,300" className="eco-path p2"/>
                <path d="M280,220 C240,170 190,160 120,150" className="eco-path p3"/>
                <path d="M280,220 C230,250 180,280 110,305" className="eco-path p4"/>
                <path d="M280,220 C340,210 395,210 455,220" className="eco-path p5"/>
                <path d="M280,220 C220,210 165,210 105,220" className="eco-path p6"/>

                {/* akış “pulse” */}
                {[...Array(12)].map((_,i)=>(
                  <circle key={i} r="3" className={`eco-pulse d${(i%6)+1}`} />
                ))}
              </svg>

              {/* merkez kart */}
              <div className="eco-center">
                <img src={ICON.center} alt="Google Ads" />
                <strong>Google Ads</strong>
                <em>Signals • Bidding • Delivery</em>
              </div>

              {/* uydular */}
              <EcoNode x="458" y="140" label="YouTube"  img={ICON.youtube}  pill="Video" />
              <EcoNode x="460" y="300" label="Discover" img={ICON.discover} pill="Feed" />
              <EcoNode x="100" y="145" label="Search"   img={ICON.search}   pill="Text" />
              <EcoNode x="100" y="305" label="Display"  img={ICON.display}  pill="GDN" />
              <EcoNode x="458" y="220" label="Gmail"    img={ICON.gmail}    pill="Promo" />
              <EcoNode x="100" y="220" label="Maps"     img={ICON.maps}     pill="Local" />
            </div>
            <p className="mini-legend" style={{marginTop:10}}>
              <span>Merkez: Google Ads</span> • <span>Çevre: Envanterler</span> • <span>Akış: Trafik → Teslimat</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* --- tekil uydu node --- */
function EcoNode({ x, y, img, label, pill }) {
  return (
    <div className="eco-node" style={{ left:x, top:y }}>
      <div className="eco-badge">{pill}</div>
      <div className="eco-chip">
        <span>{label}</span>
      </div>
    </div>
  );
}

/* MEDYA BANDI: Eski “why-us” görünümünün aynısı */
function SectionMedia({ title, body, themeKey, side = "right", metrics = [], slidesKey = "slidesPrimary" }) {
  const theme = SERVICE_THEMES[themeKey] || {};
  const slides = theme[slidesKey] || [];
  const reverse = side === "left";
  return (
    <section className="why-us-section">
      <div className="container">
        <div className={`why-us-content ${reverse ? "reverse" : ""}`}>
          {!reverse && (
            <div className="why-us-text reveal">
              <h2>{title}</h2>
              {body ? <p>{body}</p> : null}
              {!!metrics.length && (
                <a className="btn ghost" href="#contact" style={{ color: "#fff", borderColor: "rgba(255,255,255,.3)", marginTop: 8 }}>
                  Detaylı Bilgi Alın
                </a>
              )}
            </div>
          )}

          <div className="why-us-image reveal" style={{ transitionDelay: ".15s" }}>
            <SlidePhoneClassic slides={slides} />
            <div className="metric-row">
              {(metrics.length ? metrics : [
                { label: "ROAS", value: "5.2x" },
                { label: "CTR",  value: "2.9%" },
                { label: "CPA",  value: "₺89"  },
              ]).slice(0,3).map((m,i)=>(
                <div className="metric" key={i}>
                  <h4>{m.label}</h4>
                  <strong>{m.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {reverse && (
            <div className="why-us-text reveal" style={{ transitionDelay: ".1s" }}>
              <h2>{title}</h2>
              {body ? <p>{body}</p> : null}
              {!!metrics.length && (
                <a className="btn ghost" href="#contact" style={{ color: "#fff", borderColor: "rgba(255,255,255,.3)", marginTop: 8 }}>
                  Detaylı Bilgi Alın
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* PROCESS: Eski timeline alanı */
function SectionProcess({ title, desc, items = [], labels = ["HEDEF","KURULUM","TEST","OPTİMİZE","ÖLÇEKLE"] }) {
  return (
    <section className="section" style={{ background: "transparent" }}>
      <div className="container">
        <h2 id="process-steps" className="reveal">{title}</h2>
        {desc ? <p className="subheader reveal" style={{transitionDelay:".1s"}}>{desc}</p> : null}

        <div className="process-content-wrapper">
          <div className="process-list">
            {items.map((st, i) => (
              <div className="process-step reveal" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="step-header-group">
                  <span className="step-number-tag">{i + 1}</span>
                  <h3 className="step-title">{st.t}</h3>
                </div>
                <p>{st.d}</p>
              </div>
            ))}
          </div>

          <div className="process-animation-area reveal" style={{ transitionDelay: ".45s" }}>
            <div className="tl-wrap">
              <div className="runner">
                <div className="trail" />
                <div className="dot" />
              </div>
              <div className="labels">
                {labels.map((lb,i)=>(<span key={i}>{lb}</span>))}
              </div>
              <div className="kpi">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CTA: Eski form kartı */
function SectionCTA({ title, body }) {
  return (
    <section className="final-cta-section" id="contact">
      <div className="container">
        <div className="cta-form-card reveal">
          <h3>{title || "Birlikte büyütelim"}</h3>
          <p>{body || "Hemen iletişime geçin, stratejinizi kuralım."}</p>
          <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" placeholder="Ad Soyad" required />
            <input type="tel" placeholder="Telefon Numarası" required />
            <input type="email" placeholder="E-posta Adresi" required />
            <button className="btn" type="submit">Danışmanlık Randevusu Oluştur</button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* Serbest metin bölümü (gövde) */
function SectionText({ title, body }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal">{title}</h2>
        <p className="subheader reveal" style={{transitionDelay:".08s", whiteSpace:"pre-line"}}>{body}</p>
      </div>
    </section>
  );
}

/* ===== Page composer from sections ===== */
function ServiceComposer({ themeKey, sections }) {
  useReveal();
  return (
    <main className="pmv56">
      <PMV56Styles />
      {sections.map((s, idx) => {
        if (s.type === "hero")    return <SectionHero key={idx} title={s.title} body={s.body} themeKey={themeKey} />;


        if (s.type === "list")
          return (
            <SectionList
              key={idx}
              title={s.title}
              desc={s.desc}
              items={s.items}
              look={s.look || "glass"}
            />
          );

        if (s.type === "media")   return <SectionMedia   key={idx} title={s.title} body={s.body} themeKey={themeKey} side={s.side} metrics={s.metrics||[]} slidesKey={s.slidesKey||"slidesPrimary"} />;
        if (s.type === "process") return <SectionProcess key={idx} title={s.title} desc={s.desc} items={s.items||[]} labels={s.labels||undefined} />;
        if (s.type === "cta")     return <SectionCTA     key={idx} title={s.title} body={s.body} />;
        return <SectionText key={idx} title={s.title} body={s.body} />;
      })}
    </main>
  );
}

/* ===== İÇERİK (senin gönderdiğin) ===== */
/* GOOGLE */
const CONTENT_GOOGLE = [
 { type:"hero", title:"Google Reklamları", body:
`AdsHigh olarak, markanızın satış hedeflerini veriye dayalı stratejilerle şekillendiriyor, reklam bütçenizin her kuruşunu ölçülebilir sonuçlara dönüştürüyoruz.Google Ads’in sunduğu gelişmiş hedefleme, otomasyon ve yapay zekâ destekli optimizasyon olanaklarını kullanarak markanızın görünürlüğünü artırır, dönüşüm oranlarını yükseltiriz.

Amacımız yalnızca tıklama almak değil; satış, etkileşim ve sürdürülebilir dijital büyümedir.Kampanyalarınızı gerçek zamanlı performans verileriyle izler, sürekli optimizasyon yaparak her adımda daha yüksek verim elde ederiz.Google reklamlarını, markanızın dijital başarısının merkezine yerleştiririz.` },
 { type:"list", look:"vivid-clean", title:"Stratejimiz", items:[
   { t:"Veri Odaklı Strateji", d:"Her kampanyayı sezgilerle değil, gerçek verilerle yönetiyoruz. Tüm kararlarımız ölçümlenebilir sonuçlara ve yapay zekâ destekli analizlere dayanır." },
   { t:"Yapay Zekâ Destekli Optimizasyon", d:"Reklam süreçlerini manuel değil, akıllı otomasyonlarla yönetiyoruz. Google Ads algoritmalarını ve kendi analiz sistemlerimizi birleştirerek kampanyaları anlık optimize ediyor, dönüşüm maliyetini düşürüp performansı sürekli artırıyoruz." },
   { t:"Şeffaf Raporlama ve Sürekli Optimizasyon", d:"Her adımı takip edilebilir, her sonuç ölçülebilir. Kampanyalarınızı düzenli raporlarla sunuyor, performansı sürekli geliştiriyoruz." },
 ]},
 { type:"media", title:"Google Reklamlarının Faydaları", body:
`Google Ads, markaların dijitalde büyümesini hızlandıran en güçlü performans platformudur.
Kullanıcı niyeti, hedefleme gücü ve yapay zekâ destekli optimizasyon sayesinde her bütçeyi ölçülebilir sonuca dönüştürür.
AdsHigh olarak, Google’ın gelişmiş reklam ağlarını uçtan uca stratejik biçimde yönetiyoruz.
Arama Ağı Reklamlarıyla satın alma niyeti yüksek kullanıcıları hedefler,
Görüntülü Reklam Ağıyla marka bilinirliğini artırır,
Video ve YouTube kampanyalarıyla etkileşimi güçlendiririz.
Performans Maksimum kampanyaları, yapay zekâ desteğiyle tüm ağlarda en yüksek dönüşümü sağlar.
Uygulama Reklamlarıyla indirme ve etkileşim oranlarını artırır,
Yerel kampanyalarla mağaza trafiğini destekleriz. 
Google’ın detaylı analiz ve raporlama altyapısıyla her kampanyanın performansını anlık olarak ölçer,optimizasyon süreçleriyle yatırım getirisini (ROI) sürekli yükseltiriz.
Sonuç olarak Google reklamları, markalar için erişimden satışa, farkındalıktan sürdürülebilir büyümeye kadar eksiksiz bir dijital değer zinciri oluşturur.`},
 { type:"list", look:"onair",title:"Google Reklam Türleri", desc:
"Google Ads, dijital dünyada markaların hedef kitlelerine ulaşmasını, satışlarını artırmasını ve marka görünürlüğünü güçlendirmesini sağlayan en kapsamlı reklam ekosistemidir.\nAdsHigh olarak, her kampanya türünü performans hedeflerinize göre planlıyor, dönüşüm odaklı biçimde yönetiyoruz.",
   items: [
     { t:"Arama Ağı Reklamları (Search Ads)", d:"Kullanıcıların Google’da belirli kelimeleri aradığı anda görünür. Satın alma niyeti yüksek kitleye doğrudan ulaşır." },
     { t:"Görüntülü Reklam Ağı (Display Ads)", d:"Milyonlarca web sitesi, uygulama ve YouTube ağı üzerinde markanızın görünürlüğünü artırır, farkındalık oluşturur." },
     { t:"YouTube Reklamları (Video Ads)", d:"İdeo içerikleriyle kullanıcıya etkileyici bir deneyim sunar; marka bilinirliğini ve izlenme oranlarını artırır." },
     { t:"Alışveriş Reklamları (Shopping Ads)", d:"Ürünlerinizi doğrudan arama sonuçlarında fiyat ve görsel bilgisiyle göstererek satış dönüşümünü artırır." },
     { t:"Performans Maksimum (Performance Max)", d:"Google’ın tüm ağlarını tek kampanyada birleştirir, yapay zekâ destekli optimizasyonla en yüksek dönüşümü hedefler." },
     { t:"Uygulama Reklamları (App Ads)", d:"Uygulama indirme ve etkileşim kampanyalarıyla mobil kullanıcı tabanınızı büyütür, uygulama içi aksiyonları artırır." },
     { t:"Discovery Reklamları", d:"Gmail, YouTube ve Discover akışında kullanıcıların ilgi alanlarına göre gösterilerek farkındalık ve dönüşüm sağlar." },
     { t:"Yerel (Local) Kampanyalar", d:"Fiziksel mağaza ziyaretlerini artırmak için Google Maps, Arama ve Görüntülü ağ üzerinden lokasyon bazlı görünürlük sunar." },
   ]
 },
 + { type:"types",
title:"Google Ads Ekosistemi",   desc:"Merkezde Google Ads; çevrede Search, YouTube, Display, Discover, Gmail ve Maps.",
   items:[]
 },
 ,
 { type:"media", side:"left", slidesKey:"slidesReverse", title:"Google Reklamlarında Ölçülebilir Başarı", body:
`AdsHigh, markaların dijital büyümesini hızlandıran profesyonel bir performans pazarlama ajansıdırHer kampanyayı veriye dayalı analizlerle yönetir, bütçenizin her kuruşunu ölçülebilir sonuçlara dönüştürürüz.
Google Ads hizmetimizle hedefleme, optimizasyon ve raporlama süreçlerini uçtan uca yönetir; markanızın dijital görünürlüğünü artırır, sürdürülebilir performans ve gerçek dönüşüm elde etmenizi sağlarız.`},
 { type:"cta", title:"Birlikte Google Ads performansınızı büyütelim", body:"Hemen iletişime geçin, hesabınızı analiz edelim."},
];

/* META */
const CONTENT_META = [
  {
    type: "hero",
    title: "Meta Reklamları",
    body: `AdsHigh olarak, markaların Facebook ve Instagram platformlarında hedef kitlelerine ulaşmasını sağlayan profesyonel Meta Reklam Yönetimi hizmeti sunuyoruz. Veriye dayalı strateji, yaratıcı içerik ve doğru hedefleme kombinasyonu ile markanızı dijitalde güçlendiriyor, her reklam bütçesini ölçülebilir bir değere dönüştürüyoruz.
Meta ekosisteminde marka bilinirliğinden satışa kadar tüm hedefleri stratejik şekilde yönetiyor, performansınızı sürdürülebilir hale getiriyoruz.`
  },

  {
    type: "list",
    look: "vivid-clean",
    title: "Stratejimiz",
    items: [
      {
        t: "Hedef Odaklı Planlama",
        d: "Her kampanyayı markanızın iş hedeflerine göre kurgularız. Satış, etkileşim, bilinirlik ya da kullanıcı edinimi fark etmeksizin, tüm bütçenizi ölçülebilir sonuçlara dönüştürürüz."
      },
      {
        t: "Entegre Platform Yönetimi",
        d: "Facebook ve Instagram kampanyalarını birlikte planlar, tek bir stratejik yapı altında yönetiriz. Bu sayede performans kanallar arası dengeli ilerler ve dönüşüm oranları artar."
      },
      {
        t: "Sürekli Optimizasyon ve Şeffaf Raporlama",
        d: "Tüm kampanyaları gerçek zamanlı olarak izler, veriye dayalı optimizasyonlarla en yüksek performansa ulaştırırız. Sonuçları düzenli raporlarla paylaşarak sürecin her aşamasını görünür kılarsız."
      }
    ]
  },

  {
    type: "media",
    title: "Meta Reklamlarının Faydaları",
    body: `Meta, markaların dijitalde büyümesini hızlandıran en güçlü reklam ağlarından biridir. Doğru stratejiyle yönetilen Meta kampanyaları, markanızı hem görünür hem de dönüşüm odaklı hale getirir.
AdsHigh olarak, markalar için Meta ekosisteminin tüm olanaklarını verimli şekilde kullanıyoruz. Marka bilinirliği kampanyalarıyla görünürlüğünüzü artırıyor, yeni kullanıcı edinme stratejileriyle potansiyel müşterilere ulaşıyoruz. Yeniden pazarlama kampanyalarıyla markanızla daha önce etkileşime geçmiş kullanıcıları geri kazanıyor, satış odaklı reklamlarla dönüşüm oranlarını yükseltiyoruz. Ayrıca uygulama indirme ve etkileşim kampanyalarıyla mobil büyümenizi destekleyerek markanızı dijitalde sürdürülebilir başarıya taşıyoruz.
Meta reklamları, doğru hedefleme ve sürekli optimizasyonla markanızı bilinirlikten satışa uzanan güçlü bir dijital büyüme sürecine dönüştürür.`
  },

  {
    type: "list",
    look: "vivid-clean",
    title: "Meta Reklam Türleri",
    desc: "Meta, markaların farklı hedeflerine ulaşmasını sağlayan çok yönlü kampanya türleri sunar. AdsHigh olarak her markanın amacına göre en uygun reklam türünü belirler, performans odaklı stratejilerle yönetiriz.",
    items: [
      { t: "Marka Bilinirliği (Awareness)", d: "Markanızı geniş kitlelere tanıtmak ve farkındalık oluşturmak için kullanılır. Görünürlük ve hatırlanma oranını artırır." },
      { t: "Trafik (Traffic)", d: "Web sitenize, uygulamanıza veya belirli bir hedef sayfaya ziyaretçi çekmek için en etkili kampanya türüdür." },
      { t: "Etkileşim (Engagement)", d: "Paylaşımlarınızda beğeni, yorum, paylaşım ve takipçi etkileşimini artırmak için tasarlanır." },
      { t: "Potansiyel Müşteri Toplama (Lead Generation)", d: "Form veya kayıt toplama kampanyalarıyla potansiyel müşterileri doğrudan Meta üzerinden elde etmenizi sağlar." },
      { t: "Satış (Sales / Conversions)", d: "Ürün veya hizmetlerinizi satın almaya hazır kullanıcıları hedefler. E-ticaret performansını artırır, dönüşümleri maksimize eder." },
      { t: "Mesaj (Messages / WhatsApp & Messenger Ads)", d: "Kullanıcıların doğrudan sizinle WhatsApp, Messenger veya Instagram DM üzerinden iletişime geçmesini sağlar. Satışa giden iletişimi hızlandırır." },
      { t: "Uygulama Tanıtımı (App Promotion)", d: "Mobil uygulamanızın indirme ve etkileşim oranlarını artırmak için optimize edilir." },
      { t: "Mağaza Ziyareti (Store Visits)", d: "Fiziksel mağazalar için lokasyon bazlı reklamlarla yakın çevredeki kullanıcıları işletmenize yönlendirir." }
    ]
  },

  {
    type: "media",
    side: "left",
    slidesKey: "slidesReverse",
    title: "Meta Reklamları ile Stratejik Dijital Büyüme",
    body: `Meta ekosistemi (Facebook, Instagram, Messenger ve Audience Network), markaların hedef kitlesine ulaşması için en etkili reklam ağıdır. AdsHigh olarak bu gücü, ölçülebilir büyüme ve sürdürülebilir performans odaklı stratejilere dönüştürüyoruz. Kampanyaları veriyle yönetir, kullanıcı davranışlarını analiz eder, her dokunuş noktasını dönüşüme çeviririz. Yapay zekâ destekli optimizasyon modelleriyle bütçenizin her kuruşunu verimli kullanırız.
Meta reklamlarıyla: Yeni kullanıcı edinimi için gelişmiş hedefleme çözümleri, yeniden pazarlama ile etkileşim geri kazanımı, satış/etkileşim odaklı stratejiler ve uygulama-katalog kampanyalarıyla ölçeklenebilir performans elde edilir. Her süreci şeffaf raporlarla görünür hale getirir, stratejiyi sürekli geliştiririz. AdsHigh, Meta Reklam Yönetimini bir hizmetten öte, markaların dijital büyüme ortağı olarak konumlandırır.`
  },

  {
    type: "cta",
    title: "Meta performansınızı büyütelim",
    body: "Hedeflerinize göre stratejiyi birlikte kuralım."
  }
];


/* TIKTOK */
const CONTENT_TIKTOK = [
 { type:"hero", title:"TikTok Reklamları", body:
`AdsHigh olarak, markaların dijital dünyada öne çıkmasını sağlayan, kısa formatlı video içeriklerle yüksek etkileşim yaratan TikTok Reklam Yönetimi hizmeti sunuyoruz.
Kullanıcı davranışlarını, trendleri ve algoritma verilerini analiz ederek markanızın hedef kitlesine en doğru biçimde ulaşmasını sağlıyoruz.Yaratıcı konseptler, etkileyici kurgular ve veri odaklı stratejilerle her reklamın hem dikkat çekici hem de ölçülebilir olmasını garanti ediyoruz.`},
 { type:"list", look:"accent",title:"Stratejimiz", items:[
   { t:"Trend Odaklı Yaklaşım", d:"TikTok’ta başarı, yalnızca görünür olmakla değil, doğru trendi yakalamakla mümkündür.AdsHigh olarak, güncel akımları ve kullanıcı davranışlarını analiz ederek markanız için özgün, dikkat çekici içerikler oluştururuz.Her kampanyayı, etkileşim ve dönüşüm oranını en üst seviyeye çıkaracak şekilde tasarlarız." },
   { t:"Yaratıcılık ve Performans Uyumu", d:"TikTok’ta fark yaratmak, güçlü içerik ile performans analizinin birleşimidir.Yaratıcı fikirleri veri odaklı planlamayla birleştirir, kampanyalarınızı sadece izlenen değil, etkileşim ve satış sağlayan birer performans aracına dönüştürürüz." },
   { t:"Şeffaf Raporlama ve Sürekli Optimizasyon", d:"Kampanyalarınızı tamamen şeffaf biçimde yönetiyor, performans verilerini düzenli olarak paylaşıyoruz.Gerçek zamanlı analizlerle reklamlarınızı optimize eder, bütçenizin her kuruşunu verimli şekilde değerlendiririz.AdsHigh’ta her rapor, sonraki kampanyanın daha güçlü temellerini oluşturur." },
 ]},
 { type:"media", title:"TikTok Reklamlarının Faydaları", body:
`TikTok, genç ve etkileşim odaklı kullanıcı kitlesiyle markaların dijital görünürlüğünü hızla artırabileceği en dinamik platformlardan biridir.Kısa video formatı, markalara hedef kitleyle samimi, hızlı ve yüksek etkileşimli bir iletişim kurma imkânı sunar.
AdsHigh olarak, TikTok’un algoritmik gücünü ve ilgi alanı bazlı hedefleme sistemini kullanarak markanızı doğru kullanıcılarla buluşturuyoruz.Uygulama indirme, marka bilinirliği ve satış odaklı kampanyaları performans metriklerine göre optimize ediyor, bütçenizin her adımını ölçülebilir kılıyoruz.Yeniden hedefleme (retargeting) stratejileriyle markanızla daha önce etkileşime geçen kullanıcıları yeniden kazanıyor, dönüşüm oranlarını güçlendiriyoruz.
TikTok’un yapay zekâ destekli optimizasyon sistemiyle videolarınız en ilgili kullanıcıların akışında öne çıkar.Gerçek zamanlı performans verileriyle kampanyalarınızı sürekli geliştirir, markanızı trendlerle senkronize biçimde büyütürüz.Sonuç olarak TikTok reklamları, markanızı fark edilenden tercih edilene dönüştüren etkili bir dijital büyüme aracına dönüşür.`},
 { type:"list", look:"accent",title:"TikTok Reklam Türleri", desc:
"1.Açıklama: Tiktok, farklı hedeflere hizmet etmekle beraber bir çok çeşitli reklam formatları da sunmaktadır.",
   items:[
     { t:"In-Feed Ads", d:"Kullanıcıların “For You” akışında doğal bir şekilde görünür, yüksek etkileşim sağlar." },
     { t:"TopView Ads", d:"Uygulama açıldığında tam ekran olarak gösterilir, marka bilinirliğini hızla artırır." },
     { t:"Branded Hashtag Challenge", d:"Kullanıcı katılımını teşvik ederek markanızı viral hale getirir." },
     { t:"Branded Effects", d:"Özel filtre ve efektlerle marka deneyimini eğlenceli hale getirir." },
     { t:"Spark Ads", d:"Organik içerikleri reklama dönüştürerek doğal bir etkileşim yaratır." },
     { t:"App Reklamları", d:"Uygulama indirme ve uygulama içi etkileşimi artıran performans odaklı kampanyalardır." },
   ]
 },
 { type:"media", side:"left", slidesKey:"slidesReverse", title:"TikTok Reklamları ile Hızlı ve Ölçülebilir Büyüme", body:
`AdsHigh, markaların dijital dünyada fark edilmesini sağlayan profesyonel bir TikTok Reklam Ajansıdır.Platformun dinamik yapısını, trend analizlerini ve kullanıcı davranışlarını derinlemesine inceleyerek her kampanyayı performans odaklı kurguluyoruz.
Yaratıcı içerik üretimi, güçlü hedefleme modelleri ve yapay zekâ destekli optimizasyon süreçleriyle markanızın TikTok’ta yalnızca görünür olmasını değil, ölçülebilir başarıya ulaşmasını sağlıyoruz.TikTok’un kısa video formatlarını marka hikâyenize entegre ediyor, etkileşim oranlarını ve dönüşüm performansını sürekli artırıyoruz.
AdsHigh TikTok danışmanlığı, sadece reklam yönetimi değil; markanızın trendlerle uyumlu, veriye dayalı büyüme stratejisini oluşturur.Doğru kitleyle bağlantı kurmanızı, etkileşimi kalıcı hale getirmenizi ve dijitalde güçlü bir marka konumu elde etmenizi sağlarız.`},
 { type:"cta", title:"TikTok’ta performansı birlikte yükseltelim", body:"UGC + test kültürü + ölçüm ile sürdürülebilir ROAS."},
];

/* ===================== UI / UX & GRAFİK TASARIM ===================== */
const CONTENT_UIUX = [
  {
    type: "hero",
    title: "UX / UI & Grafik Tasarım",
    body: `AdsHigh olarak, markaların dijital varlıklarını yalnızca estetik açıdan değil, kullanıcı deneyimi odaklı bir anlayışla tasarlıyoruz.UX (User Experience) ve UI (User Interface) prensiplerini performans pazarlamasıyla entegre ederek her tasarımın stratejik bir amaca hizmet etmesini sağlıyoruz.Grafik tasarım, web arayüzü, mobil deneyim ve kullanıcı akışlarını tek çatı altında birleştiriyor; markanızın dijital kimliğini güçlü, tutarlı ve işlevsel hale getiriyoruz.
Amacımız yalnızca güzel görünen tasarımlar üretmek değil, kullanıcıyı etkileyen, dönüşüm sağlayan dijital deneyimler yaratmaktır.`
  },
  {
    type: "list",
    title: "Stratejimiz",
    items: [
      {
        t: "Kullanıcı Odaklı Tasarım Yaklaşımı",
        d: "Tasarım sürecini estetikten öteye taşıyoruz — her karar, kullanıcı davranışları ve etkileşim verileriyle şekillenir.UX analizleri, ısı haritaları, A/B testleri ve kullanıcı akışı (user flow) verileriyle, markanızın dijital deneyimini optimize ederiz.Amacımız, her ziyaretçinin yalnızca görsel olarak değil, duygusal ve işlevsel olarak da markanıza bağlanmasını sağlamaktır."
      },
      {
        t: "Görsellik + Performans Dengesi",
        d: "AdsHigh olarak, tasarımı yalnızca “güzel görünen” değil, “dönüşüm getiren” bir unsur olarak ele alıyoruz.UI tasarımlarımız, hem mobil hem masaüstü platformlarda yüksek hız, sezgisel kullanım ve dönüşüm optimizasyonuna odaklanır.Grafik tasarım ekibimiz, kampanya görsellerinden web arayüzlerine kadar tüm içerikleri marka kimliğiyle bütünleştirir."
      },
      {
        t: "Veri Destekli Yaratıcılık",
        d: "Yaratıcılığı ölçümlenebilir hale getiriyoruz.Tasarım süreçlerinde performans verilerini analiz eder, kullanıcı geri bildirimleriyle sürekli iyileştirme yaparız.Sonuç: yalnızca dikkat çeken değil, kullanıcı davranışını yönlendiren tasarımlar."
      }
    ]
  },
  {
    type: "media",
    title: "UX / UI & Grafik Tasarımın Faydaları",
    body: `Kullanıcı deneyimi (UX) ve arayüz tasarımı (UI), bir markanın dijital başarısının görünmeyen ama en güçlü temelidir.Etkili bir tasarım yalnızca estetik değil, kullanılabilirlik, hız ve dönüşüm oranı anlamına gelir.
AdsHigh olarak, tasarımı yalnızca “güzel görünen” değil, performans getiren bir yapı olarak ele alıyoruz.UX süreçlerinde kullanıcı davranışlarını analiz eder, deneyimi veriyle şekillendiririz.UI aşamasında ise markanızın kimliğini modern, tutarlı ve dönüşüm odaklı arayüzlerle birleştiririz.Grafik tasarım ekibimiz, reklam kampanyalarınız, web siteniz ve sosyal medya görselleriniz için marka bütünlüğünü güçlendiren yaratıcı çözümler üretir.Her tasarım, kullanıcıyı hedef aksiyona yönlendirecek şekilde planlanır.
Sonuç olarak UX / UI & grafik tasarım, markanızın dijital kimliğini güçlendirir,
daha yüksek etkileşim, güven ve dönüşüm oranı sağlar.`
  },
  {
    type: "list",
    title: "Hizmet Kapsamımız",
    desc: "1 Açıklama: AdsHigh olarak, kullanıcı deneyimini veriye dayalı analizlerle şekillendiriyor; estetik, işlevsellik ve performansı tek bir tasarım dilinde buluşturuyoruz.X/UI ve grafik tasarım hizmetlerimizle markanızı dijitalde fark edilir, akılda kalıcı ve dönüşüm odaklı hale getiriyoruz.",
    items: [
      { t: "UX Analizi & Kullanıcı Akışı Tasarımı", d: "Kullanıcı davranışlarını veriye dayalı analizlerle çözümler, dönüşüm odaklı deneyim akışları tasarlarız." },
      { t: "UI (Arayüz) Tasarımı", d: "Markanızın dijital yüzünü modern arayüz prensipleriyle sade, işlevsel ve etkileyici hale getiririz." },
      { t: "Grafik Tasarım", d: "Her görseli, markanızın mesajını güçlendiren stratejik bir iletişim aracına dönüştürürüz." },
      { t: "Prototipleme & Test", d: "Tasarımı canlıya almadan önce test ederek kullanıcı deneyimini kusursuzlaştırırız." },
      { t: "Dijital Marka Kimliği", d: "Logo, renk ve görsel kimliği tek bir tutarlı dijital dilde birleştirir, markanıza özgün bir karakter kazandırırız." }
    ]
  },
  {
    type: "media",
    side: "left",
    title: "AdsHigh ile Yaratıcılığı Performansa Dönüştürün",
    body: `AdsHigh, estetik tasarımı veriye dayalı stratejilerle birleştiren profesyonel bir UX/UI ve Grafik Tasarım ajansıdır.
Tasarımı yalnızca görsel bir unsur olarak değil, marka deneyiminin en güçlü performans aracına dönüştürüyoruz.Kullanıcı davranışlarını analiz ederek her tasarımı veriyle şekillendiriyor,yaratıcılığı işlevsellikle, estetiği dönüşümle buluşturuyoruz.UX/UI yaklaşımımızda hedef, yalnızca dikkat çekmek değil;kullanıcıyı yönlendiren, deneyimi kolaylaştıran ve etkileşimi artıran arayüzler inşa etmektir.Grafik tasarım ekibimiz, markanızın ruhunu yansıtan yaratıcı konseptlerle dijitalde güçlü bir algı oluşturur.Her görsel, kampanya veya ürün tasarımı; satış, etkileşim ve marka sadakati hedefleriyle uyumlu şekilde hazırlanır.
Sonuç olarak AdsHigh, tasarımı ölçülebilir performans, sürdürülebilir deneyim ve dijital büyüme için stratejik bir güç haline getirir.`
  }
];

/* SNAPCHAT */
const CONTENT_SNAPCHAT = [
  {
    type: "hero",
    title: "Snapchat Reklamları",
    body: `AdsHigh olarak, markaların genç, dinamik ve yüksek etkileşimli kitlelere ulaşmasını sağlayan Snapchat Reklam Yönetimi hizmeti sunuyoruz. Snapchat’in yenilikçi reklam formatlarını ve gelişmiş hedefleme araçlarını kullanarak markanızı doğru kullanıcılarla buluşturuyoruz.
Veri analizi, içerik stratejisi ve performans optimizasyonunu birleştirerek, markaların anlık etkileşimleri kalıcı dönüşümlere dönüştürmesini sağlıyoruz.`
  },

  {
    type: "list",
    title: "Stratejimiz",
    items: [
      { t: "Hedef Odaklı Planlama", d: "Snapchat kullanıcı kitlesi hızlı karar verir, bu nedenle her kampanya hedefe net biçimde odaklanmalıdır. AdsHigh olarak, markanızın satış, bilinirlik veya uygulama indirme gibi hedeflerini analiz eder, her kampanyayı dönüşüm odaklı kurgularız. Planlama aşamasından yayına kadar tüm süreç, ölçülebilir sonuçlar üretmek üzerine inşa edilir." },
      { t: "Yaratıcılık + Veri Dengesini Kurmak", d: "Snapchat’te fark yaratmak, sadece dikkat çekici görsellerle değil, stratejik içerik akışıyla mümkündür. Biz, kreatif fikirleri performans verileriyle birleştirerek reklamların hem ilgi çekici hem de yüksek dönüşüm sağlayan bir yapıya sahip olmasını sağlıyoruz. Her görsel, metin ve efekt; kampanya hedefinize hizmet edecek şekilde test edilir ve optimize edilir." },
      { t: "Şeffaf Raporlama ve Sürekli Optimizasyon", d: "AdsHigh olarak, tüm reklam süreçlerinde şeffaflık ilkesini benimsiyoruz. Gerçek zamanlı performans raporları sunarak kampanyalarınızı takip edilebilir hale getiriyor, yapay zekâ destekli analizlerle performansı sürekli artırıyoruz. Bütçeniz daima kontrol altında, yatırım getiriniz daima yükselir." }
    ]
  },

  {
    type: "media",
    title: "Snapchat Reklamlarının Faydaları",
    body: `Snapchat, genç ve yüksek etkileşimli kullanıcı kitlesiyle markaların hedef kitleyle duygusal bağ kurmasını sağlayan güçlü bir reklam platformudur. Kullanıcıların uygulama içi etkileşim süresi yüksektir; bu da markalar için yüksek görünürlük ve hızlı dönüşüm anlamına gelir.
AdsHigh olarak, Snapchat’in yaratıcı araçlarını performans stratejileriyle birleştirerek markalar için ölçülebilir büyüme sağlıyoruz. AR Lens ve Filter Ads kampanyalarıyla kullanıcıları markayla eğlenceli biçimde etkileşime geçirir, Dynamic ve Collection Ads sayesinde alışveriş sürecini hızlandırırız. Story ve Video Ads formatlarıyla marka hikâyenizi doğal, dikkat çekici bir şekilde anlatırız. App Install kampanyalarıyla mobil uygulama indirmelerini artırır, kullanıcı etkileşimini güçlendiririz.
Snapchat reklamları; marka bilinirliği, satış, uygulama büyümesi ve topluluk etkileşimi gibi tüm dijital hedefler için yaratıcılığı performansla birleştiren en dinamik çözümlerden biridir.`,
    slidesKey: "slidesPrimary"
  },

  {
    type: "list",
    title: "Snapchat Reklam Türleri",
    desc: "Snapchat, genç ve dinamik kitlelere ulaşmak isteyen markalar için yüksek etkileşimli reklam formatları sunar. AdsHigh olarak, kampanyalarınızı platformun yaratıcı araçlarıyla entegre biçimde yönetiyor, markanızın dikkat çekmesini sağlıyoruz.",
    items: [
      { t: "Single Image & Video Ads", d: "Kullanıcıların hikâyeleri arasında tam ekran görünür, hızlı ve etkili marka tanıtımı sağlar." },
      { t: "Story Ads", d: "“Discover” sekmesinde markanıza özel hikâye akışı oluşturarak içerik tabanlı bir deneyim sunar." },
      { t: "Collection Ads", d: "Birden fazla ürün veya kampanyayı aynı reklam içinde sergileyerek doğrudan alışveriş deneyimi yaratır." },
      { t: "Dynamic Ads", d: "Gerçek zamanlı ürün kataloğu verilerini kullanarak kullanıcı davranışına göre otomatik kişiselleştirilmiş reklamlar gösterir." },
      { t: "AR Lens Ads", d: "Kullanıcıların artırılmış gerçeklik (AR) filtreleriyle etkileşime girmesini sağlayarak markayı eğlenceli biçimde deneyimletir." },
      { t: "Filter Ads", d: "Coğrafi veya etkinlik bazlı özel filtrelerle kullanıcıların markanızla organik etkileşime geçmesini sağlar." },
      { t: "Commercial Ads", d: "Atlanamayan video formatıyla marka hikâyenizi 3 ila 6 saniye arasında yüksek görünürlükte sunar." },
      { t: "App Install Ads", d: "Uygulama indirme kampanyalarıyla mobil kullanıcı tabanınızı genişletir ve etkileşimi artırır." }
    ]
  },

  {
    type: "media",
    side: "left",
    slidesKey: "slidesReverse",
    title: "Snapchat Reklamları ile Markanızı Dönüştürün",
    body: `AdsHigh, markaların genç kitlelerle etkileşimini güçlendiren profesyonel bir Snapchat Reklam Ajansıdır. Trend analizleri, yaratıcı içerik üretimi ve veriye dayalı optimizasyon süreçleriyle, kampanyalarınızı performans odaklı biçimde yönetiyoruz.
Snapchat reklam danışmanlığı hizmetimizle markanızın görünürlüğünü artırır, kullanıcılarınızla etkileşimi kalıcı hale getirir ve yatırımınızdan maksimum geri dönüş elde etmenizi sağlarız.`
  }
];

/* TELEGRAM */
const CONTENT_TELEGRAM = [
  {
    type: "hero",
    title: "Telegram Reklamları",
    body: `AdsHigh olarak, markaların hedef kitleleriyle doğrudan ve güvenilir iletişim kurmasını sağlayan Telegram Reklam Yönetimi hizmeti sunuyoruz. Telegram’ın global kullanıcı tabanı ve güçlü topluluk yapısı sayesinde markanızın mesajını doğru kişilere ulaştırıyoruz.
Veri odaklı hedefleme, kanal stratejisi ve performans analizi ile reklamlarınızı yalnızca gösterilmekle kalmaz, gerçek etkileşim ve dönüşümle buluştururuz.`
  },

  {
    type: "list",
    title: "Stratejimiz",
    items: [
      { t: "Hedef Kitle Odaklı Planlama", d: "Telegram kullanıcıları, bilgiye hızlı ulaşmak ve güvenilir topluluklarda yer almak ister. AdsHigh olarak, bu davranış yapısını analiz eder; reklamlarınızı ilgi alanı, coğrafi konum ve kanal bazlı hedeflemeyle planlarız. Her kampanya, markanızın doğru toplulukta fark edilmesini sağlayacak şekilde tasarlanır." },
      { t: "İçerik Stratejisi + Güven Temelli İletişim", d: "Telegram’da başarı, kullanıcıların ilgisini çekmek kadar güven inşa etmeyi de gerektirir. Biz, markanızın mesajlarını samimi, net ve aksiyon odaklı biçimde kurgularız. Kreatif metinleri veri destekli analizlerle birleştirerek reklamlarınızı doğru ton ve frekansta hedef kitlenizle buluştururuz." },
      { t: "Şeffaf Raporlama ve Performans Optimizasyonu", d: "Kampanya sürecinde tüm veriler düzenli raporlarla sunulur. Reklam performansını anlık olarak takip eder, dönüşüm oranlarını artırmak için yapay zekâ destekli optimizasyon yöntemleri uygularız. Her bütçeyi ölçülebilir sonuçlara dönüştürmek, AdsHigh’ın reklam felsefesinin merkezindedir." }
    ]
  },

  {
    type: "media",
    title: "Telegram Reklamlarının Faydaları",
    body: `Telegram, kullanıcı gizliliği ve topluluk etkileşimi temelli yapısıyla markalara geleneksel sosyal ağlardan farklı, samimi bir iletişim alanı sunar. Reklamlar doğrudan kullanıcının ilgi alanına göre konumlandığı için yüksek etkileşim ve düşük maliyetli geri dönüş elde edilir.
AdsHigh olarak, Telegram’ın kanal ve grup ekosistemini markanız için stratejik biçimde kullanırız. Kanal reklamlarıyla geniş kitlelere ulaşır, grup sponsorluklarıyla topluluk içinde doğal marka görünürlüğü sağlarız. Click-to-Website kampanyalarıyla web sitenize trafik yönlendirir, uygulama tanıtım kampanyalarıyla mobil büyümenizi destekleriz. Telegram’ın bot tabanlı otomasyon özellikleriyle etkileşimi artırır, kullanıcı geri bildirimlerini analiz ederiz. Bu sayede reklamlar sadece görünür değil, ölçülebilir ve sürdürülebilir sonuçlar üretir.
Sonuç olarak Telegram reklamları, gizlilik, sadakat ve topluluk odaklı büyümeyi birleştirerek markalara uzun vadeli değer kazandırır.`,
    slidesKey: "slidesPrimary"
  },

  {
    type: "list",
    title: "Telegram Reklam Türleri",
    desc: "Telegram, gizlilik odaklı yapısı ve hızla büyüyen kullanıcı kitlesiyle markalar için yeni nesil bir reklam alanı sunar. AdsHigh olarak, Telegram’ın hedefleme olanaklarını ve kanal yapısını kullanarak markanızın doğru topluluklarla etkileşime geçmesini sağlıyoruz.",
    items: [
      { t: "Sponsored Messages (Sponsorlu Mesajlar)", d: "Kanal yöneticilerinden bağımsız olarak gösterilen, doğrudan hedef kitleye ulaşan metin tabanlı reklam formatıdır." },
      { t: "Channel Ads (Kanal Reklamları)", d: "Popüler Telegram kanalları üzerinden yayınlanır; geniş topluluklara görünürlük kazandırır." },
      { t: "Bot Reklamları", d: "Telegram bot’ları aracılığıyla kullanıcı etkileşimi sağlayan, kampanya katılımı ve veri toplama süreçlerini destekleyen interaktif formattır." },
      { t: "Click-to-Website Ads", d: "Reklam metni içinden web sitenize yönlendirme yaparak trafik ve dönüşüm elde etmenizi sağlar." },
      { t: "App Promotion Ads", d: "Uygulama indirme veya uygulama içi etkileşim hedefleyen kampanyalarda kullanılır, mobil büyümeyi destekler." },
      { t: "Group Sponsorships", d: "Telegram gruplarında sponsorlu duyurularla topluluk etkileşimini artırır ve marka bilinirliğini güçlendirir." }
    ]
  },

  {
    type: "media",
    side: "left",
    slidesKey: "slidesReverse",
    title: "Telegram Reklamları ile Güvenilir Büyüme",
    body: `AdsHigh, markaların topluluk temelli platformlarda büyümesini destekleyen profesyonel bir Telegram Reklam Ajansıdır. Doğru kanal seçimi, stratejik içerik üretimi ve sürekli optimizasyon süreçleriyle reklamlarınızı sadece görünür değil, etkili hale getiriyoruz.
Telegram reklam danışmanlığı hizmetimizle markanızı güvenilir topluluklarda konumlandırır, hedef kitlenizle doğrudan iletişim kurmanızı ve sürdürülebilir dijital büyüme elde etmenizi sağlarız.`
  }
];


/* YANDEX – GÜNCEL METİN (animasyonlu) */
const CONTENT_YANDEX = [
  {
    type: "hero",
    title: "Yandex Reklamları",
    body: `AdsHigh olarak, Rusya, Doğu Avrupa ve çevre pazarlarda markaların görünürlüğünü artıran Yandex Reklam Yönetimi hizmeti sunuyoruz.
Yandex.Direct platformu üzerinden yürüttüğümüz kampanyalarla markanızı, hedef kitlenizin aktif arama yaptığı anlarda öne çıkarıyoruz. Veriye dayalı stratejiler, dinamik hedefleme ve sürekli optimizasyon sayesinde reklam bütçenizden maksimum dönüşüm almanızı sağlıyoruz.`
  },
  {
    type: "list",
    title: "Stratejimiz",
    items: [
      { t:"Bölgesel Hedefleme ve Pazar Analizi", d:"Yandex, özellikle Rusya ve çevresindeki pazarlarda en güçlü arama motorudur. AdsHigh olarak, bu bölgelerdeki kullanıcı davranışlarını analiz ederek markanız için lokalize reklam stratejileri geliştiririz. Dil, kültür ve arama alışkanlıklarına uygun hedefleme modelleriyle reklamlarınızın performansını en üst seviyeye çıkarırız." },
      { t:"Veriye Dayalı Kampanya Yönetimi", d:"Yandex.Direct’in gelişmiş analiz araçlarını kullanarak reklamlarınızı gerçek zamanlı verilerle yönetiyoruz. Tıklama oranı (CTR), dönüşüm maliyeti (CPA) ve yatırım getirisi (ROI) gibi metrikleri sürekli izliyor, performans optimizasyonlarını anlık olarak gerçekleştiriyoruz. Her karar, sezgiye değil, veriye dayanır." },
      { t:"Şeffaf Raporlama ve Yapay Zekâ Destekli Optimizasyon", d:"Tüm kampanya süreçlerini tamamen şeffaf şekilde yürütüyoruz. Reklam performanslarını düzenli raporlarla paylaşıyor, Yandex’in yapay zekâ destekli otomasyon araçlarıyla maliyetleri düşürürken dönüşüm oranlarını artırıyoruz. Her bütçe, ölçülebilir bir kazanca dönüşür." }
    ]
  },
  {
    type: "media",
    title: "Yandex Reklamlarının Faydaları",
    body: `Yandex, Rusya, Kazakistan, Belarus ve Türkiye gibi pazarlarda yüksek kullanıcı yoğunluğuna sahip güçlü bir dijital reklam platformudur. Arama, görüntüleme, video ve harita tabanlı çözümleriyle markaların hedef kitlelerine doğru zamanda, doğru mesajla ulaşmasını sağlar.
AdsHigh olarak, Yandex’in Direct, Display, Video ve Maps ağlarını entegre biçimde yönetiyor; markanızı hem dijitalde hem fizikselde görünür kılıyoruz. Yandex.Maps ve Yandex.Navi üzerinden yürütülen lokasyon bazlı kampanyalarla kullanıcıları doğrudan mağazanıza yönlendiriyor, ziyaret oranlarını artırıyoruz. Ayrıca retargeting stratejileriyle markanızla daha önce etkileşime geçen kullanıcıları geri kazanıyor, dönüşüm oranlarını yükseltiyoruz. Yandex.Audience ve AppMetrica verilerini kullanarak uygulama indirme ve etkileşim kampanyalarını optimize ediyor, mobil büyümenizi destekliyoruz. Bölgesel veri ağı sayesinde kampanyalar hedef pazarlardaki kullanıcı davranışlarına göre otomatik olarak optimize edilir. Gerçek zamanlı raporlar ve yapay zekâ destekli analizlerle bütçenizin her kuruşunu verimli kullanır, markanızı bilinirlikten satışa uzanan ölçülebilir bir büyüme yolculuğuna taşırız.`,
    slidesKey: "slidesPrimary"
  },
  {
    type: "list",
    title: "Yandex Reklam Türleri",
    desc: `Yandex, markaların hedef kitlelerine arama, görüntüleme, video ve harita tabanlı reklamlarla ulaşmasını sağlayan güçlü bir dijital platformdur. AdsHigh olarak, Yandex ekosistemindeki kampanyaları veriye dayalı stratejilerle yönetiyor, markalar için maksimum görünürlük ve dönüşüm sağlıyoruz.`,
    items: [
      { t:"Yandex.Direct Arama Reklamları", d:"Kullanıcıların belirli anahtar kelimeleri aradığı anda görünür, satın alma niyeti yüksek kitleyi hedefler." },
      { t:"Yandex GDN (Görüntülü Reklam Ağı)", d:"Partner sitelerde, haber portallarında ve mobil uygulamalarda görünürlüğü artırır." },
      { t:"Video Reklamlar", d:"Yandex.Video, Zen ve diğer yayın ağlarında video içeriklerle bilinirlik oluşturur." },
      { t:"Retargeting Kampanyaları", d:"Ziyaretçileri yeniden hedefleyerek dönüşüm oranlarını yükseltir." },
      { t:"E-ticaret Reklamları (Merchant Ads)", d:"Yandex.Merchant Center entegrasyonu ile dinamik ürün reklamları." },
      { t:"App Reklamları", d:"Yandex.Audience + AppMetrica ile indirme ve etkileşim odaklı kampanyalar." },
      { t:"Lokasyon Bazlı Reklamlar (Store Visit)", d:"Yandex.Maps ve Yandex.Navi ile mağazaya yakın kullanıcıları hedefler." },
      { t:"Smart Banners (Akıllı Bannerlar)", d:"Davranışa göre dinamik, yapay zekâ destekli görsel reklam formatları." },
      { t:"Dynamic Search Ads", d:"Otomatik arama kapsamı; ilgili sorgulara manuel anahtar kelime olmadan ulaşır." },
      { t:"Call Tracking Entegrasyonu", d:"Telefon aramalarını izleyerek kaynak bazlı ROI ölçümü yapar." },
      { t:"Yandex.Audience Segmentasyon", d:"Demografik, coğrafi ve davranışsal verilere göre kitle oluşturma." },
      { t:"Yandex.Metrica Entegrasyonu", d:"Ziyaretçi davranışını ölçümleyip optimizasyona veri sağlar." }
    ]
  },
  {
    type: "media",
    side: "left",
    slidesKey: "slidesReverse",
    title: "Yandex Reklamları ile Bölgesel Güç Kazanın",
    body: `AdsHigh, Yandex ekosisteminde uzmanlaşmış profesyonel bir Yandex Reklam Ajansıdır. Rusya, Kazakistan, Belarus ve çevre pazarlarda markanızı hedef kitlenizle buluşturmak için bölgesel analiz, lokal strateji geliştirme ve yapay zekâ destekli optimizasyon süreçlerini bir arada yürütüyoruz. Yandex’in güçlü arama ağı, görüntülü reklam platformu ve harita entegrasyonları sayesinde markanızın yerel pazarlarda görünürlüğünü artırıyoruz. Kampanyalarınızı dil, kültür ve davranış dinamiklerine göre uyarlayarak yalnızca erişim değil, gerçek dönüşüm sağlıyoruz.
Yandex reklam yönetimi hizmetimiz, bütçenizin her adımını ölçülebilir hale getirir, hedef ülkelerde yerel rekabet avantajı oluşturur. Markanızı yeni pazarlarda konumlandırmak, satış performansınızı artırmak ve dijital gücünüzü bölgesel ölçekte büyütmek için en doğru stratejik yapıyı kurarız.`
  }
];


/* LINKEDIN */
const CONTENT_LINKEDIN = [
  { type:"hero", title:"LinkedIn Reklamları", body:
`AdsHigh olarak, profesyonel hedef kitlelere ulaşmak isteyen markalar için özel olarak tasarlanmış LinkedIn Reklam Yönetimi hizmeti sunuyoruz.
B2B odaklı işletmelerin karar vericilere, sektör profesyonellerine ve potansiyel iş ortaklarına doğrudan erişmesini sağlıyoruz. Veri odaklı hedefleme, içerik stratejisi ve performans optimizasyonunu birleştirerek, LinkedIn üzerinde markanız için ölçülebilir ve sürdürülebilir büyüme sağlıyoruz.`},

  { type:"list", look:"accent",title:"Stratejimiz", items:[
    { t:"B2B Odaklı Planlama", d:"Sektör, pozisyon, şirket büyüklüğü, yetkinlik ve ilgi alanı bazlı hedefleme ile doğru karar vericilere ulaşırız. Huninin tüm aşamalarını (farkındalık → MQL → SQL) ölçülebilir kurgularız." },
    { t:"Yaratıcı + Analitik Denge", d:"Veri odaklı analizleri kreatif içeriklerle birleştiririz. Başlık, görsel ve CTA'ları profesyonel kullanıcı davranışına göre optimize ederiz." },
    { t:"Şeffaf Raporlama ve Sürekli Optimizasyon", d:"CTR, CPL ve ROI gibi metriklerle düzenli raporlama yapar; kampanyaları sürekli optimize ederiz." },
  ]},

  { type:"media", title:"LinkedIn Reklamlarının Faydaları", body:
`LinkedIn, profesyonel hedef kitlelere ulaşmak ve iş dünyasında güven kazanmak isteyen markalar için en güçlü B2B reklam platformudur. Karar vericiler ve sektör uzmanlarından oluşan kullanıcı tabanı sayesinde doğrudan iş değeri yaratır.
Lead generation kampanyalarıyla satış ekiplerine nitelikli veriler sağlarız; uygulama indirme ve etkileşim kampanyalarıyla B2B yazılım/SaaS çözümlerini doğru kitleyle buluştururuz. Marka bilinirliği ve içerik etkileşimi kampanyalarıyla profesyonel itibarı güçlendirir, analitik raporlarla stratejiyi veriye göre sürekli optimize ederiz.`},

  { type:"list",look:"accent", title:"LinkedIn Reklam Türleri", desc:"Her kampanya türünü iş hedeflerinize göre planlıyor ve performans odaklı yönetiyoruz.",
    items:[
      { t:"Sponsored Content (Sponsorlu İçerik)", d:"Feed üzerinde doğal görünür; bilinirlik ve içerik etkileşimini artırır." },
      { t:"Message Ads (InMail Reklamları)", d:"Gelen kutusuna doğrudan mesaj; yüksek dönüşüm potansiyeli." },
      { t:"Dynamic Ads", d:"Profil bilgilerine göre kişiselleştirilmiş dinamik görseller." },
      { t:"Text Ads", d:"Basit ama etkili metin formatı; masaüstü kullanıcılarına doğrudan erişim." },
      { t:"Video Ads", d:"Ürün/hizmeti güçlü görselle anlatmak için etkilidir." },
      { t:"Carousel Ads", d:"Birden fazla mesaj/ürünü tek reklamda sunar." },
      { t:"Lead Gen Forms", d:"Platform içi formlarla potansiyel müşteri toplama sürecini kolaylaştırır." },
      { t:"App Promotion Ads", d:"B2B uygulamalar, SaaS ve mobil çözümler için indirme/etkileşim teşviki." },
    ]
  },

  { type:"media", side:"left", slidesKey:"slidesReverse", title:"LinkedIn Reklamları ile Profesyonel Ağlarda Güçlenin", body:
`AdsHigh, B2B odaklı markaların profesyonel dünyada fark yaratmasını sağlayan uzman bir LinkedIn Reklam Ajansıdır. Doğru strateji, yaratıcı içerik ve veri temelli optimizasyon ile LinkedIn’de sürdürülebilir görünürlük sağlar, her bütçeyi ölçülebilir başarıya dönüştürür.`},

  { type:"cta", title:"LinkedIn’de nitelikli pipeline oluşturalım", body:"ABM + lead nurturing + net raporlama ile satış huninizi besleyelim."},
];


/* PROGRAMATİK / MEDYA SATIN ALMA */
const CONTENT_PROGRAMATIK = [
  { type:"hero", title:"Programatik ve Medya Satın Alma", body:
`AdsHigh olarak, dijital dünyada markaların reklam yatırımlarını maksimum verimle yönetmek için programatik reklam ve medya satın alma hizmeti sunuyoruz.
Yapay zekâ destekli sistemlerle doğru kitleye, doğru zamanda, doğru mesajı ulaştırıyoruz.
Her kampanyayı veri analitiği, hedefleme optimizasyonu ve içerik stratejisiyle birleştirerek markanızın görünürlüğünü artırıyor, reklam harcamalarınızı ölçülebilir başarıya dönüştürüyoruz.`},

  { type:"list",look:"accent", title:"Stratejimiz", items:[
    { t:"Veri Odaklı Planlama", d:"Kullanıcı davranışı, demografik bilgiler ve cihaz alışkanlıklarıyla RTB planlaması yaparız. Açık artırma (RTB) ile en uygun maliyetlere erişim." },
    { t:"Yapay Zekâ Destekli Optimizasyon", d:"Anlık verilerle düşük performanslı alanlar otomatik elenir; yüksek performanslı kanallar güçlendirilir. Her kuruş maksimum dönüşüme optimize edilir." },
    { t:"Çok Kanallı Medya Yönetimi", d:"Programatik ağlar, Google Display, sosyal, video ve native kanalları entegre yöneterek bütüncül görünürlük sağlar." },
  ]},

  { type:"media", title:"Programatik ve Medya Satın Almanın Faydaları", body:
`Programatik, manuel planlamanın yerini veri ve otomasyonun aldığı modern satın alma yöntemidir: reklamlar yalnızca gösterilmez; ölçümlenir, optimize edilir ve sürekli geliştirilir.
Hedef kitleyi davranış/ilgi/konum bazlı tanımlar; otomatik optimizasyonla bütçe verimliliğini artırır; görünürlük, etkileşim ve dönüşümü aynı anda güçlendirir.`},

  { type:"list",look:"accent", title:"Hizmet Kapsamımız", items:[
    { t:"Programatik Reklam Yönetimi", d:"RTB tabanlı sistemlerle doğru zamanda doğru kişiye ulaşım." },
    { t:"Medya Planlama & Satın Alma", d:"Bütçeyi kanallar arasında verimli dağıtır; bilinirlik ve dönüşümü artırır." },
    { t:"DSP (DV360, The Trade Desk) Yönetimi", d:"Profesyonel kurulum ve sürekli optimizasyon." },
    { t:"DMP Entegrasyonu", d:"1P/3P veri ile segmentasyon ve yeniden hedefleme." },
    { t:"Video & Native Reklamlar", d:"Görsel gücü yüksek formatlarla etkileşimi artırırız." },
    { t:"Raporlama & Performans Analizi", d:"Şeffaf, ölçülebilir ve aksiyon odaklı raporlama." },
  ]},

  { type:"media", side:"left", slidesKey:"slidesReverse", title:"AdsHigh ile Veriye Dayalı Medya Yönetimi", body:
`Her kampanyada veriye, hedeflemeye ve dönüşüme odaklanır; geleneksel medya satın alma süreçlerini dijitalin hızına taşırız. Bütçenizi en verimli şekilde yönetir, her gösterimi gerçek etkiye dönüştürürüz.`},

  { type:"cta", title:"Programatik ile verimli ölçekleme", body:"Premium envanter + güvenli satın alma + net ROI."},
];

/* RAPORLAMA & DASHBOARD – GÜNCEL (animasyonlu) */
const CONTENT_RAPORLAMA = [
  {
    type: "hero",
    title: "Raporlama & Dashboard Hizmetleri",
    body: `AdsHigh olarak, markaların tüm dijital performans verilerini tek bir merkezde toplamak, analiz etmek ve anlamlı hale getirmek için Raporlama ve Dashboard çözümleri sunuyoruz.
Veri, strateji ve performansı birleştirerek reklam kampanyalarınızı gerçek zamanlı takip edebileceğiniz özel raporlama sistemleri kuruyoruz. Her metrik görünür, her karar ölçülebilir, her yatırım değerlendirilebilir hale gelir.`
  },

  {
    type: "list",
    title: "Stratejimiz",
    items: [
      { t: "Veri Entegrasyonu ve Kaynak Analizi", d: "AdsHigh olarak, Google Ads, Meta, TikTok, LinkedIn, Yandex, SEO, e-ticaret ve CRM sistemlerinden gelen tüm verileri tek çatı altında toplarız. Doğru veri akışı sağlamak için GA4, GTM, Meta Conversion API gibi sistemleri entegre ederiz. Böylece, tüm kampanyalarınızın performansı gerçek zamanlı olarak izlenebilir hale gelir." },
      { t: "Şeffaf Raporlama Kültürü", d: "Raporlama bizim için sadece bir çıktı değil, stratejik bir yönetim aracıdır. Tüm kampanya metriklerini — tıklama, gösterim, maliyet, dönüşüm oranı, gelir — sade ama etkili dashboardlarla sunarız. Bu sayede bütçenizi, performansınızı ve yatırım getirilerinizi anlık olarak kontrol edebilirsiniz." },
      { t: "İçgörü Odaklı Analiz ve Stratejik Karar Desteği", d: "AdsHigh olarak, raporlamayı yalnızca geçmiş performansı görmek için değil, geleceği şekillendirmek için kullanırız. Verileri derinlemesine analiz eder, kampanyalarınızın güçlü ve zayıf yönlerini ortaya çıkarırız. Elde edilen içgörülerle, bütçe dağılımından hedef kitle optimizasyonuna kadar tüm stratejik karar süreçlerini veriye dayalı hale getiririz." }
    ]
  },

  {
    type: "media",
    title: "Raporlama & Dashboard Kullanmanın Faydaları",
    body: `Dijital pazarlama başarısı, yalnızca kampanya yürütmekle değil; sonuçları ölçümleyip yorumlayabilmekle mümkündür.
AdsHigh olarak, özel dashboard çözümlerimizle:
Tüm kampanyalarınızı tek ekrandan takip etmenizi sağlarız,

KPI’lara (Performans Göstergeleri) göre otomatik raporlar oluştururuz,

Maliyet, gelir ve ROI verilerini netleştiririz,

Gerçek zamanlı optimizasyon kararlarını kolaylaştırırız.

Bu sayede veriler sadece “sayılardan” ibaret kalmaz; stratejik kararları yönlendiren bir avantaja dönüşür.`,
    slidesKey: "slidesPrimary"
  },

  {
    type: "list",
    title: "Hizmet Kapsamımız",
    items: [
      { t: "Google Looker Studio (Data Studio) Dashboard Kurulumu", d: "Google Ads, Meta, TikTok, Analytics ve e-ticaret verilerini entegre eden özel paneller oluştururuz." },
      { t: "GA4 & GTM Entegrasyonu", d: "Ölçümleme altyapınızı kurar, dönüşüm takibini uçtan uca doğru hale getiririz." },
      { t: "Otomatik Raporlama Sistemleri", d: "Günlük, haftalık veya aylık periyotlarda otomatik raporlar oluştururuz." },
      { t: "KPI & ROI Analizi", d: "Tüm kampanyalarınızı performans hedeflerinize göre analiz eder, yatırım getirilerini netleştiririz." },
      { t: "Özelleştirilmiş Dashboard Tasarımı", d: "Yönetim, pazarlama ve medya ekipleri için farklı metrikleri içeren özel görselleştirilmiş dashboard’lar tasarlarız." },
      { t: "Veri Görselleştirme & Storytelling", d: "Karmaşık verileri kolay anlaşılır grafiklerle sunar, veriden anlam çıkarılmasını kolaylaştırırız." }
    ]
  },

  {
    type: "media",
    side: "left",
    slidesKey: "slidesReverse",
    title: "AdsHigh ile Veriyi Stratejiye Dönüştürün",
    body: `AdsHigh, veriyi sadece ölçümlemekle kalmayıp stratejik bir avantaja dönüştüren profesyonel bir Dijital Pazarlama Ajansıdır.
Kampanyalarınızın tüm performans verilerini tek sistemde birleştirir, her adımı izlenebilir ve optimize edilebilir hale getiririz. Veri raporlama hizmetimizle, verilerinizi netleştirir, performansınızı güçlendirir ve dijital yatırımlarınızdan maksimum geri dönüş elde etmenizi sağlarız.`
  }
];


/* ===================== DİJİTAL DANIŞMANLIK ===================== */
const CONTENT_CONSULTING = [
  {
    type: "hero",
    title: "Dijital Danışmanlık",
    body: `AdsHigh olarak, markaların dijital dünyada sürdürülebilir büyüme sağlaması için kapsamlı dijital danışmanlık hizmeti sunuyoruz.
Veri, teknoloji ve stratejiyi bir araya getirerek markanızın dijital yatırımlarını daha kârlı, ölçülebilir ve etkili hale getiriyoruz.Her marka için özgün bir dijital yol haritası oluşturarak; performans pazarlaması, marka iletişimi, içerik üretimi ve kullanıcı deneyimini bütüncül biçimde yönetiyoruz.`
  },
  {
    type: "list",
    title: "Stratejimiz",
    items: [
      {
        t: "Derin Analiz ve İçgörü Üretimi",
        d: "Her işbirliği, markanızın dijital varlıklarının derinlemesine analiz edilmesiyle başlar.Veri analitiği, medya performansı, dönüşüm oranları ve rakip dinamiklerini değerlendirir, dijitaldeki fırsat alanlarını net biçimde tanımlarız."
      },
      {
        t: "Stratejik Entegrasyon ve Planlama",
        d: "AdsHigh olarak tüm dijital kanalları tek bir hedef etrafında birleştiriyoruz.Performans reklamları, sosyal medya, içerik, medya planlama ve raporlama süreçlerini entegre ederek markanız için ölçülebilir büyüme stratejileri oluştururuz."
      },
      {
        t: "Sürekli Optimizasyon ve Gelişim",
        d: "Danışmanlığımız, yalnızca planlama değil; performansın sürekli takibini içeren aktif bir süreçtir.Gerçek zamanlı veriler ve yapay zekâ destekli analizlerle kampanyalarınızı optimize eder, yatırımlarınızın her adımını kâra dönüştürürüz."
      }
    ]
  },
  {
    type: "media",
    title: "Dijital Danışmanlığın Faydaları",
    body: `Dijital danışmanlık, markaların tüm çevrimiçi varlıklarını tek bir stratejik vizyon altında yöneterek sürdürülebilir büyüme sağlar.
AdsHigh olarak, medya planlama, performans pazarlama, sosyal medya yönetimi, içerik stratejisi, veri analitiği ve raporlama süreçlerini entegre biçimde ele alıyoruz.Her danışmanlık süreci, markanın hedeflerine göre özel olarak tasarlanır;doğru kanallar, doğru mesajlar ve doğru bütçe yönetimiyle maksimum verim elde edilir.Veri odaklı yaklaşımımızla kampanyaların performansını sürekli izler, stratejiyi gerçek zamanlı olarak optimize ederiz.Amacımız yalnızca görünürlük sağlamak değil; markalar için ölçülebilir sonuçlar, sürdürülebilir satışlar ve güçlü bir dijital konumlama yaratmaktır.Raporlama sürecinde her adımı şeffaf biçimde paylaşır, alınan kararların somut etkilerini gösteririz.
Sonuç olarak AdsHigh, dijital danışmanlığı yalnızca bir rehberlik hizmeti değil,markaların dijital büyümesini yöneten stratejik bir ortaklık olarak sunar.`
  },
  {
    type: "list",
    title: "Hizmet Kapsamımız",
    items: [
      { t: "Dijital Ekosistem Analizi", d: "Mevcut dijital varlıklarınızı (web sitesi, uygulama(App) reklam hesapları, SEO durumu, içerik yapısı) derinlemesine analiz ediyoruz. Bu analiz, markanızın dijital büyüme yol haritasını şekillendirir." },
      { t: "Performans Stratejisi ve Kanal Optimizasyonu", d: "Google, Meta, TikTok, LinkedIn, Yandex gibi tüm kanallarda performans metriklerinizi optimize eder; bütçenizi ROI (yatırım getirisi) odaklı yönetiriz." },
      { t: "Veri ve Ölçümleme Altyapısı", d: "GTM, GA4, Meta Pixel, Conversion API gibi ölçüm sistemlerini entegre ederek reklamlarınızın her etkileşimini izlenebilir hale getiririz." },
      { t: "Kreatif ve İçerik Danışmanlığı", d: "Dijital kampanyalarınız için veriyle desteklenen yaratıcı stratejiler üretir, kullanıcıların ilgisini çekecek görsel ve metin konseptleri geliştiririz." },
      { t: "Stratejik Raporlama & Dashboard Kurulumu", d: "Kampanya, trafik, dönüşüm ve bütçe performansını tek ekrandan takip edebilmeniz için özel dashboard sistemleri tasarlarız." },
      { t: "Dijital Büyüme Danışmanlığı", d: "SEO, ASO, kullanıcı deneyimi (UX/UI) ve performans pazarlamasını entegre biçimde yöneterek markanızın dijitalde sürdürülebilir büyümesini sağlarız." }
    ]
  },
  {
    type: "media",
    side: "left",
    title: "AdsHigh ile Dijital Stratejinizi Güçlendirin",
    body: `1.Açıklama:  
AdsHigh, markaların dijital varlıklarını analiz eden, stratejik planlar geliştiren ve sonuçları ölçülebilir hale getiren profesyonel bir Dijital Danışmanlık Ajansıdır.Her kararı veriye, her stratejiyi performansa dayandırarak markanızın dijitalde sürdürülebilir büyümesini sağlıyoruz.
Dijital danışmanlık hizmetimiz ile markanızı yalnızca dijitalde var eden değil, dijitalde lider konuma taşıyan çözümler sunuyoruz.`
  }
];

/* ===================== X (TWITTER) REKLAMLARI ===================== */
const CONTENT_X = [
  {
    type: "hero",
    title: "X (Twitter) Reklamları",
    body: `AdsHigh olarak, markaların anlık gündemlere dahil olmasını, hedef kitlesiyle doğrudan etkileşime geçmesini ve dijital görünürlüğünü artırmasını sağlayan profesyonel X Reklam Yönetimi hizmeti sunuyoruz.
X platformunun dinamik yapısını, kullanıcı davranışlarını ve algoritma yapısını analiz ederek markanızı en doğru mesajla, en uygun zamanda öne çıkarıyoruz.Her reklamı sadece görünür değil, konuşulan hale getiriyoruz.`
  },
  {
    type: "list",
    title: "Stratejimiz",
    items: [
      {
        t: "Gerçek Zamanlı Etkileşim Odaklı Planlama",
        d: "X (eski adıyla Twitter), gündemin şekillendiği en hızlı platformdur.AdsHigh olarak, markanızı doğru zamanda doğru diyaloglara dahil ederiz.Trend analizleri, etkileşim verileri ve kullanıcı davranışları üzerinden strateji kurar; markanızın dijitalde “konuşulan” markalardan biri olmasını sağlarız."
      },
      {
        t: "Veri + Yaratıcılık Dengesi",
        d: "X reklamlarının başarısı, etkileyici metinlerle veriye dayalı hedeflemenin birleşiminden doğar.AdsHigh, kreatif içerikleri (metin, video, görsel, anket) performans verileriyle optimize eder; hem farkındalık hem dönüşüm odaklı kampanyalar üretir.Her kelime, etkileşim ve tıklama maliyeti (CPC) hedeflerine uygun biçimde test edilir."
      },
      {
        t: "Şeffaf Raporlama ve Sürekli Optimizasyon",
        d: "Gerçek zamanlı analizlerle kampanya performansınızı sürekli izleriz.Gösterim, etkileşim, tıklama ve dönüşüm metriklerini düzenli raporlarla sunar, bütçenizin en yüksek ROI (yatırım getirisi) sağlaması için dinamik optimizasyon uygularız."
      }
    ]
  },
  {
    type: "media",
    title: "X Reklamlarının Faydaları",
    body: `X, markaların gerçek zamanlı etkileşim kurabileceği, gündemle doğrudan bağlantı kuran en hızlı sosyal medya platformudur.Kullanıcı kitlesi aktif, meraklı ve güncel trendlere duyarlıdır bu da markalar için yüksek görünürlük ve hızlı geri dönüş anlamına gelir.
AdsHigh olarak, X’in hedefleme algoritmalarını ve kullanıcı davranış verilerini analiz ederek markanız için etkileşim, trafik ve satış odaklı kampanyalar tasarlarız.Promoted Ads ile marka bilinirliğini artırır, video ve carousel kampanyalarıyla kullanıcı dikkatini çekeriz.Yeniden hedefleme (retargeting) stratejileriyle daha önce markanızla etkileşime geçen kullanıcıları yeniden kazanır, dönüşüm oranlarını yükseltiriz.X’in uygulama tanıtım kampanyaları sayesinde mobil uygulamanızın indirme ve etkileşim oranlarını artırır, kullanıcı tabanınızı büyütürüz.Gerçek zamanlı raporlama ve sürekli optimizasyon süreçleriyle bütçenizden maksimum verim elde edilmesini sağlarız.
Sonuç olarak X reklamları, markanızı dijitalde gündemden satışa uzanan dinamik bir büyüme sürecine taşır.`
  },
  {
    type: "list",
    title: "X (Twitter) Reklam Türleri",
    desc: "X (Twitter), markaların hedef kitlelerine ulaşmasını, etkileşim yaratmasını ve satış performansını artırmasını sağlayan çok yönlü reklam formatları sunar.AdsHigh olarak, her kampanya türünü hedefinize uygun biçimde planlar, performans odaklı biçimde yönetiriz.",
    items: [
      { t: "Promoted Ads (Tanıtılan Reklamlar)", d: "Kullanıcıların zaman akışında organik içerik gibi görünür, marka bilinirliğini artırır." },
      { t: "Video Ads", d: "Kısa veya uzun video formatlarıyla güçlü görsel etki yaratır, izlenme ve marka hatırlanırlığını yükseltir." },
      { t: "Carousel Ads", d: "Birden fazla ürün veya mesajı tek reklam içinde sunarak etkileşimi artırır." },
      { t: "Follower Ads", d: "Markanızın takipçi sayısını artırmak ve topluluk oluşturmak için kullanılır." },
      { t: "Trend Takeover", d: "X’in gündem bölümünde (Trends) markanızı en üst sırada konumlandırarak geniş erişim sağlar." },
      { t: "App Ads", d: "Uygulama indirme ve etkileşim kampanyalarıyla mobil kullanıcı tabanınızı büyütür." },
      { t: "Website Clicks / Traffic Ads", d: "Web sitenize doğrudan trafik çeker, ziyaretçileri satın alma veya form doldurma aksiyonuna yönlendirir." },
      { t: "Conversation Ads", d: "Kullanıcıları belirli bir konu veya kampanya etrafında etkileşime davet eder, marka etkileşimini güçlendirir." }
    ]
  },
  {
    type: "media",
    side: "left",
    title: "X Reklamları ile Gerçek Zamanlı Güç Kazanın",
    body: `AdsHigh, markaların gündemle senkronize biçimde büyümesini sağlayan profesyonel bir X Reklam Ajansıdır.
Veriye dayalı planlama, yaratıcı strateji ve sürekli optimizasyon sayesinde kampanyalarınızı hem farkındalık hem dönüşüm açısından zirveye taşırız.X reklam danışmanlığı hizmetimizle markanızı konuşulan, hatırlanan ve dönüşüm getiren bir dijital güç haline getiriyoruz.`
  }
];


/* ===================== SEO + ASO + GEO — TEK SAYFA / 18 ALAN ===================== */
const CONTENT_SEO_SUITE = [
  /* ─────────────── SEO (6 alan) ─────────────── */
  {
    type: "hero",
    title: "Arama Motoru Optimizasyonu (SEO)",
    body: `AdsHigh olarak, markanızın dijital görünürlüğünü artırmak, arama motorlarında ilk sayfada konumlanmasını sağlamak ve sürdürülebilir organik trafik elde etmek için profesyonel SEO hizmeti sunuyoruz.
 Veri, teknik altyapı ve içerik stratejisini birleştirerek, web sitenizi sadece algoritmalara değil, kullanıcılara da uygun hale getiriyoruz.
 Amacımız yalnızca sıralama kazanmak değil; doğru kullanıcıyı, doğru anda markanızla buluşturmak.`
  },

  {
    type: "list",
    title: "Stratejimiz",
    items: [
      { t: "Teknik SEO ve Site Altyapısı Analizi", d: `Her güçlü SEO stratejisi, sağlam bir teknik temel ile başlar.
 AdsHigh olarak, web sitenizin hız, indeksleme, mobil uyumluluk, URL yapısı ve taranabilirlik gibi tüm teknik metriklerini analiz ederiz.
 Arama motorlarının sitenizi sorunsuz okumasını sağlayacak şekilde altyapınızı optimize ederiz.` },
      { t: "İçerik Stratejisi ve Anahtar Kelime Planlaması", d: `Kullanıcıların arama niyetini doğru analiz eder, bu verilere dayalı içerik haritaları oluştururuz.
 SEO uyumlu içerikler, hem Google algoritmalarına hem kullanıcı davranışlarına göre hazırlanır.
 Her sayfa, hedef kitlenize en doğru mesajı en uygun anahtar kelimelerle iletir.` },
      { t: "Backlink ve Otorite Yönetimi", d: `Sitenizin arama motorlarındaki otoritesini güçlendirmek için kaliteli bağlantı stratejileri geliştiririz.
 Güvenilir kaynaklardan alınan backlink’lerle markanızın dijital itibarı ve sıralama gücü artar.
 Tüm bağlantılar, etik SEO prensiplerine göre planlanır.` }
    ]
  },

  {
    type: "media",
    title: "SEO’nun Markanıza Sağladığı Faydalar",
    body: `SEO, dijital görünürlüğü artırmanın en sürdürülebilir ve maliyet etkin yoludur.
 Doğru bir SEO stratejisiyle web siteniz yalnızca tıklama değil, nitelikli müşteri trafiği kazanır.
AdsHigh olarak:
Organik trafiğinizi artırır, reklam maliyetlerinizi düşürürüz,


Google sıralamalarında istikrarlı yükseliş sağlarız,


Kullanıcı deneyimini iyileştirerek dönüşüm oranlarını yükseltiriz,


Markanızın dijital otoritesini güçlendiririz.


SEO’nun değeri, sadece sıralama değil; sürdürülebilir büyüme ve kalıcı görünürlüktür.`,
    slidesKey: "slidesPrimary",
    metrics: [
      { label: "Organik Trafik", value: "+%68" },
      { label: "Dönüşüm", value: "+%22" },
      { label: "B.Maliyeti", value: "↓" }
    ]
  },

  {
    type: "list",
    title: "Hizmet Kapsamımız",
    items: [
      { t: "Teknik SEO Analizi ve Optimizasyon", d: "Site altyapınızı Google standartlarına uygun hale getiririz." },
      { t: "Anahtar Kelime ve Rakip Analizi", d: "Sektörünüzdeki fırsat alanlarını tespit eder, stratejik planlar oluştururuz." },
      { t: "İçerik SEO (On-Page)", d: "Başlık, meta etiket, içerik yapısı ve link hiyerarşisini SEO uyumlu hale getiririz." },
      { t: "Off-Page SEO ve Backlink Yönetimi", d: "Güçlü ve organik bağlantı ağı oluşturarak domain otoritenizi artırırız." },
      { t: "Yerel SEO Optimizasyonu", d: "Google Haritalar ve yerel aramalarda görünürlüğünüzü artırırız." },
      { t: "SEO Raporlama & İzleme", d: "Tüm sıralama ve trafik değişimlerini özel dashboard’larda sunarız." }
    ]
  },

  {
    type: "media",
    side: "left",
    slidesKey: "slidesReverse",
    title: "AdsHigh ile SEO’da Sürdürülebilir Büyüme",
    body: `AdsHigh, SEO’yu yalnızca bir teknik süreç olarak değil, marka büyüme stratejisinin merkezinde konumlandırır.
 Veriye dayalı planlama, sürekli optimizasyon ve yaratıcı içerik yönetimiyle markanızı Google’da görünür, güçlü ve kalıcı hale getiririz.
 SEO danışmanlığı hizmetimizle web sitenizin potansiyelini açığa çıkarır, organik trafiği sürdürülebilir bir gelire dönüştürürüz.`
  },

  { type: "cta", title: "SEO için birlikte planlayalım", body: "Hedeflerinize göre yol haritasını bugün çıkaralım." },

  /* ─────────────── ASO (6 alan) ─────────────── */
  {
    type: "hero",
    title: "Mobil Uygulama Optimizasyonu (ASO)",
    body: `AdsHigh olarak, uygulamanızın App Store ve Google Play’de en üst sıralarda yer almasını sağlamak için profesyonel ASO (App Store Optimization) hizmeti sunuyoruz.Veriye dayalı analiz, kullanıcı davranışları ve algoritma dinamiklerini birleştirerek uygulamanızın indirme oranlarını artırır, görünürlüğünü güçlendiririz.
Amacımız yalnızca daha fazla indirme değil, daha nitelikli kullanıcı kazanımı sağlamaktır.`
  },

  {
    type: "list",
    title: "Stratejimiz",
    items: [
      { t: "Uygulama Analizi ve Kategori Rekabeti", d: `Her ASO süreci, uygulamanızın mevcut performansını analiz etmekle başlar.Uygulama başlığı, açıklama, görsel, kategori ve kullanıcı yorumları detaylı şekilde incelenir.Rakip uygulamalarla karşılaştırmalı analiz yaparak sıralama fırsatlarını belirleriz.` },
      { t: "Anahtar Kelime ve Görsel Optimizasyonu", d: `App Store ve Google Play’de arama sonuçlarını etkileyen en önemli faktörlerden biri doğru anahtar kelime kullanımıdır.AdsHigh olarak, yüksek arama hacimli ve rekabeti düşük anahtar kelimeleri tespit eder, uygulamanızın başlık ve açıklama yapısını buna göre optimize ederiz.Ayrıca ikon, ekran görüntüsü ve tanıtım videolarınızı kullanıcı psikolojisine göre düzenleyerek tıklama oranlarını artırırız.` },
      { t: "Dönüşüm Odaklı Sürekli Optimizasyon", d: `ASO, statik bir işlem değil, sürekli güncellenen bir süreçtir.Kullanıcı davranışları, algoritma değişimleri ve geri bildirimler doğrultusunda uygulamanızın görünürlüğünü sürekli izler ve optimize ederiz.Gerçek zamanlı performans analizleriyle indirme oranlarını, kullanıcı etkileşimlerini ve yorum metriklerini yönetiriz.` }
    ]
  },

  {
    type: "media",
    title: "ASO’nun Markanıza Sağladığı Faydalar",
    body: `App Store Optimization (ASO), mobil uygulamaların dijitalde büyümesini sağlayan en etkili organik pazarlama yöntemidir.Reklam bütçenizi artırmadan, uygulamanızın görünürlüğünü yükseltir ve kullanıcı edinme maliyetini düşürür.
AdsHigh olarak:
Uygulamanızın indirme oranlarını artırırız,


Kullanıcı etkileşimini ve yorum skorlarını iyileştiririz,


Uygulamanızın sıralamasını organik olarak yükseltiriz,


App Store ve Google Play’de kalıcı görünürlük elde etmenizi sağlarız.


Sonuç olarak markanız, sadece indirilen değil, aktif olarak kullanılan bir uygulamaya dönüşür.`,
    slidesKey: "slidesPrimary",
    metrics: [
      { label: "İndirme", value: "+%40" },
      { label: "CVR", value: "+%18" },
      { label: "CPI", value: "↓" }
    ]
  },

  {
    type: "list",
    title: "Hizmet Kapsamımız",
    items: [
      { t: "App Store ve Google Play Analizi", d: "Uygulamanızın mevcut sıralama, kategori ve performans durumunu analiz ederiz." },
      { t: "Anahtar Kelime Araştırması", d: "Hedef kitleye uygun kelimeleri belirler, metin optimizasyonu yaparız." },
      { t: "Uygulama Görselleri & Video Düzenleme", d: "Kullanıcı deneyimini artıracak kreatif çözümlerle tıklama oranlarını yükseltiriz." },
      { t: "A/B Testleri ve Kullanıcı Davranışı Analizi", d: "En yüksek dönüşüm getiren başlık, açıklama ve görsel kombinasyonlarını test ederiz." },
      { t: "Yorum ve Puan Yönetimi", d: "Kullanıcı yorumlarını analiz eder, memnuniyet oranlarını artıracak aksiyonlar planlarız." },
      { t: "ASO Raporlama & Performans Takibi", d: "Güncel sıralama, indirme ve dönüşüm verilerini raporlayarak stratejiyi sürekli geliştiririz." }
    ]
  },

  {
    type: "media",
    side: "left",
    slidesKey: "slidesReverse",
    title: "AdsHigh ile Mobil Uygulamanız Zirveye Çıksın",
    body: `AdsHigh, uygulamanızın görünürlüğünü artıran, kullanıcı etkileşimini güçlendiren ve organik indirmeleri maksimize eden profesyonel bir ASO Ajansıdır.Veri, kullanıcı deneyimi ve algoritma optimizasyonunu birleştirerek uygulamanızın App Store ve Google Play sıralamalarında üst sıralara çıkmasını sağlıyoruz.
ASO danışmanlığı hizmetimizle, uygulamanızın potansiyelini tam kapasiteye çıkarır, dijitalde kalıcı başarıya dönüştürürüz.`
  },

  { type: "cta", title: "ASO tarafını da büyütelim", body: "Store görselleri + anahtar kelime stratejisi + test planı." },

  /* ─────────────── GEO (6 alan) ─────────────── */
  {
    type: "hero",
    title: "Generative Engine Optimization (GEO)",
    body: `AdsHigh olarak, yapay zekâ destekli arama motoru algoritmalarına uygun GEO (Generative Engine Optimization) stratejileriyle markanızı geleceğin arama dünyasına hazırlıyoruz.GEO, klasik SEO’nun ötesine geçerek içeriklerinizi yapay zeka sistemleri özellikle Google SGE (Search Generative Experience) ve ChatGPT tarzı üretken arama modelleri tarafından doğru, güvenilir ve referans alınabilir hale getirir.
Amacımız yalnızca görünürlük değil; markanızı, AI tarafından önerilen markalar arasına taşımaktır.`
  },

  {
    type: "list",
    title: "Stratejimiz",
    items: [
      { t: "İçerik + Yapay Zekâ Uyumu", d: `Yapay zekâ tabanlı arama motorları artık yalnızca kelimeleri değil, bağlamı (context) anlıyor.AdsHigh olarak, içeriklerinizi bu yeni yapay zekâ mantığına uygun şekilde yeniden kurguluyoruz.Veriye dayalı içerik yapıları, doğal dil modeli uyumu (NLP), semantik analiz ve anlam ilişkileriyle içeriklerinizin AI motorlarında öne çıkmasını sağlıyoruz.` },
      { t: "Kaynak Güvenilirliği ve Veri Otoritesi", d: `GEO, yalnızca iyi yazılmış içerik değil, güvenilir bilgi kaynağı olmayı da gerektirir.Markanızı yapay zekâ tarafından “otorite” olarak algılayacak biçimde optimize ederiz.Structured data (schema), E-E-A-T ilkeleri (Experience, Expertise, Authoritativeness, Trustworthiness) ve içerik kaynak referanslamalarıyla markanızı dijitalde güven inşa eden bir bilgi merkezi haline getiririz.` },
      { t: "SGE ve Yapay Zekâ İçin Teknik Uyum", d: `Google’ın Search Generative Experience (SGE) sistemine tam uyum için içerik mimarisi, meta yapısı, sayfa yüklenme hızı ve veri bağlantılarını optimize ederiz.Yapay zekâ tarafından öne çıkarılacak “bilgi bloklarını” (featured data snippets) stratejik biçimde tasarlarız.Bu sayede içeriğiniz, hem arama sonuçlarında hem de üretken yapay zekâ cevap kutularında görünür hale gelir.` }
    ]
  },

  {
    type: "media",
    title: "GEO’nun Markanıza Sağladığı Faydalar",
    body: `GEO, klasik SEO’nun evrimleşmiş hâlidir.Geleneksel arama sonuçlarının ötesine geçerek, yapay zekâ destekli arama motorlarında markanızın ilk önerilen kaynaklardan biri olmasını sağlar.
AdsHigh olarak:
Markanızı üretken arama motorlarında görünür hale getiririz,


AI tarafından güvenilir kaynak olarak referans almanızı sağlarız,


Yapay zekâ çağında içeriklerinizin sürdürülebilir görünürlüğünü garanti altına alırız,


Web sitenizi yalnızca algoritmalara değil, yapay zekâ modellerine de optimize ederiz.


Sonuç: Arama motorlarının geleceğinde markanız görünür, güvenilir ve önerilen hale gelir.`,
    slidesKey: "slidesPrimary",
    metrics: [
      { label: "AI Görünürlüğü", value: "↑" },
      { label: "Alıntılanma", value: "+%35" },
      { label: "EEAT", value: "Güçlü" }
    ]
  },

  {
    type: "list",
    title: "Hizmet Kapsamımız",
    items: [
      { t: "GEO Strateji Geliştirme", d: "Yapay zekâ destekli arama motorlarının algoritmalarına uygun stratejik planlama yaparız." },
      { t: "İçerik Yeniden Yapılandırma", d: "NLP, semantik SEO ve veri odaklı içerik üretimiyle içeriklerinizi AI uyumlu hale getiririz." },
      { t: "Yapısal Veri (Schema) Optimizasyonu", d: "Google SGE ve ChatGPT benzeri modellerin içeriğinizi doğru anlamasını sağlayan teknik düzenlemeler yaparız." },
      { t: "E-E-A-T Uyumlu İçerik Geliştirme", d: "Güvenilirlik ve uzmanlık göstergelerini güçlendiririz." },
      { t: "SGE Görünürlük Analizi", d: "İçeriklerinizin Google’ın yapay zekâ arayüzlerinde nasıl konumlandığını analiz ederiz." },
      { t: "GEO Raporlama & AI Görünürlük Takibi", d: "Yapay zekâ destekli sonuçlarda görünürlüğünüzü düzenli olarak ölçer ve geliştiririz." }
    ]
  },

  {
    type: "media",
    side: "left",
    slidesKey: "slidesReverse",
    title: "AdsHigh ile Arama Motorlarının Geleceğine Hazırlanın",
    body: `AdsHigh, yapay zekâ çağında markaların dijital görünürlüğünü yeniden tanımlayan bir GEO Ajansıdır. SEO’nun geleceğini bugünden uygulayarak, markanızın yalnızca arama sonuçlarında değil, yapay zekâ tarafından önerilen içeriklerde de yer almasını sağlıyoruz.
Generative Engine Optimization hizmetimizle markanızı yapay zekâ destekli arama ekosistemine adapte ediyor, geleceğin dijital görünürlüğünü bugünden inşa ediyoruz.`
  },

  { type: "cta", title: "GEO ile geleceğe uyumlayalım", body: "Schema + EEAT + SGE uyumlu bilgi blokları." }
];


// ===== SLUG çözümleyici + içerik yönlendirme =====

/* 1) SLUG → KEY eşlemesi (tüm alias’lar dahil) */
const SLUG_MAP = {
  google:       ["google-reklamlari", "google-ads", "adwords"],
  // Facebook ve Instagram'ı tek META içeriğine bağla
  meta:         ["meta-reklamlari", "facebook-reklamlari", "instagram-reklamlari"],
  tiktok:       ["tiktok-reklamlari", "tiktok-ads"],
  snapchat:     ["snapchat-reklamlari", "snapchat-ads"],
  telegram:     ["telegram-reklamlari", "telegram-ads"],
  yandex:       ["yandex-reklamlari", "yandex-ads"],
  linkedin:     ["linkedin-reklamlari", "linkedin-ads"],
  programmatic: ["programatik-medya", "programatik", "medya-satin-alma", "display-video"],
  reporting:    ["raporlama-dashboard", "dashboard", "olcumleme-raporlama"],
  consulting:   ["dijital-danismanlik", "danismanlik"],
  uiux:         ["ui-ux-tasarim", "ui-ux", "grafik-tasarim"],
  seo_suite:    ["seo-aso-geo", "seo", "seo-hizmetleri"],
  x:            ["x-reklamlari", "twitter-reklamlari", "x-ads", "twitter-ads"],
};

// 2) Slug'tan anahtar üret
function keyFromSlug(slug) {
  if (!slug) return null;
  let found = null;
  Object.entries(SLUG_MAP).some(([key, arr]) => {
    if (arr.includes(slug)) { found = key; return true; }
    return false;
  });
  return found;
}


// ---- DOĞRU TEMA ADLARIYLA GÜNCEL ----
const CONTENT_BY_KEY = {
  google:       { theme: "google",      sections: (typeof CONTENT_GOOGLE      !== "undefined" ? CONTENT_GOOGLE      : []) },
  meta:         { theme: "meta",        sections: (typeof CONTENT_META        !== "undefined" ? CONTENT_META        : []) },
  tiktok:       { theme: "tiktok",      sections: (typeof CONTENT_TIKTOK      !== "undefined" ? CONTENT_TIKTOK      : []) },
  snapchat:     { theme: "snapchat",    sections: (typeof CONTENT_SNAPCHAT    !== "undefined" ? CONTENT_SNAPCHAT    : []) },
  telegram:     { theme: "telegram",    sections: (typeof CONTENT_TELEGRAM    !== "undefined" ? CONTENT_TELEGRAM    : []) },
  yandex:       { theme: "yandex",      sections: (typeof CONTENT_YANDEX      !== "undefined" ? CONTENT_YANDEX      : []) },
  linkedin:     { theme: "linkedin",    sections: (typeof CONTENT_LINKEDIN    !== "undefined" ? CONTENT_LINKEDIN    : []) },
  programmatic: { theme: "programmatic",sections: (typeof CONTENT_PROGRAMATIK !== "undefined" ? CONTENT_PROGRAMATIK : []) },
  reporting:    { theme: "reporting",   sections: (typeof CONTENT_RAPORLAMA   !== "undefined" ? CONTENT_RAPORLAMA   : []) },
  consulting:   { theme: "consulting",  sections: (typeof CONTENT_CONSULTING  !== "undefined" ? CONTENT_CONSULTING  : []) },
  uiux:         { theme: "uiux",        sections: (typeof CONTENT_UIUX        !== "undefined" ? CONTENT_UIUX        : []) },
  seo_suite:    { theme: "reporting",   sections: (typeof CONTENT_SEO_SUITE    !== "undefined" ? CONTENT_SEO_SUITE    : []) },
  x:            { theme: "x",           sections: (typeof CONTENT_X           !== "undefined" ? CONTENT_X           : []) },
};



// 4) Asıl sayfa bileşeni
function ServiceDetailLite() {
  const { slug } = useParams();
  const key = keyFromSlug(slug);
  const pack = key ? CONTENT_BY_KEY[key] : null;

  if (pack && Array.isArray(pack.sections) && pack.sections.length > 0) {
    return <ServiceComposer themeKey={pack.theme} sections={pack.sections} />;
  }

  // Fallback
  const title = (slug || "Hizmet").replace(/-/g, " ");
  return (
    <main className="pmv56">
      <PMV56Styles />
      <SectionHero title={title} body={"Bu sayfa için içerik yakında eklenecek."} themeKey={pack?.theme || "meta"} />
      <section className="section">
        <div className="container">
          <div className="textbody">
            Eklemek istediğiniz metni iletin, aynı şablonda hemen dolduralım.
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServiceDetailLite;