import React, { useState } from 'react';

const trainData = [
  { number: 'WR-1001', from: 'Churchgate', to: 'Borivali', platform: '1', status: 'On Time', delay: 0, time: '08:05 AM' },
  { number: 'WR-1023', from: 'Borivali', to: 'Churchgate', platform: '2', status: 'Delayed', delay: 8, time: '08:12 AM' },
  { number: 'CR-2045', from: 'CST', to: 'Thane', platform: '3', status: 'On Time', delay: 0, time: '08:15 AM' },
  { number: 'CR-2067', from: 'Thane', to: 'CST', platform: '4', status: 'Delayed', delay: 12, time: '08:20 AM' },
  { number: 'HR-3012', from: 'CST', to: 'Andheri', platform: '5', status: 'On Time', delay: 0, time: '08:25 AM' },
  { number: 'WR-1045', from: 'Churchgate', to: 'Dahisar', platform: '1', status: 'Delayed', delay: 5, time: '08:30 AM' },
  { number: 'CR-2089', from: 'CST', to: 'Mulund', platform: '2', status: 'On Time', delay: 0, time: '08:35 AM' },
  { number: 'WR-1067', from: 'Andheri', to: 'Churchgate', platform: '3', status: 'On Time', delay: 0, time: '08:40 AM' },
];

function LiveStatus() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = trainData.filter(t => {
    const matchSearch = t.from.toLowerCase().includes(search.toLowerCase()) ||
      t.to.toLowerCase().includes(search.toLowerCase()) ||
      t.number.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="page" style={{ paddingBottom: '80px' }}>
      <h1>🚃 Live Train Status</h1>
      <p>Real-time delays and platform information</p>

      <input className="input" placeholder="Search by station or train number..."
        value={search} onChange={e => setSearch(e.target.value)} />

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['All', 'On Time', 'Delayed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? '#00c2a8' : '#10203a',
            color: filter === f ? '#0a1428' : '#a0b4c8',
            border: '1px solid #00c2a833', borderRadius: '20px',
            padding: '6px 16px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px'
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ color: '#a0b4c8', fontSize: '12px' }}>Showing {filtered.length} trains</span>
        <span style={{ color: '#00c2a8', fontSize: '12px', fontWeight: 'bold' }}>● LIVE</span>
      </div>

      {filtered.map(train => (
        <div key={train.number} className="card" style={{
          borderColor: train.status === 'Delayed' ? '#ff444433' : '#00c2a833'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{train.number}</span>
            <span className={`tag ${train.status === 'Delayed' ? 'tag-red' : ''}`}>
              {train.status === 'Delayed' ? `⚠️ +${train.delay} min` : '✅ On Time'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ color: '#a0b4c8', fontSize: '13px' }}>{train.from}</span>
            <span style={{ color: '#00c2a8' }}>→</span>
            <span style={{ color: '#a0b4c8', fontSize: '13px' }}>{train.to}</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: '#a0b4c8', fontSize: '12px' }}>🕐 {train.time}</span>
            <span style={{ color: '#a0b4c8', fontSize: '12px' }}>🚉 Platform {train.platform}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LiveStatus;