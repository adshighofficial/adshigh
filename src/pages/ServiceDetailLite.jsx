// src/pages/ServiceDetailLite.jsx
import React from "react";
import { useParams } from "react-router-dom";

// İÇERİKLER
import { CONTENT_BY_KEY, keyFromSlug } from "../content/content.js";

// PROJE BİLEŞENLERİ
import PMV56Styles from "../components/patterns/PMV56Styles";
import useReveal from "../hooks/useReveal";
import SectionHero from "../components/sections/SectionHero";
import SectionList from "../components/sections/SectionList";
import SectionMedia from "../components/sections/SectionMedia";
import SectionTypesAnimated from "../components/sections/SectionTypesAnimated";


/* ---------- Basit Error Boundary (beyaz ekran yerine hata gösterir) ---------- */
class PageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, err: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, err: error };
  }
  componentDidCatch(error, info) {
    // Konsola da düşsün
    // eslint-disable-next-line no-console
    console.error("[ServiceDetailLite] Render error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <main style={{ padding: "32px" }}>
          <PMV56Styles />
          <div style={{ background:"#1b1b1b", color:"#fff", borderRadius:12, padding:24 }}>
            <h2 style={{ marginTop:0 }}>Sayfa render edilirken hata oluştu</h2>
            <pre style={{ whiteSpace:"pre-wrap" }}>
              {String(this.state.err?.message || this.state.err)}
            </pre>
            <p style={{ opacity:.7, marginTop:12 }}>
              Bileşen import yolları, içerik export’ları veya null değer kaynaklı olabilir.
            </p>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

/* ===== PROCESS (timeline) ===== */
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

/* ===== CTA ===== */
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

/* ===== Serbest metin ===== */
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

function ServiceComposer({ themeKey, sections }) {
  useReveal();
  const S = Array.isArray(sections) ? sections : [];
  let mediaSeen = 0;

  return (
    <main className="pmv56">
      <PMV56Styles />

      {S.map((s, idx) => {
        if (s.type === "hero") {
          return <SectionHero key={idx} title={s.title} body={s.body} themeKey={themeKey} />;
        }

// 2. ALAN: TÜM HİZMETLERDE AYNI KART STİLİ (Google’daki ile aynı)
if (idx === 1 && s.type === "list") {
  return (
    <SectionList
      key={idx}
      title={s.title}
      desc={s.desc}
      items={s.items}
      // herkes aynı görünüm: "vivid-clean"
      look="vivid-clean"
    />
  );
}

        if (idx === 3) {
          return (
            <SectionTypesAnimated
              key={idx}
              title={s.title || "Reklam Türleri"}
              desc={s.desc || s.body || ""}
              items={s.items || []}
              themeKey={themeKey}
            />
          );
        }

        if (s.type === "list") {
          return (
            <SectionList
              key={idx}
              title={s.title}
              desc={s.desc}
              items={s.items}
              look={s.look || "glass"}
            />
          );
        }

        if (s.type === "media") {
          mediaSeen += 1;
          const sideForced = mediaSeen === 1 ? "left" : (s.side || undefined);
          return (
            <SectionMedia
              key={idx}
              title={s.title}
              body={s.body}
              themeKey={themeKey}
              side={sideForced}
              metrics={s.metrics || []}
              slidesKey={s.slidesKey || "slidesPrimary"}
              ord={mediaSeen}
            />
          );
        }

        if (s.type === "process") {
          return (
            <SectionProcess
              key={idx}
              title={s.title}
              desc={s.desc}
              items={s.items || []}
              labels={s.labels || undefined}
            />
          );
        }

if (s.type === "cta") return null;
        return <SectionText key={idx} title={s.title} body={s.body} />;
      })}
    </main>
  );
}

function ServiceDetailLiteInner() {
  const { slug } = useParams();
  const key = keyFromSlug(slug);

  // Güvenli log (console’da key/slug görünsün)
  // eslint-disable-next-line no-console
  console.log("[ServiceDetailLite] slug:", slug, "→ key:", key);

  if (!key) {
    const title = (slug || "Hizmet").replace(/-/g, " ");
    return (
      <main className="pmv56">
        <PMV56Styles />
        <SectionHero title={title} body={"Bu sayfa için içerik yakında eklenecek."} themeKey={"meta"} />
        <section className="section">
          <div className="container">
            <div className="textbody">Geçersiz slug veya içerik eşleşmedi.</div>
          </div>
        </section>
      </main>
    );
  }

  const pack = CONTENT_BY_KEY?.[key];

  if (!pack || !Array.isArray(pack.sections) || pack.sections.length === 0) {
    return (
      <main className="pmv56">
        <PMV56Styles />
        <SectionHero title={"İçerik bulunamadı"} body={"CONTENT_BY_KEY içinde bu anahtar için section yok."} themeKey={"meta"} />
      </main>
    );
  }

  return <ServiceComposer themeKey={pack.theme || "meta"} sections={pack.sections} />;
}

export default function ServiceDetailLite() {
  return (
    <PageErrorBoundary>
      <ServiceDetailLiteInner />
    </PageErrorBoundary>
  );
}