import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        onLogin('Admin');
      } else if (username === 'analyst' && password === 'analyst123') {
        onLogin('Analyst');
      } else {
        setError('Invalid username or password!');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div style={{
      display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0c14 0%, #0f1117 50%, #0a0e1a 100%)',
      fontFamily: "'Segoe UI', sans-serif", overflow: 'hidden', position: 'relative'
    }}>
      {/* Animated background circles */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)', top: '-100px', left: '-100px', animation: 'float 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(76,175,130,0.08) 0%, transparent 70%)', bottom: '-50px', right: '-50px', animation: 'float 8s ease-in-out infinite reverse' }} />
      <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,79,79,0.06) 0%, transparent 70%)', top: '50%', right: '20%', animation: 'float 7s ease-in-out infinite' }} />

      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .login-card { animation: fadeIn 0.6s ease forwards; }
        .login-input:focus { border-color: #4f8ef7 !important; box-shadow: 0 0 0 3px rgba(79,142,247,0.15) !important; outline: none; }
        .login-btn:hover { background: #3a7ef0 !important; transform: translateY(-1px); box-shadow: 0 8px 25px rgba(79,142,247,0.35) !important; }
        .login-btn:active { transform: translateY(0); }
      `}</style>

      <div className="login-card" style={{
        background: 'rgba(26,29,46,0.9)', backdropFilter: 'blur(20px)',
        padding: '48px 40px', borderRadius: '24px',
        border: '1px solid rgba(79,142,247,0.2)',
        width: '400px', boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        position: 'relative', zIndex: 10
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #4f8ef7, #7c5af7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(79,142,247,0.4)'
          }}>📊</div>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', margin: '0 0 6px' }}>SMA Platform</h2>
          <p style={{ color: '#555', fontSize: '13px', margin: 0 }}>Social Media Analytics</p>
        </div>

        {/* Username */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#888', fontSize: '12px', display: 'block', marginBottom: '8px', fontWeight: '500' }}>USERNAME</label>
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter your username"
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '10px',
              border: '1px solid #2a2d3e', background: 'rgba(15,17,23,0.8)',
              color: '#fff', fontSize: '14px', transition: 'all 0.3s', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#888', fontSize: '12px', display: 'block', marginBottom: '8px', fontWeight: '500' }}>PASSWORD</label>
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter your password"
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '10px',
              border: '1px solid #2a2d3e', background: 'rgba(15,17,23,0.8)',
              color: '#fff', fontSize: '14px', transition: 'all 0.3s', boxSizing: 'border-box'
            }}
          />
        </div>

        {error && (
          <div style={{
            background: 'rgba(247,79,79,0.1)', border: '1px solid rgba(247,79,79,0.3)',
            borderRadius: '8px', padding: '10px 14px', marginBottom: '16px',
            color: '#f74f4f', fontSize: '13px', animation: 'fadeIn 0.3s ease'
          }}>⚠️ {error}</div>
        )}

        <button
          className="login-btn"
          onClick={handleLogin}
          style={{
            width: '100%', padding: '14px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #4f8ef7, #7c5af7)',
            color: '#fff', border: 'none', fontSize: '15px',
            fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(79,142,247,0.3)'
          }}
        >
          {loading ? <span style={{ animation: 'pulse 1s infinite' }}>Signing in...</span> : 'Sign In →'}
        </button>

        <div style={{
          marginTop: '24px', padding: '14px', background: 'rgba(15,17,23,0.6)',
          borderRadius: '10px', border: '1px solid #2a2d3e'
        }}>
          <p style={{ color: '#555', fontSize: '11px', margin: '0 0 6px', fontWeight: '600' }}>DEMO CREDENTIALS</p>
          <p style={{ color: '#666', fontSize: '12px', margin: '3px 0' }}>👤 admin / admin123</p>
          <p style={{ color: '#666', fontSize: '12px', margin: '3px 0' }}>👤 analyst / analyst123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;