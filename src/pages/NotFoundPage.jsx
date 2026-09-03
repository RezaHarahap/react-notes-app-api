import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
export default function NotFoundPage() { const { t } = useApp(); return <section className="not-found"><strong>404</strong><h1>{t.notFound}</h1><Link className="primary-button" to="/">{t.home}</Link></section>; }
