import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { formatDate, stripHtml } from '../utils/helpers';

export default function NoteCard({ note, onDelete, onToggleArchive, busy }) {
  const { locale, t } = useApp();
  return (
    <article className="note-card">
      <Link className="note-content" to={`/notes/${note.id}`}>
        <div className="note-date">{formatDate(note.createdAt, locale)}</div>
        <h2>{note.title}</h2>
        <p>{stripHtml(note.body)}</p>
      </Link>
      <div className="note-actions">
        <button disabled={busy} className="secondary-button" onClick={() => onToggleArchive(note.id)}>
          {note.archived ? `↩ ${t.unarchive}` : `▣ ${t.archive}`}
        </button>
        <button disabled={busy} className="danger-button" onClick={() => onDelete(note.id)}>
          × {t.delete}
        </button>
      </div>
    </article>
  );
}
