import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const dictionary = {
  id: {
    appName: 'RuangCatat', active: 'Catatan', archived: 'Arsip', add: 'Tulis catatan', logout: 'Keluar',
    login: 'Masuk', register: 'Daftar', email: 'Email', password: 'Kata sandi', confirm: 'Konfirmasi kata sandi',
    name: 'Nama', noAccount: 'Belum punya akun?', haveAccount: 'Sudah punya akun?', welcome: 'Selamat datang kembali',
    registerTitle: 'Buat ruang catatmu', loginSubtitle: 'Masuk untuk melanjutkan ide-ide hebatmu.',
    registerSubtitle: 'Daftar dan simpan pikiranmu dengan aman.', title: 'Judul', body: 'Isi catatan', save: 'Simpan catatan',
    search: 'Cari berdasarkan judul...', empty: 'Belum ada catatan di sini.', noResult: 'Tidak ada catatan yang cocok.',
    loading: 'Memuat...', delete: 'Hapus', archive: 'Arsipkan', unarchive: 'Aktifkan', back: 'Kembali',
    deleteConfirm: 'Hapus catatan ini secara permanen?', notFound: 'Halaman tidak ditemukan', home: 'Kembali ke beranda',
    created: 'Catatan berhasil dibuat.', deleted: 'Catatan berhasil dihapus.', archivedDone: 'Catatan berhasil diarsipkan.',
    unarchivedDone: 'Catatan berhasil diaktifkan.', passwordMismatch: 'Konfirmasi kata sandi tidak cocok.',
    passwordRule: 'Kata sandi minimal 6 karakter.', required: 'Semua kolom wajib diisi.', accountCreated: 'Akun berhasil dibuat. Silakan masuk.',
    charLeft: 'karakter tersisa', member: 'Pengguna aktif', switchTheme: 'Ubah tema', switchLanguage: 'Ubah bahasa',
  },
  en: {
    appName: 'NoteSpace', active: 'Notes', archived: 'Archive', add: 'Write note', logout: 'Log out',
    login: 'Log in', register: 'Register', email: 'Email', password: 'Password', confirm: 'Confirm password',
    name: 'Name', noAccount: 'No account yet?', haveAccount: 'Already have an account?', welcome: 'Welcome back',
    registerTitle: 'Create your note space', loginSubtitle: 'Sign in to continue your brilliant ideas.',
    registerSubtitle: 'Register and keep your thoughts safe.', title: 'Title', body: 'Note content', save: 'Save note',
    search: 'Search by title...', empty: 'There are no notes here yet.', noResult: 'No matching notes found.',
    loading: 'Loading...', delete: 'Delete', archive: 'Archive', unarchive: 'Activate', back: 'Back',
    deleteConfirm: 'Delete this note permanently?', notFound: 'Page not found', home: 'Return home',
    created: 'Note created successfully.', deleted: 'Note deleted successfully.', archivedDone: 'Note archived successfully.',
    unarchivedDone: 'Note activated successfully.', passwordMismatch: 'Password confirmation does not match.',
    passwordRule: 'Password must be at least 6 characters.', required: 'All fields are required.', accountCreated: 'Account created. Please log in.',
    charLeft: 'characters remaining', member: 'Active user', switchTheme: 'Switch theme', switchLanguage: 'Switch language',
  },
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'id');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem('locale', locale);
  }, [locale]);

  const value = useMemo(() => ({
    theme,
    locale,
    t: dictionary[locale],
    toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    toggleLocale: () => setLocale((current) => (current === 'id' ? 'en' : 'id')),
  }), [theme, locale]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
