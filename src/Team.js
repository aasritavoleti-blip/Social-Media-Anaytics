import React, { useState } from 'react';

const teamMembers = [
  { name: 'Riya Sharma', role: 'Admin', platform: 'All Platforms', status: 'Online', avatar: 'R', color: '#4f8ef7' },
  { name: 'Arjun Mehta', role: 'Analyst', platform: 'Instagram', status: 'Online', avatar: 'A', color: '#4caf82' },
  { name: 'Priya Patel', role: 'Analyst', platform: 'Facebook', status: 'Away', avatar: 'P', color: '#f7a84f' },
  { name: 'Karan Singh', role: 'Viewer', platform: 'X', status: 'Offline', avatar: 'K', color: '#7c5af7' },
  { name: 'Sneha Reddy', role: 'Analyst', platform: 'All Platforms', status: 'Online', avatar: 'S', color: '#f74f4f' },
];

function Team() {
  const [search, setSearch] = useState('');
  const filtered = teamMembers.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );
  const statusColor = (s) => s === 'Online' ? '#4caf82' : s === 'Away' ? '#f7a84f' : '#555';

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', background: 'linear-gradient(135deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Team</h1>
          <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>Manage users and permissions</p>
        </div>
        <button style={{ padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #4f8ef7, #7c5af7)', border: 'none', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Segoe UI' }}>
          + Add Member
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Members', value: teamMembers.length, color: '#4f8ef7' },
          { label: 'Online Now', value: teamMembers.filter(m => m.status === 'Online').length, color: '#4caf82' },
          { label: 'Admins', value: teamMembers.filter(m => m.role === 'Admin').length, color: '#7c5af7' },
        ].map((m, i) => (
          <div key={i} style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', transition: 'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>{m.label}</div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <input type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(15,17,23,0.8)', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'Segoe UI', boxSizing: 'border-box' }} />
      </div>

      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '14px', fontWeight: '600', color: '#aaa' }}>
          Members ({filtered.length})
        </div>
        {filtered.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(79,142,247,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, ' + m.color + ', ' + m.color + '88)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
              {m.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{m.name}</div>
              <div style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}>{m.platform}</div>
            </div>
            <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', background: m.role === 'Admin' ? 'rgba(124,90,247,0.15)' : m.role === 'Analyst' ? 'rgba(79,142,247,0.15)' : 'rgba(255,255,255,0.06)', color: m.role === 'Admin' ? '#7c5af7' : m.role === 'Analyst' ? '#4f8ef7' : '#888' }}>
              {m.role}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor(m.status) }} />
              <span style={{ fontSize: '12px', color: statusColor(m.status) }}>{m.status}</span>
            </div>
            <button style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#888', fontSize: '12px', cursor: 'pointer', fontFamily: 'Segoe UI', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,142,247,0.1)'; e.currentTarget.style.color = '#4f8ef7'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#888'; }}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;