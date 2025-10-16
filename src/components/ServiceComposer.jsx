import React from "react";
import PMV56Styles from "./patterns/PMV56Styles";
import useReveal from "../hooks/useReveal";
import SectionHero from "./sections/SectionHero";
import SectionList from "./sections/SectionList";
import SectionMedia from "./sections/SectionMedia";
import SectionTypesAnimated from "./sections/SectionTypesAnimated";
import SectionProcess from "./sections/SectionProcess";
import SectionCTA from "./sections/SectionCTA";
import SectionText from "./sections/SectionText";

function ServiceComposer({ themeKey, sections }) {
  useReveal();
  const S = Array.isArray(sections) ? sections : [];
  let mediaSeen = 0;

  return (
    <main className="pmv56">
      <PMV56Styles />
      {S.map((s, idx) => {
        if (s.type === "hero") {
          return (
            <SectionHero key={idx} title={s.title} body={s.body} themeKey={themeKey} />
          );
        }

        if (idx === 1 && s.type === "list") {
          return (
            <SectionList
              key={idx}
              title={s.title}
              desc={s.desc}
              items={s.items}
              look={s.look || "vivid-clean"}
            />
          );
        }

        if (idx === 3) {
          return (
            <SectionTypesAnimated
              key={idx}
              title={s.title || "Reklam Türleri"}
              desc={s.desc || s.body || ""}
              items={s.items || []}
              themeKey={themeKey}
            />
          );
        }

        if (s.type === "list") {
          return (
            <SectionList
              key={idx}
              title={s.title}
              desc={s.desc}
              items={s.items}
              look={s.look || "glass"}
            />
          );
        }

        if (s.type === "media") {
          mediaSeen += 1;
          const sideForced = mediaSeen === 1 ? "left" : (s.side || undefined);
          return (
            <SectionMedia
              key={idx}
              title={s.title}
              body={s.body}
              themeKey={themeKey}
              side={sideForced}
              metrics={s.metrics || []}
              slidesKey={s.slidesKey || "slidesPrimary"}
              ord={mediaSeen}
            />
          );
        }

        if (s.type === "process") {
          return (
            <SectionProcess
              key={idx}
              title={s.title}
              desc={s.desc}
              items={s.items || []}
              labels={s.labels || undefined}
            />
          );
        }

        if (s.type === "cta") {
          return <SectionCTA key={idx} title={s.title} body={s.body} />;
        }

        return <SectionText key={idx} title={s.title} body={s.body} />;
      })}
    </main>
  );
}

export default ServiceComposer;