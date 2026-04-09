export async function POST(req) {
  const { messages } = await req.json();
  const last = messages[messages.length-1].content;
  let reply = "Error";

  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ contents:[{ parts:[{ text: last }] }] })
    });
    const d = await r.json();
    reply = d.candidates?.[0]?.content?.parts?.[0]?.text || "Error Gemini";
  } catch(e){
    reply = "Error server: " + e.message;
  }

  return Response.json({ reply });
}
