import React, { useState } from 'react';

const sentimentReportData = [
  { sentiment: 'Positive', count: 45, percentage: '45%', platforms: { Instagram: 18, Facebook: 15, X: 12 }, color: '#4caf82', icon: '😊' },
  { sentiment: 'Weak Positive', count: 20, percentage: '20%', platforms: { Instagram: 8, Facebook: 7, X: 5 }, color: '#8bc34a', icon: '🙂' },
  { sentiment: 'Neutral', count: 20, percentage: '20%', platforms: { Instagram: 8, Facebook: 7, X: 5 }, color: '#f7a84f', icon: '😐' },
  { sentiment: 'Negative', count: 15, percentage: '15%', platforms: { Instagram: 6, Facebook: 5, X: 4 }, color: '#f74f4f', icon: '😞' },
];

const platformBreakdown = [
  { platform: 'Instagram', total: 40, positive: 18, weakPositive: 8, neutral: 8, negative: 6, icon: '📸' },
  { platform: 'Facebook', total: 34, positive: 15, weakPositive: 7, neutral: 7, negative: 5, icon: '👤' },
  { platform: 'X', total: 26, positive: 12, weakPositive: 5, neutral: 5, negative: 4, icon: '🐦' },
];

function Reports() {
  const [selected, setSelected] = useState('All');

  const filtered = selected === 'All' ? sentimentReportData : sentimentReportData.filter(r => r.sentiment === selected);

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', background: 'linear-gradient(135deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>📋 Sentiment Reports</h1>
          <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>Sentiment analysis and platform breakdown</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Positive', 'Weak Positive', 'Neutral', 'Negative'].map(f => (
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
          { label: '📊 Positive Sentiment', value: '45%', change: '▲ +12%', up: true },
          { label: '📊 Total Comments', value: '100', change: '▲ +8', up: true },
          { label: '📈 Sentiment Score', value: '7.2/10', change: '▲ +0.3', up: true },
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

      {/* Sentiment Table */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '14px', fontWeight: '600', color: '#aaa' }}>
          Sentiment Analysis
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              {['Sentiment', 'Count', 'Percentage', 'Instagram', 'Facebook', 'X'].map(h => (
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
                  <span style={{ marginRight: '8px' }}>{r.icon}</span>{r.sentiment}
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{r.count}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{r.percentage}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{r.platforms.Instagram}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{r.platforms.Facebook}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{r.platforms.X}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Platform Breakdown */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '14px', fontWeight: '600', color: '#aaa' }}>
          Platform Breakdown
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              {['Platform', 'Total', 'Positive', 'Weak Positive', 'Neutral', 'Negative'].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '11px', color: '#444', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {platformBreakdown.map((p, i) => (
              <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,142,247,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                  <span style={{ marginRight: '8px' }}>{p.icon}</span>{p.platform}
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ccc' }}>{p.total}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#4caf82', fontWeight: '600' }}>{p.positive}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#8bc34a', fontWeight: '600' }}>{p.weakPositive}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#f7a84f', fontWeight: '600' }}>{p.neutral}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#f74f4f', fontWeight: '600' }}>{p.negative}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;