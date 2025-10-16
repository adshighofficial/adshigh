// src/pages/ServiceDetail.jsx
// Tek dosya: HERO renk döngüsü + telefon içi kayan slaytlar (2. ve 5. alan)

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

/* ===== HİZMET TEMA VERİSİ (telefon slaytları + arka plan gradyanları) ===== */
const SERVICE_THEMES = {
  meta: {
    accents: ["#1877F2", "#8b5cf6"],
    gradients: [
      "linear-gradient(135deg,#0b5cff,#1877F2)",
      "linear-gradient(135deg,#1b64f2,#8b5cf6)",
      "linear-gradient(135deg,#8b5cf6,#0b5cff)",
      "linear-gradient(135deg,#1877F2,#1b64f2)",
    ],
    slidesPrimary: [
      { tag: "Reels",   text: "UGC • Hook → Offer",   bg: "linear-gradient(135deg,#0b5cff,#1877F2)" },
      { tag: "Stories", text: "DPA • Öne Çıkan Ürün", bg: "linear-gradient(135deg,#8b5cf6,#1877F2)" },
      { tag: "Feed",    text: "Creatives • CTA Test", bg: "linear-gradient(135deg,#1b64f2,#8b5cf6)" },
    ],
    slidesReverse: [
      { tag: "ASC",     text: "Hybrid • Signals",     bg: "linear-gradient(135deg,#1877F2,#0b5cff)" },
      { tag: "Catalog", text: "DPA • Set’ler",        bg: "linear-gradient(135deg,#8b5cf6,#1b64f2)" },
      { tag: "UGC",     text: "Hook • Problem • CTA", bg: "linear-gradient(135deg,#0b5cff,#8b5cf6)" },
    ],
  },
  // istersen başka hizmetleri de ekleyebilirsin
};

/* ===== Scroll'da görünce açılan animasyon (reveal) ===== */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".pmv56 .reveal");
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => {
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

/* ===== HERO: arka planı döngü halinde cross-fade eden katman ===== */
function HeroGradientCycler({ interval = 4000, fade = 1400, gradients = [] }) {
  const G = gradients.length ? gradients : [
    "linear-gradient(135deg,#5B21B6 0%,#7C3AED 100%)",
    "linear-gradient(135deg,#4C1D95 0%,#7C3AED 100%)",
    "linear-gradient(135deg,#6D28D9 0%,#5B21B6 100%)",
    "linear-gradient(135deg,#7C3AED 0%,#9333EA 100%)",
  ];
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(1);
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      const next = ((showFront ? back : front) + 1) % G.length;
      if (showFront) setBack(next); else setFront(next);
      setShowFront((s) => !s);
    }, interval);
    return () => clearInterval(id);
  }, [showFront, front, back, interval, G.length]);

  return (
    <>
      <div className="hero-grad"
        style={{ backgroundImage: G[front], opacity: showFront ? 1 : 0, transition: `opacity ${fade}ms ease` }} />
      <div className="hero-grad"
        style={{ backgroundImage: G[back],  opacity: showFront ? 0 : 1, transition: `opacity ${fade}ms ease` }} />
    </>
  );
}

/* ===== Telefon Maketi: içindeki slaytları otomatik yukarı kaydırır ===== */
function SlidePhoneClassic({ slides = [] }) {
  return (
    <div className="ad-phone">
      <div className="ad-notch" />
      <div className="ad-slider">
        <div className="ad-track">
          {slides.slice(0, 3).map((s, i) => (
            <div className={`ad-slide d${i}`} key={i} style={{ background: s.bg }}>
              {s.tag && <div className="ad-tag">{s.tag}</div>}
              <strong>{s.text}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Stil (yalın hâli; hero + telefon + temel section) ===== */
function PMV56Styles() {
  return (
    <style>{`
.pmv56{ --ink:#e9e9ef; --ink-muted:#c6c9e9; --panel:#0f132d; --line:rgba(255,255,255,.14); color:var(--ink); font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; }
.pmv56 .container{ width:min(1200px,93vw); margin:0 auto }
.pmv56 .reveal{ opacity:0; transform:translateY(24px); transition:.6s cubic-bezier(.2,.8,.2,1) }
.pmv56 .reveal.in{ opacity:1; transform:none }

/* HERO */
.pmv56 .hero{ position:relative; padding:86px 0 72px; overflow:hidden; border-bottom:1px solid var(--line); background:#0f132d }
.pmv56 .hero .container{ position:relative; z-index:2 }
.pmv56 .breadcrumb{ font-size:14px; margin-bottom:8px; color:#fff; opacity:.9 }
.pmv56 h1{ margin:6px 0 12px; font:900 clamp(38px,6vw,58px)/1.08 Inter; color:#fff; letter-spacing:-.8px }
.pmv56 .lede{ max-width:85ch; font-size:17px; color:#d9dbff; margin:0 }
.pmv56 .actions{ display:flex; gap:12px; margin-top:26px }
.pmv56 .btn{ height:48px; padding:0 22px; border-radius:12px; font-weight:800; background:linear-gradient(135deg,#7C3AED,#A855F7); border:0; color:#fff; box-shadow:0 10px 30px rgba(124,58,237,.22) }
.pmv56 .hero .hero-grad{ position:absolute; inset:0; opacity:0; background-size:200% 200%; animation:pan 12s ease-in-out infinite; mix-blend-mode:screen }
@keyframes pan{ 0%{ background-position:0% 50% } 50%{ background-position:100% 50% } 100%{ background-position:0% 50% } }

/* SECTION */
.pmv56 .section{ padding:90px 0; border-bottom:1px solid var(--line); background:color-mix(in srgb, #121632 92%, #0b0f2d 8%) }
.pmv56 h2{ margin:0 0 12px; font:900 clamp(28px,4.5vw,42px)/1.18 Inter; text-align:center; letter-spacing:-.5px; color:#EEF2FF }
.pmv56 .subheader, .pmv56 .why-us-text p{ max-width:85ch; margin:0 auto 56px; text-align:center; color:#c7ccff; font-size:15.5px }

/* WHY-US (media bandı) */
.pmv56 .why-us-content{ display:grid; grid-template-columns:1.08fr .92fr; gap:32px; align-items:center }
.pmv56 .why-us-content.reverse{ grid-template-columns:.92fr 1.08fr }
.pmv56 .why-us-section h2{ color:#fff; margin-bottom:10px }
.pmv56 .why-us-image{
  position:relative; min-height:320px; border-radius:16px; overflow:hidden;
  background: radial-gradient(600px 260px at 80% -40%, rgba(124,58,237,.20), transparent 70%),
             radial-gradient(600px 260px at 0% 120%, rgba(34,211,238,.12), transparent 70%),
             rgba(19, 25, 46, .76);
  border:1px solid rgba(255,255,255,.12);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.05), 0 14px 34px rgba(0,0,0,.35);
  backdrop-filter: blur(6px);
}

/* Telefon */
.pmv56 .ad-phone{ position:absolute; left:22px; top:22px; width:190px; height:272px; border-radius:22px; background:#0B0F1E; box-shadow:inset 0 0 0 2px rgba(255,255,255,.08), 0 14px 28px rgba(0,0,0,.35); overflow:hidden }
.pmv56 .ad-notch{ position:absolute; left:50%; transform:translateX(-50%); top:0; width:90px; height:16px; background:#0B0F1E; border-bottom-left-radius:10px; border-bottom-right-radius:10px }
.pmv56 .ad-slider{ position:absolute; inset:10px 10px; border-radius:14px; overflow:hidden; background:#111827 }
.pmv56 .ad-track{ position:absolute; left:0; top:0; right:0; height:300%; animation:adscroll 9s linear infinite }
@keyframes adscroll{ 0%{transform:translateY(0)} 33%{transform:translateY(-33.333%)} 66%{transform:translateY(-66.666%)} 100%{transform:translateY(-100%)} }
.pmv56 .ad-slide{ height:33.333%; display:grid; place-items:center; padding:12px; color:#fff; position:relative }
.pmv56 .ad-tag{ position:absolute; right:12px; top:12px; background:#fff; color:#0B0F1E; font-weight:900; font-size:10.5px; padding:6px 10px; border-radius:999px }

/* KPI kutuları */
.pmv56 .metric-row{ position:absolute; right:18px; bottom:18px; display:grid; gap:10px; width:calc(100% - 230px); grid-template-columns:repeat(3,1fr) }
.pmv56 .metric{ background:rgba(255,255,255,.10); border:1px solid rgba(255,255,255,.18); border-radius:12px; padding:12px; color:#fff; backdrop-filter:blur(4px) }
.pmv56 .metric h4{ margin:0 0 6px; font-size:12px; opacity:.85 }
.pmv56 .metric strong{ font-size:20px }

/* Mobil */
@media (max-width: 960px){
  .pmv56 .why-us-content, .pmv56 .why-us-content.reverse{ grid-template-columns:1fr; gap:18px }
  .pmv56 .why-us-image{ min-height:260px }
  .pmv56 .ad-phone{ position:static; margin:10px auto 0; width:170px; height:245px }
  .pmv56 .metric-row{ position:static; width:auto; grid-template-columns:repeat(3,1fr); margin:14px 0 0 }
  .pmv56 .section{ padding:70px 0 }
  .pmv56 .hero{ padding:56px 0 40px }
}
`}</style>
  );
}

/* ===== Bölüm 1: HERO ===== */
function SectionHero({ title, body, themeKey = "meta" }) {
  const theme = SERVICE_THEMES[themeKey] || {};
  return (
    <header className="hero">
      {/* 1. alan — arka plan renk döngüsü */}
      <HeroGradientCycler gradients={theme.gradients || []} />
      <div className="container reveal in">
        <div className="breadcrumb">
          <Link to="/" style={{ color: "#fff", opacity: 0.9, textDecoration: "none" }}>
            Anasayfa
          </Link>
          &nbsp;›&nbsp;{title}
        </div>
        <h1>{title}</h1>
        {body ? <p className="lede">{body}</p> : null}
        <div className="actions">
          <a href="#contact" className="btn">Bilgi Al</a>
        </div>
      </div>
    </header>
  );
}

/* ===== Bölüm 2/5: MEDYA BANDI (telefon + kayan slaytlar) ===== */
function SectionMedia({ title, body, themeKey, side = "left", metrics = [], slidesKey = "slidesPrimary" }) {
  const theme  = SERVICE_THEMES[themeKey] || {};
  const slides = theme[slidesKey] || [];
  const imageLeft = side === "left";
  return (
    <section className="why-us-section section">
      <div className="container">
        <div className={`why-us-content ${imageLeft ? "reverse" : ""}`}>
          {!imageLeft && (
            <div className="why-us-text reveal">
              <h2>{title}</h2>
              {body ? <p>{body}</p> : null}
            </div>
          )}

          <div className="why-us-image reveal" style={{ transitionDelay: ".12s" }}>
            {/* 2. ve 5. alan — telefon içi akan kelimeler */}
            <SlidePhoneClassic slides={slides} />
            {!!metrics.length && (
              <div className="metric-row">
                {metrics.slice(0,3).map((m,i)=>(
                  <div className="metric" key={i}>
                    <h4>{m.label}</h4>
                    <strong>{m.value}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>

          {imageLeft && (
            <div className="why-us-text reveal" style={{ transitionDelay: ".06s" }}>
              <h2>{title}</h2>
              {body ? <p>{body}</p> : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===== SAYFA: hepsini bir araya getir ===== */
export default function ServiceDetail() {
  const { slug } = useParams();                 // /hizmetler/:slug (örn: meta)
  const themeKey = slug || "meta";
  const theme = SERVICE_THEMES[themeKey] || {};

  useReveal();
  return (
    <div className="pmv56" style={{ "--g1": theme.accents?.[0] || "#7C3AED", "--g2": theme.accents?.[1] || "#22D3EE" }}>
      <PMV56Styles />

      <SectionHero
        title={themeKey === "meta" ? "Meta Reklamları" : "Hizmet Detayı"}
        body="AdsHigh olarak, markaların Facebook ve Instagram’da büyümesini sağlayan profesyonel kampanya yönetimi sunuyoruz."
        themeKey={themeKey}
      />

      {/* 2. ALAN */}
      <SectionMedia
        title="Meta Reklamlarının Faydaları"
        body="Marka bilinirliği kampanyalarıyla görünürlüğünüzü artırır, yeni kullanıcı edinme stratejileriyle potansiyel müşterilere ulaştırırız."
        themeKey={themeKey}
        side="right"
        slidesKey="slidesPrimary"
        metrics={[
          { label: "ROAS", value: "4.2x" },
          { label: "CPA",  value: "₺128" },
          { label: "CVR",  value: "3.9%" },
        ]}
      />

      {/* araya başka bölümler ekleyebilirsin */}

      {/* 5. ALAN */}
      <SectionMedia
        title="Yeniden Pazarlama ile Büyüme"
        body="Dönüşümleri artırmak için yeniden pazarlama ve ASC gibi sinyal tabanlı yapılandırmalar kullanırız."
        themeKey={themeKey}
        side="left"
        slidesKey="slidesReverse"
        metrics={[
          { label: "View-through", value: "+18%" },
          { label: "CTR",          value: "1.8%" },
        ]}
      />
    </div>
  );
}