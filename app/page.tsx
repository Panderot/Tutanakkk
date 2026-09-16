import Link from "next/link";

const FEATURES = [
  { t: "Sesten metne", d: "Kaydı yükle; konuşmalar dakikalar içinde tam bir transkripte döner. Telefonla alınan kayıt ya da ekran görüşmesi dışa aktarımı da olur." },
  { t: "Otomatik özet", d: "Kırk dakikalık toplantı iki paragrafa iner. Kim ne dedi değil; ne konuşuldu ve nereye varıldı, sade bir dille." },
  { t: "Kararlar ayrı çıkar", d: "Toplantıda alınan kararlar tek bir listeye ayrılır. Aylar sonra bile ‘ne karar vermiştik’ sorusu ortadan kalkar." },
  { t: "Aksiyon maddeleri, kişi + tarih", d: "Her yapılacak iş sorumlusuna ve varsa tarihine bağlanır. Kimin neyi ne zamana kadar yapacağı net görünür." },
  { t: "Arama ve geçmiş", d: "Tüm toplantıların tek arşivde toplanır. ‘Fiyat’ yaz, geçen ayki kararı saniyeler içinde bul." },
  { t: "Dışa aktar ve paylaş", d: "Tek tıkla kopyala; e-postaya, WhatsApp’a ya da Notion’a yapıştır. Tutanak ekibe dakikalar içinde ulaşsın." },
];

const OUTPUT = [
  { t: "Özet", d: "Toplantının iki paragraflık özeti. Ne konuşuldu, nereye varıldı.", ornek: "Q3 bütçe ve zamanlama konuşuldu; ağırlık performans reklamlarına verildi." },
  { t: "Kararlar", d: "Alınan kararlar madde madde, aranabilir bir listede.", ornek: "✓ Bütçenin %70’i Meta reklamlarına" },
  { t: "Aksiyonlar", d: "Her yapılacak iş, sorumlusu ve tarihiyle birlikte.", ornek: "Elif · Teklifi cumaya kadar gönder" },
  { t: "Katılımcılar ve tarih", d: "Kim vardı, toplantı ne zamandı; tutanağın başında hazır.", ornek: "3 katılımcı · 27 Tem 14:00" },
];

const USES = [
  { t: "Ajans toplantıları", d: "Müşteriyle konuşulan her şey kayıt altında. Brief kaçmaz, revizyon kararı unutulmaz." },
  { t: "Danışmanlık görüşmeleri", d: "Her seansın özeti ve aksiyonları dosyada. Bir sonraki görüşmeye hazırlıklı gir." },
  { t: "Hukuk ve müvekkil", d: "Müvekkil görüşmelerinin özeti ve verilen sözler net kayıtta. Kayıt için onay şarttır." },
  { t: "Yönetim toplantıları", d: "Haftalık toplantının kararları ve sorumluları tek sayfada. Takip listesiyle bir sonrakine gel." },
];

const FAQ = [
  { q: "Kayıt için izin gerekiyor mu?", a: "Evet. Bir toplantıyı kaydetmeden önce tüm katılımcıların onayını al; yerel mevzuata uymak senin sorumluluğunda. Tutanak bu izni senin yerine almaz." },
  { q: "Hangi ses dosyalarını yükleyebilirim?", a: "mp3, m4a ve wav çalışır. Telefonla alınan kayıt ya da bir görüntülü görüşmenin ses dışa aktarımı da olur; özel bir cihaz gerekmez." },
  { q: "Transkript hangi dilde çıkar?", a: "Varsayılan Türkçe. Toplantı başka bir dildeyse dosyayı yüklerken dili seçebilirsin; özet ve kararlar da o dile göre hazırlanır." },
  { q: "Aksiyonları kişilere nasıl bağlıyor?", a: "Konuşmada geçen isimlere ve verilen sözlere bakarak her yapılacak işi sorumlusuna ve varsa tarihine bağlar. Çıktıyı düzenleyip son halini kendin verebilirsin." },
  { q: "Kayıtlarım saklanıyor mu, kart gerekiyor mu?", a: "Deneme planında kart gerekmez ve toplantılar işlendikten sonra tutulmaz. Ekip planında arşiv ve arama için sende saklanır; istediğin an silebilirsin." },
];

function Waveform({ className = "" }: { className?: string }) {
  const bars = [10, 22, 38, 18, 48, 30, 56, 24, 40, 16, 46, 28, 58, 20, 34, 44, 14, 50, 26, 38, 12, 46, 24, 54, 18, 32];
  return (
    <div aria-hidden="true" className={`flex items-center gap-[3px] ${className}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[3px] shrink-0 rounded-full"
          style={{ height: `${h}px`, background: i % 3 === 0 ? "var(--hi)" : "var(--accent)", opacity: 0.4 + h / 140 }}
        />
      ))}
    </div>
  );
}

function TutanakCard({ className = "" }: { className?: string }) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Toplantı tutanağı</p>
        <span className="text-xs text-[var(--muted)] tabular-nums">27 Tem · 14:00</span>
      </div>
      <div className="mt-3 rounded-xl bg-[var(--accent)]/5 p-4">
        <p className="text-sm leading-relaxed">
          Q3 kampanya bütçesi ve zamanlaması konuşuldu. Ağırlık performans reklamlarına verildi, influencer ayağı bir sonraki döneme bırakıldı.
        </p>
      </div>
      <p className="font-display mt-5 text-sm font-bold">Kararlar</p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {["Bütçenin %70’i Meta reklamlarına ayrıldı", "Influencer ayağı Ekim’e ertelendi"].map((k) => (
          <li key={k} className="flex items-start gap-2"><span aria-hidden="true" className="mt-0.5 text-[var(--hi)]">✓</span>{k}</li>
        ))}
      </ul>
      <p className="font-display mt-5 text-sm font-bold">Aksiyonlar</p>
      <div className="mt-2 space-y-2">
        {[["E", "Elif", "Teklifi cuma gününe kadar gönder", "Cuma"],
          ["M", "Murat", "Bütçe tablosunu güncelle", "Pzt"]].map(([ilk, ad, is, ne]) => (
          <div key={ad} className="flex items-center gap-3 rounded-xl border border-[var(--line)] p-3">
            <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">{ilk}</span>
            <p className="text-sm"><b>{ad}</b> · {is}</p>
            <span className="ml-auto shrink-0 rounded-full bg-[var(--hi)]/15 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[var(--accent)]">{ne}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <main>
      {/* NAV */}
      <nav className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-2xl font-bold">Tutanak<span className="text-[var(--hi)]">.</span></span>
          <div className="hidden items-center gap-7 text-sm text-[var(--muted)] md:flex">
            <a href="#ornek" className="transition hover:text-[var(--ink)] focus-visible:text-[var(--ink)]">Örnek</a>
            <a href="#ozellikler" className="transition hover:text-[var(--ink)] focus-visible:text-[var(--ink)]">Özellikler</a>
            <a href="#nasil" className="transition hover:text-[var(--ink)] focus-visible:text-[var(--ink)]">Nasıl çalışır</a>
            <a href="#fiyat" className="transition hover:text-[var(--ink)] focus-visible:text-[var(--ink)]">Fiyat</a>
          </div>
          <Link href="/app" className="btn !px-5 !py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2">Kaydı yükle</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">AI toplantı notu</p>
          <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] text-balance md:text-6xl">Toplantıyı yükle, karar ve aksiyonları hazır al.</h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
            Ses kaydını bırak; Tutanak transkripti çıkarır, özetler ve kararları ayırır, her aksiyonu
            <b className="text-[var(--ink)]"> kişiye ve tarihe</b> bağlar. “Ne karar vermiştik?” devri biter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/app" className="btn focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2">Ücretsiz dene → ayda 3 toplantı</Link>
            <a href="#nasil" className="btn btn-ghost">Nasıl çalışıyor?</a>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--muted)]">
            <span>✓ Kart gerekmez</span><span>✓ mp3, m4a, wav</span><span>✓ Kayıt için katılımcı onayı</span>
          </p>
        </div>

        <div>
          <div className="card mb-3 flex items-center gap-3 p-3">
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-base text-white">🎙️</span>
            <span className="shrink-0 text-sm font-semibold">ekip-toplantisi.m4a</span>
            <Waveform className="h-12 flex-1 overflow-hidden justify-center" />
            <span className="shrink-0 text-xs text-[var(--muted)] tabular-nums">48:12</span>
          </div>
          <TutanakCard />
        </div>
      </section>

      {/* CONTEXT STRIP */}
      <section className="border-y border-[var(--line)] bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-6 py-5 text-sm font-medium text-[var(--muted)]">
          <span className="text-[11px] uppercase tracking-widest">Kimler kullanıyor</span>
          <span>Ajans</span><span aria-hidden="true">·</span><span>Danışman</span><span aria-hidden="true">·</span><span>Avukat</span><span aria-hidden="true">·</span><span>Yönetim</span><span aria-hidden="true">·</span><span>Satış</span>
        </div>
      </section>

      {/* ÖRNEK / BEFORE-AFTER SHOWCASE */}
      <section id="ornek" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Örnek</p>
            <h2 className="font-display mt-3 text-4xl font-bold leading-tight text-balance md:text-5xl">Dağınık konuşmadan, düzenli tutanağa.</h2>
            <p className="mt-5 text-lg text-[var(--muted)]">
              Toplantıda kimse tam not tutamaz; herkes konuşurken kayıt akıp gider. Tutanak o ham konuşmayı alır,
              özete indirir, kararları ayırır ve her işi sahibine bağlar. Solda ham kayıt, sağda üç dakika sonrası.
            </p>
            <ul className="mt-6 space-y-3">
              {["Ham transkript otomatik çıkar", "Kararlar konuşmadan ayrılır", "Aksiyonlar kişiye ve tarihe bağlanır"].map((x) => (
                <li key={x} className="flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white">✓</span>{x}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4">
            <div className="card p-5">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)]">Ham kayıt</span>
                <Waveform className="h-8 flex-1 overflow-hidden" />
              </div>
              <p className="mt-3 text-sm italic leading-relaxed text-[var(--muted)]">
                “…bence bütçenin çoğunu performansa koyalım, Elif teklifi cumaya yetiştirir misin, tamam hallederim,
                influencer işini şimdilik bırakalım Ekim’de bakarız, Murat da bütçe tablosunu güncellesin…”
              </p>
            </div>
            <div aria-hidden="true" className="flex justify-center text-[var(--hi)]">↓</div>
            <TutanakCard />
          </div>
        </div>
      </section>

      {/* TUTANAĞIN ANATOMİSİ */}
      <section className="border-y border-[var(--line)] bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Çıktıda ne var</p>
            <h2 className="font-display mt-3 text-4xl font-bold text-balance md:text-5xl">Her tutanakta dört bölüm</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">Tek yüklemeden okunur bir toplantı özeti; her seferinde aynı, tanıdık düzende.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OUTPUT.map((o) => (
              <div key={o.t} className="card p-6">
                <span className="inline-block rounded-full bg-[var(--hi)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{o.t}</span>
                <p className="mt-4 text-[var(--muted)]">{o.d}</p>
                <p className="mt-4 rounded-lg bg-[var(--accent)]/5 px-3 py-2 text-sm text-[var(--ink)]">{o.ornek}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section id="ozellikler" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Özellikler</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-balance md:text-5xl">Not tutmayı bırak, toplantıya odaklan</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div key={f.t} className="card p-7">
              <span className="font-display text-2xl font-bold tabular-nums text-[var(--hi)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-3 text-xl font-bold">{f.t}</h3>
              <p className="mt-2 text-[var(--muted)]">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section id="nasil" className="border-y border-[var(--line)] bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Nasıl çalışır</p>
            <h2 className="font-display mt-3 text-4xl font-bold text-balance md:text-5xl">Üç adım, üç dakika</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {[["1", "Kaydet", "Toplantıyı telefon ya da bilgisayarla kaydet; görüntülü görüşme de olur."],
              ["2", "Yükle", "Ses dosyasını sürükle; transkript ve tutanak otomatik hazırlanır."],
              ["3", "Al ve paylaş", "Özet, kararlar ve aksiyonlar hazır. Tek tıkla kopyala, ekibe gönder."]].map(([n, t, d]) => (
              <div key={n} className="card p-7">
                <span aria-hidden="true" className="font-display grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-lg font-bold text-white">{n}</span>
                <h3 className="font-display mt-4 text-xl font-bold">{t}</h3>
                <p className="mt-2 text-[var(--muted)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KULLANIM ALANLARI */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Kullanım alanları</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-balance md:text-5xl">Konuşulanın kayıt altında kalması gereken her toplantı</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USES.map((u) => (
            <div key={u.t} className="card p-7">
              <h3 className="font-display text-xl font-bold">{u.t}</h3>
              <p className="mt-2 text-[var(--muted)]">{u.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KARŞILAŞTIRMA */}
      <section className="border-y border-[var(--line)] bg-white/60">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Karşılaştırma</p>
            <h2 className="font-display mt-3 text-4xl font-bold text-balance md:text-5xl">Elle not tutmak yerine Tutanak</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="card p-7">
              <h3 className="font-semibold text-[var(--muted)]">Elle not tutmak</h3>
              <ul className="mt-4 space-y-3 text-[var(--muted)]">
                <li>Konuşurken not, ikisi de yarım kalır</li>
                <li>Kararlar dağınık, sonra kimse bulamaz</li>
                <li>Aksiyon kime kaldı belirsiz</li>
                <li>Toplantı bitince not çoğu zaman hiç yazılmaz</li>
              </ul>
            </div>
            <div className="card border-[var(--accent)] p-7">
              <h3 className="font-semibold text-[var(--accent)]">Tutanak</h3>
              <ul className="mt-4 space-y-3">
                <li>Sen toplantıya odaklan, notu o tutar</li>
                <li>Kararlar ayrı listede, aranabilir</li>
                <li>Her aksiyon kişiye ve tarihe bağlı</li>
                <li>Bitince özet ve aksiyonlar dakikalar içinde hazır</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FİYAT */}
      <section id="fiyat" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Fiyat</p>
          <h2 className="font-display mt-3 text-4xl font-bold text-balance md:text-5xl">Basit, kartsız başlar</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
          <div className="card p-8">
            <h3 className="font-semibold">Deneme</h3>
            <p className="font-display mt-2 text-4xl font-bold tabular-nums">0 TL</p>
            <ul className="mt-5 space-y-2.5 text-[var(--muted)]">
              <li>✓ Ayda 3 toplantı</li>
              <li>✓ Özet + kararlar + aksiyonlar</li>
              <li>✓ Kart gerekmez</li>
              <li className="opacity-60">✗ Arşiv ve toplantılar arası arama</li>
            </ul>
            <Link href="/app" className="btn btn-ghost mt-6 w-full focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2">Ücretsiz dene</Link>
          </div>
          <div className="card relative border-[var(--accent)] p-8 shadow-[0_24px_60px_-40px_rgba(58,80,104,.55)]">
            <span className="absolute -top-3 right-6 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">EN SEVİLEN</span>
            <h3 className="font-semibold">Ekip</h3>
            <p className="font-display mt-2 text-4xl font-bold tabular-nums">199 TL<span className="text-base font-normal text-[var(--muted)]">/ay</span></p>
            <ul className="mt-5 space-y-2.5">
              <li>✓ Sınırsız toplantı</li>
              <li>✓ Arşiv + toplantılar arası arama</li>
              <li>✓ Aksiyon hatırlatmaları</li>
              <li>✓ Tek tıkla dışa aktar</li>
            </ul>
            <Link href="/app" className="btn mt-6 w-full focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2">Hemen başla</Link>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="border-t border-[var(--line)] bg-white/60">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">SSS</p>
            <h2 className="font-display mt-3 text-4xl font-bold text-balance md:text-5xl">Sık sorulanlar</h2>
          </div>
          <div className="mt-10 divide-y divide-[var(--line)]">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold focus-visible:text-[var(--accent)]">
                  {f.q}
                  <span aria-hidden="true" className="text-[var(--muted)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[var(--muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SON CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">Bir sonraki toplantının<br />notunu sen tutma.</h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-[var(--muted)]">İlk üç toplantı ücretsiz, kart gerekmez. Kayıttan önce katılımcı onayını almayı unutma.</p>
        <Link href="/app" className="btn mx-auto mt-8 !px-8 !py-4 text-base focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2">Kaydı yükle →</Link>
      </section>

      <footer className="border-t border-[var(--line)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-[var(--muted)] md:flex-row">
          <span className="font-display text-lg font-bold text-[var(--ink)]">Tutanak<span className="text-[var(--hi)]">.</span></span>
          <span className="text-center md:text-right">Kayıt yapmadan önce katılımcıların onayını alın; yerel mevzuata uyun.</span>
        </div>
      </footer>
    </main>
  );
}
