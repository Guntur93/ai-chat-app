"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const newMsg = [...messages, { role: "user", content: input }];
    setMessages(newMsg);
    setInput(""); 
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMsg })
    });
    const data = await res.json();
    setMessages([...newMsg, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <main style={{maxWidth:'700px',margin:'auto',padding:'15px',height:'100vh',display:'flex',flexDirection:'column'}}>
      <h1 style={{fontSize:'24px',marginBottom:'10px'}}>AI Chat (Gemini)</h1>
      <div style={{flex:1,background:'#27272a',borderRadius:'8px',padding:'10px',overflowY:'auto',marginBottom:'10px'}}>
        {messages.map((m,i)=>(<div key={i} style={{marginBottom:'8px'}}><b>{m.role}:</b> {m.content}</div>))}
        {loading && <div><b>AI:</b> mengetik...</div>}
      </div>
      <div style={{display:'flex',gap:'8px'}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} style={{flex:1,background:'#3f3f46',border:'none',padding:'10px',borderRadius:'6px',color:'white'}} placeholder="Tulis pesan..." />
        <button onClick={send} style={{background:'#9333ea',border:'none',padding:'10px 16px',borderRadius:'6px',color:'white'}}>Kirim</button>
      </div>
    </main>
  );
}
