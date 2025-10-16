// src/components/sections/SectionList.jsx
import React from "react";

function SectionList({ title, desc, items = [], look = "accent" }) {
  const L = (items?.length ? items : []).slice(0, 12);
  return (
    <section className="section" data-look={look}>
      <div className="container">
        {title ? <h2 className="reveal">{title}</h2> : null}
        {desc ? (
          <p className="subheader reveal" style={{ transitionDelay: ".08s" }}>
            {desc}
          </p>
        ) : null}

        {/* look sınıfı gride uygulanıyor — uygulamanın geri kalanıyla tam uyumlu */}
        <div className={`usp-grid look-${look} reveal`} style={{ transitionDelay: ".12s" }}>
          {L.map((it, i) => (
            <div className="usp-card" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
              <span className="badge-num">{String(i + 1).padStart(2, "0")}</span>

              {it.icon ? (
                <div className="toprow">
                  <span className="card-icon">
                    {typeof it.icon === "string" ? <img alt="" src={it.icon} /> : it.icon}
                  </span>
                  {it.t ? <h3>{it.t}</h3> : null}
                </div>
              ) : it.t ? (
                <h3>{it.t}</h3>
              ) : null}

              {/* Açıklama: dizi ise her eleman paragraf; string ise boş satıra göre böl */}
              {it.d
                ? Array.isArray(it.d)
                  ? it.d.map((t, pi) => <p key={pi}>{t}</p>)
                  : String(it.d)
                      .split(/\n\s*\n/)
                      .map((t, pi) => <p key={pi}>{t.trim()}</p>)
                : null}

              {!!it.pills?.length && (
                <div className="meta">
                  {it.pills.slice(0, 5).map((p, pi) => (
                    <span className="pill" key={pi}>
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionList;