import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getInstagramPosts } from './api';

const weeklyData = [
  { week: 'W1', likes: 18200, comments: 5200, shares: 2800 },
  { week: 'W2', likes: 22400, comments: 6100, shares: 3200 },
  { week: 'W3', likes: 19800, comments: 5800, shares: 2900 },
  { week: 'W4', likes: 25600, comments: 7200, shares: 3800 },
  { week: 'W5', likes: 23100, comments: 6500, shares: 3400 },
  { week: 'W6', likes: 28400, comments: 8100, shares: 4100 },
];

const sentimentBreakdownData = [
  { label: 'Positive', icon: '😊', value: 45, color: '#4caf82' },
  { label: 'Weak Positive', icon: '🙂', value: 20, color: '#8bc34a' },
  { label: 'Neutral', icon: '😐', value: 20, color: '#f7a84f' },
  { label: 'Negative', icon: '😞', value: 15, color: '#f74f4f' },
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
  const [igPosts, setIgPosts] = useState([]);
  const maxVal = Math.max(...weeklyData.map(d => d[selected]));

  useEffect(() => {
    getInstagramPosts().then(function(data) {
      if (data && data.length > 0) {
        setIgPosts(data);
      }
    });
  }, []);

  const totalLikes = igPosts.length > 0 ? igPosts.reduce((sum, p) => sum + (parseInt(p.likes) || 0), 0) : 142300;
  const totalComments = igPosts.length > 0 ? igPosts.reduce((sum, p) => sum + (parseInt(p.comments) || 0), 0) : 38700;

  // Static sentiment values based on fixed sentiment categories
  const sentimentChartData = [
    { name: 'Positive', value: 45, color: '#4caf82' },
    { name: 'Weak Positive', value: 20, color: '#8bc34a' },
    { name: 'Neutral', value: 20, color: '#f7a84f' },
    { name: 'Negative', value: 15, color: '#f74f4f' },
  ];

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', background: 'linear-gradient(135deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>📈 Engagement</h1>
        <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>Weekly performance across platforms</p>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: '\u2764\uFE0F Total Likes', value: totalLikes > 1000 ? (totalLikes / 1000).toFixed(1) + 'K' : totalLikes, change: '+12.4%', color: '#f74f4f' },
          { label: '\uD83D\uDCAC Total Comments', value: totalComments > 1000 ? (totalComments / 1000).toFixed(1) + 'K' : totalComments, change: '+8.1%', color: '#4f8ef7' },
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

      {/* Sentiment Breakdown */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa', marginBottom: '20px' }}>Sentiment Breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sentimentBreakdownData.map((item, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{item.label}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#fff', fontWeight: '700' }}>{item.value}%</span>
                </div>
              </div>
              <MiniBar value={item.value} max={45} color={item.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment Analysis Graphs */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', marginTop: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa', marginBottom: '20px' }}>Sentiment Distribution</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Bar Chart */}
          <div>
            <h3 style={{ fontSize: '14px', color: '#fff', marginBottom: '16px' }}>Sentiment Counts</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sentimentChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#4f8ef7" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div>
            <h3 style={{ fontSize: '14px', color: '#fff', marginBottom: '16px' }}>Sentiment Percentage</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sentimentChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Engagement;