import React, { useState } from 'react';

const incidentsData = [
  { id: 'INC0012847', title: 'Negative Spike Detected', platform: 'X', priority: 'High', status: 'Open', assignee: 'Arjun Mehta', time: '2 mins ago', desc: '23 negative mentions detected in 1 hour' },
  { id: 'INC0012839', title: 'Brand Mention Alert', platform: 'Facebook', priority: 'High', status: 'In Progress', assignee: 'Priya Patel', time: '15 mins ago', desc: 'Harmful keyword detected in comments' },
  { id: 'INC0012831', title: 'Engagement Drop', platform: 'Instagram', priority: 'Medium', status: 'In Progress', assignee: 'Sneha Reddy', time: '1 hour ago', desc: 'Instagram engagement dropped by 40%' },
  { id: 'INC0012820', title: 'Comment Spam', platform: 'Facebook', priority: 'Low', status: 'Resolved', assignee: 'Karan Singh', time: '3 hours ago', desc: 'Spam comments detected on multiple posts' },
  { id: 'INC0012801', title: 'Negative Review Cluster', platform: 'Instagram', priority: 'High', status: 'Resolved', assignee: 'Arjun Mehta', time: '5 hours ago', desc: '15 negative reviews posted within 30 mins' },
];

function Incidents() {
  const [filter, setFilter] = useState('All');
  const [incidents, setIncidents] = useState(incidentsData);

  const filtered = filter === 'All' ? incidents : incidents.filter(function(inc) { return inc.status === filter; });

  const priorityColor = function(p) { return p === 'High' ? '#f74f4f' : p === 'Medium' ? '#f7a84f' : '#4caf82'; };
  const statusColor = function(s) { return s === 'Open' ? '#f74f4f' : s === 'In Progress' ? '#f7a84f' : '#4caf82'; };
  const statusBg = function(s) { return s === 'Open' ? 'rgba(247,79,79,0.15)' : s === 'In Progress' ? 'rgba(247,168,79,0.15)' : 'rgba(76,175,130,0.15)'; };

  const resolve = function(id) {
    setIncidents(prev => prev.map(function(inc) { return inc.id === id ? { ...inc, status: 'Resolved' } : inc; }));
  };

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', background: 'linear-gradient(135deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Incidents</h1>
          <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>
            <span style={{ color: '#f74f4f', fontWeight: '600' }}>{incidents.filter(function(i) { return i.status !== 'Resolved'; }).length} active</span> · {incidents.filter(function(i) { return i.status === 'Resolved'; }).length} resolved
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Open', 'In Progress', 'Resolved'].map(function(f) {
            return (
              <button key={f} onClick={function() { setFilter(f); }} style={{ padding: '7px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', background: filter === f ? 'linear-gradient(135deg, #4f8ef7, #7c5af7)' : 'transparent', color: filter === f ? '#fff' : '#555', cursor: 'pointer', fontSize: '12px', fontFamily: 'Segoe UI', transition: 'all 0.2s' }}>
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Open', value: incidents.filter(function(i) { return i.status === 'Open'; }).length, color: '#f74f4f', bg: 'rgba(247,79,79,0.1)', border: 'rgba(247,79,79,0.2)' },
          { label: 'In Progress', value: incidents.filter(function(i) { return i.status === 'In Progress'; }).length, color: '#f7a84f', bg: 'rgba(247,168,79,0.1)', border: 'rgba(247,168,79,0.2)' },
          { label: 'Resolved', value: incidents.filter(function(i) { return i.status === 'Resolved'; }).length, color: '#4caf82', bg: 'rgba(76,175,130,0.1)', border: 'rgba(76,175,130,0.2)' },
        ].map(function(m, i) {
          return (
            <div key={i} style={{ background: m.bg, border: '1px solid ' + m.border, borderRadius: '16px', padding: '20px', transition: 'all 0.3s', cursor: 'pointer' }}
              onMouseEnter={function(e) { e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={function(e) { e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>{m.label}</div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: m.color }}>{m.value}</div>
            </div>
          );
        })}
      </div>

      {/* Incidents List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(function(inc, i) {
          return (
            <div key={i} style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.2s' }}
              onMouseEnter={function(e) { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.borderColor = 'rgba(79,142,247,0.2)'; }}
              onMouseLeave={function(e) { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{inc.id}</span>
                  <span style={{ fontSize: '11px', color: '#444', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '6px' }}>{inc.platform}</span>
                  <span style={{ fontSize: '11px', color: '#444' }}>{inc.time}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#ccc', marginBottom: '4px' }}>{inc.title}</div>
                <div style={{ fontSize: '12px', color: '#555' }}>{inc.desc}</div>
                <div style={{ fontSize: '11px', color: '#444', marginTop: '6px' }}>Assigned to: <span style={{ color: '#888' }}>{inc.assignee}</span></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: 'rgba(247,79,79,0.15)', color: priorityColor(inc.priority), border: '1px solid ' + priorityColor(inc.priority) + '33' }}>
                  {inc.priority}
                </span>
                <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: statusBg(inc.status), color: statusColor(inc.status) }}>
                  {inc.status}
                </span>
                {inc.status !== 'Resolved' && (
                  <button onClick={function() { resolve(inc.id); }} style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(76,175,130,0.1)', border: '1px solid rgba(76,175,130,0.2)', color: '#4caf82', fontSize: '12px', cursor: 'pointer', fontFamily: 'Segoe UI', transition: 'all 0.2s' }}>
                    Resolve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Incidents;