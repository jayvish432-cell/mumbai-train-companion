import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: '👥', title: 'Crowd Predictor', desc: 'Know how packed the next train will be', path: '/crowd', color: '#00c2a8' },
    { icon: '🚃', title: 'Live Status', desc: 'Real-time delays and platform info', path: '/status', color: '#2080ff' },
    { icon: '🤖', title: 'AI Chat Assistant', desc: 'Ask anything about your journey', path: '/chat', color: '#ffd040' },
    { icon: '🆘', title: 'SOS Alert', desc: 'Emergency help at one tap', path: '/sos', color: '#ff4444' },
  ];

  return (
    <div className="page" style={{ paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', padding: '30px 0 24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🚂</div>
        <h1 style={{ fontSize: '28px', color: '#00c2a8', marginBottom: '6px' }}>
          Mumbai Local
        </h1>
        <h2 style={{ fontSize: '20px', color: 'white', fontWeight: 'normal', marginBottom: '8px' }}>
          Train Companion
        </h2>
        <p style={{ color: '#a0b4c8', fontSize: '13px' }}>
          AI-powered travel intelligence for Mumbai commuters
        </p>
      </div>

      <div style={{
        background: '#00c2a811', border: '1px solid #00c2a833',
        borderRadius: '12px', padding: '14px 16px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '12px'
      }}>
        <span style={{ fontSize: '24px' }}>📍</span>
        <div>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>Mumbai, Maharashtra</div>
          <div style={{ color: '#a0b4c8', fontSize: '12px' }}>Western · Central · Harbour Lines</div>
        </div>
        <span style={{ marginLeft: 'auto', color: '#00c2a8', fontSize: '12px', fontWeight: 'bold' }}>LIVE</span>
      </div>

      <h3 style={{ color: '#a0b4c8', fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Features
      </h3>

      {features.map(f => (
        <div key={f.path} className="card" onClick={() => navigate(f.path)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: f.color + '22', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0
          }}>
            {f.icon}
          </div>
          <div>
            <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{f.title}</div>
            <div style={{ color: '#a0b4c8', fontSize: '13px' }}>{f.desc}</div>
          </div>
          <span style={{ marginLeft: 'auto', color: '#a0b4c8' }}>›</span>
        </div>
      ))}

      <div className="card" style={{ textAlign: 'center', marginTop: '8px' }}>
        <div style={{ color: '#a0b4c8', fontSize: '12px' }}>Built for Recursion 7.0 · RGIT Mumbai</div>
      </div>
    </div>
  );
}

export default Home;