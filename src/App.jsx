import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import Toast from './components/Toast';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';
import { getAccessToken, getUserLogged, putAccessToken, removeAccessToken } from './utils/network-data';

export default function App() {
  const [auth, setAuth] = useState({ initializing: true, user: null });
  const [toast, setToast] = useState(null);
  useEffect(() => { async function initializeAuth() { if (!getAccessToken()) { setAuth({ initializing: false, user: null }); return; } try { const result = await getUserLogged(); if (result.error) { removeAccessToken(); setAuth({ initializing: false, user: null }); } else setAuth({ initializing: false, user: result.data }); } catch { setAuth({ initializing: false, user: null }); setToast({ type: 'error', message: 'Tidak dapat terhubung ke server.' }); } } initializeAuth(); }, []);
  async function onLogin(accessToken) { putAccessToken(accessToken); const result = await getUserLogged(); if (result.error) throw new Error(result.message); setAuth({ initializing: false, user: result.data }); }
  function onLogout() { removeAccessToken(); setAuth({ initializing: false, user: null }); }
  function notify(message, type = 'success') { setToast({ message, type }); }
  if (auth.initializing) return <Loading fullScreen />;
  return <div className="app-shell"><Header user={auth.user} onLogout={onLogout} /><main className="main-content">{auth.user ? <Routes><Route path="/" element={<NotesPage archived={false} notify={notify} />} /><Route path="/archives" element={<NotesPage archived notify={notify} />} /><Route path="/notes/new" element={<AddPage notify={notify} />} /><Route path="/notes/:id" element={<DetailPage notify={notify} />} /><Route path="/login" element={<Navigate to="/" replace />} /><Route path="/register" element={<Navigate to="/" replace />} /><Route path="*" element={<NotFoundPage />} /></Routes> : <Routes><Route path="/login" element={<LoginPage onLogin={onLogin} />} /><Route path="/register" element={<RegisterPage />} /><Route path="*" element={<Navigate to="/login" replace />} /></Routes>}</main>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</div>;
}
