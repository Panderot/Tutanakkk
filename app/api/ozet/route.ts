import { NextResponse } from "next/server";

const DEMO = {
  ozet: "Pazarlama ekibi Eylül kampanyasının bütçesini ve teslim takvimini görüştü. Meta reklamlarına ağırlık verilmesi, influencer ayağının ise Ekim'e ertelenmesi benimsendi. Teklif dosyasının cuma gününe kadar müşteriye gönderilmesi kararlaştırıldı.",
  kararlar: [
    "Eylül kampanyası bütçesinin %70'i Meta reklamlarına ayrılacak",
    "Influencer iş birliği Ekim'e ertelendi",
  ],
  aksiyonlar: [
    { kisi: "Elif", is: "Teklif dosyasını cuma gününe kadar müşteriye gönder" },
    { kisi: "Murat", is: "Bütçe tablosunu yeni dağılıma göre güncelle" },
    { kisi: "Zeynep", is: "Kreatif brief'ini pazartesi ekiple paylaş" },
  ],
};

export async function POST(req: Request) {
  const falKey = process.env.FAL_KEY;
  const key = process.env.ANTHROPIC_API_KEY;
  const form = await req.formData();
  const ses = form.get("ses") as File | null;

  if (!falKey || !key || !ses) {
    return NextResponse.json({ demo: true, tutanak: DEMO });
  }

  const b64 = Buffer.from(await ses.arrayBuffer()).toString("base64");
  const submit = await fetch("https://queue.fal.run/fal-ai/wizper", {
    method: "POST",
    headers: { Authorization: `Key ${falKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ audio_url: `data:${ses.type || "audio/mpeg"};base64,${b64}`, language: "tr" }),
  });
  if (!submit.ok) return NextResponse.json({ error: `fal hata: ${submit.status}` }, { status: 502 });
  const q = await submit.json();

  let transkript = "";
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const s = await (await fetch(q.status_url, { headers: { Authorization: `Key ${falKey}` } })).json();
    if (s.status === "COMPLETED") {
      const res = await (await fetch(q.response_url, { headers: { Authorization: `Key ${falKey}` } })).json();
      transkript = res?.text || "";
      break;
    }
    if (s.status === "FAILED" || s.status === "ERROR") break;
  }
  if (!transkript) return NextResponse.json({ error: "transkript alınamadı" }, { status: 502 });

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 800,
      messages: [{
        role: "user",
        content: `Şu toplantı transkriptini analiz et: "${transkript.slice(0, 8000)}". SADECE JSON dön: {"ozet":"3-4 cümlelik Türkçe özet","kararlar":["alınan kararlar"],"aksiyonlar":[{"kisi":"isim ya da 'Ekip'","is":"yapılacak iş"}]}`,
      }],
    }),
  });
  if (!r.ok) return NextResponse.json({ error: `claude hata: ${r.status}` }, { status: 502 });
  const out = await r.json();
  const text = out?.content?.find((b: { type: string }) => b.type === "text")?.text || "{}";
  try {
    return NextResponse.json({ demo: false, tutanak: JSON.parse(text.replace(/```json|```/g, "").trim()) });
  } catch {
    return NextResponse.json({ error: "özet okunamadı" }, { status: 502 });
  }
}
