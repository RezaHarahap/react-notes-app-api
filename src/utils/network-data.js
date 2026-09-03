const BASE_URL = 'https://notes-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  localStorage.setItem('accessToken', accessToken);
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const responseJson = await response.json();
  return { error: !response.ok, data: responseJson.data, message: responseJson.message };
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const responseJson = await response.json();
  return { error: !response.ok, data: responseJson.data, message: responseJson.message };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();
  return { error: !response.ok, data: responseJson.data, message: responseJson.message };
}

async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body }),
  });
  const responseJson = await response.json();
  return { error: !response.ok, data: responseJson.data, message: responseJson.message };
}

async function getActiveNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson = await response.json();
  return { error: !response.ok, data: responseJson.data, message: responseJson.message };
}

async function getArchivedNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const responseJson = await response.json();
  return { error: !response.ok, data: responseJson.data, message: responseJson.message };
}

async function getNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const responseJson = await response.json();
  return { error: !response.ok, data: responseJson.data, message: responseJson.message };
}

async function archiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, { method: 'POST' });
  const responseJson = await response.json();
  return { error: !response.ok, message: responseJson.message };
}

async function unarchiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, { method: 'POST' });
  const responseJson = await response.json();
  return { error: !response.ok, message: responseJson.message };
}

async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
  const responseJson = await response.json();
  return { error: !response.ok, message: responseJson.message };
}

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
