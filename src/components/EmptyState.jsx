import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export default function EmptyState({ isSearch, archived }) {
  const { t } = useApp();
  return (
    <section className="empty-state">
      <span aria-hidden="true">✎</span>
      <h2>{isSearch ? t.noResult : t.empty}</h2>
      {!isSearch && !archived && <Link className="primary-button" to="/notes/new">＋ {t.add}</Link>}
    </section>
  );
}
