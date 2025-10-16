// src/theme-override.jsx
// Basit tema/palet override bileşeni.
// Kullanım: <ThemeOverrides scheme="dark" /> veya <ThemeOverrides scheme="light" />
import React, { useEffect } from "react";

export default function ThemeOverrides({ scheme = "dark" }) {
  useEffect(() => {
    const root = document.documentElement;
    if (scheme === "light") {
      root.style.setProperty("--navy", "#ffffff");
      document.body.style.background = "#F7F5EF";
      document.body.style.color = "#111827";
    } else {
      root.style.setProperty("--navy", "#0b1020");
      document.body.style.background = "var(--navy)";
      document.body.style.color = "#e9e9ef";
    }
  }, [scheme]);

  return (
    <style>{`
      :root{
        --navy:#0b1020;
        --brand1:#A78BFA;
        --brand2:#67E8F9;
      }
      .logo-gradient{
        background:linear-gradient(135deg,var(--brand1),var(--brand2));
        -webkit-background-clip:text; background-clip:text; color:transparent;
      }
      .btn{
        background:linear-gradient(135deg,var(--brand1),var(--brand2));
        box-shadow:0 10px 30px rgba(167,139,250,.18);
      }
    `}</style>
  );
}