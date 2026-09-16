"use client";

import { useState } from "react";
import Link from "next/link";

type Tutanak = { ozet: string; kararlar: string[]; aksiyonlar: { kisi: string; is: string }[] };

export default function App() {
  const [busy, setBusy] = useState(false);
  const [t, setT] = useState<Tutanak | null>(null);
  const [demo, setDemo] = useState(false);
  const [kopya, setKopya] = useState(false);

  async function handleFile(f?: File) {
    setBusy(true); setT(null); setKopya(false);
    const body = new FormData();
    if (f) body.append("ses", f);
    const r = await fetch("/api/ozet", { method: "POST", body });
    const d = await r.json();
    setDemo(!!d.demo);
    if (d.tutanak) setT(d.tutanak);
    setBusy(false);
  }

  function kopyala() {
    if (!t) return;
    const metin = `ÖZET\n${t.ozet}\n\nKARARLAR\n${t.kararlar.map((k) => "• " + k).join("\n")}\n\nAKSİYONLAR\n${t.aksiyonlar.map((a) => `• ${a.kisi}: ${a.is}`).join("\n")}`;
    navigator.clipboard.writeText(metin); setKopya(true);
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-8">
      <nav className="mb-6 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold">Tutanak<span className="text-[var(--hi)]">.</span></Link>
        <span className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs text-[var(--muted)]">Bu ay: <b className="text-[var(--ink)]">7</b> toplantı</span>
      </nav>

      {busy ? (
        <div className="card grid place-items-center gap-4 p-14 text-center">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--line)] border-t-[var(--accent)]" />
          <p className="font-display text-xl font-bold">Kayıt işleniyor…</p>
          <p className="text-sm text-[var(--muted)]">Transkript → özet → kararlar → aksiyonlar</p>
        </div>
      ) : (
        <label className="card grid cursor-pointer place-items-center gap-3 border-2 border-dashed !border-[var(--accent)]/40 p-10 text-center transition hover:!border-[var(--accent)]">
          <span className="text-4xl">🎙️</span>
          <span className="font-display text-xl font-bold">Toplantı kaydını yükle</span>
          <span className="text-sm text-[var(--muted)]">mp3, m4a, wav; telefon kaydı da olur</span>
          <span className="btn mt-1 !py-2.5 text-sm">Dosya Seç</span>
          <input type="file" accept="audio/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        </label>
      )}

      {demo && t && <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs text-amber-800">Demo mod: örnek tutanak. Gerçek işlem için FAL_KEY + ANTHROPIC_API_KEY (README).</p>}

      {t && !busy && (
        <div className="card mt-6 p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Toplantı tutanağı</p>
            <button onClick={kopyala} className="rounded-full border border-[var(--line)] px-4 py-1.5 text-xs font-semibold">{kopya ? "Kopyalandı ✓" : "Tümünü kopyala"}</button>
          </div>
          <p className="mt-3 text-sm leading-relaxed">{t.ozet}</p>
          <p className="font-display mt-5 font-bold">Kararlar</p>
          <ul className="mt-2 space-y-1.5">
            {t.kararlar.map((k, i) => (
              <li key={i} className="flex items-start gap-2 text-sm"><span className="text-[var(--hi)]">✓</span>{k}</li>
            ))}
          </ul>
          <p className="font-display mt-5 font-bold">Aksiyonlar</p>
          <div className="mt-2 space-y-2">
            {t.aksiyonlar.map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-[var(--line)] p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">{a.kisi[0]}</span>
                <p className="text-sm"><b>{a.kisi}</b> · {a.is}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
