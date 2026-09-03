import { NavLink } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export default function Header({ user, onLogout }) {
  const { theme, locale, t, toggleTheme, toggleLocale } = useApp();

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink className="brand" to={user ? '/' : '/login'} aria-label={t.appName}>
          <span className="brand-mark">R</span><span>{t.appName}</span>
        </NavLink>
        {user && (
          <nav className="nav" aria-label="Navigasi utama">
            <NavLink to="/" end>{t.active}</NavLink>
            <NavLink to="/archives">{t.archived}</NavLink>
            <NavLink className="nav-add" to="/notes/new">＋ {t.add}</NavLink>
          </nav>
        )}
        <div className="header-actions">
          <button className="icon-button" onClick={toggleTheme} title={t.switchTheme} aria-label={t.switchTheme}>
            {theme === 'light' ? '☾' : '☀'}
          </button>
          <button className="language-button" onClick={toggleLocale} title={t.switchLanguage}>
            {locale === 'id' ? 'EN' : 'ID'}
          </button>
          {user && (
            <div className="user-menu">
              <span className="avatar" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</span>
              <div className="user-copy"><strong>{user.name}</strong><small>{user.email}</small></div>
              <button className="logout-button" onClick={onLogout}>{t.logout}</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
