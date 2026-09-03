import { useEffect } from 'react';

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`} role="alert">
      <span>{type === 'error' ? '!' : '✓'}</span>
      <p>{message}</p>
      <button onClick={onClose} aria-label="Tutup notifikasi">×</button>
    </div>
  );
}
