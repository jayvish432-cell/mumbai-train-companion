import React, { useState } from 'react';

const stations = [
  'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central',
  'Mahalaxmi', 'Lower Parel', 'Elphinstone Road', 'Dadar', 'Matunga Road',
  'Mahim', 'Bandra', 'Khar Road', 'Santacruz', 'Vile Parle', 'Andheri',
  'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali', 'Borivali', 'Dahisar',
  'CST', 'Kurla', 'Ghatkopar', 'Mulund', 'Thane'
];

const times = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

function getCrowdLevel(station, time) {
  const peakTimes = ['7:00 AM', '8:00 AM', '9:00 AM', '5:00 PM', '6:00 PM', '7:00 PM'];
  const mediumTimes = ['6:00 AM', '10:00 AM', '4:00 PM', '8:00 PM'];
  if (peakTimes.includes(time)) return { level: 'Very Crowded', color: '#ff4444', emoji: '🔴', tip: 'Avoid if possible. Board from last coach for more space.' };
  if (mediumTimes.includes(time)) return { level: 'Moderate', color: '#ffd040', emoji: '🟡', tip: 'Manageable crowd. Middle coaches are best.' };
  return { level: 'Comfortable', color: '#00c2a8', emoji: '🟢', tip: 'Good time to travel. Any coach is fine.' };
}

function getDoorTip(destination) {
  const tips = {
    'Churchgate': 'Board from Coach 1 — nearest to exit stairs',
    'Dadar': 'Board from Coach 6 — fastest exit at Dadar',
    'Andheri': 'Board from Coach 4 — nearest to FOB',
    'Borivali': 'Board from Coach 8 — nearest to east exit',
    'Thane': 'Board from Coach 3 — nearest to auto stand',
    'CST': 'Board from Coach 1 — nearest to main exit',
    'Bandra': 'Board from Coach 5 — nearest to west exit',
  };
  return tips[destination] || 'Board from middle coaches — easiest to exit from most stations';
}

function CrowdPredictor() {
  const [station, setStation] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState(null);

  const predict = () => {
    if (!station || !time) return;
    const crowd = getCrowdLevel(station, time);
    const doorTip = getDoorTip(destination);
    setResult({ crowd, doorTip });
  };

  return (
    <div className="page" style={{ paddingBottom: '80px' }}>
      <h1>👥 Crowd Predictor</h1>
      <p>Find out how crowded your train will be</p>

      <div className="card">
        <label style={{ color: '#a0b4c8', fontSize: '13px' }}>From Station</label>
        <select className="input" style={{ marginTop: '6px' }}
          value={station} onChange={e => setStation(e.target.value)}>
          <option value="">Select station...</option>
          {stations.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <label style={{ color: '#a0b4c8', fontSize: '13px' }}>To Station (for door tip)</label>
        <select className="input" style={{ marginTop: '6px' }}
          value={destination} onChange={e => setDestination(e.target.value)}>
          <option value="">Select destination...</option>
          {stations.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <label style={{ color: '#a0b4c8', fontSize: '13px' }}>Travel Time</label>
        <select className="input" style={{ marginTop: '6px' }}
          value={time} onChange={e => setTime(e.target.value)}>
          <option value="">Select time...</option>
          {times.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <button className="btn" onClick={predict}>Predict Crowd</button>
      </div>

      {result && (
        <>
          <div className="card" style={{ borderColor: result.crowd.color + '55' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '36px' }}>{result.crowd.emoji}</span>
              <div>
                <div style={{ color: result.crowd.color, fontWeight: 'bold', fontSize: '20px' }}>
                  {result.crowd.level}
                </div>
                <div style={{ color: '#a0b4c8', fontSize: '13px' }}>at {station} · {time}</div>
              </div>
            </div>
            <div style={{ background: '#0a1428', borderRadius: '8px', padding: '12px' }}>
              <div style={{ color: '#a0b4c8', fontSize: '12px', marginBottom: '4px' }}>💡 Tip</div>
              <div style={{ color: 'white', fontSize: '14px' }}>{result.crowd.tip}</div>
            </div>
          </div>

          <div className="card">
            <div style={{ color: '#00c2a8', fontWeight: 'bold', marginBottom: '8px' }}>🚪 Smart Door Tip</div>
            <div style={{ color: 'white', fontSize: '14px' }}>{result.doorTip}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default CrowdPredictor;