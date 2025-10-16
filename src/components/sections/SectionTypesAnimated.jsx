import React from "react";
import { SERVICE_THEMES } from "../../themes/serviceThemes";
import MultiP from "../common/MultiP";

/* küçük uydu chip */
function EcoNode({ x, y, img, label, pill }) {
  return (
    <div className="eco-node" style={{ left: `${x}px`, top: `${y}px` }}>
      <div className="eco-badge">{pill}</div>
      <div className="eco-chip">
        {img ? <img src={img} alt={label} /> : null}
        <span>{label}</span>
      </div>
    </div>
  );
}

/* --- GOOGLE: ekosistem --- */
function SceneGoogleEco({ ac1, ac2, ICON }) {
  return (
    <div className="ecosys" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="eco-bg" />
      <svg className="eco-links" viewBox="0 0 560 420" preserveAspectRatio="none">
        <defs><filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.2" /></filter></defs>
        <path d="M280,220 C330,180 380,170 440,150" className="eco-path p1" />
        <path d="M280,220 C330,250 390,265 455,300" className="eco-path p2" />
        <path d="M280,220 C240,170 190,160 120,150" className="eco-path p3" />
        <path d="M280,220 C230,250 180,280 110,305" className="eco-path p4" />
        <path d="M280,220 C340,210 395,210 455,220" className="eco-path p5" />
        <path d="M280,220 C220,210 165,210 105,220" className="eco-path p6" />
        {[...Array(12)].map((_, i) => (
          <circle key={i} r="3" className={`eco-pulse d${(i % 6) + 1}`} cx="280" cy="220" />
        ))}
      </svg>

      <div className="eco-center">
        <img src={ICON.google} alt="Google Ads" />
        <strong>Google Ads</strong>
        <em>Signals • Bidding • Delivery</em>
      </div>

      <EcoNode x="458" y="140" img={ICON.youtube} label="YouTube" pill="Video" />
      <EcoNode x="460" y="300" img={ICON.discover} label="Discover" pill="Feed" />
      <EcoNode x="100" y="145" img={ICON.search} label="Search" pill="Text" />
      <EcoNode x="100" y="305" img={ICON.display} label="Display" pill="GDN" />
      <EcoNode x="458" y="220" img={ICON.gmail} label="Gmail" pill="Promo" />
      <EcoNode x="100" y="220" img={ICON.maps} label="Maps" pill="Local" />
    </div>
  );
}

/* --- META: kart istif --- */
function SceneMetaCards({ ac1, ac2 }) {
  const cards = [{ t: "Awareness" }, { t: "Traffic" }, { t: "Leads" }, { t: "Sales" }];
  return (
    <div className="meta-scene ecosys" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="eco-bg" />
      <div className="meta-stack">
        {cards.map((c, i) => (
          <div className="meta-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="meta-chip">{c.t}</div>
            <span className="meta-sub">{c.s}</span>
            <button className="meta-cta">Promote</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- TIKTOK --- */
function SceneTikTokPhones({ ac1, ac2, ICON }) {
  return (
    <div className="tt-scene" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="tt-phone center">
        <div className="tt-screen">
          <div className="tt-reel">
            <div className="tt-caption">For You • YOU +</div>
            <div className="tt-play"></div>
          </div>
        </div>
      </div>
      <div className="tt-phone left" />
      <div className="tt-phone right" />
      <img className="tt-logo" src={ICON.tiktok} alt="TikTok" />
    </div>
  );
}

/* --- SNAPCHAT --- */
function SceneSnapGhost({ ac1, ac2, basePath }) {
  return (
    <div className="snap-scene ecosys" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="snap-ghost">
        <img src={`${basePath}/snapchat_logo.webp`} alt="Snapchat" />
        <span className="ring r1" />
        <span className="ring r2" />
        <span className="ring r3" />
      </div>
      <div className="snap-cards">
        {[0, 1, 2].map((i) => (
          <div className={`snap-card s${i}`} key={i}>
            <div className="snap-top">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
            <div className="snap-sticker">AR Lens</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- TELEGRAM --- */
function SceneTelegramFeed({ ac1, ac2, basePath }) {
  const msgs = [
    { a: true, t: "Kampanya başlıyor! %20 indirim" },
    { a: false, t: "👉 Detaylar için tıklayın" },
    { a: true, t: "Yeni koleksiyon yayında" },
    { a: false, t: "#reklam • site-linki.tr" },
  ];
  return (
    <div className="tg-scene ecosys" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="tg-window">
        <div className="tg-header">
          <img src={`${basePath}/telegram_logo.png`} alt="Telegram" />
          <strong>Channel</strong>
        </div>
        <div className="tg-body">
          {msgs.map((m, i) => (
            <div className={`tg-bubble ${m.a ? "out" : "in"}`} style={{ animationDelay: `${i * 0.12}s` }} key={i}>
              {m.t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- YANDEX: 3D blok --- */
function SceneYandexBlocks({ ac1, ac2, ICON }) {
  const labels = ["Smart banners", "Dynamic ads", "Ads"];
  return (
    <div className="ydx-scene" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="ydx-pile">
        {labels.map((lb, i) => (
          <div className="ydx-block" key={i} style={{ "--i": i }}>
            <span>{lb}</span>
          </div>
        ))}
      </div>
      <img className="ydx-logo" src={ICON.yandex} alt="Yandex" />
    </div>
  );
}

/* --- PROGRAMMATIC: DSP graf --- */
function SceneGraphDSP({ ac1, ac2 }) {
  const nodes = ["DSP", "SSP", "DMP", "AdX", "Premium", "OpenRTB"];
  return (
    <div className="dsp-scene" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <svg viewBox="0 0 560 320" className="dsp-graph">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--ac1)" />
            <stop offset="100%" stopColor="var(--ac2)" />
          </linearGradient>
        </defs>
        {[[280, 160, 120, 60], [280, 160, 440, 80], [280, 160, 120, 220], [280, 160, 440, 220]].map((p, i) => (
          <path key={i} d={`M${p[0]},${p[1]} Q ${(p[0] + p[2]) / 2},${p[3]} ${p[2]},${p[3]}`} stroke="url(#g1)" className="dsp-link" />
        ))}
      </svg>
      <div className="dsp-nodes">
        {nodes.map((n, i) => (
          <div key={i} className={`dsp-node n${i}`}>
            <span>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- LinkedIn Lead Gen Card --- */
function SceneLinkedInLeadCard({ ac1, ac2, basePath = "/hizmeticonlar" }) {
  const grad = `linear-gradient(90deg, ${ac1}, ${ac2})`;
  return (
    <div className="lki2-scene">
      <div className="lki2-card">
        <div className="lki2-head">
          <img src={`${basePath}/linkedin_logo.webp`} alt="LinkedIn" />
          <span>LinkedIn</span>
          <b className="lki2-pill" style={{ background: grad }}>PROMOTED</b>
        </div>
        <div className="lki2-media">
          <div className="lki2-play" />
        </div>
        <div className="lki2-meta">
          <i /><i className="short" />
        </div>
        <button className="lki2-cta" style={{ background: grad }}>Lead Form’u Aç</button>
        <div className="lki2-form">
          <h4>Teklif Alın</h4>
          <div className="row"><i className="in" /><i className="in short" /></div>
          <div className="row"><i className="in" /><i className="in short" /></div>
          <div className="row"><button className="send">Gönder</button></div>
        </div>
      </div>
      <i className="lki2-fab f1" /><i className="lki2-fab f2" /><i className="lki2-fab f3" />
    </div>
  );
}

/* --- Programmatic flow --- */
function SceneProgrammaticFlow({ ac1, ac2 }) {
  const nodes = ["Advertiser", "DSP", "Ad Exchange", "SSP", "Publishers"];
  return (
    <div className="prog-scene ecosys" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="eco-bg" />
      <div className="prog-row">
        {nodes.map((n, i) => (
          <div key={i} className={`prog-node n${i}`}>
            <span>{n}</span>
            {i < nodes.length - 1 && <div className="arrow" />}
          </div>
        ))}
      </div>
      <div className="prog-tags">
        <em>Targeting</em><em>RTB</em><em>Brand Safety</em>
      </div>
    </div>
  );
}

/* =========================================================
   SEO – responsive (YENİ)
   ========================================================= */
function SceneSeoAsoGeo({ ac1, ac2 }) {
  const chips = [
    "organik trafik","sıralama","backlink","teknik SEO","schema",
    "içerik stratejisi","arama niyeti","title & meta","site hızı",
    "UX sinyalleri","EEAT","Core Web Vitals"
  ];
  const placed = chips.map((t, i) => {
    const a = (i / chips.length) * Math.PI * 2;
    const ring = 26 + (i % 3) * 10;              // 26%, 36%, 46%
    const x = 50 + Math.cos(a) * ring;           // %
    const y = 50 + Math.sin(a) * (ring * 0.6);   // %
    return { t, x, y, d: 0.25 + (i % 5) * 0.08 };
  });

  return (
    <div className="seo-wrap" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="seo-cloud">
        {placed.map((c, i) => (
          <span
            key={i}
            className="seo-chip"
            style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${c.d}s` }}
          >
            {c.t}
          </span>
        ))}
      </div>

      <div className="seo-kpis">
        <div className="seo-chart">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="seoStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={ac1} /><stop offset="100%" stopColor={ac2} />
              </linearGradient>
              <linearGradient id="seoFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ac1} stopOpacity=".28" />
                <stop offset="100%" stopColor={ac2} stopOpacity=".05" />
              </linearGradient>
            </defs>
            <path
              d="M0,30 L12,26 L24,28 L36,22 L48,23 L60,18 L72,20 L84,16 L96,18"
              fill="none"
              stroke="url(#seoStroke)"
              strokeWidth="1.8"
              style={{ strokeDasharray: 220, strokeDashoffset: 220, animation: "dash 2s ease forwards" }}
            />
            <path
              d="M0,40 L0,30 L12,26 L24,28 L36,22 L48,23 L60,18 L72,20 L84,16 L96,18 L96,40 Z"
              fill="url(#seoFill)"
            />
          </svg>
        </div>
        <div className="seo-kpi-list">
          <div>Traffic <b>+18%</b></div>
          <div>Impressions <b>+24%</b></div>
          <div>CTR <b>3.2%</b></div>
        </div>
      </div>

      <style>{`@keyframes dash{to{stroke-dashoffset:0}}`}</style>
    </div>
  );
}

/* =========================================================
   UI/UX wireframe – responsive (YENİ)
   ========================================================= */
function SceneUiUxSplit({ ac1, ac2 }) {
  return (
    <div className="uiux-wrap" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="wf-canvas">
        {/* HERO */}
        <div className="wf-block" style={{
          left: "2.8%", right: "2.8%", top: "3.5%", height: "24%", animationDelay: ".05s"
        }}>
          <span className="line" /><span className="line thin" />
        </div>

        {/* 3 KART */}
        <div className="wf-block" style={{
          left: "2.8%", top: "41%", width: "29%", height: "40%", animationDelay: ".20s"
        }}>
          <span className="line" /><span className="line thin" /><span className="line thin" />
        </div>
        <div className="wf-block" style={{
          left: "35.6%", top: "41%", width: "29%", height: "40%", animationDelay: ".32s"
        }}>
          <span className="line" /><span className="line thin" /><span className="line thin" />
        </div>
        <div className="wf-block" style={{
          left: "68.4%", top: "41%", width: "29%", height: "40%", animationDelay: ".44s"
        }}>
          <span className="line" /><span className="line thin" /><span className="line thin" />
        </div>

        {/* Alt şeritler */}
        <div className="wf-block" style={{ left:"2.8%", bottom:"3.5%", width:"45%", height:"17%", animationDelay:".58s" }}>
          <span className="line" />
        </div>
        <div className="wf-block" style={{ right:"2.8%", bottom:"3.5%", width:"45%", height:"17%", animationDelay:".70s" }}>
          <span className="line" />
        </div>
      </div>

      <div className="uiux-legend">
        <div className="row"><span className="" /></div>
        <div className="row"></div>
        <div className="row"></div>
        <div className="row"></div>
      </div>
    </div>
  );
}

/* --- Reporting Neo+ --- */
function SceneReportingNeoPlus({ ac1, ac2 }) {
  const grad = `linear-gradient(90deg, ${ac1}, ${ac2})`;
  return (
    <div className="rpt3-scene">
      <div className="rpt3-wrap">
        <div className="rpt3-kpis">
          <div className="rpt3-kpi"><span>ROAS</span><b>4.2x</b><i className="up">+6.1%</i></div>
          <div className="rpt3-kpi"><span>CPA</span><b>₺128</b><i className="down">-3.4%</i></div>
          <div className="rpt3-kpi"><span>CVR</span><b>3.9%</b><i className="up">+1.2%</i></div>
        </div>
        <div className="rpt3-chart">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rpt3g" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={ac1} /><stop offset="100%" stopColor={ac2} />
              </linearGradient>
            </defs>
            <path className="rpt3-line" d="M0,30 C10,26 20,34 30,22 C40,18 50,26 60,16 C70,12 80,20 90,14 100,10 100,10 100,10" />
            <path className="rpt3-fill" d="M0,40 L0,30 C10,26 20,34 30,22 C40,18 50,26 60,16 C70,12 80,20 90,14 100,10 100,10 100,40 Z" style={{ fill: `url(#rpt3g)` }} />
          </svg>
          <div className="rpt3-pulse" style={{ background: grad }} />
        </div>
      </div>
    </div>
  );
}

/* --- Yandex serp + glass --- */
function SceneYandexSerpGlass({ ac1, ac2 }) {
  return (
    <div className="ydx2-scene ecosys" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="eco-bg" />
      <div className="screen">
        <div className="bar"><b>Yandex</b><span /></div>
        <div className="row ad"><em>Реклама</em><i /><i className="short" /></div>
        <div className="row"><i /><i className="short" /></div>
        <div className="row"><i /><i className="short" /></div>
      </div>
      <div className="glass"><div className="ring" /></div>
    </div>
  );
}

/* --- X premium --- */
function SceneXPremium({ ac1, ac2 }) {
  return (
    <div className="x2-scene ecosys" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="eco-bg" />
      <div className="x-phone">
        <div className="x-screen">
          <div className="x-top"><span>Premium</span></div>
          <div className="x-card"><div className="tick" /></div>
          <div className="x-cta">Subscribe</div>
        </div>
      </div>
      <div className="x-logo">X</div>
    </div>
  );
}

/* --- Consulting roadmap --- */
function SceneConsultingRoadmap({ ac1, ac2 }) {
  const steps = ["Audit", "Strategy", "Setup", "Optimize", "Scale"];
  return (
    <div className="consulting-scene ecosys" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="eco-bg" />
      <div className="road">
        {steps.map((s, i) => (
          <div key={i} className="step" style={{ "--i": i }}>
            <b>{i + 1}</b><span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Genel: logo orbit --- */
function SceneLogoOrbit({ ac1, ac2, ICON }) {
  const logo = ICON?.telegram || ICON?.linkedin || ICON?.x || ICON?.google;
  return (
    <div className="orbit-scene" style={{ "--ac1": ac1, "--ac2": ac2 }}>
      <div className="orbit-center"><img src={logo} alt="logo" /></div>
      {[...Array(6)].map((_, i) => <div key={i} className={`orbit-dot d${i + 1}`} />)}
      <svg className="orbit-ring" viewBox="0 0 360 360"><circle cx="180" cy="180" r="110" /></svg>
    </div>
  );
}

/* ============ SEO & UI/UX responsive stiller ============ */
function LocalStylesSeoUiux() {
  return (
    <style>{`
.types-right .seo-wrap,
.types-right .uiux-wrap{
  position:relative;
  width:100%;
  max-width:560px;
  aspect-ratio: 560 / 260;
  border-radius:14px; overflow:hidden;
  background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.12);
  box-shadow:0 8px 24px rgba(0,0,0,.28), inset 0 0 0 1px rgba(255,255,255,.04);
}

/* SEO */
.seo-cloud{ position:absolute; inset:12px 12px 96px 12px; overflow:hidden; }
.seo-chip{
  position:absolute; padding:6px 10px; border-radius:999px;
  font:800 clamp(10px,2.7vw,12px)/1 Inter; letter-spacing:.2px; color:#0b1020;
  background: linear-gradient(90deg, var(--ac1), var(--ac2));
  box-shadow:0 8px 18px rgba(0,0,0,.25);
  opacity:.92; transform:translate(-50%,-50%);
  animation: seoDrift 10s ease-in-out infinite;
}
@keyframes seoDrift{ 0%,100%{ transform:translate(-50%,-50%) } 50%{ transform:translate(calc(-50% + .6vw), calc(-50% - .6vw)) } }

.seo-kpis{
  position:absolute; left:12px; right:12px; bottom:12px; height:84px;
  border-radius:10px; background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.12);
  display:grid; grid-template-columns: 1.1fr .9fr; gap:10px; align-items:stretch; padding:10px;
}
.seo-chart{ position:relative; border-radius:8px; overflow:hidden; background:rgba(11,16,32,.4); }
.seo-chart svg{ width:100%; height:100% }
.seo-kpi-list{ display:flex; flex-direction:column; gap:6px; color:#eaf2ff; font:700 clamp(11px,2.8vw,12.5px)/1.15 Inter; }
.seo-kpi-list b{ font-size:clamp(12px,3.2vw,14px) }

/* UI/UX */
.wf-canvas{
  position:absolute; inset:12px; border-radius:10px;
  background:radial-gradient(120% 90% at 50% 50%, rgba(148,163,255,.06), transparent 60%);
  border:1px solid rgba(255,255,255,.08);
  overflow:hidden;
}
.wf-block{
  position:absolute; border-radius:10px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.14);
  box-shadow:0 8px 18px rgba(0,0,0,.22), inset 0 0 0 1px rgba(255,255,255,.04);
  transform: translateY(8px); opacity:0; animation: wfIn 1s ease forwards;
}
.wf-block .line{ display:block; height:8px; margin:8px; border-radius:6px; background:linear-gradient(90deg, var(--ac1), var(--ac2)); opacity:.9 }
.wf-block .line.thin{ height:6px; opacity:.75 }
@keyframes wfIn{ to{ transform: translateY(0); opacity:1 } }

.uiux-legend{
  position:absolute; right:16px; top:16px; width:min(220px,38%);
  color:#eaf2ff; font:800 clamp(10px,2.6vw,12.5px)/1.25 Inter; letter-spacing:.2px;
  display:flex; flex-direction:column; gap:6px; text-shadow:0 2px 10px rgba(0,0,0,.35);
}
.uiux-legend .row{ display:flex; gap:8px; flex-wrap:wrap }
.uiux-dot{ width:16px; height:16px; border-radius:8px; background:linear-gradient(90deg, var(--ac1), var(--ac2)); box-shadow:0 6px 16px rgba(0,0,0,.28) }

/* mobil */
@media (max-width: 768px){
  .types-right { display:flex; justify-content:center }
  .seo-kpis{ height:88px }
  .seo-chip{ padding:5px 9px }
}
`}</style>
  );
}

/* -------- SAHNE ROUTER + sol kartlar -------- */
function SectionTypesAnimated({ title, desc, items = [], themeKey, basePath = "/hizmeticonlar" }) {
  const L = (items?.length
    ? items
    : [
        { t: "Arama Ağı Reklamları", d: "Niyet sinyali yüksek aramalar." },
        { t: "Görüntülü Reklam Ağı", d: "GDN envanteriyle görünürlük." },
        { t: "YouTube Reklamları", d: "Video ile dikkat ve etki." },
        { t: "Alışveriş Reklamları", d: "Ürün feed → satın alma." },
        { t: "Uygulama Reklamları", d: "Kurulum ve in-app aksiyon." },
        { t: "Discovery Reklamları", d: "Keşif akışında çoklu format." },
      ]).slice(0, 6);

  const t = SERVICE_THEMES[themeKey] || {};
  const [ac1 = "#7C3AED", ac2 = "#22D3EE"] = t.accents || ["#7C3AED", "#22D3EE"];

  const ICON = {
    google: `${basePath}/googleadslogo.png`,
    meta: `${basePath}/meta_logo.png`,
    tiktok: `${basePath}/tiktok_logo.png`,
    snapchat: `${basePath}/snapchat_logo.svg`,
    telegram: `${basePath}/telegram_logo.svg`,
    linkedin: `${basePath}/linkedin_logo.webp`,
    x: `${basePath}/x_logo.svg`,
    yandex: `${basePath}/yandex_logo.svg`,
    search: `${basePath}/google_search.png`,
    youtube: `${basePath}/google_youtube.png`,
    display: `${basePath}/google_display.svg`,
    discover: `${basePath}/google_discovery.png`,
    gmail: `${basePath}/google_gmail.png`,
    maps: `${basePath}/google_maps.png`,
  };

  const Scene = {
    google: SceneGoogleEco,
    meta: SceneMetaCards,
    tiktok: SceneTikTokPhones,
    snapchat: SceneSnapGhost,
    telegram: SceneTelegramFeed,
    linkedin: SceneLinkedInLeadCard,
    programmatic: SceneProgrammaticFlow,
    seo_suite: SceneSeoAsoGeo,        // (YENİ)
    reporting: SceneReportingNeoPlus,
    yandex: SceneYandexSerpGlass,
    x: SceneXPremium,
    uiux: SceneUiUxSplit,             // (YENİ)
    consulting: SceneConsultingRoadmap,
  }[themeKey] || SceneGoogleEco;

  return (
    <section className="section types-section">
      <LocalStylesSeoUiux />
      <div className="container">
        <div className="types-split">
          <div className="types-left reveal">
            <h2>{title || "Reklam Türleri"}</h2>
            {desc ? (
              <MultiP
                className="subheader"
                style={{ margin: 0, textAlign: "center" }}
                text={desc}
              />
            ) : null}
            <div className="types-cards-grid" style={{ "--ac1": ac1, "--ac2": ac2 }}>
              {L.map((it, i) => (
                <div className="types-card" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
                  {it.t ? <h3>{it.t}</h3> : null}
                  {it.d ? <p>{it.d}</p> : null}
                </div>
              ))}
            </div>
          </div>

          <aside className="types-right reveal" style={{ transitionDelay: ".12s" }}>
            <Scene ac1={ac1} ac2={ac2} ICON={ICON} basePath={basePath} />
            <p className="mini-legend" style={{ marginTop: 10 }} />
          </aside>
        </div>
      </div>
    </section>
  );
}

export default SectionTypesAnimated;