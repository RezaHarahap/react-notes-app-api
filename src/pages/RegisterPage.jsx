import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useInput from '../hooks/useInput';
import useAsync from '../hooks/useAsync';
import { useApp } from '../contexts/AppContext';
import { register } from '../utils/network-data';

export default function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirm, onConfirmChange] = useInput('');
  const [error, setError] = useState('');
  const { loading, run } = useAsync();
  const { t } = useApp();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password) return setError(t.required);
    if (password.length < 6) return setError(t.passwordRule);
    if (password !== confirm) return setError(t.passwordMismatch);
    setError('');
    try {
      await run(async () => {
        const result = await register({ name: name.trim(), email: email.trim(), password });
        if (result.error) throw new Error(result.message);
        navigate('/login', { replace: true, state: { message: t.accountCreated } });
      });
    } catch (caughtError) {
      setError(caughtError.message || 'Terjadi kesalahan.');
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-art register-art">
        <span className="art-badge">✦ YOUR SECOND BRAIN</span>
        <h2>Organize ideas.<br />Unlock <em>clarity.</em></h2>
        <p>Satu ruang sederhana untuk semua hal yang tidak ingin kamu lupakan.</p>
      </div>
      <form className="auth-card" onSubmit={onSubmit}>
        <div className="eyebrow">GET STARTED</div>
        <h1>{t.registerTitle}</h1>
        <p className="muted">{t.registerSubtitle}</p>
        {error && <div className="form-error" role="alert">{error}</div>}
        <label htmlFor="name">{t.name}</label>
        <input id="name" value={name} onChange={onNameChange} required autoComplete="name" />
        <label htmlFor="email">{t.email}</label>
        <input id="email" type="email" value={email} onChange={onEmailChange} required autoComplete="email" />
        <div className="form-grid">
          <div><label htmlFor="password">{t.password}</label><input id="password" type="password" value={password} onChange={onPasswordChange} required minLength="6" autoComplete="new-password" /></div>
          <div><label htmlFor="confirm">{t.confirm}</label><input id="confirm" type="password" value={confirm} onChange={onConfirmChange} required minLength="6" autoComplete="new-password" /></div>
        </div>
        <button className="primary-button wide" disabled={loading}>{loading ? t.loading : t.register}</button>
        <p className="auth-switch">{t.haveAccount} <Link to="/login">{t.login}</Link></p>
      </form>
    </section>
  );
}
