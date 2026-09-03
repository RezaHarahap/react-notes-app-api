import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useInput from '../hooks/useInput';
import useAsync from '../hooks/useAsync';
import { useApp } from '../contexts/AppContext';
import { login } from '../utils/network-data';

export default function LoginPage({ onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [error, setError] = useState('');
  const { loading, run } = useAsync();
  const { t } = useApp();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await run(async () => {
        const result = await login({ email, password });
        if (result.error) throw new Error(result.message);
        await onLogin(result.data.accessToken);
        navigate('/', { replace: true });
      });
    } catch (caughtError) {
      setError(caughtError.message || 'Terjadi kesalahan.');
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-art">
        <span className="art-badge">✦ IDEAS LIVE HERE</span>
        <h2>Capture thoughts.<br />Create <em>possibilities.</em></h2>
        <p>Catatan kecil hari ini dapat menjadi karya besar esok hari.</p>
      </div>
      <form className="auth-card" onSubmit={onSubmit}>
        <div className="eyebrow">WELCOME</div>
        <h1>{t.welcome}</h1>
        <p className="muted">{t.loginSubtitle}</p>
        {error && <div className="form-error" role="alert">{error}</div>}
        <label htmlFor="email">{t.email}</label>
        <input id="email" type="email" value={email} onChange={onEmailChange} placeholder="nama@email.com" required autoComplete="email" />
        <label htmlFor="password">{t.password}</label>
        <input id="password" type="password" value={password} onChange={onPasswordChange} placeholder="••••••••" required minLength="6" autoComplete="current-password" />
        <button className="primary-button wide" disabled={loading}>{loading ? t.loading : t.login}</button>
        <p className="auth-switch">{t.noAccount} <Link to="/register">{t.register}</Link></p>
      </form>
    </section>
  );
}
