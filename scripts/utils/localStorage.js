export function setLocalStorage(name, lang) {
  window.localStorage.setItem(name, JSON.stringify(lang));
}

export function getLocalStorage(name) {
  if (window.localStorage.getItem(name)) {
    return JSON.parse(window.localStorage.getItem(name));
  }
  setLocalStorage(name, 'ru');
  return JSON.parse(window.localStorage.getItem(name));
}
