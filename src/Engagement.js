import React, { useState } from 'react';

const weeklyData = [
  { week: 'W1', likes: 18200, comments: 5200, shares: 2800 },
  { week: 'W2', likes: 22400, comments: 6100, shares: 3200 },
  { week: 'W3', likes: 19800, comments: 5800, shares: 2900 },
  { week: 'W4', likes: 25600, comments: 7200, shares: 3800 },
  { week: 'W5', likes: 23100, comments: 6500, shares: 3400 },
  { week: 'W6', likes: 28400, comments: 8100, shares: 4100 },
];

const platformData = [
  { platform: 'Instagram', icon: '📸', likes: 68200, comments: 18400, shares: 9200, color: '#e1306c' },
  { platform: 'Facebook', icon: '👤', likes: 42100, comments: 12300, shares: 7800, color: '#1877f2' },
  { platform: 'X', icon: '🐦', likes: 32000, comments: 8000, shares: 4100, color: '#1da1f2' },
];

function MiniBar({ value, max, color }) {
  return (
    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{ width: `${(value / max) * 100}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 1s ease' }} />
    </div>
  );
}

function Engagement() {
  const [selected, setSelected] = useState('likes');
  const maxVal = Math.max(...weeklyData.map(d => d[selected]));

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', background: 'linear-gradient(135deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>📈 Engagement</h1>
        <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>Weekly performance across platforms</p>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: '❤️ Total Likes', value: '142.3K', change: '+12.4%', color: '#f74f4f' },
          { label: '💬 Total Comments', value: '38.7K', change: '+8.1%', color: '#4f8ef7' },
          { label: '🔁 Total Shares', value: '21.1K', change: '-3.2%', color: '#4caf82' },
        ].map((m, i) => (
          <div key={i} style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', transition: 'all 0.3s', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>{m.label}</div>
            <div style={{ fontSize: '26px', fontWeight: '700', color: '#fff' }}>{m.value}</div>
            <div style={{ fontSize: '12px', marginTop: '8px', color: m.change.startsWith('+') ? '#4caf82' : '#f74f4f' }}>{m.change.startsWith('+') ? '▲' : '▼'} {m.change}</div>
          </div>
        ))}
      </div>

      {/* Weekly Bar Chart */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa' }}>Weekly Trend</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['likes', 'comments', 'shares'].map(t => (
              <button key={t} onClick={() => setSelected(t)} style={{
                padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)',
                background: selected === t ? 'linear-gradient(135deg, #4f8ef7, #7c5af7)' : 'transparent',
                color: selected === t ? '#fff' : '#555', cursor: 'pointer', fontSize: '12px',
                fontFamily: 'Segoe UI', transition: 'all 0.2s', textTransform: 'capitalize'
              }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
          {weeklyData.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: '10px', color: '#555' }}>{(d[selected] / 1000).toFixed(1)}K</div>
              <div style={{
                width: '100%', background: 'linear-gradient(180deg, #4f8ef7, #7c5af7)',
                borderRadius: '6px 6px 0 0', transition: 'height 0.8s ease',
                height: `${(d[selected] / maxVal) * 120}px`,
                boxShadow: '0 0 12px rgba(79,142,247,0.3)'
              }} />
              <div style={{ fontSize: '11px', color: '#444' }}>{d.week}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Breakdown */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa', marginBottom: '20px' }}>Platform Breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {platformData.map((p, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{p.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{p.platform}</span>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <span style={{ fontSize: '12px', color: '#555' }}>❤️ {p.likes.toLocaleString()}</span>
                  <span style={{ fontSize: '12px', color: '#555' }}>💬 {p.comments.toLocaleString()}</span>
                  <span style={{ fontSize: '12px', color: '#555' }}>🔁 {p.shares.toLocaleString()}</span>
                </div>
              </div>
              <MiniBar value={p.likes} max={68200} color={p.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Engagement;