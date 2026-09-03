const BASE_URL = 'https://notes-api.dicoding.dev/v1';
function getAccessToken() { return localStorage.getItem('accessToken'); }
function putAccessToken(accessToken) { localStorage.setItem('accessToken', accessToken); }
function removeAccessToken() { localStorage.removeItem('accessToken'); }
async function fetchWithToken(url, options = {}) { return fetch(url, { ...options, headers: { ...options.headers, Authorization: `Bearer ${getAccessToken()}` } }); }
async function register({ name, email, password }) { const response = await fetch(`${BASE_URL}/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password}) }); const j=await response.json(); return {error:!response.ok,data:j.data,message:j.message}; }
async function login({ email, password }) { const response=await fetch(`${BASE_URL}/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); const j=await response.json(); return {error:!response.ok,data:j.data,message:j.message}; }
async function getUserLogged(){const r=await fetchWithToken(`${BASE_URL}/users/me`);const j=await r.json();return {error:!r.ok,data:j.data,message:j.message};}
async function addNote({title,body}){const r=await fetchWithToken(`${BASE_URL}/notes`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,body})});const j=await r.json();return {error:!r.ok,data:j.data,message:j.message};}
async function getActiveNotes(){const r=await fetchWithToken(`${BASE_URL}/notes`);const j=await r.json();return {error:!r.ok,data:j.data,message:j.message};}
async function getArchivedNotes(){const r=await fetchWithToken(`${BASE_URL}/notes/archived`);const j=await r.json();return {error:!r.ok,data:j.data,message:j.message};}
async function getNote(id){const r=await fetchWithToken(`${BASE_URL}/notes/${id}`);const j=await r.json();return {error:!r.ok,data:j.data,message:j.message};}
async function archiveNote(id){const r=await fetchWithToken(`${BASE_URL}/notes/${id}/archive`,{method:'POST'});const j=await r.json();return {error:!r.ok,message:j.message};}
async function unarchiveNote(id){const r=await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`,{method:'POST'});const j=await r.json();return {error:!r.ok,message:j.message};}
async function deleteNote(id){const r=await fetchWithToken(`${BASE_URL}/notes/${id}`,{method:'DELETE'});const j=await r.json();return {error:!r.ok,message:j.message};}
export {getAccessToken,putAccessToken,removeAccessToken,register,login,getUserLogged,addNote,getActiveNotes,getArchivedNotes,getNote,archiveNote,unarchiveNote,deleteNote};
