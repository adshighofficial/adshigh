
// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import ThemeOverrides from "./theme-override.jsx";
import ServiceDetailLite from "./pages/ServiceDetailLite";

/* Router scroll reset */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
/* Hash görünce hedef elemana kaydır (header yüksekliğini düşerek) */
function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = document.querySelector(".header")?.offsetHeight ?? 68;
    const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 8);
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [hash]);

  return null;
}

export default function App(){
  const [lang, setLang] = useState("tr");
  const TXT = {
    tr: {
      nav_services: "Hizmetler",
      nav_services_mobile: "Hizmetlerimiz",
      nav_approaches: "Yaklaşımlarımız",
      nav_refs: "Referanslar",
      cta: "Teklif Al",
      badge: "Veri Odaklı · Dijital Pazarlama Ajansı",
      hero_2: "Google, Sosyal Medya ve diğer dijital kanallardaki yatırımlarınızı gerçek zamanlı verilerle optimize ediyoruz. Her adımda tıklamayı değil, dönüşümü ölçüyor; markanızı verimliliğe, performansa ve büyümeye taşıyoruz.",
      services_title: "Hizmetler",
      approaches_title: "Yaklaşımlarımız",
      refs_title: "Referanslar",
      footer_form_title: "Bize Yazın",
      footer_select_label: "Hangi hizmet hakkında bilgi almak istiyorsunuz?",
      btn_send: "Gönder",
      more_show: "Daha fazla göster",
      more_less: "Daha az göster",
    },
    en: {
      nav_services: "Services",
      nav_services_mobile: "Our Services",
      nav_approaches: "Our Approach",
      nav_refs: "Clients",
      cta: "Get a Quote",
      badge: "Data-Driven · Performance Marketing",
      hero_2: "We optimize Google, Social and 3rd-party campaigns with real-time data; we measure sales, not just clicks.",
      services_title: "Services",
      approaches_title: "Our Approach",
      refs_title: "Clients",
      footer_form_title: "Contact Us",
      footer_select_label: "Which service are you interested in?",
      btn_send: "Send",
      more_show: "Show more",
      more_less: "Show less",
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHash />
      <Routes>
        <Route element={<Layout lang={lang} setLang={setLang} TXT={TXT} />}>
          <Route path="/" element={<Home lang={lang} setLang={setLang} TXT={TXT} />} />
          <Route path="/hizmetler/:slug" element={<ServiceDetailLite />} />
          <Route path="/services/:slug" element={<ServiceDetailLite />} />
          <Route path="*" element={<Home lang={lang} setLang={setLang} TXT={TXT} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/* ========== Layout ========== */
function Layout({ lang, setLang, TXT }) {
  return (
    <>
      <Header lang={lang} setLang={setLang} TXT={TXT} />
      {/* sabit header için boşluk, yüksekliği CSS’den hesaplanıyor */}
      <div className="header-offset" />
      <Outlet />
      <SiteFooter lang={lang} TXT={TXT} />
    </>
  );
}

/* ========== HEADER ========== */
function Header({ lang, setLang, TXT }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width:960px)").matches);
  const [scrolled, setScrolled] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  // viewport değişimi
  useEffect(()=>{
    const mm = window.matchMedia("(max-width:960px)");
    const cb = e => setIsMobile(e.matches);
    mm.addEventListener("change", cb);
    return ()=> mm.removeEventListener("change", cb);
  },[]);

  // scroll şeffaflığı
  useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive:true });
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);

 const location = useLocation(); // Header'ın içinde olsun (navigate zaten var)

const goTo = (id) => (e) => {
  e.preventDefault();

  // Anasayfadaysak: direkt kaydır
  if (location.pathname === "/") {
    const el = document.getElementById(id);
    if (!el) return;
    const headerH = document.querySelector(".header")?.offsetHeight ?? 68;
    const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 8);
    window.scrollTo({ top: y, behavior: "smooth" });
    return;
  }

  // Anasayfada değilsek: önce "/"e git, Home açılınca oraya kaydır
  navigate("/", { state: { scrollTo: id } });
};

  const SERVICES = [
    { slug:"google-reklamlari",   t:"Google Reklamları" },
    { slug:"meta-reklamlari",     t:"Meta Reklamları" },
    { slug:"tiktok-reklamlari",   t:"TikTok Reklamları" },
    { slug:"linkedin-reklamlari", t:"LinkedIn Reklamları" },
    { slug:"programatik-medya",   t:"Programatik / Medya" },
    { slug:"seo",         t:"SEO" },
    { slug:"raporlama-dashboard", t:"Raporlama & Dashboard" },
    { slug:"yandex-reklamlari",   t:"Yandex Reklamları" },
    { slug:"snapchat-reklamlari", t:"Snapchat Reklamları" },
    { slug:"x-reklamlari",        t:"X Reklamları" },
    { slug:"telegram-reklamlari", t:"Telegram Reklamları" },
    { slug:"ux-ui-tasarim",       t:"UX/UI Grafik Tasarım" },
    { slug:"dijital-danismanlik", t:"Dijital Danışmanlık" },
  ];

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-grid">
        <Link to="/" className="site-logo" aria-label="AdsHigh anasayfa">
          <img src="/adshigh_logo.png" alt="AdsHigh" className="logo-img" />
        </Link>

<nav className="nav center-nav" onMouseLeave={()=>setOpenServices(false)}>
  <div
    className="nav-item has-dd"
    onMouseEnter={()=>!isMobile && setOpenServices(true)}
    onFocus={()=>!isMobile && setOpenServices(true)}
    // ↓ mobilde preventDefault yok; sadece desktop’ta hover ile açıyoruz
  >
    <a
  href="/#services"
  onClick={(e) => {
    e.preventDefault();
    setOpenServices(false);       // dropdown kapansın
    navigate("/#services");       // neredeysen oraya git + hash
  }}
>
  {isMobile ? TXT.tr.nav_services_mobile : TXT.tr.nav_services}
</a>

    {/* Dropdown sadece desktop’ta */}
    {!isMobile && (
      <div className={`dd dd-services ${openServices ? "show" : ""}`}
           onMouseEnter={()=>setOpenServices(true)}
           onMouseLeave={()=>setOpenServices(false)}>
        <ul className="dd-list">
          {SERVICES.map(s=>(
            <li key={s.slug}>
              <Link to={`/hizmetler/${s.slug}`} className="dd-link" onClick={()=>setOpenServices(false)}>
                {s.t}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  {/* Yaklaşımlar — sadece desktop’ta */}
  {!isMobile && (
    <a href="/#approaches" onClick={goTo("approaches")}>
      {TXT.tr.nav_approaches}
    </a>
  )}
</nav>

        {/* Sağ CTA – eski yerinde */}
        <div className="header-cta">
          <a className="btn" href="/#contact" onClick={goTo("contact")}>{TXT.tr.cta}</a>
        </div>
      </div>
    </header>
  );
}
/* ========== FOOTER ========== */
import { Link as RLink } from "react-router-dom"; // üstte zaten var, burada sadece referans

function SiteFooter({ lang, TXT }) {
  return (
    <footer id="contact" className="footer footer--brand">
      <FooterStyles />
      <div className="container footer-top">
        {/* Marka */}
        <div className="fcol-brand">
          <RLink to="/" className="site-logo f-logo" aria-label="AdsHigh anasayfa">
            <img src="/adshigh_logo.png" alt="AdsHigh" className="logo-img" />
          </RLink>
          <p className="f-desc">
            Veri odaklı performans pazarlama. Google, Sosyal ve Programatik kanallarda
            şeffaf ölçüm ve sürdürülebilir büyüme.
          </p>

          <div className="f-social">
            <a href="https://www.linkedin.com/company/adshigh" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.4 8.09h4.2V24H.4zM8.44 8.09h4.02v2.17h.06c.56-1.06 1.93-2.17 3.98-2.17 4.25 0 5.03 2.8 5.03 6.44V24h-4.2v-7.1c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.74 1.86-2.74 3.78V24H8.44z"/></svg>
            </a>
            <a href="https://www.facebook.com/people/AdsHigh/61579677954876/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.7c0-2.6 1.6-4 3.9-4 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12"/></svg>
            </a>
            <a href="https://www.instagram.com/adshighofficial/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Z"/>
                <path d="M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/>
                <circle cx="17.5" cy="6.5" r="1.2"/>
              </svg>
            </a>
            <a href="mailto:info@adshigh.com" aria-label="E-posta">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z"/></svg>
            </a>
          </div>
        </div>

        {/* Hizmetler listesi */}
        <div className="fcol fcol-services">
          <h5>Hizmetler</h5>
          <ul className="f-list">
            <li><RLink to="/hizmetler/google-reklamlari">Google Reklamları</RLink></li>
            <li><RLink to="/hizmetler/meta-reklamlari">Meta Reklamları</RLink></li>
            <li><RLink to="/hizmetler/tiktok-reklamlari">TikTok Reklamları</RLink></li>
            <li><RLink to="/hizmetler/linkedin-reklamlari">LinkedIn Reklamları</RLink></li>
            <li><RLink to="/hizmetler/programatik-medya">Programatik / Medya</RLink></li>
            <li><RLink to="/hizmetler/seo">SEO</RLink></li>
            <li><RLink to="/hizmetler/raporlama-dashboard">Raporlama & Dashboard</RLink></li>
            <li><RLink to="/hizmetler/yandex-reklamlari">Yandex Reklamları</RLink></li>
            <li><RLink to="/hizmetler/snapchat-reklamlari">Snapchat Reklamları</RLink></li>
            <li><RLink to="/hizmetler/x-reklamlari">X Reklamları</RLink></li>
            <li><RLink to="/hizmetler/telegram-reklamlari">Telegram Reklamları</RLink></li>
            <li><RLink to="/hizmetler/ux-ui-tasarim">UX/UI Grafik Tasarım</RLink></li>
            <li><RLink to="/hizmetler/dijital-danismanlik">Dijital Danışmanlık</RLink></li>
          </ul>
        </div>

        {/* Form (değiştirmedim) */}
        <form
  className="fcol f-form f-form--clean"
  action="https://formspree.io/f/movpkybw"
  method="POST"
  target="_blank"               // ← Formspree success sayfası yeni sekmede
  rel="noopener"
  onSubmit={(e) => {
    const f = e.currentTarget;
    // Telefonu tek stringe birleştir
    const code = f.querySelector('select[name="phone_code"]')?.value || "";
    const raw  = f.querySelector('input[name="phone_raw"]')?.value || "";
    const phoneHidden = f.querySelector('input[name="phone"]');
    if (phoneHidden) phoneHidden.value = `${code} ${raw}`.trim();

    // UTM & sayfa bilgisi
    const params = new URLSearchParams(window.location.search);
    const utmSource  = params.get("utm_source")  || "";
    const utmMedium  = params.get("utm_medium")  || "";
    const utmCampaign= params.get("utm_campaign")|| "";
    f.querySelector('input[name="utm_source"]').value   = utmSource;
    f.querySelector('input[name="utm_medium"]').value   = utmMedium;
    f.querySelector('input[name="utm_campaign"]').value = utmCampaign;
    f.querySelector('input[name="page_url"]').value     = window.location.href;
    f.querySelector('input[name="page_path"]').value    = window.location.pathname;

    // DİKKAT: preventDefault YOK — normal POST yapsın
  }}
>
  <div className="f-form-head">
    <h3>İLETİŞİM FORMU</h3>
    <p>Hemen Doldur, Tanışalım</p>
  </div>

  <input name="name" placeholder="İsim" required />
  <input name="email" type="email" placeholder="E-posta" required />

  <div className="phone-field">
    <select name="phone_code" className="phone-code" defaultValue="+90" aria-label="Ülke kodu" required>
      <option value="+90">🇹🇷 +90</option>
      <option value="+1">🇺🇸 +1</option>
      <option value="+44">🇬🇧 +44</option>
      <option value="+49">🇩🇪 +49</option>
      <option value="+33">🇫🇷 +33</option>
      <option value="+39">🇮🇹 +39</option>
      <option value="+34">🇪🇸 +34</option>
      <option value="+7">🇷🇺 +7</option>
      <option value="+30">🇬🇷 +30</option>
      <option value="+31">🇳🇱 +31</option>
      <option value="+32">🇧🇪 +32</option>
      <option value="+46">🇸🇪 +46</option>
      <option value="+47">🇳🇴 +47</option>
      <option value="+45">🇩🇰 +45</option>
      <option value="+43">🇦🇹 +43</option>
      <option value="+41">🇨🇭 +41</option>
      <option value="+351">🇵🇹 +351</option>
      <option value="+48">🇵🇱 +48</option>
      <option value="+420">🇨🇿 +420</option>
      <option value="+421">🇸🇰 +421</option>
      <option value="+36">🇭🇺 +36</option>
      <option value="+40">🇷🇴 +40</option>
      <option value="+380">🇺🇦 +380</option>
      <option value="+962">🇯🇴 +962</option>
      <option value="+971">🇦🇪 +971</option>
      <option value="+974">🇶🇦 +974</option>
      <option value="+20">🇪🇬 +20</option>
      <option value="+212">🇲🇦 +212</option>
      <option value="+216">🇹🇳 +216</option>
      <option value="+92">🇵🇰 +92</option>
      <option value="+91">🇮🇳 +91</option>
      <option value="+62">🇮🇩 +62</option>
      <option value="+60">🇲🇾 +60</option>
      <option value="+65">🇸🇬 +65</option>
      <option value="+63">🇵🇭 +63</option>
      <option value="+66">🇹🇭 +66</option>
      <option value="+84">🇻🇳 +84</option>
      <option value="+81">🇯🇵 +81</option>
      <option value="+82">🇰🇷 +82</option>
      <option value="+86">🇨🇳 +86</option>
      <option value="+61">🇦🇺 +61</option>
      <option value="+64">🇳🇿 +64</option>
      <option value="+1-CA">🇨🇦 +1</option>
      <option value="+52">🇲🇽 +52</option>
      <option value="+54">🇦🇷 +54</option>
      <option value="+55">🇧🇷 +55</option>
      <option value="+56">🇨🇱 +56</option>
      <option value="+57">🇨🇴 +57</option>
      <option value="+58">🇻🇪 +58</option>
      <option value="+27">🇿🇦 +27</option>
      <option value="+254">🇰🇪 +254</option>
      <option value="+234">🇳🇬 +234</option>
      <option value="+256">🇺🇬 +256</option>
      <option value="+260">🇿🇲 +260</option>
    </select>
    <input className="phone-input" type="tel" name="phone_raw" placeholder="Telefon" inputMode="tel" required />
  </div>

  <textarea className="msg" name="message" placeholder="Mesaj" rows="3"></textarea>

  <label className="consent">
    <input type="checkbox" name="consent" required /> Onaylıyorum
  </label>
  <p className="kvkk">
    Kişisel verilerimin işlenmesine, AdsHigh'ın reklam, duyuru, bilgi, kampanya vb.
    konularda şahsıma ticari elektronik ileti göndermesine açık rıza veriyorum.
  </p>

  {/* GİZLİ ALANLAR */}
  <input type="hidden" name="_subject" value="AdsHigh - Yeni Form (Footer)" />
  <input type="hidden" name="_gotcha" />
  <input type="hidden" name="phone" value="" />
  <input type="hidden" name="utm_source" value="" />
  <input type="hidden" name="utm_medium" value="" />
  <input type="hidden" name="utm_campaign" value="" />
  <input type="hidden" name="page_url" value="" />
  <input type="hidden" name="page_path" value="" />

  <button type="submit">Gönder</button>
</form>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom__inner two-line">
          <span>© 2025 AdsHigh. Tüm hakları saklıdır. | KVKK | Gizlilik Politikası </span>
          <span className="ai-credit">Bu website, AdsHigh tarafından yapay zeka ile geliştirildi.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterStyles(){
  return (
    <style>{`
      .footer--brand{
        --f-bg:#0C1020;
        --f-ink:#E8ECFF;
        --f-muted:#A5ADCF;
        --f-line:rgba(255,255,255,.08);
        --f-grad:linear-gradient(135deg,#5B21B6 0%, #7C3AED 60%);
        background:var(--f-bg);
        color:var(--f-ink);
        padding:36px 0 16px;
        border-top:1px solid var(--f-line);
        margin-top:40px; /* üst blokla nefes */
      }
      .footer--brand .footer-top{
        display:grid;
        grid-template-columns:1.1fr 1fr 1fr 1.2fr;
        gap:28px;
        align-items:start;
        padding-bottom:14px;
        border-bottom:1px solid var(--f-line);
      }
      .footer--brand .f-logo{ font-size:24px; display:inline-flex; gap:6px }
      .footer--brand .f-desc{ color:var(--f-muted); margin:8px 0 12px; max-width:46ch; font-size:14px; line-height:1.5 }
      .footer--brand .f-social{ display:flex; gap:10px }
      .footer--brand .f-social a{ display:grid; place-items:center; width:34px; height:34px; border-radius:9px; border:1px solid var(--f-line); color:#cfd4ff; }
      .footer--brand .f-social a:hover{ background:var(--f-grad); color:#fff; border-color:transparent; box-shadow:0 6px 18px rgba(124,58,237,.28)}
      .footer--brand h5{ margin:0 0 8px; font-size:15px; font-weight:800; letter-spacing:.1px }
      .footer--brand .f-list{ list-style:none; padding:0; margin:0; display:grid; gap:6px; font-size:14px }
      .footer--brand .f-list a{ color:var(--f-muted) }
      .footer--brand .f-list a:hover{ color:#fff; text-decoration:underline }

      /* Form */
      .footer--brand .f-form{ display:grid; gap:8px; font-size:14px }
      .footer--brand .f-form-head h3{ margin:0; font-size:20px }
      .footer--brand .f-form-head p{ margin:4px 0 10px; color:var(--f-muted); font-size:14px }
      .footer--brand .f-form input,
      .footer--brand .f-form select,
      .footer--brand .f-form textarea{
        height:40px; border-radius:10px; border:1px solid var(--f-line);
        background:#0F1426; color:#E8ECFF; padding:0 10px; font-size:14px;
      }
      .footer--brand .f-form textarea{ height:auto; padding:10px; }
      .footer--brand .f-form .consent{ display:flex; gap:8px; align-items:center; color:var(--f-muted); font-size:13px }
      .footer--brand .f-form .kvkk{ color:var(--f-muted); font-size:13px; line-height:1.5 }
      .footer--brand .f-form button{
        border:none; border-radius:10px; font-weight:800; height:42px; cursor:pointer;
        background:var(--f-grad); color:#fff; box-shadow:0 8px 24px rgba(124,58,237,.28);
      }

      .footer--brand .footer-bottom{
        display:flex; justify-content:center; padding:10px 0 0; color:var(--f-muted); font-size:13px;
      }
      .footer-bottom__inner{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:center }

      /* Mobil: FORM EN ÜSTE, sonra diğer kolonlar */
      @media (max-width:900px){
        .footer--brand{ padding:28px 0 12px; margin-top:28px }
        .footer--brand .footer-top{
          display:grid;
          grid-template-columns:1fr;
          grid-template-areas:
            "form"
            "brand"
            "services";
          gap:16px;
        }
        .footer--brand .fcol-brand{ grid-area: brand; }
        .footer--brand .fcol-services{ grid-area: services; }
        .footer--brand .f-form{ grid-area: form; }
        .footer--brand .f-desc{ font-size:13px; margin:6px 0 10px; }
        .footer--brand h5{ font-size:13.5px; margin-bottom:6px; }
        .footer--brand .f-list{ gap:4px; font-size:13px; }
        .footer--brand .f-social a{ width:32px; height:32px; border-radius:8px; }
        .footer--brand .footer-bottom{ font-size:12px; padding-top:8px; }
      }
    `}</style>
  );
}

/* =========================
   Ana sayfa
========================= */
function Home({ lang, setLang, TXT }) {
  // Lead popup
  const [leadOpen, setLeadOpen] = useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setLeadOpen(true),2000); return ()=>clearTimeout(t); },[]);

  // HERO: değişken kelime
  const WORDS_TR = ["yüksek", "akıllı", "stratejik", "etkili"];
  const WORDS_EN = ["high", "smart", "strategic", "powerful"];
  const LONGEST = { tr: "stratejik", en: "strategic" };
  const [w, setW] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=> setW(i => (i+1) % WORDS_TR.length), 1000);
    return ()=>clearInterval(id);
  },[]);
  const dynWord = (lang === "tr" ? WORDS_TR : WORDS_EN)[w];
  const longestWord = (lang === "tr" ? LONGEST.tr : LONGEST.en);

  // Brand belt
  const BRANDS = [
    { file: "google.png", alt: "Google Ads" },
    { file: "instagram.png", alt: "Meta Ads" },
    { file: "facebook.png", alt: "Meta Ads" },
    { file: "tiktok.png", alt: "TikTok Ads" },
    { file: "snapchat.png", alt: "Snapchat Ads" },
    { file: "yandex.png", alt: "Yandex Ads" },
    { file: "telegram.png", alt: "Telegram" },
    { file: "xtwitter.png", alt: "X (Twitter)" },
    { file: "ga4.png", alt: "Google Analytics 4" },
    { file: "gtm.png", alt: "Google Tag Manager" },
    { file: "linkedin.png", alt: "LinkedIn Ads" },
  ];
  const BELT = [...BRANDS, ...BRANDS, ...BRANDS];

  // Yaklaşımlar
  const APPROACHES = [
    { title: "Veri Odaklı Karar Mekanizması", desc: "Tüm stratejilerimizi sezgilere değil, gerçek verilere dayandırırız. Her karar; analiz, test ve ölçümle desteklenir." },
    { title: "Performans + Yaratıcılık Dengesi", desc: "Sadece veriye değil, insan duygusuna da dokunuruz. Kreatif fikirleri performans verileriyle birleştirerek hem dikkat çeker hem dönüşüm sağlarız." },
    { title: "Şeffaf Raporlama Kültürü", desc: "Her adım izlenebilir, her sonuç ölçülebilirdir. Kampanyalarınızı düzenli raporlarla paylaşır, süreci birlikte yönetiriz." },
    { title: "Sürekli Optimizasyon", desc: "Hiçbir kampanyayı “bitti” saymayız. Tüm reklamları ve stratejileri performans verilerine göre sürekli optimize ederiz." },
    { title: "Teknoloji ve Yapay Zekâ Entegrasyonu", desc: "Google, Meta, Tiktok ve diğer platformlarda otomasyon sistemleri ile yapay zekâ destekli analizler kullanarak karar alma hızını artırırız." },
    { title: "Stratejik Bütünlük", desc: "SEO, reklam, kreatif, analitik ve danışmanlık süreçlerini ayrı değil, tek bir büyüme ekosistemi olarak ele alırız." },
    { title: "Deneyim Odaklı Marka Yaklaşımı", desc: "Her dijital temas noktasında kullanıcı deneyimini merkeze alırız. Dönüşüm sadece tıklamada değil, deneyimde başlar." },
    { title: "Sürdürülebilir Büyüme Anlayışı", desc: "Kısa vadeli kazanç değil, uzun vadeli marka değeri hedefleriz. AdsHigh, markaların dijitalde kalıcı başarı elde etmesi için çalışır." },
  ];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => i === 0 ? APPROACHES.length - 1 : i - 1);
  const next = () => setIdx(i => (i + 1) % APPROACHES.length);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % APPROACHES.length), 4500);
    return () => clearInterval(id);
  }, []);

  // Referanslar (ikili)
  const REFS = [
    {src:"/refs/vatkali.svg", alt:"Vatkali"},
    {src:"/refs/gardrops.png", alt:"Gardrops"},
    {src:"/refs/bsl.png", alt:"BSL"},
    {src:"/refs/beyyoglu-logo-colored.svg", alt:"BEYYOGLU"},
    {src:"/refs/mealboxlogo.webp", alt:"Meal Box"},
    {src:"/refs/stella_logo.jpg", alt:"STELLA"},
    {src:"/refs/logokayakirtasiye.png", alt:"Kaya Kirtasiye"},
    {src:"/refs/gardrops.png", alt:"Gardrops"},
    {src:"/refs/vatkali.svg", alt:"Vatkali"},
    {src:"/refs/beyyoglu-logo-colored.svg", alt:"BEYYOGLU"},
    {src:"/refs/stella_logo.jpg", alt:"STELLA"},
    {src:"/refs/mealboxlogo.webp", alt:"Meal Box"},
    {src:"/refs/bsl.png", alt:"BSL"},
    {src:"/refs/logokayakirtasiye.png", alt:"Kaya Kirtasiye"},
  ];
  const [refIdx, setRefIdx] = useState(0);
  const [refPaused, setRefPaused] = useState(false);
  const len = REFS.length;
  const nextRef = () => setRefIdx(i => (i + 1) % len);
  const prevRef = () => setRefIdx(i => (i - 1 + len) % len);
  useEffect(()=>{ if(refPaused) return; const id = setInterval(nextRef, 2000); return ()=>clearInterval(id); },[refPaused, len]);
  const i1 = refIdx, i2 = (refIdx + 1) % len;
  const PAIR = [REFS[i1], REFS[i2]];

  // Hizmetler
  const SERVICES = [
    { slug:"google-reklamlari",   t:"Google Reklamları",   d:"Talep, Satış ve Görünürlük Odaklı Google Reklam Stratejileri." },
    { slug:"meta-reklamlari",     t:"Meta Reklamları",     d:"Facebook ve Instagram’da Görünürlük, Satış, Etkileşim ve Takipçi Artışı." },
    { slug:"yandex-reklamlari",   t:"Yandex Reklamları",   d:"Rusya Ve BDT Pazarlarında Yerel Hedefleme ve Büyüme Gücü." },
    { slug:"snapchat-reklamlari", t:"Snapchat Reklamları", d:"Genç Kitleye Özel AR, Etkileşim ve Uygulama Kampanyaları." },
    { slug:"tiktok-reklamlari",   t:"TikTok Reklamları",   d:"Trend Videolarla Yüksek Erişim ve Dönüşüm Odaklı Büyüme." },
    { slug:"x-reklamlari",        t:"X Reklamları",        d:"Gündem Akışında Etkileşim, Trafik ve Marka Bilinirliği Artışı." },
    { slug:"telegram-reklamlari", t:"Telegram Reklamları", d:"Kanallar ve Sponsor Mesajlarla Hedefe Direkt Erişim." },
    { slug:"linkedin-reklamlari", t:"LinkedIn Reklamları", d:"B2B Hedefleme, Lead Üretimi ve Profesyonel Marka Gücü." },
    { slug:"seo",         t:"SEO",         d:"Organik Görünürlük, Trafik Artışı ve Bölgesel Optimizasyon." },
    { slug:"ux-ui-tasarim",       t:"UX/UI Grafik Tasarım", d:"Etkileyici, Sezgisel ve Dönüşüm Odaklı Dijital Tasarımlar." },
    { slug:"programatik-medya",   t:"Programatik / Medya Satın Alma", d:"Display ve Video Planlama ile Akıllı Medya Yönetimi." },
    { slug:"raporlama-dashboard", t:"Raporlama & Dashboard", d:"Gerçek Zamanlı Paneller ve Veri Odaklı Performans Takibi." },
    { slug:"dijital-danismanlik", t:"Dijital Danışmanlık", d:"Strateji, Bütçe Planlama ve Büyüme Yolculuğunda Rehberlik." },
  ];

  return (
    <>
      {/* Hero kelime geçiş stili (sadece bu bileşene özel) */}
      <style>{`
        .swap-word{ position:relative; display:inline-block; vertical-align:baseline }
        .swap-word .swap-width{ visibility:hidden; pointer-events:none; white-space:pre }
        .swap-word .w{ position:absolute; inset:0; display:inline-block; text-align:center; opacity:0; transform:translateY(6px); animation:sw-in .38s ease forwards; }
        @keyframes sw-in{ from{opacity:0; transform:translateY(6px)} to{opacity:1; transform:translateY(0)} }
        @media (prefers-reduced-motion: reduce){ .swap-word .w{ animation:none; opacity:1; transform:none } }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="badge">{TXT[lang].badge}</div>
          <h1 className="headline">
            {lang === "tr" ? (
              <>
                Veriyle{" "}
                <span className="swap-word">
                  <span className="swap-width">{longestWord}</span>
                  <span key={dynWord} className="w logo-gradient">{dynWord}</span>
                </span>{" "}
                sonuçlar elde edin.
              </>
            ) : (
              <>
                Achieve{" "}
                <span className="swap-word">
                  <span className="swap-width">{longestWord}</span>
                  <span key={dynWord} className="w logo-gradient">{dynWord}</span>
                </span>{" "}
                results with data.
              </>
            )}
          </h1>
          <p className="subcopy">{TXT[lang].hero_2}</p>
        </div>
      </section>

      {/* Yaklaşımlar */}
      <section id="approaches" className="section section deep">
        <div className="container approach-grid">
          <div>
            <h2 className="section-title">{TXT[lang].approaches_title}</h2>
            <div className="approach-copy">
              <h3 className="approach-title">{APPROACHES[idx].title}</h3>
              <p className="approach-desc">{APPROACHES[idx].desc}</p>
            </div>
            <div className="approach-controls">
              <button className="nav-btn nav-prev" onClick={prev} aria-label="Önceki">
                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="nav-btn nav-next" onClick={next} aria-label="Sonraki">
                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <ApproachesCanvas index={idx} />
        </div>
      </section>

      {/* Referanslar */}
      <section id="ref" className="refs section">
        <div className="container">
          <h2 className="section-title">{TXT[lang].refs_title}</h2>
          <div
            className="ref-stage-duo"
            onMouseEnter={()=>setRefPaused(true)}
            onMouseLeave={()=>setRefPaused(false)}
          >
            {PAIR.map((r,ix)=>(
              <div className="ref-card" key={r.src + ix}>
                <img src={r.src} alt={r.alt} />
              </div>
            ))}
            <button className="ref-nav left"  onClick={prevRef}  aria-label="Geri"><span className="chev"/></button>
            <button className="ref-nav right" onClick={nextRef} aria-label="İleri"><span className="chev"/></button>
          </div>

          <div className="ref-dots" role="tablist" aria-label="Clients">
            {REFS.map((_,i)=>(
              <button
                key={i}
                role="tab"
                aria-selected={i===refIdx}
                className={i===refIdx ? "on" : ""}
                onClick={()=>setRefIdx(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hizmetler */}
      <section id="services" className="section section deep">
        <div className="container">
          <h2 className="section-title">Hizmetler</h2>

          {/* Şerit */}
          <section className="brand-strip">
            <div className="container">
              <div className="strip-rail">
                <div className="strip-track">
                  {BELT.map((b, i) => (
                    <span className="strip-pill" key={i} title={b.alt}>
<img src={`/${b.file}`} alt={b.alt} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Kartlar */}
          <div className="cards compact-4">
            {SERVICES.map((c, i) => (
              <RLink
                to={`/hizmetler/${c.slug}`}
                className="card-link"
                key={c.slug}
                aria-label={`${c.t} detaylarına git`}
              >
                <article className={`card is-hover variant-${(i % 6) + 1}`} key={i}>
                  <h3 className="card-title">{c.t}</h3>
                  <p className="card-desc">{c.d}</p>
                </article>
              </RLink>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Popup (dokunmadım) */}
     {leadOpen && (
  <div className="lead-popup show" role="dialog" aria-modal="true">
    <div className="box">
      <button className="close" onClick={()=>setLeadOpen(false)} aria-label="Kapat">✕</button>
      <h2>Birlikte Büyütelim</h2>
      <p style={{color:"#c6c9e9", marginTop:4, marginBottom:14}}>
        Formu Doldurun, Kısa Süre İçinde Dönüş Yapalım.
      </p>

      <form
        action="https://formspree.io/f/movpkybw"
        method="POST"
        target="_blank"    // ← yeni sekme
        rel="noopener"
        onSubmit={(e)=>{
          const f = e.currentTarget;
          // UTM & sayfa
          const params = new URLSearchParams(window.location.search);
          f.querySelector('input[name="utm_source"]').value   = params.get("utm_source") || "";
          f.querySelector('input[name="utm_medium"]').value   = params.get("utm_medium") || "";
          f.querySelector('input[name="utm_campaign"]').value = params.get("utm_campaign") || "";
          f.querySelector('input[name="page_url"]').value     = window.location.href;
        }}
      >
        <input name="name" placeholder="İsim" required />
        <input name="surname" placeholder="Soyisim" required />
        <input name="email" type="email" placeholder="E-posta" required />

        <input type="hidden" name="_subject" value="AdsHigh - Yeni Form (Popup)" />
        <input type="hidden" name="_gotcha" />
        <input type="hidden" name="utm_source" value="" />
        <input type="hidden" name="utm_medium" value="" />
        <input type="hidden" name="utm_campaign" value="" />
        <input type="hidden" name="page_url" value="" />

        <button type="submit">Gönder</button>
      </form>
    </div>
  </div>
)}
    </>
  );
}

/* --- TEK PANEL --- */
function Panel({ children }) {
  return (
    <svg
      viewBox="0 0 640 320"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      {/* İçerikleri tam merkeze yerleştiriyoruz */}
      <g transform="translate(320,160)">
        {children}
      </g>
    </svg>
  );
}

/* =========================
   YAKLAŞIMLAR CANVAS (fix)
   - key={index} => animasyonlar anında başlar
   - responsive CSS altta
========================= */
function ApproachesCanvas({ index }) {
  const comps = [
    ChannelsReport,        // 1 Veri Odaklı Karar Mekanizması
    BalancePerfCreative,   // 2 Performans + Yaratıcılık Dengesi
    ExcelTransparency,     // 3 Şeffaf Raporlama Kültürü
    OptimizeForever,       // 4 Sürekli Optimizasyon
    AITargeting,           // 5 Teknoloji ve Yapay Zekâ Entegrasyonu
    StrategicHolistic,     // 6 Stratejik Bütünlük
    ExperimentDrivenUX,    // 7 Deneyim Odaklı Marka Yaklaşımı
    CohortGrowthHeatmap    // 8 Sürdürülebilir Büyüme Anlayışı
  ];
  const Comp = comps[index % comps.length];
  return (
    <div className="approach-anim ap-canvas" aria-hidden="true">
      {/* key çok kritik: her slaytta animasyonları sıfırdan başlatır */}
      <Comp key={index} />
    </div>
  );
}

/* 1) Veri Odaklı Karar — FLAT & CENTERED */
function ChannelsReport(){
  // ÇİZİM ALANI (panelin merkezine göre)
  const W = 578, H = 240;              // içerik boyutu
  const left = -W/2, top = -H/2;       // Panel(0,0) merkez, buradan ofsetliyoruz
  const baseY = top + H - 32;          // alt eksen
  const maxH = 148;

  const channels = [
    {name:"Google",   v:.55, c:"#8B5CF6"},
    {name:"Meta",     v:.78, c:"#67E8F9"},
    {name:"TikTok",   v:1.00, c:"#22C55E"},
    {name:"Telegram", v:.82, c:"#67E8F9"},
    {name:"Organic",  v:.48, c:"#8B5CF6"},
    {name:"3rd Party",v:.38, c:"#7AA0F5"},
  ];
  const step = W / (channels.length + 1);

  return (
    <Panel>
      {/* Başlık çubuğu */}
      <g transform={`translate(${left+8},${top+6})`}>
        <rect width="240" height="24" rx="10"
              fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.08)"/>
        <text x="12" y="17" fill="#E8ECFF" fontSize="14" fontWeight="800">
          Kanal Bazlı Rapor - Haftalık
        </text>
      </g>

      {/* Izgara + barlar */}
      <g>
        {[0,1,2,3].map(i=>(
          <line key={i}
                x1={left+20} y1={baseY - i*(maxH/3)}
                x2={left+W-20} y2={baseY - i*(maxH/3)}
                stroke="rgba(255,255,255,.08)"/>
        ))}
        <line x1={left+20} y1={baseY} x2={left+W-20} y2={baseY}
              stroke="rgba(255,255,255,.16)"/>

        {channels.map((ch,i)=>{
          const cx = left + step*(i+1);
          const h  = ch.v * maxH;
          const y  = baseY - h;
          return (
            <g key={ch.name} transform={`translate(${cx},0)`}>
              <rect x="-20" y={y} width="40" height={h} rx="10" fill={ch.c}>
                {/* canlılık: en yüksek bar “nefes alır” */}
                {i===2 && (
                  <animate attributeName="opacity" values="1;.7;1"
                           dur="1s" repeatCount="indefinite"/>
                )}
              </rect>
              <text y={top+H-6} textAnchor="middle" fontSize="14" fill="#cfd4ff">
                {ch.name}
              </text>
            </g>
          );
        })}
      </g>
    </Panel>
  );
}

/* 2) Performans + Yaratıcılık — FLAT & CENTERED */
function BalancePerfCreative(){
  const W = 640, H = 320;
  const cx = W/2, cy = H/2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      {/* SOL: Veri barları */}
      <g transform={`translate(${cx-180},${cy+60})`}>
        {[48,76,110].map((h,i)=>(
          <rect key={i} x={i*26} y={-h} width="18" height={h} rx="6"
                fill="url(#gradData)" opacity=".9">
            <animate attributeName="height" values={`10;${h}`} dur={`${0.45 + 0.12*i}s`} fill="freeze" />
            <animate attributeName="y"       values={`-10;${-h}`} dur={`${0.45 + 0.12*i}s`} fill="freeze" />
          </rect>
        ))}
        <text x="30" y="22" fill="#A5ADCF" fontSize="12" fontWeight="700">Veri</text>
      </g>

      {/* SAĞ: Yaratıcılık “damla” */}
      <g transform={`translate(${cx+180},${cy-6})`}>
        <circle r="30" fill="url(#gradCreative)" opacity=".95">
          <animate attributeName="r" values="22;30" dur=".5s" fill="freeze"/>
        </circle>
        <rect x="-4" y="28" width="8" height="16" rx="4" fill="url(#gradCreative)"/>
        <text x="0" y="62" textAnchor="middle" fill="#A5ADCF" fontSize="12" fontWeight="700">Kreatif</text>
      </g>

      {/* ORTA: birleşim çizgisi + efektler */}
      <g transform={`translate(${cx},${cy})`}>
        <line x1="-110" y1="0" x2="110" y2="0" stroke="rgba(232,236,255,.15)" strokeWidth="6"/>
        <circle r="6" fill="#E8ECFF" opacity=".9">
          <animate attributeName="r" values="6;12;6" dur="1.2s" repeatCount="indefinite"/>
        </circle>

        <circle r="4" fill="#67E8F9"><animateMotion path="M-180,0 L0,0" dur=".7s" fill="freeze"/></circle>
        <circle r="4" fill="#F472B6"><animateMotion path="M180,0 L0,0"  dur=".7s" fill="freeze"/></circle>

        <circle r="0" fill="none" stroke="url(#gradData)" strokeWidth="2" opacity=".9">
          <animate attributeName="r" values="0;86" begin=".72s" dur=".8s" fill="freeze"/>
          <animate attributeName="opacity" values="1;0" begin=".72s" dur=".8s" fill="freeze"/>
        </circle>

        <g opacity="0">
          <rect x="-30" y="-38" width="60" height="22" rx="10" fill="rgba(255,255,255,.07)"/>
          <text x="0" y="-22" textAnchor="middle" fill="#E8ECFF" fontSize="12" fontWeight="800">IMPACT</text>
          <animate attributeName="opacity" values="0;1" begin=".72s" dur=".2s" fill="freeze"/>
        </g>
      </g>

      {/* gradyanlar */}
      <defs>
        <linearGradient id="gradData" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6366F1"/><stop offset="1" stopColor="#67E8F9"/>
        </linearGradient>
        <linearGradient id="gradCreative" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#A855F7"/><stop offset="1" stopColor="#F472B6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* 3) Şeffaf Raporlama — FLAT & CENTERED */
function ExcelTransparency(){
  // kolon merkezleri (aynı kalsın)
  const COLX = [24, 150, 270, 390, 510];
  const ROW_H = 32;
  const HEADER_H = 92;
  const VISIBLE = 9;
  const DUR = 0.8;
  const TICK = 900;

  // veriler (aynı kalsın)
  const ALL = React.useMemo(()=>{
    const out = [];
    let prev = { cpa: 24.3, cps: 19.1, cr: 1.8, roas: 4.07 };
    for (let i=1;i<=20;i++){
      const nudge = (b, s) => +(b + s).toFixed(1);
      const step = ((i%5)-2) * 0.7;
      const s2   = ((i%7)-3) * 0.4;
      const curr = {
        cpa: nudge(prev.cpa,  step),
        cps: nudge(prev.cps, -step*0.8),
        cr:  +(Math.max(0.8, prev.cr  + s2*0.2)).toFixed(1),
        roas:+(Math.max(1.4, prev.roas- s2*0.18)).toFixed(2)
      };
      const dir = {
        cpa: Math.sign(curr.cpa - prev.cpa),
        cps: Math.sign(curr.cps - prev.cps),
        cr:  Math.sign(curr.cr  - prev.cr),
        roas:Math.sign(curr.roas- prev.roas),
      };
      out.push({ d:`G${i}`, ...curr, dir });
      prev = curr;
    }
    return out;
  },[]);

  const [start, setStart] = React.useState(0);
  React.useEffect(()=>{
    const id = setInterval(()=> setStart(s => (s+1) % ALL.length), TICK);
    return ()=>clearInterval(id);
  },[ALL.length]);

  const win = Array.from({length: VISIBLE}, (_,i)=> ALL[(start+i) % ALL.length]);
  const nextRow = ALL[(start+VISIBLE) % ALL.length];
  const show = [...win, nextRow];

  /* ---- ÖNEMLİ: Ortalamak için kaydırma ----
     İçerik genişliği: ~578px (sol en -10, sağ en 568 civarı)
     SVG genişliği 640 -> yatay offset ~31px
     Dikeyde de tabloyu biraz aşağı/yukarı ortalamak için 12px kullandık. */
  const xOffset = (640 - 578) / 2; // ~31
  const yOffset = 12;

  return (
    <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid meet">
      {/* Arka plan KALDIRILDI: ekstra iç çerçeve yok */}

      {/* Tüm içeriği ortalanmış gruba taşıyoruz */}
      <g transform={`translate(${xOffset},${yOffset})`}>

        {/* Başlık pill'leri */}
        {["Day","CPA","CPS","CR","ROAS"].map((t,i)=>(
          <g key={t} transform={`translate(${COLX[i]},34)`}>
            <rect x="-48" y="-16" width="96" height="30" rx="12"
                  fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.08)"/>
            <text x="0" y="6" textAnchor="middle" fill="#E8ECFF"
                  fontWeight="800" fontSize="18">{t}</text>
          </g>
        ))}

        {/* Sadece görünür satırların içinde akışı animasyonla kaydır */}
        <defs>
          <clipPath id="excelBodyClip">
            <rect x="0" y={HEADER_H-ROW_H} width="600" height={ROW_H*VISIBLE+ROW_H}/>
          </clipPath>
        </defs>

        <g clipPath="url(#excelBodyClip)">
          <g transform="translate(0,0)">
            <animateTransform attributeName="transform" type="translate"
              values={`0,0; 0,${-ROW_H}`} dur={`${DUR}s`} repeatCount="1" fill="freeze"/>
            {show.map((r,ri)=>(
              <Row key={r.d + '-' + ri} y={HEADER_H + ri*ROW_H} row={r} COLX={COLX}/>
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}

/* Yardımcıları aynen bırakıyoruz */
function Row({ y, row, COLX }){
  return (
    <g transform={`translate(0,${y})`} fontSize="12" fontWeight="700">
      <RoundedPill x={COLX[0]-34} w={68}>
        <text x={COLX[0]} y="6" textAnchor="middle" fill="#cfd4ff">{row.d}</text>
      </RoundedPill>
      <Metric x={COLX[1]} txt={`$${row.cpa.toFixed(1)}`} good={row.dir.cpa<=0}/>
      <Metric x={COLX[2]} txt={`$${row.cps.toFixed(1)}`} good={row.dir.cps<=0}/>
      <Metric x={COLX[3]} txt={`${row.cr.toFixed(1)}%`} good={row.dir.cr>0}/>
      <Metric x={COLX[4]} txt={`${row.roas.toFixed(2)}x`} good={row.dir.roas>0}/>
    </g>
  );
}

function RoundedPill({x, w, children}){
  return (
    <g>
      <rect x={x} y="-16" width={w} height="32" rx="12"
            fill="#111733" stroke="rgba(255,255,255,.06)"/>
      {children}
    </g>
  );
}

function Metric({x, txt, good}) {
  const color = good ? "#22c55e" : "#EF4444";
  return (
    <g transform={`translate(${x},0)`}>
      <rect x="-58" y="-16" width="116" height="32" rx="12"
            fill="#161C3D" stroke="rgba(255,255,255,.06)"/>
      <text y="6" textAnchor="middle" fill={color} fontSize="13">{txt}</text>
      {good
        ? (<g transform="translate(48,-2)">
             <path d="M0,10 l8,-8 l8,8" fill="none" stroke="#22c55e" strokeWidth="3"
                   strokeLinecap="round" strokeLinejoin="round"/>
           </g>)
        : (<g transform="translate(48,-2)">
             <path d="M0,2 l8,8 l8,-8" fill="none" stroke="#EF4444" strokeWidth="3"
                   strokeLinecap="round" strokeLinejoin="round"/>
           </g>)}
    </g>
  );
}

/* 4) Sürekli Optimizasyon — kutular Deneyim Odaklı ile aynı boyutta (145x145),
   çizgi yok, panel merkezine göre -148/0/+148 aralığında hizalı */
function OptimizeForever(){
  const STRATS = ["tROAS", "tCPA", "Max Conv.", "Max Value"];
  const [step, setStep] = React.useState(0);
  React.useEffect(()=>{
    const id = setInterval(()=> setStep(s => (s+1) % STRATS.length), 900);
    return ()=>clearInterval(id);
  },[]);

  const cardW = 145, cardH = 145, radius = 18;
  const centers = [-148, 0, 148];          // Deneyim Odaklı’daki görsel aralık
  const top = -cardH/2;                    // dikey merkez

  return (
    <Panel>
      {centers.map((cx, i)=>(
        <g key={i} transform={`translate(${cx - cardW/2}, ${top})`}>
          {/* kart zemin */}
          <rect width={cardW} height={cardH} rx={radius}
                fill="rgba(255,255,255,.04)"
                stroke="rgba(255,255,255,.14)" strokeWidth="2"/>

          {/* başlık */}
          <text x={cardW/2} y="22" textAnchor="middle"
                fontSize="16" fill="#E8ECFF" fontWeight="800">
            {String.fromCharCode(65+i)} {/* A/B/C */}
          </text>

          {/* iki satır dummy çizgi */}
          <rect x="18" y="34" width={cardW-36} height="8" rx="4" fill="rgba(255,255,255,.06)"/>
          <rect x="18" y="48" width={cardW-52} height="8" rx="4" fill="rgba(255,255,255,.06)"/>

          {/* strateji pill (döngü) */}
          <g transform={`translate(${(cardW-84)/2}, ${cardH-34})`}>
            <rect width="84" height="22" rx="11"
                  fill="#141a3e" stroke="rgba(255,255,255,.12)"/>
            <text x="42" y="15" textAnchor="middle" fontSize="12" fill="#67E8F9" fontWeight="700">
              {STRATS[(step+i)%STRATS.length]}
            </text>
          </g>

          {/* çok hafif parıltı */}
          <rect width={cardW} height={cardH} rx={radius}
                fill="none" stroke="url(#optGlow2)" strokeWidth="2" opacity="0">
            <animate attributeName="opacity" values="0;.40;0"
                     dur="2.4s" begin={`${i*0.22}s`} repeatCount="indefinite"/>
          </rect>
        </g>
      ))}

      <defs>
        <linearGradient id="optGlow2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22D3EE"/>
          <stop offset="1" stopColor="#8B5CF6"/>
        </linearGradient>
      </defs>
    </Panel>
  );
}

/* 5) Teknoloji & Yapay Zekâ — seçim hızı arttı */
function AITargeting(){
  const clusters = [
    {x:60, y:46},{x:108, y:28},{x:94, y:100},
    {x:220,y:46},{x:256,y:92},{x:206,y:112}
  ];
  const [pick, setPick] = React.useState(0);
  React.useEffect(()=>{
    const id = setInterval(()=> setPick(p=>(p+1)%clusters.length), 750); // 1000 -> 750
    return ()=>clearInterval(id);
  },[]);
  return (
    <svg viewBox="0 0 320 160">
      <defs>
        <radialGradient id="ai" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#8B5CF6"/><stop offset="1" stopColor="#22D3EE"/>
        </radialGradient>
      </defs>
      <g transform="translate(160,80)">
        <rect x="-24" y="-16" width="48" height="32" rx="10" fill="url(#ai)" />
        <text y="4" textAnchor="middle" fill="#fff" fontWeight="800">AI</text>
        <circle r="36" fill="none" stroke="url(#ai)" strokeOpacity=".6">
          <animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="1.6s" repeatCount="indefinite"/>
        </circle>
      </g>
      {clusters.map((c,i)=>(
        <g key={i}>
          <line x1="160" y1="80" x2={c.x} y2={c.y} stroke="url(#ai)" strokeOpacity=".45"/>
          <circle cx={c.x} cy={c.y} r={i===pick?9:6}
                  fill={i===pick? "#10B981" : "#1a1f46"}
                  stroke={i===pick? "rgba(16,185,129,.85)" : "rgba(255,255,255,.18)"} />
        </g>
      ))}
    </svg>
  );
}

/* 6) Stratejik Bütünlük — delay’ler kısaldı */
function StrategicHolistic(){
  const center = {x:0, y:0};
  const sources = [
    {txt:"Organic", x:-220, y:-66, c:"#A78BFA", delay:"0s"},
    {txt:"Paid",    x:-220, y:-10, c:"#60A5FA", delay:".2s"},
    {txt:"Market",  x:-220, y: 46, c:"#67E8F9", delay:".4s"},
    {txt:"App",     x: 220, y:-42, c:"#F59E0B", delay:".6s"},
    {txt:"Web",     x: 220, y: 30, c:"#10B981", delay:".8s"},
  ];

  return (
    <Panel>
      {/* merkez kart */}
      <rect x={-70} y={-46} width="140" height="92" rx="14" fill="#0f1431" stroke="rgba(255,255,255,.14)"/>
      <rect x={-58} y={-34} width="116" height="10" rx="5" fill="#1b2252"/>
      <rect x={-58} y={-18} width="86"  height="10" rx="5" fill="#1b2252"/>
      <rect x={-58} y={-2}  width="116" height="26" rx="9" fill="#141a3e"/>

      {sources.map((s, i)=> {
        const path = `M${s.x},${s.y} L${center.x},${center.y}`;
        const len = Math.hypot(center.x - s.x, center.y - s.y);
        return (
          <g key={i}>
            <rect x={s.x-32} y={s.y-14} width="64" height="28" rx="10" fill="#101535" stroke="rgba(255,255,255,.12)"/>
            <text x={s.x} y={s.y+5} textAnchor="middle" fontSize="12" fill={s.c} fontWeight="700">{s.txt}</text>

            <path d={path} stroke={s.c} strokeOpacity=".35" fill="none" strokeWidth="2.5"/>
            <path d={path} stroke={`url(#glow-${i})`} strokeWidth="4" fill="none"
                  strokeDasharray={len} strokeDashoffset={len}>
              <animate attributeName="stroke-dashoffset" values={`${len};0`} dur=".6s" begin={s.delay} fill="freeze"/>
            </path>
            <circle r="4.5" fill={s.c}>
              <animateMotion path={path} dur=".6s" begin={s.delay} fill="freeze"/>
            </circle>
            <defs>
              <linearGradient id={`glow-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={s.c} stopOpacity="0"/>
                <stop offset="35%" stopColor={s.c} stopOpacity=".9"/>
                <stop offset="100%" stopColor={s.c} stopOpacity="0"/>
              </linearGradient>
            </defs>
          </g>
        );
      })}
    </Panel>
  );
}

/* 7) Deneyim Odaklı — FLAT & CENTERED */
function ExperimentDrivenUX(){
  const cardW = 145, cardH = 145, gap = 48;     // görsel denge için gap düşürüldü
  const totalW = 3*cardW + 2*gap;
  const startX = -totalW/2;                     // merkez bazlı x başlangıcı
  const top = -cardH/2;                         // dikey merkez

  const winner = 1; // B
  const cards = [
    {t:"A", cr:2.1, cpa:31, cps:18, roas:3.1},
    {t:"B", cr:2.7, cpa:27, cps:16, roas:3.6},
    {t:"C", cr:1.9, cpa:33, cps:19, roas:2.9},
  ];

  return (
    <Panel>
      {cards.map((c,i)=>(
        <g key={i} transform={`translate(${startX + i*(cardW+gap)}, ${top})`}>
          <rect width={cardW} height={cardH} rx="18"
                fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)" strokeWidth="2">
            {i===winner && (
              <animate attributeName="stroke" values="rgba(255,255,255,.14);#22c55e" begin=".8s" dur=".28s" fill="freeze"/>
            )}
          </rect>

          <text x={cardW/2} y="22" textAnchor="middle" fontSize="16" fill="#E8ECFF" fontWeight="800">{c.t}</text>
          <rect x="18" y="34" width={cardW-36} height="8" rx="4" fill="rgba(255,255,255,.06)"/>
          <rect x="18" y="48" width={cardW-52} height="8" rx="4" fill="rgba(255,255,255,.06)"/>

          <g fontSize="12" fontWeight="700">
            <text x="14" y="74"  fill="#34d399">CR: {c.cr}%</text>
            <text x="14" y="92"  fill="#f87171">CPA: ${c.cpa}</text>
            <text x="14" y="110" fill="#34d399">CPS: ${c.cps}</text>
            <text x="14" y="128" fill="#facc15">ROAS: {c.roas}x</text>
          </g>

          {i===winner && (
            <g transform={`translate(${cardW/2},-10)`} opacity="0">
              <polygon points="0,0 12,14 -12,14" fill="#F5C84B" >
                <animate attributeName="opacity" values="0;1" begin=".8s" dur=".22s" fill="freeze"/>
                <animateTransform attributeName="transform" type="scale" values="0.6;1" additive="sum" begin=".8s" dur=".22s" fill="freeze"/>
              </polygon>
            </g>
          )}
        </g>
      ))}
    </Panel>
  );
}


/* 8) Sürdürülebilir Büyüme — hafif hız */
function CohortGrowthHeatmap(){
  const cols = 6, rows = 5;
  const cellW = 64, cellH = 26, gapX = 12, gapY = 12;

  const gridW = cols*cellW + (cols-1)*gapX;
  const gridH = rows*cellH + (rows-1)*gapY;

  const gridLeft = -gridW/2;
  const gridTop  = -gridH/2 + 14;        // görsel denge için hafif aşağı

  return (
    <Panel>
      {/* Kolon başlıkları */}
      {Array.from({length:cols}).map((_,i)=>(
        <text key={`c${i}`} x={gridLeft + i*(cellW+gapX) + cellW/2} y={gridTop - 18}
              fill="#cfd4ff" fontSize="16" textAnchor="middle">W{i+1}</text>
      ))}
      {/* Satır başlıkları */}
      {Array.from({length:rows}).map((_,r)=>(
        <text key={`r${r}`} x={gridLeft - 36} y={gridTop + r*(cellH+gapY) + 18}
              fill="#cfd4ff" fontSize="16" textAnchor="end">M{r+1}</text>
      ))}

      {/* Hücreler */}
      {Array.from({length:rows}).map((_,r)=>
        Array.from({length:cols}).map((_,c)=>{
          const tone = 54 + ((r+c)%3)*8;
          return (
            <rect key={`${r}-${c}`}
                  x={gridLeft + c*(cellW+gapX)} y={gridTop + r*(cellH+gapY)}
                  width={cellW} height={cellH} rx="10"
                  fill={`hsl(120,62%,${tone}%)`} opacity=".95">
              <animate attributeName="opacity" values="1;.85;1" dur={`${1.6+((r+c)%3)*.4}s`} repeatCount="indefinite"/>
            </rect>
          );
        })
      )}
    </Panel>
  );
}

