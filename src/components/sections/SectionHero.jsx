// src/components/sections/SectionHero.jsx
import React from "react";
import Paragraphs from "../common/MultiP";
import { SERVICE_THEMES } from "../../themes/serviceThemes";


function HeroGradientCycler({ gradients = [], interval = 4000, fade = 1400 }) {
  const G = gradients.length
    ? gradients
    : [
        "linear-gradient(135deg,#5B21B6,#7C3AED)",
        "linear-gradient(135deg,#4C1D95,#7C3AED)",
        "linear-gradient(135deg,#6D28D9,#5B21B6)",
        "linear-gradient(135deg,#7C3AED,#9333EA)",
      ];

  const [front, setFront] = React.useState(0);
  const [back, setBack] = React.useState(1);
  const [showFront, setShowFront] = React.useState(true);

  React.useEffect(() => {
    const id = setInterval(() => {
      const next = ((showFront ? back : front) + 1) % G.length;
      if (showFront) setBack(next);
      else setFront(next);
      setShowFront((s) => !s);
    }, interval);
    return () => clearInterval(id);
  }, [showFront, front, back, interval, G]);

  const common = {
    className: "hero-grad",
    style: {
      transition: `opacity ${fade}ms ease`,
      backgroundSize: "200% 200%",
      animation: "pmv-pan 12s ease-in-out infinite",
    },
  };

  return (
    <>
      <div
        {...common}
        style={{ ...common.style, backgroundImage: G[front], opacity: showFront ? 1 : 0 }}
      />
      <div
        {...common}
        style={{ ...common.style, backgroundImage: G[back], opacity: showFront ? 0 : 1 }}
      />
    </>
  );
}

function LocalStyles() {
  return (
    <style>{`
.pmv56 .hero{position:relative;overflow:hidden}
.pmv56 .hero .hero-grad{position:absolute;inset:0;mix-blend-mode:screen;opacity:0}
@keyframes pmv-pan{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
`}</style>
  );
}

export default function SectionHero({ title, body, themeKey = "google" }) {
  const theme = SERVICE_THEMES[themeKey] || {};
  return (
    <header className="hero">
      <LocalStyles />
      {/* 1. alan: tema paletinden değişken arka plan */}
      <HeroGradientCycler gradients={theme.gradients || []} />

      <div className="container reveal in">
        <div className="breadcrumb">
          <a href="/" style={{ color: "#fff", opacity: 0.9, textDecoration: "none" }}>
            Anasayfa
          </a>
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