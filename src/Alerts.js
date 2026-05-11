import React, { useState } from 'react';

const alertsData = [
  { id: 'ALT001', title: 'Negative Sentiment Spike', message: 'X platform detected 23 negative mentions in 1 hour', platform: 'X', severity: 'High', time: '2 mins ago', resolved: false },
  { id: 'ALT002', title: 'Harmful Keyword Detected', message: 'Facebook post with harmful keyword found', platform: 'Facebook', severity: 'High', time: '15 mins ago', resolved: false },
  { id: 'ALT003', title: 'Engagement Drop Alert', message: 'Instagram engagement 40% drop detected', platform: 'Instagram', severity: 'Medium', time: '1 hour ago', resolved: false },
  { id: 'ALT004', title: 'Mention Surge', message: 'Brand mentions 300% increase on X', platform: 'X', severity: 'Low', time: '2 hours ago', resolved: true },
  { id: 'ALT005', title: 'Negative Review Cluster', message: 'Instagram detected 15 negative reviews in 30 mins', platform: 'Instagram', severity: 'High', time: '3 hours ago', resolved: true },
  { id: 'ALT006', title: 'Comment Spam Detected', message: 'Facebook detected spam comments', platform: 'Facebook', severity: 'Medium', time: '5 hours ago', resolved: true },
];

function Alerts() {
  const [alerts, setAlerts] = useState(alertsData);
  const [filter, setFilter] = useState('All');

  const filtered = alerts.filter(a => {
    if (filter === 'Active') return !a.resolved;
    if (filter === 'Resolved') return a.resolved;
    return true;
  });

  const resolve = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  };

  const severityColor = (s) => s === 'High' ? '#f74f4f' : s === 'Medium' ? '#f7a84f' : '#4caf82';
  const severityBg = (s) => s === 'High' ? 'rgba(247,79,79,0.15)' : s === 'Medium' ? 'rgba(247,168,79,0.15)' : 'rgba(76,175,130,0.15)';

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', background: 'linear-gradient(135deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🔔 Alerts</h1>
          <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>
            <span style={{ color: '#f74f4f', fontWeight: '600' }}>{alerts.filter(a => !a.resolved).length} active</span> · {alerts.filter(a => a.resolved).length} resolved
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Active', 'Resolved'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '7px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)',
              background: filter === f ? 'linear-gradient(135deg, #4f8ef7, #7c5af7)' : 'transparent',
              color: filter === f ? '#fff' : '#555', cursor: 'pointer', fontSize: '12px',
              fontFamily: 'Segoe UI', transition: 'all 0.2s'
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: '🔴 High Severity', value: alerts.filter(a => a.severity === 'High').length, color: '#f74f4f' },
          { label: '🟡 Medium Severity', value: alerts.filter(a => a.severity === 'Medium').length, color: '#f7a84f' },
          { label: '🟢 Low Severity', value: alerts.filter(a => a.severity === 'Low').length, color: '#4caf82' },
        ].map((m, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, #0f1117, #131620)',
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px',
            transition: 'all 0.3s', cursor: 'pointer'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>{m.label}</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Alerts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((a, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, #0f1117, #131620)',
            border: `1px solid ${a.resolved ? 'rgba(255,255,255,0.04)' : 'rgba(247,79,79,0.15)'}`,
            borderRadius: '14px', padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: '16px',
            transition: 'all 0.3s', opacity: a.resolved ? 0.6 : 1,
            animation: `fadeInUp 0.4s ease ${i * 0.08}s both`
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
          >
            {/* Severity Badge */}
            <div style={{
              padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700',
              background: severityBg(a.severity), color: severityColor(a.severity),
              border: `1px solid ${severityColor(a.severity)}33`, whiteSpace: 'nowrap'
            }}>{a.severity}</div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: a.resolved ? '#555' : '#fff' }}>{a.title}</span>
                <span style={{ fontSize: '10px', color: '#444', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '6px' }}>{a.platform}</span>
                <span style={{ fontSize: '10px', color: '#444' }}>{a.time}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#555' }}>{a.message}</div>
            </div>

            {/* Action */}
            {!a.resolved ? (
              <button onClick={() => resolve(a.id)} style={{
                padding: '8px 16px', borderRadius: '8px',
                background: 'rgba(76,175,130,0.1)', border: '1px solid rgba(76,175,130,0.2)',
                color: '#4caf82', fontSize: '12px', cursor: 'pointer', fontFamily: 'Segoe UI',
                transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(76,175,130,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(76,175,130,0.1)'}
              >✓ Resolve</button>
            ) : (
              <span style={{ fontSize: '12px', color: '#4caf82', whiteSpace: 'nowrap' }}>✓ Resolved</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;