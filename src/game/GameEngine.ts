import {
  GAME_HEIGHT,
  GAME_WIDTH,
  MAX_FLOATING_TEXTS,
  MAX_LETTER_BURSTS,
  MAX_PARTICLES,
} from "./constants";
import {
  activeCreature,
  addCorrectBurst,
  addMistakeFeedback,
  completeCreature,
  currentRequiredLetter,
  resolveBreaches,
} from "./collision";
import { isLetterKey, normalizeKey } from "./input";
import { render, resizeCanvas } from "./rendering";
import {
  ensureActiveCreature,
  promoteNextCreature,
  spawnPreviewCreatures,
  updateDifficulty,
  shuffledWords,
} from "./spawning";
import { loadHighScore, saveHighScore } from "./storage";
import type { GameSettings, GameSnapshot, GameState } from "./types";
import { AudioSystem } from "./audio";

type SnapshotHandler = (snapshot: GameSnapshot) => void;

export class GameEngine {
  private ctx: CanvasRenderingContext2D;
  private state: GameState;
  private rafId: number | null = null;
  private lastTimestamp = 0;
  private lastSnapshotAt = 0;
  private audio = new AudioSystem();

  constructor(
    private canvas: HTMLCanvasElement,
    private onSnapshot: SnapshotHandler,
    settings: GameSettings,
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context is unavailable.");
    this.ctx = ctx;
    this.state = createInitialState(settings, "title");
    resizeCanvas(this.canvas, this.ctx);
    this.emitSnapshot(0, true);
    this.loop = this.loop.bind(this);
  }

  startLoop() {
    if (this.rafId !== null) return;
    this.lastTimestamp = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  dispose() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  resize() {
    resizeCanvas(this.canvas, this.ctx);
    render(this.ctx, this.state);
  }

  setSettings(settings: GameSettings) {
    const bandChanged = settings.gradeBand !== this.state.settings.gradeBand;
    this.state.settings = settings;
    if (bandChanged && this.state.status !== "playing") {
      this.state = createInitialState(settings, this.state.status);
    }
    this.emitSnapshot(performance.now(), true);
  }

  showTitle() {
    this.state = createInitialState(this.state.settings, "title");
    this.emitSnapshot(performance.now(), true);
  }

  start() {
    this.state = createInitialState(this.state.settings, "playing");
    this.lastTimestamp = performance.now();
    ensureActiveCreature(this.state, this.lastTimestamp);
    this.emitSnapshot(this.lastTimestamp, true);
  }

  restart() {
    this.start();
  }

  pause() {
    if (this.state.status !== "playing") return;
    this.state.status = "paused";
    this.emitSnapshot(performance.now(), true);
  }

  resume() {
    if (this.state.status !== "paused") return;
    this.state.status = "playing";
    this.lastTimestamp = performance.now();
    this.emitSnapshot(this.lastTimestamp, true);
  }

  handleTextInput(value: string) {
    for (const char of value) {
      const key = normalizeKey(char);
      if (isLetterKey(key)) this.handleLetter(key.toLowerCase());
    }
  }

  handleBackspace() {
    if (this.state.status !== "playing") return;
    const creature = activeCreature(this.state);
    if (!creature || creature.typedIndex <= 0) return;
    creature.typedIndex -= 1;
    this.emitSnapshot(performance.now(), true);
  }

  handleKeyDown(event: KeyboardEvent) {
    const key = normalizeKey(event.key);

    if (key === "ENTER") {
      if (this.state.status === "title") this.start();
      else if (this.state.status === "gameOver") this.restart();
      return;
    }

    if (key === "ESCAPE") {
      if (this.state.status === "playing") this.pause();
      else if (this.state.status === "paused") this.resume();
      return;
    }

    if (key === "BACKSPACE") {
      this.handleBackspace();
      return;
    }

    if (this.state.status !== "playing" || !isLetterKey(key)) return;
    this.handleLetter(key.toLowerCase());
  }

  private handleLetter(letter: string) {
    const creature = activeCreature(this.state);
    if (!creature) return;

    this.state.lettersTyped += 1;
    if (letter === currentRequiredLetter(creature)) {
      this.state.correctLetters += 1;
      creature.typedIndex += 1;
      addCorrectBurst(this.state, letter, creature);
      this.audio.play("hit", this.state.settings);

      if (creature.typedIndex >= creature.word.length) {
        completeCreature(this.state, creature);
        promoteNextCreature(this.state);
        ensureActiveCreature(this.state, performance.now());
      }
    } else {
      this.state.wrongLetters += 1;
      this.state.streak = 0;
      addMistakeFeedback(this.state, creature);
      this.audio.play("damage", this.state.settings);
    }

    this.emitSnapshot(performance.now(), true);
  }

  private loop(timestamp: number) {
    const dt = Math.min(Math.max((timestamp - this.lastTimestamp) / 1000, 0), 0.033);
    this.lastTimestamp = timestamp;

    if (this.state.status === "playing") {
      this.update(dt, timestamp);
    }

    render(this.ctx, this.state);
    this.emitSnapshot(timestamp);
    this.rafId = requestAnimationFrame(this.loop);
  }

  private update(dt: number, timestamp: number) {
    this.state.elapsedSeconds += dt;
    this.state.shakeTime = Math.max(0, this.state.shakeTime - dt);
    this.state.mistakeFlashTime = Math.max(0, this.state.mistakeFlashTime - dt);

    updateDifficulty(this.state);
    ensureActiveCreature(this.state, timestamp);
    spawnPreviewCreatures(this.state, timestamp);

    for (const burst of this.state.letterBursts) {
      burst.progress += dt / burst.life;
      if (burst.progress >= 1) burst.alive = false;
    }

    for (const creature of this.state.creatures) {
      creature.y += creature.speed * dt;
    }

    for (const particle of this.state.particles) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 280 * dt;
      particle.life -= dt;
    }

    for (const text of this.state.floatingTexts) {
      text.y += text.vy * dt;
      text.life -= dt;
    }

    resolveBreaches(
      this.state,
      () => this.audio.play("damage", this.state.settings),
      () => this.endGame(),
    );
    promoteNextCreature(this.state);
    this.cleanup();
  }

  private cleanup() {
    this.state.letterBursts = this.state.letterBursts
      .filter((burst) => burst.alive)
      .slice(-MAX_LETTER_BURSTS);
    this.state.creatures = this.state.creatures.filter((creature) => creature.alive);
    this.state.particles = this.state.particles
      .filter((particle) => particle.life > 0)
      .slice(-MAX_PARTICLES);
    this.state.floatingTexts = this.state.floatingTexts
      .filter((text) => text.life > 0)
      .slice(-MAX_FLOATING_TEXTS);
  }

  private endGame() {
    this.state.status = "gameOver";
    if (this.state.score > this.state.highScore) {
      this.state.highScore = this.state.score;
      saveHighScore(this.state.score);
    }
    this.audio.play("gameOver", this.state.settings);
    this.emitSnapshot(performance.now(), true);
  }

  private emitSnapshot(timestamp: number, force = false) {
    if (!force && timestamp - this.lastSnapshotAt < 80) return;
    this.lastSnapshotAt = timestamp;
    this.onSnapshot(toSnapshot(this.state));
  }
}

function createInitialState(settings: GameSettings, status: GameState["status"]): GameState {
  const state: GameState = {
    status,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    elapsedSeconds: 0,
    score: 0,
    highScore: loadHighScore(),
    lives: 3,
    streak: 0,
    longestStreak: 0,
    level: 1,
    lettersTyped: 0,
    correctLetters: 0,
    wrongLetters: 0,
    wordsCompleted: 0,
    lastSpawnAt: 0,
    spawnIntervalMs: 3300,
    lastDamageAt: -999,
    mistakeFlashTime: 0,
    shakeTime: 0,
    wordQueue: [],
    settings,
    creatures: [],
    letterBursts: [],
    particles: [],
    floatingTexts: [],
  };
  state.wordQueue = shuffledWords(state);
  return state;
}

function toSnapshot(state: GameState): GameSnapshot {
  const active = activeCreature(state);
  const accuracy =
    state.lettersTyped === 0 ? 100 : Math.round((state.correctLetters / state.lettersTyped) * 100);
  return {
    status: state.status,
    score: state.score,
    highScore: state.highScore,
    lives: state.lives,
    streak: state.streak,
    level: state.level,
    accuracy,
    elapsedSeconds: state.elapsedSeconds,
    longestStreak: state.longestStreak,
    lettersTyped: state.lettersTyped,
    wordsCompleted: state.wordsCompleted,
    survivalTime: state.elapsedSeconds,
    levelReached: state.level,
    currentWord: active?.word ?? "",
    typedIndex: active?.typedIndex ?? 0,
    gradeBand: state.settings.gradeBand,
  };
}
