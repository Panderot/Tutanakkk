# Tutanak — AI toplantı notu

## En kolay yol: Claude Code ile kur ve canlıya al

1. Bu klasörde terminal aç ve `claude` yaz (Claude Code kuruluysa; değilse claude.com/code adresinden indir).
2. Şunu söyle: **"Kuruluma başla"** — Claude sana işletme adını, renklerini ve logonu sorar, bütün değişiklikleri kendisi yapar.
3. Bittiğinde **"canlıya al"** de — Claude uygulamayı senin adına internete açar (Vercel, ücretsiz katman yeter).

Kod bilmene gerek yok; dosyalara elle dokunmazsın. Manuel kurulum istersen aşağıdaki adımlar da geçerli.

Ses kaydını yükle → fal wizper (whisper) Türkçe transkript → Claude özet + kararlar + kişiye atanmış aksiyonlar.

## Kurulum
```bash
npm install
npm run dev   # http://localhost:3000
```
Anahtarsız da çalışır (demo mod). Gerçek işlem için `.env.local`:
```
FAL_KEY=...
ANTHROPIC_API_KEY=sk-ant-...
```
Modeller: fal-ai/wizper (transkript) + claude-haiku-4-5 (özet). Çıktı JSON: {ozet, kararlar[], aksiyonlar[{kisi,is}]}.

## Satış açısı
PLAUD 27 aktif reklamla 4 pazarda; Granola/Pocket AI aynı vaatte. Türkçe toplantılar
için yerli boşluk. Fiyat önerisi: 199 TL/ay (B2B).
