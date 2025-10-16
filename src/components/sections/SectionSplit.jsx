import React from "react";
import MultiP from "../common/MultiP";

export default function SectionSplit({ title, body="", side="left", visual=null }) {
  const textFirst = side === "left";
  return (
    <section className="section split-section">
      <style>{`
        .split-section .grid{ display:grid; grid-template-columns:1.05fr 1fr; gap:28px; align-items:center; }
        @media (max-width:960px){ .split-section .grid{ grid-template-columns:1fr; gap:18px } .visual{order:2} .text{order:1} }
        .split-section h2{ margin:0 0 12px; text-align:center }
        .split-section .lede{ text-align:center; max-width:72ch; margin:0 auto }
        .visual{ display:grid; place-items:center }
      `}</style>
      <div className="container">
        <div className="grid">
          {textFirst && <div className="text reveal"><h2>{title}</h2>{body && <MultiP className="lede" text={body} />}</div>}
          <div className="visual reveal" style={{transitionDelay:".1s"}}>{visual}</div>
          {!textFirst && <div className="text reveal"><h2>{title}</h2>{body && <MultiP className="lede" text={body} />}</div>}
        </div>
      </div>
    </section>
  );
}