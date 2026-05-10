import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Reports from './Reports';
import Alerts from './Alerts';
import Engagement from './Engagement';
import Team from './Team';
import Sentiment from './Sentiment';
import Settings from './Settings';
import Incidents from './Incidents';

const comments = [
  { text: 'Great product, love the new update!', sentiment: 'Positive', platform: 'Instagram' },
  { text: 'Customer support is very slow to respond', sentiment: 'Negative', platform: 'X' },
  { text: 'When is the next sale happening?', sentiment: 'Neutral', platform: 'Facebook' },
  { text: 'App keeps crashing on my device', sentiment: 'Negative', platform: 'X' },
  { text: 'Absolutely love the packaging and quality', sentiment: 'Positive', platform: 'Instagram' },
];

const incidents = [
  { id: 'INC0012847', title: 'Negative Spike Detected', sub: 'Platform: X · 23 negative mentions in 1 hour', resolved: false },
  { id: 'INC0012839', title: 'Brand Mention Alert', sub: 'Platform: Facebook · Harmful keyword detected', resolved: false },
  { id: 'INC0012801', title: 'Resolved', sub: 'Platform: Instagram · Closed 2h ago', resolved: true },
];

const metrics = [
  { label: 'Total Likes', value: '142.3K', change: '+12.4%', up: true },
  { label: 'Comments', value: '38.7K', change: '+8.1%', up: true },
  { label: 'Shares', value: '21.1K', change: '-3.2%', up: false },
  { label: 'Mentions', value: '9.4K', change: '+5.7%', up: true },
];

function Dashboard({ activeFilter, setActiveFilter, visible }) {
  return (
    <div>
      <div className="topbar" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.5s ease' }}>
        <div>
          <h1>Engagement Overview</h1>
          <p>Last 30 days · Live data</p>
        </div>
        <div className="platform-filter">
          {['All', 'Facebook', 'Instagram', 'X'].map(f => (
            <button key={f} className={'pill ' + (activeFilter === f ? 'active' : '')} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="metrics">
        {metrics.map((m, i) => (
          <div key={i} className="metric-card" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.5s ease ' + (i * 0.1 + 0.2) + 's' }}>
            <div className="metric-label">{m.label}</div>
            <div className="metric-value">{m.value}</div>
            <div className={'metric-change ' + (m.up ? 'up' : 'down')}>{m.up ? '▲' : '▼'} {m.change}</div>
          </div>
        ))}
      </div>

      <div className="bottom-row">
        <div className="card" style={{ opacity: visible ? 1 : 0, transition: 'all 0.5s ease 0.5s' }}>
          <div className="card-title">Recent Comments</div>
          {comments.map((c, i) => (
            <div key={i} className="sentiment-item">
              <span className={'badge ' + (c.sentiment === 'Positive' ? 'badge-pos' : c.sentiment === 'Negative' ? 'badge-neg' : 'badge-neu')}>{c.sentiment}</span>
              <span className="sentiment-text">{c.text}</span>
              <span className="sentiment-platform">{c.platform}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ opacity: visible ? 1 : 0, transition: 'all 0.5s ease 0.6s' }}>
          <div className="card-title">Auto-Generated Incidents</div>
          {incidents.map((inc, i) => (
            <div key={i} className={'incident-item ' + (inc.resolved ? 'resolved' : '')}>
              <div className="incident-title">{inc.id} - {inc.title}</div>
              <div className="incident-sub">{inc.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activePage, setActivePage] = useState('Dashboard');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (user) setTimeout(() => setVisible(true), 100);
  }, [user]);

  if (!user) return <Login onLogin={setUser} />;

  const navMain = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Engagement', icon: '📈' },
    { name: 'Sentiment', icon: '😊' },
    { name: 'Reports', icon: '📋' },
  ];

  const navSystem = [
    { name: 'Alerts', icon: '🔔' },
    { name: 'Incidents', icon: '🚨' },
    { name: 'Team', icon: '👥' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-logo">
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #4f8ef7, #7c5af7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '10px' }}>📊</div>
          <h2>SMA Platform</h2>
          <p>Social Media Analytics</p>
        </div>

        <div className="nav-section">Main</div>
        {navMain.map((n) => (
          <div key={n.name} className={'nav-item ' + (activePage === n.name ? 'active' : '')} onClick={() => setActivePage(n.name)}>
            <span>{n.icon}</span>{n.name}
          </div>
        ))}

        <div className="nav-section">System</div>
        {navSystem.map((n) => (
          <div key={n.name} className={'nav-item ' + (activePage === n.name ? 'active' : '')} onClick={() => setActivePage(n.name)}>
            <span>{n.icon}</span>{n.name}
          </div>
        ))}

        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f8ef7, #7c5af7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>
              {user[0]}
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#ccc', fontWeight: '500' }}>{user}</p>
              <p style={{ fontSize: '11px', color: '#444' }}>Online</p>
            </div>
          </div>
          <button onClick={() => { setUser(null); setVisible(false); }} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'rgba(247,79,79,0.1)', border: '1px solid rgba(247,79,79,0.2)', color: '#f74f4f', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
            Logout
          </button>
        </div>
      </div>

      <div className="main">
        {activePage === 'Dashboard' && <Dashboard activeFilter={activeFilter} setActiveFilter={setActiveFilter} visible={visible} />}
        {activePage === 'Engagement' && <Engagement />}
        {activePage === 'Reports' && <Reports />}
        {activePage === 'Alerts' && <Alerts />}
        {activePage === 'Team' && <Team />}
        {activePage === 'Sentiment' && <Sentiment />}
        {activePage === 'Settings' && <Settings />}
        {activePage === 'Incidents' && <Incidents />}
        {!['Dashboard', 'Engagement', 'Reports', 'Alerts', 'Team', 'Sentiment','Settings'].includes(activePage) && (          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '48px' }}>🚧</div>
            <h2 style={{ color: '#444', fontSize: '18px' }}>{activePage} - Coming Soon</h2>
            <p style={{ color: '#333', fontSize: '13px' }}>This page is under construction</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;