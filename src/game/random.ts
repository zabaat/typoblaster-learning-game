export function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function randomInt(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

export function randomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}
