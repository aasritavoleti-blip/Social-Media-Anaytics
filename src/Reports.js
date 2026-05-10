import React, { useState } from 'react';

const reportData = [
  { platform: 'Instagram', likes: 68200, comments: 18400, shares: 9200, sentiment: 'Positive', reach: '2.4M' },
  { platform: 'Facebook', likes: 42100, comments: 12300, shares: 7800, sentiment: 'Neutral', reach: '1.8M' },
  { platform: 'X', likes: 32000, comments: 8000, shares: 4100, sentiment: 'Negative', reach: '980K' },
];

function Reports() {
  const [selected, setSelected] = useState('All');

  const filtered = selected === 'All' ? reportData : reportData.filter(r => r.platform === selected);

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', background: 'linear-gradient(135deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>📋 Reports</h1>
          <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>Platform performance summary</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Instagram', 'Facebook', 'X'].map(f => (
            <button key={f} onClick={() => setSelected(f)} style={{
              padding: '7px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)',
              background: selected === f ? 'linear-gradient(135deg, #4f8ef7, #7c5af7)' : 'transparent',
              color: selected === f ? '#fff' : '#555', cursor: 'pointer', fontSize: '12px',
              fontFamily: 'Segoe UI', transition: 'all 0.2s'
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: '📊 Total Reach', value: '5.2M', change: '▲ +18%', up: true },
          { label: '💡 Avg Engagement', value: '6.8%', change: '▲ +2.1%', up: true },
          { label: '📅 Reports Generated', value: '142', change: '▲ +12', up: true },
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
            <div style={{ fontSize: '26px', fontWeight: '700', color: '#fff' }}>{m.value}</div>
            <div style={{ fontSize: '12px', marginTop: '8px', color: m.up ? '#4caf82' : '#f74f4f' }}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '14px', fontWeight: '600', color: '#aaa' }}>
          Platform Breakdown
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              {['Platform', 'Likes', 'Comments', 'Shares', 'Reach', 'Sentiment'].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', color: '#444', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,142,247,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                  {r.platform === 'Instagram' ? '📸' : r.platform === 'Facebook' ? '👤' : '🐦'} {r.platform}
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{r.likes.toLocaleString()}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{r.comments.toLocaleString()}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{r.shares.toLocaleString()}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{r.reach}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                    background: r.sentiment === 'Positive' ? 'rgba(76,175,130,0.15)' : r.sentiment === 'Negative' ? 'rgba(247,79,79,0.15)' : 'rgba(255,255,255,0.06)',
                    color: r.sentiment === 'Positive' ? '#4caf82' : r.sentiment === 'Negative' ? '#f74f4f' : '#888',
                    border: `1px solid ${r.sentiment === 'Positive' ? 'rgba(76,175,130,0.2)' : r.sentiment === 'Negative' ? 'rgba(247,79,79,0.2)' : 'rgba(255,255,255,0.08)'}`
                  }}>{r.sentiment}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;