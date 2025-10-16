import React from "react";

function SectionCTA({ title, body }) {
  return (
    <section className="final-cta-section" id="contact">
      <div className="container">
        <div className="cta-form-card reveal">
          <h3>{title || "Birlikte büyütelim"}</h3>
          <p>{body || "Hemen iletişime geçin, stratejinizi kuralım."}</p>
          <form onSubmit={(e) => e.preventDefault()}>
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

export default SectionCTA;