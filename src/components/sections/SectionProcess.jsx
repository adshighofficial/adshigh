import React from "react";

function SectionProcess({ title, desc, items = [], labels = ["HEDEF", "KURULUM", "TEST", "OPTİMİZE", "ÖLÇEKLE"] }) {
  return (
    <section className="section" style={{ background: "transparent" }}>
      <div className="container">
        <h2 id="process-steps" className="reveal">{title}</h2>
        {desc ? <p className="subheader reveal" style={{ transitionDelay: ".1s" }}>{desc}</p> : null}

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
                {labels.map((lb, i) => (<span key={i}>{lb}</span>))}
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

export default SectionProcess;