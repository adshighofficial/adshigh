import React, { useEffect, useMemo, useRef, useState } from "react";

/** ---------------- BRAND ---------------- */
const BRAND = {
  accent: "#6b61fe",
  accentSoft: "rgba(107, 97, 254, 0.18)",
  accentSoft2: "rgba(107, 97, 254, 0.10)",
};

// ✅ BURAYA kendi Formspree endpoint'ini yapıştır
// örn: "https://formspree.io/f/abcdwxyz"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/movpkybw";

/** ---------------- ICONS ---------------- */
const Icons = {
  Sparkles: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  Zap: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  Link: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Layers: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

/** ---------------- ASSETS (public/frames) ---------------- */
const ASSETS = {
  logo: "/frames/logo.png",
  heroRaw: "/frames/giris-framesiz.png",
  heroFramed: "/frames/giris-frame.png",

  examples: [
    { label: "Örnek", raw: "/frames/ornek-1-framesiz.png", framed: "/frames/ornek-1-frame.png" },
    { label: "Örnek", raw: "/frames/ornek-2-framesiz.png", framed: "/frames/ornek-2-frameli-2.png" },
    { label: "Örnek", raw: "/frames/ornek-1-framesiz.png", framed: "/frames/ornek-2-frame.png" },
    { label: "Örnek", raw: "/frames/ornek-3-framesiz.png", framed: "/frames/ornek-3-frameli-3.png" },
    { label: "Örnek", raw: "/frames/ornek-1-framesiz.png", framed: "/frames/ornek-3-frame.png" },
    { label: "Örnek", raw: "/frames/ornek-1-framesiz.png", framed: "/frames/ornek-4-frame.png" },
  ],

  carousel: [
    { label: "Carousel 1", raw: "/frames/ornek-1-framesiz.png", framed: "/frames/ornek-carousel-1-frame.png" },
    { label: "Carousel 2", raw: "/frames/ornek-carousel-2-framesiz.png", framed: "/frames/ornek-carousel-2-frame.png" },
    { label: "Carousel 3", raw: "/frames/ornek-carousel-3-framesiz.png", framed: "/frames/ornek-carousel-3-frame.png" },
  ],
};

/** ---------------- HERO SPLIT SLIDER (raw vs framed) ---------------- */
const HeroSplitSlider = () => {
  const [pos, setPos] = useState(55);
  const [auto, setAuto] = useState(true);
  const [dir, setDir] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setPos((p) => {
        let next = p + dir * 0.55;
        if (next >= 97) {
          next = 97;
          setDir(-1);
        } else if (next <= 1) {
          next = 1;
          setDir(1);
        }
        return next;
      });
    }, 16);
    return () => clearInterval(id);
  }, [auto, dir]);

  const handle = (e) => {
    setAuto(false);
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = (clientX - rect.left) / rect.width;
    setPos(Math.max(0, Math.min(100, x * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[520px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_40px_90px_-20px_rgba(0,0,0,0.18)] border-[10px] border-white bg-white cursor-col-resize select-none mx-auto"
      onMouseMove={handle}
      onTouchMove={handle}
      onMouseEnter={() => setAuto(false)}
      aria-label="Framesiz / Frameli karşılaştırma"
    >
      <div className="absolute inset-0 bg-slate-50 p-6">
        <img src={ASSETS.heroRaw} alt="Framesiz" className="w-full h-full object-contain" draggable={false} />
      </div>

      <div
        className="absolute inset-0 z-10 p-6"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          transition: auto ? "clip-path 0.06s linear" : "none",
        }}
      >
        <img src={ASSETS.heroFramed} alt="Frameli" className="w-full h-full object-contain" draggable={false} />
      </div>

      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white/70 backdrop-blur-sm"
        style={{ left: `${pos}%`, transition: auto ? "left 0.06s linear" : "none" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-2"
          style={{ borderColor: BRAND.accentSoft }}
        >
          <div className="flex gap-1">
            <div className="w-0.5 h-4 rounded-full" style={{ backgroundColor: BRAND.accent }} />
            <div className="w-0.5 h-4 rounded-full" style={{ backgroundColor: BRAND.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/** ---------------- TEMPLATE COMPARE (Web aynı / Mobil: çerçevesiz yan yana PNG) ---------------- */
const TemplateComparePanel = () => {
  const ITEMS = useMemo(() => {
    const base = [
      ...ASSETS.examples.map((x) => ({ type: "single", label: x.label, raw: x.raw, framed: x.framed })),
      { type: "carousel", label: "Örnek 5 (Carousel)" },
    ];
    return base;
  }, []);

  const [idx, setIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);

  useEffect(() => {
    const current = ITEMS[idx];

    if (current.type === "carousel") {
      const t = setInterval(() => setCIdx((p) => (p + 1) % ASSETS.carousel.length), 1500);
      return () => clearInterval(t);
    }

    const t = setInterval(() => setIdx((p) => (p + 1) % ITEMS.length), 2000);
    return () => clearInterval(t);
  }, [idx, ITEMS]);

  const prev = () => setIdx((p) => (p - 1 + ITEMS.length) % ITEMS.length);
  const next = () => setIdx((p) => (p + 1) % ITEMS.length);

  const current = ITEMS[idx];
  const rawImg = current.type === "carousel" ? ASSETS.carousel[cIdx].raw : current.raw;
  const framedImg = current.type === "carousel" ? ASSETS.carousel[cIdx].framed : current.framed;

  const title = current.type === "carousel" ? `${current.label} • ${cIdx + 1}/${ASSETS.carousel.length}` : current.label;

  const Panel = ({ badge, subtitle, img, tone = "raw" }) => (
    <div className="bg-white rounded-[1.4rem] border border-slate-100 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.18)] p-3 md:p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white"
            style={{ backgroundColor: tone === "framed" ? BRAND.accent : "#0F172A" }}
          >
            {badge}
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.25em] text-slate-400">Preview</div>
            <div className="text-sm font-extrabold tracking-tight text-slate-900">{subtitle}</div>
          </div>
        </div>

        <div className="text-[10px] font-bold tracking-[0.22em] text-slate-300">
          {tone === "framed" ? "Feed → Frame → Creative" : "Original"}
        </div>
      </div>

      <div className="p-2 rounded-[1.2rem] bg-slate-50 border border-slate-100">
        <div className="relative w-full h-[440px] lg:h-[480px] rounded-[1.2rem] bg-white overflow-hidden border border-slate-100">
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <img
              src={img}
              alt={subtitle}
              className="w-full h-full object-contain origin-center scale-[1.18] md:scale-[1.25] p-2 md:p-3"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-4 md:mt-8">
      {/* ÜST KONTROLLER */}
      <div className="flex flex-col gap-3 items-center justify-center mb-4 md:mb-5">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center"
            aria-label="Önceki"
          >
            <Icons.ChevronLeft />
          </button>

          <div className="px-6 py-2 rounded-2xl bg-slate-900 text-white border border-slate-900 shadow-lg">
            <span className="text-[10px] font-extrabold tracking-[0.22em]">{title}</span>
          </div>

          <button
            onClick={next}
            className="w-11 h-11 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center"
            aria-label="Sonraki"
          >
            <Icons.ChevronRight />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {ITEMS.map((it, i) => {
            const label = it.type === "carousel" ? "Örnek 5" : it.label;
            const active = i === idx;
            return (
              <button
                key={`${label}-${i}`}
                onClick={() => setIdx(i)}
                className={`px-4 py-2 rounded-full text-[9px] font-extrabold tracking-widest border transition-all ${
                  active ? "text-white shadow-md" : "bg-white text-slate-500 border-slate-200 hover:text-slate-900"
                }`}
                style={
                  active
                    ? { backgroundColor: BRAND.accent, borderColor: BRAND.accent }
                    : { borderColor: "#E2E8F0" }
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ✅ MOBILE: boşluğu yarıya indir + telefonları %50 büyüt (PNG boşluğunu kırpar) */}
      <div className="block lg:hidden w-full mx-auto -mt-10 sm:-mt-14">
        <div className="grid grid-cols-2 gap-3 px-3 items-start">
          <div className="h-[458px] sm:h-[600px] overflow-hidden rounded-3xl">
            <img src={rawImg} alt="Framesiz" draggable={false} className="w-full h-full object-cover object-top scale-[0.9]" />
          </div>
          <div className="h-[458px] sm:h-[600px] overflow-hidden rounded-3xl">
            <img src={framedImg} alt="Frameli" draggable={false} className="w-full h-full object-cover object-top scale-[0.9]" />
          </div>
        </div>
      </div>

      {/* ✅ WEB */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-4 items-start max-w-5xl mx-auto">
        <Panel badge="RAW" subtitle="" img={rawImg} tone="raw" />
        <Panel badge="HF" subtitle="Frame Versiyon" img={framedImg} tone="framed" />
      </div>
    </div>
  );
};

/** ---------------- STEPS ---------------- */
const StepsSection = () => {
  const steps = [
    {
      icon: <Icons.Link />,
      title: "Veri bağlantısı",
      desc: "Ürün kataloğunuzu (XML / feed) bizimle paylaşın. Alan eşleşmelerini birlikte doğrular, hata payını sıfırlarız.",
    },
    {
      icon: <Icons.Layers />,
      title: "Şablon ve mesaj kurgusu",
      desc: "Kampanya dili, fiyat/indirim vurgusu ve görsel hiyerarşiyi markanıza göre kurgularız. Aynı katalog, daha güçlü teklif.",
    },
    {
      icon: <Icons.CheckCircle />,
      title: "Aktivasyon ve optimizasyon",
      desc: "Yeni feed’i reklam hesabınıza bağlayın. CTR, CPM ve dönüşüm maliyetine göre iteratif olarak iyileştirip ölçekleyin.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            3 adımda <span style={{ color: BRAND.accent }}>kurulum</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 font-semibold">
            Hızlı entegrasyon. Net çıktı. Ölçülebilir performans.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-slate-200 -z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
             <div
  className="
    w-16 h-16 rounded-2xl
    bg-slate-50 border border-slate-100
    flex items-center justify-center
    shadow-sm
    transition-all duration-300 ease-out
    group-hover:scale-110
    group-hover:shadow-lg
    group-hover:-translate-y-0.5
  "
  style={{
    backgroundColor: "rgba(107, 97, 254, 0.00)",
  }}
>
  {/* mor fill + glow (sadece hover'da) */}
  <div
    className="
      absolute
      inset-0
      rounded-2xl
      opacity-0
      transition-opacity duration-300
      group-hover:opacity-100
    "
    style={{
      backgroundColor: BRAND.accent,
      boxShadow: `0 14px 40px ${BRAND.accentSoft}`,
    }}
  />

  {/* ikon */}
  <div
    className="relative z-10 transition-colors duration-300"
    style={{ color: "rgba(107, 97, 254, 1)" }}
  >
    <span className="block group-hover:[&_*]:text-white">
      {step.icon}
    </span>
  </div>
</div>

              <span className="font-extrabold text-xs mb-2 tracking-widest" style={{ color: BRAND.accent }}>
                Adım {idx + 1}
              </span>
              <h3 className="text-lg font-extrabold mb-3">{step.title}</h3>
              <p className="text-slate-600 text-sm font-semibold leading-relaxed max-w-[280px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** ---------------- APP ---------------- */
const App = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans antialiased"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      }}
    >
      {/* NAV */}
      <nav className="px-4 sm:px-6 md:px-10 py-4 max-w-7xl mx-auto">
        <div className="relative h-10 md:h-10 overflow-visible">
          {/* Logo absolute: büyür ama layout itmez */}
          <img
            src={ASSETS.logo}
            alt="HighFrames"
            draggable={false}
            className="
              absolute top-1/2 -translate-y-1/2
              w-auto max-w-none select-none
              h-10 sm:h-11 md:h-12
              origin-left
              scale-[6.2] sm:scale-[6.6] md:scale-[6.8]
              left-[-48px] sm:left-[-64px] md:left-[-72px]
              pointer-events-none
            "
          />
          <div className="h-10 w-[240px] sm:w-[280px] md:w-[320px]" />
        </div>
      </nav>

      {/* HERO */}
      <header className="pt-6 md:pt-10 pb-20 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
<div className="
  grid lg:grid-cols-2
  gap-12 lg:gap-20
  items-center
  lg:-mt-12
">          <div className="space-y-7 order-1 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-slate-600 border border-slate-200 shadow-sm mx-auto lg:mx-0"
            >
              <span style={{ color: BRAND.accent }}>
                <Icons.Zap />
              </span>
              DYNAMIC FEED PERFORMANCE
            </div>

            {/* ✅ Mobilde iç içe geçmesin: br kaldırıldı + responsive leading */}
            <h1 className="font-extrabold tracking-tight text-[38px] sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.05] sm:leading-[1.02] lg:leading-[0.98]">
              Katalogları <span style={{ color: BRAND.accent }}>satışa</span> dönüştürün.
            </h1>

            <p className="text-base md:text-lg text-slate-600 font-semibold max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Katalog reklamları ürünü gösterir. <span className="text-slate-900 font-bold">HighFrames</span> ise teklifi netleştirir:
              kampanya mesajı, fiyat ve indirim vurgusu otomatik yerleşir; kreatif daha hızlı karar aldırır.
            </p>

            <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              <button
                onClick={() => scrollTo("contact-form")}
                className="bg-slate-900 text-white p-5 rounded-2xl group transition-all shadow-2xl hover:scale-105 active:scale-95"
                style={{ outline: "none" }}
                aria-label="Ücretsiz analiz için form"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0F172A")}
              >
                <Icons.ArrowRight />
              </button>

              <div className="text-left flex items-center">
                <span className="text-[12px] font-extrabold tracking-widest">Ücretsiz analiz isteyin</span>
              </div>
            </div>
          </div>

          <div className="order-2">
            <HeroSplitSlider />
          </div>
        </div>
      </header>

      {/* DARK MESSAGE SECTION */}
      <section className="py-24 bg-slate-900 text-white px-6 md:px-10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.0] mb-8">
              HighFrames <br />
              <span className="text-slate-400">ne sağlar?</span>
            </h2>
            <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: BRAND.accent }} />
          </div>

          <div className="space-y-7 text-lg text-slate-300 font-medium">
            <p className="leading-relaxed">
              Standart katalog kreatifleri çoğu zaman aynı görünür: mesaj zayıf kalır, fiyat yeterince öne çıkmaz, kampanya hissi netleşmez.
              Sonuç: kullanıcı hızlı geçer, maliyet artar.
            </p>

            <p
              className="leading-relaxed border-l-4 pl-6 font-semibold text-white"
              style={{ borderColor: BRAND.accent }}
            >
              HighFrames, katalog görselini “kampanya kreatifi”ne dönüştürür: mesaj + fiyat + indirim vurgusu otomatik yerleşir.
              Daha net teklif, daha yüksek aksiyon.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-800">
              <div className="group">
                <h4 className="text-4xl font-extrabold tracking-tight" style={{ color: BRAND.accent }}>
                  +42%
                </h4>
                <p className="text-xs font-bold tracking-widest mt-2 text-slate-200">Ortalama CTR artışı</p>
              </div>
              <div className="group">
                <h4 className="text-4xl font-extrabold tracking-tight" style={{ color: BRAND.accent }}>
                  -28%
                </h4>
                <p className="text-xs font-bold tracking-widest mt-2 text-slate-200">Tıklama maliyeti düşüşü</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/3 h-full -z-0" style={{ backgroundColor: BRAND.accentSoft, filter: "blur(120px)" }} />
      </section>

      {/* TEMPLATE LIBRARY */}
      <section id="template-library" className="py-12 md:py-14 px-6 md:px-10 max-w-7xl mx-auto scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
              Şablon <span style={{ color: BRAND.accent }}>kütüphanesi</span>
            </h2>
            <p className="text-slate-500 font-semibold max-w-lg">
              Framesiz → Frameli farkını gerçek örnekler üzerinden görün. Aynı ürün, daha güçlü teklif.
            </p>
          </div>
        </div>

        <TemplateComparePanel />
      </section>

      <StepsSection />

      {/* FORM */}
      <section id="contact-form" className="py-24 px-6 max-w-3xl mx-auto text-center scroll-mt-20">
        <h2 className="text-5xl md:text-[80px] font-extrabold tracking-tight mb-6 leading-[0.95]">
          Demo <br />
          <span style={{ color: BRAND.accent }}>talep edin.</span>
        </h2>
        <p className="text-slate-600 font-semibold mb-12 text-sm leading-relaxed">
          Kataloğunuzu inceleyelim. Size özel şablon + mesaj kurgusunu çıkarıp örnek çıktıyı paylaşalım.
        </p>

        {/* ✅ Formspree */}
        <form className="space-y-4 text-left" action={FORMSPREE_ENDPOINT} method="POST">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              className="w-full bg-slate-100 p-6 rounded-2xl font-semibold text-sm tracking-wide focus:bg-white border-2 border-transparent outline-none transition-all shadow-sm"
              style={{ boxShadow: "0 1px 0 rgba(15,23,42,0.04)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = BRAND.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
              placeholder="Ad Soyad"
              required
            />
            <input
              type="email"
              name="email"
              className="w-full bg-slate-100 p-6 rounded-2xl font-semibold text-sm tracking-wide focus:bg-white border-2 border-transparent outline-none transition-all shadow-sm"
              onFocus={(e) => (e.currentTarget.style.borderColor = BRAND.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
              placeholder="İş e-posta"
              required
            />
          </div>

          <input
            type="text"
            name="website"
            className="w-full bg-slate-100 p-6 rounded-2xl font-semibold text-sm tracking-wide focus:bg-white border-2 border-transparent outline-none transition-all shadow-sm"
            onFocus={(e) => (e.currentTarget.style.borderColor = BRAND.accent)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
            placeholder="Web siteniz"
          />

          <textarea
            name="message"
            className="w-full bg-slate-100 p-6 rounded-2xl font-semibold text-sm tracking-wide focus:bg-white border-2 border-transparent outline-none transition-all h-32 shadow-sm"
            onFocus={(e) => (e.currentTarget.style.borderColor = BRAND.accent)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
            placeholder="Kısa not (kampanya hedefi / ürün grubu / ülke vb.)"
          />

          <button
            type="submit"
            className="w-full text-white py-6 rounded-2xl font-extrabold text-lg tracking-widest transition-all shadow-2xl hover:scale-[1.01] active:scale-95"
            style={{ backgroundColor: BRAND.accent }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0F172A")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.accent)}
          >
            Demo talebi gönder
          </button>

          <p className="text-xs text-slate-500 font-medium mt-2 text-center">
            Gönderdiğiniz bilgiler yalnızca demo/analiz süreci için kullanılır.
          </p>
        </form>
      </section>
    </div>
  );
};

export default App;