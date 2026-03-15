import React, { useState, useRef, useEffect } from 'react';

function AiChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am your Mumbai Local Train AI Assistant 🚂 Ask me anything about your journey — crowd levels, best routes, door tips, or anything else!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a helpful Mumbai Local Train assistant. You help commuters with:
              - Train schedules and routes (Western, Central, Harbour lines)
              - Crowd predictions and best travel times
              - Which coach/door to board for fastest exit
              - Station information around Mumbai
              - Travel tips for Mumbai local trains
              Keep answers short, friendly and practical. Always mention specific station names when relevant.`
            },
            ...messages,
            userMessage
          ],
          max_tokens: 300
        })
      });

      const data = await response.json();
      const reply = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I could not connect right now. Please check your internet and try again!'
      }]);
    }
    setLoading(false);
  };

  const suggestions = [
    'Best time to travel from Andheri?',
    'Which coach at Dadar for fast exit?',
    'How crowded is 8am Western line?',
    'Fastest route CST to Bandra?',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ padding: '20px 20px 10px', borderBottom: '1px solid #00c2a822' }}>
        <h1 style={{ color: '#00c2a8', fontSize: '22px', marginBottom: '4px' }}>🤖 AI Assistant</h1>
        <p style={{ color: '#a0b4c8', fontSize: '13px' }}>Powered by Groq · Llama 3</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: '160px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '12px'
          }}>
            <div style={{
              maxWidth: '80%', padding: '12px 16px', borderRadius: '16px',
              background: msg.role === 'user' ? '#00c2a8' : '#10203a',
              color: msg.role === 'user' ? '#0a1428' : 'white',
              fontSize: '14px', lineHeight: '1.5',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
              borderBottomLeftRadius: msg.role === 'user' ? '16px' : '4px',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
            <div style={{
              background: '#10203a', padding: '12px 16px',
              borderRadius: '16px', borderBottomLeftRadius: '4px', color: '#a0b4c8', fontSize: '14px'
            }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{
        position: 'fixed', bottom: '60px', left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '480px', background: '#0a1428',
        borderTop: '1px solid #00c2a822', padding: '12px 16px'
      }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)} style={{
              background: '#10203a', border: '1px solid #00c2a833',
              borderRadius: '20px', color: '#00c2a8', fontSize: '11px',
              padding: '6px 12px', cursor: 'pointer', whiteSpace: 'nowrap'
            }}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input className="input" style={{ margin: 0, flex: 1 }}
            placeholder="Ask about your journey..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} style={{
            background: '#00c2a8', border: 'none', borderRadius: '8px',
            padding: '0 16px', color: '#0a1428', fontWeight: 'bold',
            cursor: 'pointer', fontSize: '20px'
          }}>↑</button>
        </div>
      </div>
    </div>
  );
}

export default AiChat;