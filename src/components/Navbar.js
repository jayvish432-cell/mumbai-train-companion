import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const links = [
    { path: '/', label: '🏠', name: 'Home' },
    { path: '/crowd', label: '👥', name: 'Crowd' },
    { path: '/status', label: '🚃', name: 'Status' },
    { path: '/chat', label: '🤖', name: 'AI Chat' },
    { path: '/sos', label: '🆘', name: 'SOS' },
  ];

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#10203a', borderTop: '1px solid #00c2a833',
      display: 'flex', justifyContent: 'space-around',
      padding: '10px 0', zIndex: 1000
    }}>
      {links.map(link => (
        <Link key={link.path} to={link.path} style={{
          textDecoration: 'none', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '4px'
        }}>
          <span style={{ fontSize: '20px' }}>{link.label}</span>
          <span style={{
            fontSize: '10px',
            color: location.pathname === link.path ? '#00c2a8' : '#a0b4c8',
            fontWeight: location.pathname === link.path ? 'bold' : 'normal'
          }}>{link.name}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;