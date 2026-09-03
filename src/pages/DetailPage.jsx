import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useApp } from '../contexts/AppContext';
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/network-data';
import { formatDate } from '../utils/helpers';

export default function DetailPage({ notify }) {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { locale, t } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    getNote(id).then((result) => {
      if (!active) return;
      if (result.error) setError(result.message);
      else setNote(result.data);
    }).catch(() => setError('Tidak dapat terhubung ke server.')).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  async function remove() {
    if (!window.confirm(t.deleteConfirm)) return;
    setBusy(true);
    const result = await deleteNote(id);
    if (result.error) { notify(result.message, 'error'); setBusy(false); return; }
    notify(t.deleted);
    navigate(note.archived ? '/archives' : '/');
  }

  async function toggleArchive() {
    setBusy(true);
    const result = await (note.archived ? unarchiveNote(id) : archiveNote(id));
    if (result.error) { notify(result.message, 'error'); setBusy(false); return; }
    notify(note.archived ? t.unarchivedDone : t.archivedDone);
    navigate(note.archived ? '/' : '/archives');
  }

  if (loading) return <Loading />;
  if (error || !note) return <section className="empty-state"><h1>{error || t.notFound}</h1><Link to="/">{t.home}</Link></section>;
  return (
    <article className="detail-page page-container">
      <Link className="back-link" to={note.archived ? '/archives' : '/'}>← {t.back}</Link>
      <div className="detail-card">
        <span className="eyebrow">{note.archived ? t.archived : t.active}</span>
        <h1>{note.title}</h1>
        <time>{formatDate(note.createdAt, locale)}</time>
        <div className="detail-body">{note.body}</div>
        <div className="editor-actions"><button className="secondary-button" onClick={toggleArchive} disabled={busy}>{note.archived ? t.unarchive : t.archive}</button><button className="danger-button" onClick={remove} disabled={busy}>{t.delete}</button></div>
      </div>
    </article>
  );
}
