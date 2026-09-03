import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import { useApp } from '../contexts/AppContext';
import { archiveNote, deleteNote, getActiveNotes, getArchivedNotes, unarchiveNote } from '../utils/network-data';

export default function NotesPage({ archived, notify }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useApp();
  const keyword = searchParams.get('q') || '';

  useEffect(() => {
    let active = true;
    async function loadNotes() {
      setLoading(true);
      setError('');
      try {
        const result = await (archived ? getArchivedNotes() : getActiveNotes());
        if (result.error) throw new Error(result.message);
        if (active) setNotes(result.data);
      } catch (caughtError) {
        if (active) setError(caughtError.message || 'Tidak dapat memuat catatan.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadNotes();
    return () => { active = false; };
  }, [archived]);

  const visibleNotes = useMemo(() => notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase())), [notes, keyword]);

  async function onDelete(id) {
    if (!window.confirm(t.deleteConfirm)) return;
    setBusyId(id);
    try {
      const result = await deleteNote(id);
      if (result.error) throw new Error(result.message);
      setNotes((current) => current.filter((note) => note.id !== id));
      notify(t.deleted);
    } catch (caughtError) {
      notify(caughtError.message, 'error');
    } finally { setBusyId(null); }
  }

  async function onToggleArchive(id) {
    setBusyId(id);
    try {
      const result = await (archived ? unarchiveNote(id) : archiveNote(id));
      if (result.error) throw new Error(result.message);
      setNotes((current) => current.filter((note) => note.id !== id));
      notify(archived ? t.unarchivedDone : t.archivedDone);
    } catch (caughtError) {
      notify(caughtError.message, 'error');
    } finally { setBusyId(null); }
  }

  return (
    <section className="page-container">
      <div className="page-heading">
        <div><span className="eyebrow">{archived ? 'COLLECTION' : 'WORKSPACE'}</span><h1>{archived ? t.archived : t.active}</h1></div>
        {!archived && <Link className="primary-button" to="/notes/new">＋ {t.add}</Link>}
      </div>
      <div className="search-box"><span>⌕</span><input value={keyword} onChange={(event) => setSearchParams(event.target.value ? { q: event.target.value } : {})} placeholder={t.search} aria-label={t.search} /></div>
      {loading && <Loading />}
      {error && <div className="form-error centered" role="alert">{error}</div>}
      {!loading && !error && visibleNotes.length === 0 && <EmptyState isSearch={Boolean(keyword)} archived={archived} />}
      <div className="notes-grid">
        {visibleNotes.map((note) => <NoteCard key={note.id} note={note} onDelete={onDelete} onToggleArchive={onToggleArchive} busy={busyId === note.id} />)}
      </div>
    </section>
  );
}
