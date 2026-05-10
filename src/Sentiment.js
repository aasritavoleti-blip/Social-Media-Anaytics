import React, { useState } from 'react';

const sentimentComments = [
  { text: 'Great product, love the new update!', sentiment: 'Positive', platform: 'Instagram', time: '2 mins ago', score: 92 },
  { text: 'Customer support is very slow to respond', sentiment: 'Negative', platform: 'X', time: '15 mins ago', score: 18 },
  { text: 'When is the next sale happening?', sentiment: 'Neutral', platform: 'Facebook', time: '1 hour ago', score: 50 },
  { text: 'App keeps crashing on my device repeatedly', sentiment: 'Negative', platform: 'X', time: '2 hours ago', score: 12 },
  { text: 'Absolutely love the packaging and quality!', sentiment: 'Positive', platform: 'Instagram', time: '3 hours ago', score: 95 },
  { text: 'Delivery was delayed by 3 days', sentiment: 'Negative', platform: 'Facebook', time: '4 hours ago', score: 22 },
  { text: 'Product is okay, nothing special', sentiment: 'Neutral', platform: 'X', time: '5 hours ago', score: 48 },
  { text: 'Best purchase I have made this year!', sentiment: 'Positive', platform: 'Instagram', time: '6 hours ago', score: 98 },
];

function Sentiment() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? sentimentComments : sentimentComments.filter(function(c) { return c.sentiment === filter; });
  const positive = sentimentComments.filter(function(c) { return c.sentiment === 'Positive'; }).length;
  const negative = sentimentComments.filter(function(c) { return c.sentiment === 'Negative'; }).length;
  const neutral = sentimentComments.filter(function(c) { return c.sentiment === 'Neutral'; }).length;
  const total = sentimentComments.length;

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#fff' }}>Sentiment Analysis</h1>
        <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>Comment sentiment tracking</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(76,175,130,0.1)', border: '1px solid rgba(76,175,130,0.2)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>Positive</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#4caf82' }}>{positive}</div>
          <div style={{ fontSize: '12px', color: '#4caf82', marginTop: '8px' }}>{Math.round((positive / total) * 100)}%</div>
        </div>
        <div style={{ background: 'rgba(247,168,79,0.1)', border: '1px solid rgba(247,168,79,0.2)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>Neutral</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#f7a84f' }}>{neutral}</div>
          <div style={{ fontSize: '12px', color: '#f7a84f', marginTop: '8px' }}>{Math.round((neutral / total) * 100)}%</div>
        </div>
        <div style={{ background: 'rgba(247,79,79,0.1)', border: '1px solid rgba(247,79,79,0.2)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>Negative</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#f74f4f' }}>{negative}</div>
          <div style={{ fontSize: '12px', color: '#f74f4f', marginTop: '8px' }}>{Math.round((negative / total) * 100)}%</div>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa' }}>Comment Analysis</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Positive', 'Neutral', 'Negative'].map(function(f) {
              return (
                <button key={f} onClick={function() { setFilter(f); }} style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', background: filter === f ? '#4f8ef7' : 'transparent', color: filter === f ? '#fff' : '#555', cursor: 'pointer', fontSize: '12px', fontFamily: 'Segoe UI' }}>
                  {f}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(function(c, i) {
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '600', whiteSpace: 'nowrap', background: c.sentiment === 'Positive' ? 'rgba(76,175,130,0.15)' : c.sentiment === 'Negative' ? 'rgba(247,79,79,0.15)' : 'rgba(247,168,79,0.15)', color: c.sentiment === 'Positive' ? '#4caf82' : c.sentiment === 'Negative' ? '#f74f4f' : '#f7a84f' }}>
                  {c.sentiment}
                </span>
                <span style={{ flex: 1, fontSize: '13px', color: '#ccc' }}>{c.text}</span>
                <span style={{ fontSize: '11px', color: '#444', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>{c.platform}</span>
                <span style={{ fontSize: '11px', color: '#333', whiteSpace: 'nowrap' }}>{c.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sentiment;