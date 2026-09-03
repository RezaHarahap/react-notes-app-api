import { useApp } from '../contexts/AppContext';

export default function Loading({ fullScreen = false }) {
  const { t } = useApp();
  return (
    <div className={fullScreen ? 'loading loading-full' : 'loading'} role="status" aria-live="polite">
      <span className="spinner" />
      <span>{t.loading}</span>
    </div>
  );
}
