// src/components/BeforeAfter.jsx
import React, { useEffect, useMemo, useState } from "react";
import { ReactCompareSlider } from "react-compare-slider";

function Scene({ mode = "before", product }) {
  const isAfter = mode === "after";

  return (
    <div className="ba-scene">
      <div className={`ba-bg ${isAfter ? "after" : "before"} ${product.bg}`} />

      <div className="ba-top">
        <span className={`ba-pill ${isAfter ? "after" : "before"}`}>
          {isAfter ? "AdsHigh Frame" : "Normal Katalog"}
        </span>
        <span className="ba-pill ghost">Temsili Demo</span>
      </div>

<div className={`ba-card ${isAfter ? "after" : "before"} shrink`}>
            <div className="ba-card-media">
          <div className="ba-product">
            <div className="ba-product-emoji">{product.emoji}</div>
          </div>

          {isAfter && (
            <>
              <div className="ba-badge-discount">{product.discount}</div>
              <div className="ba-brand">{product.brand}</div>
              <div className="ba-price">
                <span className="old">{product.oldPrice}</span>
                <span className="new">{product.newPrice}</span>
              </div>
              <div className="ba-cta">{product.cta}</div>
            </>
          )}
        </div>

        <div className="ba-card-body">
          <div className="ba-title">{product.title}</div>
          <div className="ba-sub">{product.sub}</div>

          <div className="ba-metrics">
            <div className="ba-metric">
              <span className="k">CTR</span>
              <span className={`v ${isAfter ? "up" : ""}`}>{isAfter ? product.ctr : "Baz"}</span>
            </div>
            <div className="ba-metric">
              <span className="k">ROAS</span>
              <span className={`v ${isAfter ? "up" : ""}`}>{isAfter ? product.roas : "Baz"}</span>
            </div>
            <div className="ba-metric">
              <span className="k">CVR</span>
              <span className={`v ${isAfter ? "up" : ""}`}>{isAfter ? product.cvr : "Baz"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ba-hint">
        {isAfter ? "Feed verisi (fiyat/indirim) otomatik güncellenir." : "Feed görseli statik, tasarım etkisi sınırlı."}
      </div>
    </div>
  );
}

function AutoCompare({ product }) {
  const [pos, setPos] = useState(35); // 0..100
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    let dir = 1;
    const id = setInterval(() => {
      setPos((p) => {
        let n = p + dir * 1.2;
        if (n >= 78) { n = 78; dir = -1; }
        if (n <= 22) { n = 22; dir = 1; }
        return n;
      });
    }, 30);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="ba-compare" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ReactCompareSlider
        position={pos}
        onPositionChange={setPos}
        itemOne={<Scene mode="before" product={product} />}
        itemTwo={<Scene mode="after" product={product} />}
        className="ba-compare-inner"
        handle={
          <div className="ba-handle" aria-hidden="true">
            <div className="ba-handle-line" />
            <div className="ba-handle-knob">
              <span className="chev left" />
              <span className="chev right" />
            </div>
            <div className="ba-handle-line" />
          </div>
        }
      />
    </div>
  );
}

export default function BeforeAfter() {
  const products = useMemo(
    () => [
      {
        bg: "bg-1",
        emoji: "👟",
        title: "Premium Spor Ayakkabı",
        sub: "Koşu / Günlük • Unisex",
        brand: "MARKA",
        discount: "-%40",
        oldPrice: "₺2.199",
        newPrice: "₺1.299",
        cta: "Hemen İncele",
        ctr: "+%32",
        roas: "+%18",
        cvr: "+%11",
      },
      {
        bg: "bg-2",
        emoji: "👜",
        title: "Deri Omuz Çantası",
        sub: "Günlük • Kadın",
        brand: "BRAND",
        discount: "-%25",
        oldPrice: "₺3.499",
        newPrice: "₺2.599",
        cta: "Sepete Ekle",
        ctr: "+%21",
        roas: "+%14",
        cvr: "+%9",
      },
    ],
    []
  );

  return (
    <section id="before-after" className="ba-wrap">
      <div className="ba-head">
        <h2 className="ba-h2">Normal Görsel vs AdsHigh Frame</h2>
        <p className="ba-p">Slider otomatik hareket eder — üstüne gelince durur.</p>
      </div>

      <div className="ba-grid">
        {products.map((p, i) => (
          <AutoCompare key={i} product={p} />
        ))}
      </div>
    </section>
  );
}