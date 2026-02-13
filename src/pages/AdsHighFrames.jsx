import BeforeAfter from "../components/BeforeAfter";
export default function AdsHighFrames() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              AdsHigh <span className="text-blue-600">Frames</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Sorun</a>
            <a href="#solution" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Çözüm</a>
            <a href="#howit" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Nasıl Çalışır?</a>
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Özellikler</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 animate-fade-in-up stagger-1">
                Ürün Feed'lerinden <span className="gradient-text">Otomatik Performans Kreatifleri</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up stagger-2 max-w-xl">
                AdsHigh Frames, e-commerce katalog reklam feed'lerinizi markanıza uygun, dinamik görsellere dönüştürür.
                Fiyat ve indirim değişiklikleri otomatik güncellenir, tasarım hiç yapmanız gerekmez.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-3 pt-4">
                <a
                  href="#solution"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Demo Gör
                </a>
                <a
                  href="#howit"
                  className="px-8 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  Nasıl Çalışır?
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4 animate-fade-in-up stagger-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold">E</div>
                  <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold">R</div>
                  <div className="w-10 h-10 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white text-sm font-bold">L</div>
                </div>
                <p className="text-sm text-gray-600">500+ marka tarafından güveniliyor</p>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative h-96 lg:h-auto animate-slide-in-right stagger-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl opacity-40" />
              <div className="relative h-full flex items-center justify-center">
                <div className="absolute top-8 left-8 w-40 bg-white rounded-2xl shadow-2xl p-3 animate-subtle-float" style={{ animationDelay: "0s" }}>
                  <div className="product-frame mb-3">👟</div>
                  <p className="text-xs font-semibold text-gray-900">Premium Spor Ayakkabı</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">₺1.299</span>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-bold">-40%</span>
                  </div>
                </div>

                <div className="absolute bottom-12 right-8 w-40 bg-white rounded-2xl shadow-2xl p-3 animate-subtle-float" style={{ animationDelay: "1s" }}>
                  <div className="product-frame mb-3">👜</div>
                  <p className="text-xs font-semibold text-gray-900">Deri Çanta</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">₺2.499</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">YENİ</span>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 bg-white rounded-2xl shadow-2xl p-4 animate-subtle-float" style={{ animationDelay: "0.5s" }}>
                  <div className="product-frame mb-3">⌚</div>
                  <p className="text-xs font-semibold text-gray-900">Akıllı Saat</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">₺3.999</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">-25%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up stagger-1">
              Katalog Reklamlarının Gerçek Sorunu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl animate-fade-in-up stagger-2">
              Performans ekipleri hız ve ölçek arasında sıkışıp kalıyor. Feed değişiyor ama görseller statik kalıyor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              ["⏱️", "Manuel İş Yükü", "Her ürün güncellemesi için tasarımcılar manuel olarak görselleri düzenlemek zorunda. Binlerce ürün varsa bu imkansız hale geliyor."],
              ["🔄", "Eski Veriler", "Feed'deki fiyat ve indirim değişiklikleri görsellere yansımıyor. Müşteriler yanlış fiyatlarla karşılaşıyor, dönüşüm düşüyor."],
              ["🎨", "Marka Tutarsızlığı", "Katalog reklamlarında tutarlı bir tasarım ve marka kimliği sağlamak zor. Görseller farklı standartlarla yapılmış gibi görünüyor."],
              ["📉", "Düşük Performans", "Genel, tasarımı uygun olmayan görseller düşük tıklama oranı ve dönüşüm ile sonuçlanıyor. ROAS hedefine ulaşılamıyor."],
            ].map(([ic, t, d], i) => (
              <div key={t} className={`p-8 border border-red-200 bg-red-50 rounded-2xl animate-fade-in-up card-hover stagger-${Math.min(i + 3, 6)}`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{ic}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t}</h3>
                    <p className="text-gray-700">{d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className="w-full py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up stagger-1">
              AdsHigh Frames Çözümü
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl animate-fade-in-up stagger-2">
              Feed bağlayın, tasarım şablonu seçin, otomatik performans kreatifleri alın. Ölçeklenebilir, tutarlı, daima güncelli.
            </p><div className="mt-14">
<div className="max-w-7xl mx-auto px-6">
  <BeforeAfter />
</div>
</div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left stagger-3">
              <SolItem title="Gerçek Zamanlı Güncellemeler" desc="Feed'inizdeki fiyat, stok ve indirim değişiklikleri otomatik olarak görsellere yansır. Manuel müdahale yok." />
              <SolItem title="Marka Uyumlu Tasarım" desc="Logo, renk, yazı tipi ve tasarım standartlarınız ile uyumlu şablonlar. Tüm görseller aynı kalitede görünür." />
              <SolItem title="Performans Odaklı Tasarım" desc="Yüksek CTR ve dönüşüm için test edilmiş layout'lar. Ürün görseli, fiyat ve CTA optimal konumlandırılmış." />
              <SolItem title="Ölçeklenebilir Yapı" desc="10 ürün olsun, 100.000 ürün olsun. Sistem tüm katalog için otomatik olarak görseller üretir." />
            </div>

            <div className="relative h-96 animate-slide-in-right stagger-4">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl" />
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="space-y-4 w-full max-w-sm">
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-gray-600">Feed Durumu</p>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">12.847 ürün</p>
                    <p className="text-xs text-gray-500 mt-1">Son güncelleme: 2 dakika önce</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Üretilen Görseller</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Başarılı</span>
                        <span className="font-bold text-gray-900">12.847</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Ortalama CTR</p>
                    <p className="text-3xl font-bold text-blue-600">+3.2%</p>
                    <p className="text-xs text-gray-500 mt-1">vs. Standart Feed Görselleri</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="howit" className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up stagger-1">
              Adım Adım Nasıl Çalışır?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-2">
              Kurulum hızlı. Sonuçlar hemen görülür. Sistem arka planda çalışırken siz kampanyas kuruyorsunuz.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <HowStep n="1" title="Feed'i Bağlayın" desc="Ürün feed'inizi (XML, CSV veya Google Merchant Center) AdsHigh Frames'e bağlayın. Tek bir entegrasyon, herhangi bir ek yazılım gerekmez." />
            <HowStep n="2" title="Tasarım Şablonunu Seçin" desc="Marka kimliğinize uygun, performans odaklı tasarım şablonlarından seçim yapın. Renk, logo, yazı tipi otomatik uyarlanır." />
            <HowStep n="3" title="Otomatik Üretim Başlasın" desc="AdsHigh Frames tüm ürünler için görselleri otomatik olarak üretir. Fiyat, indirim, stok durumu dinamik olarak eklenir." />
            <HowStep n="4" title="Reklam Platformlarında Yayınla" desc="Görselleri Meta, Google, Pinterest veya katalog reklamlarınıza ekleyin. Sistem feed güncellemesini otomatik takip eder, görseller her zaman canlı kalır." />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="w-full py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up stagger-1">Ana Özellikler</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up stagger-2">Performans pazarlama ekipleri için gerekli olan her şey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard title="Dinamik Fiyat Güncelleme" desc="Feed'deki fiyat değişiklikleri anında görsellere yansır. İndirim oranları otomatik hesaplanır ve görsel olarak vurgulanır." i={3} />
            <FeatureCard title="Marka Uyumlu Layout" desc="Logo, renk paleti ve tipografınız otomatik olarak her ürün görseline uyarlanır. Katalog boyunca tutarlılık sağlanır." i={4} />
            <FeatureCard title="Performans Optimizasyonu" desc="A/B test edilmiş layout'lar, yüksek CTR için dizayn edilmiş ürün pozisyonları. Optimal görsel hiyerarşi otomatik uygulanır." i={5} />
            <FeatureCard title="Ölçeklenebilir Sistem" desc="Küçük katalogdan dev marketplace'lere kadar. 1 ürün olsun, 100.000 olsun, sistem aynı hızda ve kalitede çalışır." i={6} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 lg:py-28 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in-up stagger-1">
            Katalog Reklamlarınızı Performansa Dönüştürün
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            AdsHigh Frames ile ürün feed'leriniz otomatik olarak yüksek performanslı reklamlar haline gelir. Hızlı, tutarlı, ölçeklenebilir.
          </p>
          <a
            href="#problem"
            className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in-up stagger-3 hover:scale-105"
          >
            Ücretsiz Demo Talep Et
          </a>
          <p className="text-blue-100 text-sm mt-4 animate-fade-in-up stagger-4">
            Demo talep etmek için kredi kartınıza ihtiyaç yok. İletişime geçin ve nasıl çalıştığını görün.
          </p>
        </div>
      </section>
    </div>
  );
}

function SolItem({ title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

function HowStep({ n, title, desc }) {
  return (
    <div className="flex gap-8 items-start animate-fade-in-up">
      <div className="step-number flex-shrink-0">{n}</div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-lg">{desc}</p>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc, i }) {
  return (
    <div className={`p-6 bg-white rounded-xl border border-gray-200 card-hover animate-fade-in-up stagger-${i}`}>
      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}