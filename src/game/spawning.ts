import { CREATURE_COLORS, GAME_WIDTH, MAX_CREATURES } from "./constants";
import { makeId, randomBetween, randomItem } from "./random";
import type { Creature, GameState, WordEntry, WordTier } from "./types";
import { getWordsForBand } from "./wordBank";

export function updateDifficulty(state: GameState) {
  const level = 1 + Math.floor(state.elapsedSeconds / 35);
  state.level = level;

  if (state.settings.pace === "relaxed") {
    state.spawnIntervalMs = Math.max(2400, 4200 - level * 120);
    return;
  }

  if (state.settings.pace === "challenge") {
    state.spawnIntervalMs = Math.max(1100, 2600 - level * 170);
    return;
  }

  state.spawnIntervalMs = Math.max(1500, 3300 - level * 140);
}

export function creatureSpeedFor(state: GameState, tier: WordTier) {
  const tierBoost = tier * 4;
  if (state.settings.pace === "relaxed") return 15 + state.level * 2.2 + tierBoost;
  if (state.settings.pace === "challenge") return 28 + state.level * 4.6 + tierBoost;
  return 21 + state.level * 3.3 + tierBoost;
}

export function ensureActiveCreature(state: GameState, timestamp: number) {
  if (state.creatures.some((creature) => creature.alive && creature.active)) return;
  if (state.creatures.length >= MAX_CREATURES) return;

  state.lastSpawnAt = timestamp;
  state.creatures.push(createCreature(state, timestamp, true));
}

export function spawnPreviewCreatures(state: GameState, timestamp: number) {
  if (state.creatures.length >= MAX_CREATURES) return;
  if (timestamp - state.lastSpawnAt < state.spawnIntervalMs) return;

  state.lastSpawnAt = timestamp;
  state.creatures.push(createCreature(state, timestamp, false));
}

export function promoteNextCreature(state: GameState) {
  if (state.creatures.some((creature) => creature.alive && creature.active)) return;
  const next = state.creatures.find((creature) => creature.alive);
  if (next) next.active = true;
}

function createCreature(state: GameState, timestamp: number, active: boolean): Creature {
  const wordEntry = nextWord(state);
  const lane = active ? GAME_WIDTH / 2 : randomBetween(170, GAME_WIDTH - 170);
  return {
    id: makeId("creature"),
    word: wordEntry.word,
    typedIndex: 0,
    tier: wordEntry.tier,
    x: lane,
    y: active ? 92 : -50,
    radius: active ? 43 : 34,
    speed: creatureSpeedFor(state, wordEntry.tier) * randomBetween(0.92, 1.08),
    alive: true,
    active,
    breached: false,
    createdAt: timestamp,
    wobbleSeed: randomBetween(0, Math.PI * 2),
    color: randomItem(CREATURE_COLORS),
  };
}

function nextWord(state: GameState): WordEntry {
  if (state.wordQueue.length === 0) {
    state.wordQueue = shuffledWords(state);
  }

  return state.wordQueue.shift() ?? randomItem(getWordsForBand(state.settings.gradeBand, tierForLevel(state.level)));
}

export function shuffledWords(state: GameState) {
  const words = [...getWordsForBand(state.settings.gradeBand, tierForLevel(state.level))];
  for (let index = words.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [words[index], words[swapIndex]] = [words[swapIndex], words[index]];
  }
  return words;
}

function tierForLevel(level: number): WordTier {
  if (level >= 5) return 3;
  if (level >= 3) return 2;
  return 1;
}
