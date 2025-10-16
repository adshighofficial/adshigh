// src/components/common/MultiP.jsx
import React from "react";

/**
 * MultiP: text içindeki satır sonlarını gerçek <p> paragraflarına çevirir.
 * - İki veya daha fazla boş satır ( \n\n ) varsa bunları paragraf ayırıcı sayar.
 * - Aksi halde tek \n ile de böler (tek satırlı içerikler için).
 */
export default function MultiP({ text, className = "", style = {} }) {
  if (text == null) return null;
  const normalized = String(text).replace(/\r\n?/g, "\n").trim();

  // Öncelik: çift newline. Yoksa tek newline ile böl.
  const parts = (/\n{2,}/.test(normalized)
    ? normalized.split(/\n{2,}/)
    : normalized.split(/\n/))
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className={className} style={style}>
      {parts.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}