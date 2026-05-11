import React, { useState, useEffect } from 'react';
import { checkServiceNowStatus } from './api';

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoAlert, setAutoAlert] = useState(true);
  const [emailReport, setEmailReport] = useState(false);
  const [refreshRate, setRefreshRate] = useState('60');
  const [saved, setSaved] = useState(false);

  const [snStatus, setSnStatus] = useState(null);

  useEffect(() => {
    checkServiceNowStatus().then(setSnStatus);
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{ width: '44px', height: '24px', borderRadius: '12px', background: value ? 'linear-gradient(135deg, #4f8ef7, #7c5af7)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s', flexShrink: 0 }}>
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', left: value ? '23px' : '3px', transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
    </div>
  );

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease', maxWidth: '680px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', background: 'linear-gradient(135deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Settings</h1>
        <p style={{ fontSize: '12px', color: '#444', marginTop: '4px' }}>Manage your platform preferences</p>
      </div>

      {/* Notifications */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa', marginBottom: '20px' }}>Notifications</div>
        {[
          { label: 'Push Notifications', sub: 'Receive alerts for negative sentiment', value: notifications, onChange: setNotifications },
          { label: 'Auto Alert Generation', sub: 'Automatically create incidents for negative spikes', value: autoAlert, onChange: setAutoAlert },
          { label: 'Email Reports', sub: 'Receive weekly performance reports via email', value: emailReport, onChange: setEmailReport },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#ccc', fontWeight: '500' }}>{item.label}</div>
              <div style={{ fontSize: '11px', color: '#444', marginTop: '3px' }}>{item.sub}</div>
            </div>
            <Toggle value={item.value} onChange={item.onChange} />
          </div>
        ))}
      </div>

      {/* Appearance */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa', marginBottom: '20px' }}>Appearance</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#ccc', fontWeight: '500' }}>Dark Mode</div>
            <div style={{ fontSize: '11px', color: '#444', marginTop: '3px' }}>Use dark theme across the platform</div>
          </div>
          <Toggle value={darkMode} onChange={setDarkMode} />
        </div>
      </div>

      {/* Data Settings */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa', marginBottom: '20px' }}>Data & Refresh</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#ccc', fontWeight: '500' }}>Auto Refresh Rate</div>
            <div style={{ fontSize: '11px', color: '#444', marginTop: '3px' }}>How often to fetch new data</div>
          </div>
          <select value={refreshRate} onChange={e => setRefreshRate(e.target.value)} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: '#0f1117', color: '#ccc', fontSize: '13px', cursor: 'pointer', outline: 'none', fontFamily: 'Segoe UI' }}>
            <option value="30">Every 30 seconds</option>
            <option value="60">Every 60 seconds</option>
            <option value="300">Every 5 minutes</option>
            <option value="600">Every 10 minutes</option>
          </select>
        </div>
      </div>

      {/* API Connections */}
      <div style={{ background: 'linear-gradient(135deg, #0f1117, #131620)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#aaa', marginBottom: '20px' }}>API Connections</div>
        {[
          { name: 'Instagram API', status: 'Connected', color: '#4caf82' },
          { name: 'Facebook API', status: 'Connected', color: '#4caf82' },
          { name: 'X (Twitter) API', status: 'Disconnected', color: '#f74f4f' },
          { name: 'ServiceNow API', status: snStatus && snStatus.connected ? 'Connected' : 'Disconnected', color: snStatus && snStatus.connected ? '#4caf82' : '#f74f4f' },
        ].map((api, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
            <div style={{ fontSize: '13px', color: '#ccc' }}>{api.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: api.color }} />
              <span style={{ fontSize: '12px', color: api.color }}>{api.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button onClick={handleSave} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: saved ? 'linear-gradient(135deg, #4caf82, #2d8a5e)' : 'linear-gradient(135deg, #4f8ef7, #7c5af7)', border: 'none', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s', fontFamily: 'Segoe UI', boxShadow: '0 4px 15px rgba(79,142,247,0.3)' }}>
        {saved ? 'Saved!' : 'Save Settings'}
      </button>
    </div>
  );
}

export default Settings;