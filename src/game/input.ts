export function normalizeKey(key: string) {
  if (key === " ") return "SPACE";
  if (key === "Escape") return "ESCAPE";
  if (key === "Enter") return "ENTER";
  if (key === "Backspace") return "BACKSPACE";
  return key.toUpperCase();
}

export function isLetterKey(key: string) {
  return /^[A-Z]$/.test(key);
}
