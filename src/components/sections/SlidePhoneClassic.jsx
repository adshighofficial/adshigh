import React from "react";

function SlidePhoneClassic({ slides = [] }) {
  // Minimal, stilini mevcut global CSS devralıyor
  return (
    <div className="phone-preview">
      <div className="screen">
        {(slides.length ? slides : ["", "", ""]).slice(0, 3).map((s, i) => (
          <div key={i} className="shot shimmer" />
        ))}
      </div>
    </div>
  );
}

export default SlidePhoneClassic;