import React from "react";

function SectionText({ title, body }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="reveal">{title}</h2>
        <p className="subheader reveal" style={{ transitionDelay: ".08s", whiteSpace: "pre-line" }}>
          {body}
        </p>
      </div>
    </section>
  );
}

export default SectionText;