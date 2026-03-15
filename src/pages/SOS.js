import React, { useState } from 'react';

function SOS() {
  const [activated, setActivated] = useState(false);
  const [location, setLocation] = useState(null);

  const activateSOS = () => {
    setActivated(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setLocation({
          lat: pos.coords.latitude.toFixed(4),
          lng: pos.coords.longitude.toFixed(4)
        });
      });
    }
  };

  const reset = () => {
    setActivated(false);
    setLocation(null);
  };

  const helplines = [
    { name: 'Railway Police (RPF)', number: '1800-111-322', icon: '👮' },
    { name: 'Mumbai Police', number: '100', icon: '🚔' },
    { name: 'Ambulance', number: '108', icon: '🚑' },
    { name: 'Women Helpline', number: '1091', icon: '👩' },
    { name: 'Railway Enquiry', number: '139', icon: '🚃' },
  ];

  return (
    <div className="page" style={{ paddingBottom: '80px' }}>
      <h1>🆘 SOS Emergency</h1>
      <p>Quick help when you need it most</p>

      {!activated ? (
        <div className="card" style={{
          textAlign: 'center', padding: '32px 16px',
          borderColor: '#ff444455'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🆘</div>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
            Emergency Alert
          </div>
          <div style={{ color: '#a0b4c8', fontSize: '13px', marginBottom: '24px' }}>
            Press the button below to share your location and alert emergency contacts
          </div>
          <button className="btn btn-red" onClick={activateSOS}
            style={{ fontSize: '18px', padding: '16px', borderRadius: '50px' }}>
            🆘 SEND SOS ALERT
          </button>
        </div>
      ) : (
        <div className="card" style={{ borderColor: '#ff4444', textAlign: 'center', padding: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
          <div style={{ color: '#ff4444', fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>
            SOS Alert Sent!
          </div>
          <div style={{ color: '#a0b4c8', fontSize: '13px', marginBottom: '16px' }}>
            Emergency contacts have been notified
          </div>
          {location && (
            <div style={{
              background: '#0a1428', borderRadius: '8px',
              padding: '12px', marginBottom: '16px'
            }}>
              <div style={{ color: '#a0b4c8', fontSize: '12px', marginBottom: '4px' }}>📍 Your Location</div>
              <div style={{ color: 'white', fontSize: '13px' }}>
                Lat: {location.lat}, Lng: {location.lng}
              </div>
            </div>
          )}
          <button className="btn" onClick={reset} style={{ background: '#10203a', color: '#a0b4c8' }}>
            Cancel Alert
          </button>
        </div>
      )}

      <h3 style={{
        color: '#a0b4c8', fontSize: '13px', marginTop: '24px',
        marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px'
      }}>
        Emergency Helplines
      </h3>

      {helplines.map(h => (
        <div key={h.name} className="card" style={{
          display: 'flex', alignItems: 'center',
          gap: '12px', padding: '12px 16px'
        }}>
          <span style={{ fontSize: '24px' }}>{h.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>{h.name}</div>
            <div style={{ color: '#00c2a8', fontSize: '16px', fontWeight: 'bold' }}>{h.number}</div>
          </div>
          <a href={`tel:${h.number}`} style={{
            background: '#00c2a822', color: '#00c2a8',
            border: '1px solid #00c2a833', borderRadius: '8px',
            padding: '8px 16px', textDecoration: 'none',
            fontSize: '13px', fontWeight: 'bold'
          }}>Call</a>
        </div>
      ))}
    </div>
  );
}

export default SOS;