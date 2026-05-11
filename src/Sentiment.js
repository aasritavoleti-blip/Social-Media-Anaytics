import React, { useState, useEffect } from 'react';
import { getSocialMediaComments } from './api';

function Sentiment() {
  const [filter, setFilter] = useState('All');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSocialMediaComments().then(data => {
      if (data && data.length > 0) {
        setComments(data);
      }
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'All' ? comments : comments.filter(function(c) {
    return c.sentiment && c.sentiment.toLowerCase() === filter.toLowerCase();
  });

  const positive = comments.filter(function(c) { return c.sentiment && c.sentiment.toLowerCase() === 'positive'; }).length;
  const negative = comments.filter(function(c) { return c.sentiment && c.sentiment.toLowerCase() === 'negative'; }).length;
  const neutral = comments.filter(function(c) { return c.sentiment && c.sentiment.toLowerCase() === 'neutral'; }).length;
  const total = comments.length || 1;

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#555', fontSize: '14px' }}>Loading from ServiceNow...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', background: 'linear-gradient(135deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Sentiment Analysis
        </h1>
        <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>Live data from ServiceNow · {comments.length} comments</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(76,175,130,0.1)', border: '1px solid rgba(76,175,130,0.2)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>😊 Positive</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#4caf82' }}>{positive}</div>
          <div style={{ fontSize: '12px', color: '#4caf82', marginTop: '8px' }}>{Math.round((positive / total) * 100)}%</div>
        </div>
        <div style={{ background: 'rgba(247,168,79,0.1)', border: '1px solid rgba(247,168,79,0.2)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>😐 Neutral</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#f7a84f' }}>{neutral}</div>
          <div style={{ fontSize: '12px', color: '#f7a84f', marginTop: '8px' }}>{Math.round((neutral / total) * 100)}%</div>
        </div>
        <div style={{ background: 'rgba(247,79,79,0.1)', border: '1px solid rgba(247,79,79,0.2)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>😠 Negative</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#f74f4f' }}>{negative}</div>
          <div style={{ fontSize: '12px', color: '#f74f4f', marginTop: '8px' }}>{Math.round((negative / total) * 100)}%</div>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa' }}>Live Comments from ServiceNow</div>
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

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#444' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
            <p>No comments found</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map(function(c, i) {
              const sent = c.sentiment ? c.sentiment.toLowerCase() : 'neutral';
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.2s' }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(79,142,247,0.06)'; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                  <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '600', whiteSpace: 'nowrap', background: sent === 'positive' ? 'rgba(76,175,130,0.15)' : sent === 'negative' ? 'rgba(247,79,79,0.15)' : 'rgba(247,168,79,0.15)', color: sent === 'positive' ? '#4caf82' : sent === 'negative' ? '#f74f4f' : '#f7a84f' }}>
                    {c.sentiment || 'Neutral'}
                  </span>
                  <span style={{ flex: 1, fontSize: '13px', color: '#ccc' }}>{c.comment_text || 'No comment'}</span>
                  <span style={{ fontSize: '11px', color: '#444', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>{c.platform || 'Unknown'}</span>
                  <span style={{ fontSize: '11px', color: '#333', whiteSpace: 'nowrap' }}>{c.username || ''}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sentiment;