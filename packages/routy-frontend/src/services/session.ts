const SESSION_KEY = '_session';

function get(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

function set(session: string) {
  localStorage.setItem(SESSION_KEY, session);
  window.dispatchEvent(new Event('storage'));
}

function unset() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('storage'));
}

export const sessionService = { get, set, unset };
