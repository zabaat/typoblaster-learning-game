import type { Creature } from "./types";

export function scoreForWord(creature: Creature, streak: number) {
  return 80 + creature.word.length * 20 + streak * 8 + creature.tier * 35;
}
