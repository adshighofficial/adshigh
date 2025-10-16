import React, { useEffect, useRef, useState } from "react";
import { SERVICE_THEMES } from "../../themes/serviceThemes";
import MultiP from "../common/MultiP";

/* =============== HİZMET FAYDALARI (Veri) =============== */
const SERVICE_BENEFITS = {
  google: [
    "Hedefli erişim", "Anlık sonuç", "Bütçe kontrolü", "Yüksek dönüşüm", 
    "Marka görünürlük", "Ölçülebilir performans", "Veri içgörüsü", "Rekabet avantajı", 
    "Akıllı optimizasyon", "Güven algısı"
  ],
  meta: [
    "Görsel etki", "Duygusal bağ", "İlgi tetikleme", "Etkileşim potansiyeli", 
    "Topluluk oluşturma", "Kitle genişleme", "Veri toplama", "Remarketing gücü", 
    "Organik destek", "Marka alışkanlığı"
  ],
  tiktok: [
    "Trend etkisi", "Viral yayılım", "Genç kitle", "Dikey görünürlük", 
    "İçerik hissi", "Düşük maliyet", "Organik destek", "Keşif gücü", 
    "Hızlı erişim", "Etkileşim yoğunluğu"
  ],
  snapchat: [
    "Genç kitle", "AR etkileşim", "Dikey deneyim", "Doğal akış", 
    "Düşük rekabet", "Mikro hedefleme", "Lens kullanımı", "Yerel görünürlük", 
    "Trend uyumu", "Organik his"
  ],
  yandex: [
    "Rusya erişimi", "Bölgesel görünürlük", "Yerel hedefleme", "Düşük rekabet", 
    "Alternatif trafik", "Yerel algoritma", "Arama niyeti", "Uygun maliyet", 
    "Pazar avantajı", "Dil uyumu"
  ],
  linkedin: [
    "B2B erişim", "Profesyonel kitle", "Kurumsal algı", "Nitelikli trafik", 
    "Karar vericiler", "Yüksek otorite", "İş ağı", "Lead odaklı", 
    "Sektör hedefleme", "Premium görünürlük"
  ],
  telegram: [
    "Topluluk tabanı", "Doğrudan erişim", "Anlık etkileşim", "Mesaj odaklı", 
    "Organik yayılım", "Grup hedefleme", "Bot entegrasyonu", "Sadık kitle", 
    "Bildirim gücü", "Düşük maliyet"
  ],
  x: [
    "Anlık gündem", "Trend yakalama", "Viral etki", "Hashtag gücü", 
    "Yorum etkileşimi", "Topluluk erişimi", "Diyalog reklamı", "Düşük maliyet", 
    "Gerçek zamanlı", "Kamu algısı"
  ],
  seo: [
    "Organik trafik", "Sürekli görünürlük", "Uzun vadeli", "Maliyet avantajı", 
    "Güven algısı", "Arama otoritesi", "Marka kredisi", "Dijital konumlanma", 
    "Rakip üstünlüğü", "Kalıcı etki"
  ],
  aso: [
    "Organik indirme", "Mağaza görünürlüğü", "Sıralama avantajı", "Düşük maliyet", 
    "Uygulama keşfi", "Kullanıcı güveni", "Dönüşüm artışı", "Uzun vadeli", 
    "Kategori otoritesi", "Trend uyumu"
  ],
  geo: [
    "Yapay görünürlük", "AI sıralaması", "Doğal öneri", "Konuşma tabanlı", 
    "Sorgu hakimiyeti", "Yeni trafik", "Arama evrimi", "Otorite algısı", 
    "Diyalog erişimi", "Yapay tavsiye"
  ],
  reporting: [
    "Veri görünürlüğü", "Anlık analiz", "Hızlı karar", "Performans takibi", 
    "Trend yakalama", "Maliyet kontrolü", "Stratejik içgörü", "Optimize süreç", 
    "Şeffaf yönetim", "Net raporlama"
  ],
  consulting: [
    "Stratejik yön", "Uzman bakış", "Hızlı adaptasyon", "Pazar içgörüsü", 
    "Risk azaltma", "Doğru planlama", "Verimli süreç", "Kaynak optimizasyonu", 
    "Büyüme rehberliği", "Karar desteği"
  ],
  uiux: [
    "Kullanıcı akışı", "Kolay etkileşim", "Hızlı deneyim", "Net yönlendirme", 
    "Dönüşüm artışı", "Görsel uyum", "Marka algısı", "Sezgisel kullanım", 
    "Memnuniyet seviyesi", "Sadakat etkisi"
  ],
};


/* =============== 3. ALAN: JUMPING TEXT GRID =============== */
function JumpingTextGrid({ ac1 = "#7C3AED", ac2 = "#22D3EE", cycleText = [] }) {
  const texts = cycleText.slice(0, 10);
  
  // 3x3 Grid (9 hücre). Metinlerin atlayacağı 4 sabit hücre indeksi:
  const textCellIndices = [1, 3, 5, 7]; 

  const [textIndex, setTextIndex] = useState(0); 
  const [activeCellIndex, setActiveCellIndex] = useState(textCellIndices[0]); 

  useEffect(() => {
    let cellCycleIndex = 0; 

    const interval = setInterval(() => {
      cellCycleIndex = (cellCycleIndex + 1) % textCellIndices.length;
      setActiveCellIndex(textCellIndices[cellCycleIndex]);
      
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [texts.length]);

  // 3x3 Grid için 9 hücre oluşturulur
  const cells = Array.from({ length: 9 }).map((_, i) => {
    const isTextCell = textCellIndices.includes(i); 
    const isActive = i === activeCellIndex; 
    
    // 3x3 için animasyon gecikmesi
    const delay = (i % 3) * 0.18 + Math.floor(i / 3) * 0.12;

    return (
      <div 
        key={i} 
        className={`jtg-cell ${isTextCell ? 'is-potential' : ''} ${isActive ? 'is-active' : ''}`}
        style={{ '--delay': `${delay}s`, '--ac1': ac1, '--ac2': ac2 }}
      >
        {isActive && (
          <span className="jtg-text" key={textIndex}>
            {texts[textIndex] || "Veri Akışı"}
          </span>
        )}
      </div>
    );
  });

  return (
    <div className="media-scene jumping-text-grid" style={{ '--ac1': ac1, '--ac2': ac2 }}>
      <div className="jtg-grid">
        {cells}
      </div>
      {/* Alt boşluğa "FAYDALAR" metni */}
      <div className="jtg-footer-label"></div>
    </div>
  );
}


/* =============== 5. ALAN: INSIGHT DECK =============== */
function InsightDeck({ ac1 = "#7C3AED", ac2 = "#22D3EE" }) {
  return (
    <div className="media-scene insight-deck">
      <div className="id-card">
        <div className="id-line">
          <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="id-line-svg" style={{ color: ac1 }}>
            <path className="id-line-stroke" d="M0,26 L10,22 L20,24 L30,18 L40,19 L50,14 L60,16 L70,12 L80,14 L90,10 L100,12" />
            <linearGradient id="idFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
            </linearGradient>
            <path className="id-line-fill" d="M0,36 L0,26 L10,22 L20,24 L30,18 L40,19 L50,14 L60,16 L70,12 L80,14 L90,10 L100,12 L100,36 Z" />
          </svg>
          <div className="id-line-kpis">
            <div><span>Revenue</span><b>+26%</b></div>
            <div><span>CPA</span><b>-12%</b></div>
            <div><span>CVR</span><b>4.9%</b></div>
          </div>
        </div>

        <div className="id-donut">
          <div className="ring">
            <div className="slice s1" style={{ background: `conic-gradient(from -90deg, ${ac1} 0 44%, transparent 44% 360deg)` }} />
            <div className="slice s2" style={{ background: `conic-gradient(from 68deg, ${ac2} 0 28%, transparent 28% 360deg)` }} />
            <div className="slice s3" style={{ background: `conic-gradient(from 160deg, #7dd3fc 0 18%, transparent 18% 360deg)` }} />
          </div>
          <div className="center">
            <b></b>
            <span></span>
          </div>
          <div className="legend">
            <i><em className="k1" style={{ background: ac1 }} /> Brand</i>
            <i><em className="k2" style={{ background: ac2 }} /> NonBrand</i>
            <i><em className="k3" style={{ background: "#7dd3fc" }} /> Retarget</i>
          </div>
        </div>

        <div className="id-table">
          <div className="row h"><span>Kanal</span><span>Har.</span><span>Gelir</span><span>Δ</span></div>
          <div className="row">
            <span>Search</span><span>₺52K</span><span>₺178K</span>
            <span className="up">+18%</span>
          </div>
          <div className="row">
            <span>Social</span><span>₺38K</span><span>₺96K</span>
            <span className="up">+9%</span>
          </div>
          <div className="row">
            <span>Display</span><span>₺22K</span><span>₺41K</span>
            <span className="down">-4%</span>
          </div>
          {/* Pulse Bar'ı en altta, tablonun içeriğini örtmeyecek şekilde konumlandırıyoruz */}
          <div className="pulse-bar" style={{ background: `linear-gradient(90deg, ${ac1}, ${ac2})` }} />
        </div>
      </div>
    </div>
  );
}

/* =============== Scene Renderer =============== */
function SceneRenderer({ themeKey, ord, ac1, ac2 }) {
  const currentTexts = SERVICE_BENEFITS[themeKey] || SERVICE_BENEFITS.google; 

  if (ord === 1) {
      return <JumpingTextGrid ac1={ac1} ac2={ac2} cycleText={currentTexts} />;
  }
  
  if (ord === 2) {
      return <InsightDeck ac1={ac1} ac2={ac2} />;
  }

  return null;
}

/* =============== Local Styles (3. ve 5. Alanlar İçin Nihai Mobil Uyumu) =============== */
function LocalStyles() {
  return (
    <style>{`
/* ortak */
.pmv56 .why-us-section .why-us-text p{
  white-space: normal; text-align: center; margin-left:auto; margin-right:auto;
  max-width: 68ch; line-height: 1.65;
}

/* MASAÜSTÜ DÜZENİ (960px üzeri) - KORUNUYOR */
.pmv56 .why-us-section .why-us-content {
    display: flex;
    align-items: center;
    gap: 40px; 
}
.pmv56 .why-us-section .why-us-image{
  width:100%;
  max-width:740px; 
  margin-left:auto;
  margin-right:auto;
  position:relative
}

/* Ters Sıralama - KORUNUYOR */
.pmv56 .why-us-section .why-us-content.reverse {
    flex-direction: row-reverse;
}

/* Animasyon Kutu Stili - Ortak Alanlar (MASAÜSTÜ YÜKSEKLİĞİ) */
.pmv56 .media-scene.jumping-text-grid{
  position:relative; 
  height:340px; 
  border-radius:16px; overflow:hidden;
  background:
    radial-gradient(120% 90% at 50% 50%, rgba(148,163,255,.08), transparent 60%),
    linear-gradient(180deg, rgba(14,18,40,.82), rgba(12,16,34,.88));
  border:1px solid rgba(255,255,255,.12);
  box-shadow:0 10px 28px rgba(0,0,0,.32), inset 0 0 0 1px rgba(255,255,255,.04);
  /* İçeriği ortalayan kurallar */
  display:flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items:center; 
  padding: 0; 
}

/* jtg-grid'e hafif bir yukarı kayma veriliyor */
.pmv56 .jumping-text-grid .jtg-grid{
  width: 264px; height: 264px;
  display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(3,1fr); 
  gap:12px; box-sizing: content-box; position:relative;
  margin-top: 10px; 
}

.pmv56 .jumping-text-grid .jtg-cell{
  position:relative; border-radius:8px; opacity:.3;
  background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08);
  box-shadow:0 0 4px rgba(0,0,0,.15);
  display:flex; justify-content:center; align-items:center; 
  height: 80px; min-height: 80px; overflow:hidden; 
  animation: jtgPulse 2.8s ease-in-out infinite var(--delay);
}
.pmv56 .jumping-text-grid .jtg-cell.is-potential{ opacity: .4; border:1px solid rgba(255,255,255,.15); }
.pmv56 .jumping-text-grid .jtg-cell.is-active{
    opacity: 1;
    background:linear-gradient(135deg, var(--ac1), var(--ac2));
    box-shadow:0 4px 12px rgba(0,0,0,.4), 0 0 20px rgba(255,255,255,.1);
    animation: jtgActivePulse 3s ease-in-out infinite;
}
.pmv56 .jumping-text-grid .jtg-text{
  display:block; font:700 14px/1.3 Inter; color:#fff; text-align:center;
  padding: 0 4px; max-width: 100%; word-break: break-word;
  animation: jtgFadeIn 0.5s ease-out forwards, jtgFadeOut 0.5s ease-in 2.5s forwards; 
}
@keyframes jtgFadeIn { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes jtgFadeOut { to { opacity: 0; transform: scale(0.9) translateY(-10px); } }
@keyframes jtgPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
@keyframes jtgActivePulse { 0%, 100% { box-shadow:0 4px 12px rgba(0,0,0,.4), 0 0 10px var(--ac1); } 50% { box-shadow:0 4px 16px rgba(0,0,0,.5), 0 0 24px var(--ac2); } }

/* YENİ STİL: FAYDALAR metin etiketi */
.pmv56 .jumping-text-grid .jtg-footer-label{
    margin-top: auto; 
    margin-bottom: 20px; 
    color: rgba(255,255,255,.45);
    font: 600 11px/1.1 Inter;
    letter-spacing: .12em;
    text-transform: uppercase;
    z-index: 10;
}


/* ===== 5. ALAN - INSIGHT DECK (MASAÜSTÜ) ===== */
.pmv56 .media-scene.insight-deck{
  position:relative; border-radius:16px; padding:14px;
  background:linear-gradient(180deg, rgba(16,22,45,.92), rgba(14,18,34,.92));
  border:1px solid rgba(255,255,255,.12); box-shadow:0 10px 28px rgba(0,0,0,.34);
}
.pmv56 .media-scene.insight-deck .id-card{
  display:grid; grid-template-columns: 1.1fr .9fr; grid-template-rows:auto;
  gap:12px; align-items:stretch;
}
.pmv56 .id-line{ grid-column:1/3; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12);
  border-radius:12px; padding:10px; position:relative; overflow:hidden; }
.pmv56 .id-line-svg{ width:100%; height:120px; }
.pmv56 .id-line-stroke{
  fill:none; stroke: currentColor; stroke-width:1.6;
  stroke-dasharray: 240; stroke-dashoffset: 240;
  animation: idDraw 2.2s ease-out forwards, idBreathe 3.6s ease-in-out infinite 2.2s;
}
.pmv56 .id-line-fill{ fill: url(#idFill); }
@keyframes idDraw{ to{ stroke-dashoffset: 0 } }
@keyframes idBreathe{ 0%,100%{ opacity:.22 } 50%{ opacity:.36 } }
.pmv56 .id-line-kpis{ position:absolute; left:10px; right:10px; bottom:8px; display:flex; gap:10px; justify-content:space-between; }
.pmv56 .id-line-kpis div{ background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12);
  padding:8px 10px; border-radius:10px; color:#eaf2ff; font:700 12px/1.1 Inter; }
.pmv56 .id-line-kpis span{ display:block; opacity:.8; font-weight:700; font-size:11px }
.pmv56 .id-line-kpis b{ font-size:14px }

.pmv56 .id-donut{ background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12);
  border-radius:12px; padding:12px; display:grid; grid-template-columns:120px 1fr; gap:10px; align-items:center; }
.pmv56 .id-donut .ring{ position:relative; width:110px; height:110px; border-radius:999px; display:grid; place-items:center;
  background: radial-gradient(circle at 50% 50%, #0b1020 46%, transparent 47% 100%); }
.pmv56 .id-donut .slice{ position:absolute; inset:0; border-radius:999px; mask: radial-gradient(circle at 50% 50%, transparent 0 46%, black 47%); }
.pmv56 .id-donut .center{ position:absolute; inset:0; display:grid; place-items:center; color:#eaf2ff }
.pmv56 .id-donut .center b{ font:900 12px/1 Inter; opacity:.85 }
.pmv56 .id-donut .center span{ font:900 18px/1.1 Inter }
.pmv56 .id-donut .legend i{ display:flex; align-items:center; gap:8px; font:700 11.5px/1.1 Inter; color:#d7e2ff; margin:4px 0 }
.pmv56 .id-donut .legend em{ display:inline-block; width:10px; height:10px; border-radius:3px; }

.pmv56 .id-table{ background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12);
  border-radius:12px; padding:12px; display:grid; gap:6px; color:#eaf2ff; position:relative; overflow:hidden; }
.pmv56 .id-table .row{ display:grid; grid-template-columns:1.3fr .7fr .7fr .5fr; gap:8px; align-items:center; font:700 12px/1.2 Inter; }
.pmv56 .id-table .row.h{ opacity:.85 }
.pmv56 .id-table .row .up{ color:#86efac } .pmv56 .id-table .row .down{ color:#fda4af }
.pmv56 .id-table .pulse-bar{ position:absolute; left:10px; right:10px; bottom:10px; height:6px; border-radius:8px;
  transform-origin:left center; animation: idPulse 1.6s ease-in-out infinite; }
@keyframes idPulse{ 0%,100%{ transform: scaleX(.82)} 50%{ transform: scaleX(1)} }

/* metrik kutuları */
.pmv56 .why-us-section .metric-row{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));
  gap:10px;margin-top:14px
}
.pmv56 .why-us-section .metric{
  padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.03);
  border:1px solid rgba(148,163,255,.12); color:#fff
}
.pmv56 .why-us-section .metric h4{font-size:11.5px;margin:0 0 4px;opacity:.85;text-transform:uppercase;letter-spacing:.02em}
.pmv56 .why-us-section .metric strong{font-size:18px;line-height:1.1}


/* ======================================================= */
/* MOBİL UYUMLULUK (960px altı) - NIHAI DÜZELTMELER */
/* ======================================================= */
@media (max-width: 960px){
  /* Ana içerik düzenini DİKEY YAP ve ORTALA */
  .pmv56 .why-us-section .why-us-content{ 
    flex-direction: column !important; 
    align-items: center !important; 
    gap: 30px; 
  }
  .pmv56 .why-us-content.reverse { 
    flex-direction: column !important; 
  }
  .pmv56 .why-us-section .why-us-text h2,
  .pmv56 .why-us-section .why-us-text p {
    text-align: center; 
  }

  /* ------------------------------------------------------------------ */
  /* 3. ALAN: JUMPING TEXT GRID - BOŞLUK SORUNU GİDERİLDİ */
  /* ------------------------------------------------------------------ */
  .pmv56 .media-scene.jumping-text-grid {
      height: 280px !important; /* Yüksekliği daha da düşürerek boşluğu azalttık */
      max-width: 320px; 
      margin: 0 auto; 
      justify-content: flex-start !important; /* Grid'i üste hizala */
      padding-top: 20px; /* Üstten boşluk ver */
  }
  .pmv56 .jumping-text-grid .jtg-grid {
    margin-top: 0 !important; /* Fazla boşluğu kaldır */
  }
  .pmv56 .jumping-text-grid .jtg-footer-label{
      margin-top: 10px !important; /* FAYDALAR etiketini yukarı çek */
      margin-bottom: 0 !important;
  }
  
  /* ------------------------------------------------------------------ */
  /* 5. ALAN: INSIGHT DECK - SAYI SIĞMAMA ve PULSE BAR SORUNU GİDERİLDİ */
  /* ------------------------------------------------------------------ */
  .pmv56 .media-scene.insight-deck .id-card{ grid-template-columns:1fr !important; }
  .pmv56 .media-scene.insight-deck {
      max-width: 320px !important; 
      margin: 0 auto;
      padding: 8px !important; 
  }

  /* KPI metinlerini ve kutularını küçültme */
  .pmv56 .id-line-kpis {
      gap: 4px !important; 
      bottom: 4px !important; 
      left: 6px !important;
      right: 6px !important;
  }
  .pmv56 .id-line-kpis div {
      padding: 5px 6px !important; 
      font-size: 10px !important; 
  }
  .pmv56 .id-line-kpis span {
      font-size: 8px !important; 
  }
  .pmv56 .id-line-kpis b {
      font-size: 12px !important; 
  }

  /* Tablo sütunlarını daraltma */
  .pmv56 .id-table {
      padding: 8px !important; 
      gap: 4px !important; 
  }
  .pmv56 .id-table .row { 
      /* Sütun oranları güncellendi (Kanal, Har., Gelir, Delta) */
      grid-template-columns: 1.4fr .7fr .7fr .4fr !important; /* Delta (Δ) biraz daha daraldı */
      font-size: 9.5px !important; 
      gap: 3px !important; 
  }
  .pmv56 .id-table .row.h {
    font-size: 10px !important; 
  }
  .pmv56 .id-table .row span {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
  }
  .pmv56 .id-table .row span:nth-child(2), /* Har. */
  .pmv56 .id-table .row span:nth-child(3), /* Gelir */
  .pmv56 .id-table .row span:nth-child(4) { /* Δ */
    text-align: right !important; 
    padding-left: 0px; /* Boşluğu tamamen kaldırdık */
  }

  /* PULSE BAR'ın tablonun içeriğini örtmesini engelleme */
  .pmv56 .id-table .pulse-bar{ 
      bottom: 4px !important; /* Konumunu en alta sabitledik */
      height: 4px !important; /* Yüksekliğini daha da azalttık */
      left: 6px !important; 
      right: 6px !important;
  }
  
  /* Donut ve açıklamaları küçültme */
  .pmv56 .id-donut {
      grid-template-columns: 80px 1fr !important; 
      gap: 6px !important;
      padding: 8px !important;
  }
  .pmv56 .id-donut .ring {
      width: 70px !important; 
      height: 70px !important;
      background: radial-gradient(circle at 50% 50%, #0b1020 40%, transparent 41% 100%) !important;
  }
  /* ROAS Metin Konumlandırması Düzeltildi */
  .pmv56 .id-donut .center {
    /* Absolute konumlama ile merkeze oturt */
    position: absolute !important;
    top: 50% !important;
    left: 40px !important; /* Donutun merkezi */
    transform: translate(-50%, -50%) !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    z-index: 10;
  }
  .pmv56 .id-donut .center b {
      font-size: 10px !important; 
      margin-bottom: 0px !important; /* Alt boşluk azaltıldı */
  }
  .pmv56 .id-donut .center span {
      font-size: 13px !important; 
      line-height: 1;
  }
  .pmv56 .id-donut .legend i {
      font-size: 9px !important; 
      margin: 2px 0 !important;
      gap: 5px !important;
  }
  .pmv56 .id-donut .legend em {
      width: 8px !important;
      height: 8px !important;
  }

  /* Grafik SVG yüksekliğini azalt */
  .pmv56 .id-line-svg {
    height: 90px !important; 
  }
}
`}</style>
  );
}

/* =============== Component (Aynı) =============== */
export default function SectionMedia({
  title,
  body,
  themeKey = "google",
  side = "left",
  metrics = [],
  ord,
}) {
  const theme = SERVICE_THEMES[themeKey] || {};
  const imageLeft = side === "left"; 
  const [showMore, setShowMore] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const eligible = ord === 1 || ord === 2;
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 960px)").matches;

    const check = () => {
      if (!eligible || !isMobile || !bodyRef.current) { setShowMore(false); return; }
      const el = bodyRef.current;
      setShowMore(el.scrollHeight > 250);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [ord]);

  return (
    <section className="pmv56 why-us-section" data-ord={ord || undefined}>
      <LocalStyles />
      <div className="container">
        <div className={`why-us-content ${imageLeft ? "reverse" : ""}`}>
          
          {/* Metin içeriği */}
          <div className="why-us-text reveal">
              <h2>{title}</h2>
              {body && (
                <MultiP ref={bodyRef} className="lede" text={body} />
              )}
              {!!metrics.length && (
                <a className="btn ghost" href="#contact" style={{ color:"#fff", borderColor:"rgba(255,255,255,.3)", marginTop:8 }}>
                  Detaylı Bilgi Alın
                </a>
              )}
          </div>
          
          {/* Animasyonlu Görsel */}
          <div className="why-us-image reveal" style={{ transitionDelay: ".12s" }}>
            <SceneRenderer
              ord={ord}
              themeKey={themeKey} 
              ac1={theme.accents?.[0]}
              ac2={theme.accents?.[1]}
            />
            <div className="metric-row">
              {(metrics.length ? metrics : []).slice(0,3).map((m,i)=>(
                <div className="metric" key={i}>
                  <h4>{m.label}</h4>
                  <strong>{m.value}</strong>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}