export function getItemFromLocalStorage(key: string) {
  return localStorage.getItem(makeKey(key));
}

export function setItemFromLocalStorage(key: string, value: string) {
  localStorage.setItem(makeKey(key), value);
}

function makeKey(key: string) {
  const prefix = 'sejongAi-';
  return `${prefix}${key}`;
}
