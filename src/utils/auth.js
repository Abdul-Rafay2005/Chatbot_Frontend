const STORAGE_KEY = 'rag_current_user';
const CHATS_KEY = 'rag_chats';

export function login({ role, username, password }) {
  const isAdmin = (role==='admin' && username==='Rameez' && password==='Rameez123');
  const isUser = (role==='user' && username==='user' && password==='user123');
  if(isAdmin || isUser) {
    const user = { username, role };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser() {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t ? JSON.parse(t) : null;
  } catch(e) { return null; }
}

export function getChats() {
  try {
    const t = localStorage.getItem(CHATS_KEY);
    return t ? JSON.parse(t) : [];
  } catch(e){ return []; }
}

export function saveChat(chat) {
  const arr = getChats();
  const idx = arr.findIndex(c=>c.id===chat.id);
  if(idx===-1) arr.unshift(chat);
  else arr[idx] = chat;
  localStorage.setItem(CHATS_KEY, JSON.stringify(arr));
}

export function getChatById(id) {
  if(!id) return null;
  const arr = getChats();
  return arr.find(c=>c.id===id) || null;
}

export function deleteChatById(id) {
  const arr = getChats().filter(c=>c.id!==id);
  localStorage.setItem(CHATS_KEY, JSON.stringify(arr));
}
