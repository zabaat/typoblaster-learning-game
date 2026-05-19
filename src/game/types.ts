export type GameStatus = "title" | "playing" | "paused" | "gameOver";

export type Pace = "relaxed" | "normal" | "challenge";
export type GradeBand = "k2" | "g35" | "g68";
export type WordTier = 1 | 2 | 3;

export type GameSettings = {
  reducedMotion: boolean;
  screenShake: boolean;
  soundEnabled: boolean;
  pace: Pace;
  gradeBand: GradeBand;
};

export type WordEntry = {
  word: string;
  band: GradeBand;
  tier: WordTier;
};

export type Creature = {
  id: string;
  word: string;
  typedIndex: number;
  tier: WordTier;
  x: number;
  y: number;
  radius: number;
  speed: number;
  alive: boolean;
  active: boolean;
  breached: boolean;
  createdAt: number;
  wobbleSeed: number;
  color: string;
};

export type LetterBurst = {
  id: string;
  letter: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  life: number;
  alive: boolean;
};

export type Particle = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

export type FloatingText = {
  id: string;
  text: string;
  x: number;
  y: number;
  vy: number;
  life: number;
  maxLife: number;
};

export type GameState = {
  status: GameStatus;
  width: number;
  height: number;
  elapsedSeconds: number;
  score: number;
  highScore: number;
  lives: number;
  streak: number;
  longestStreak: number;
  level: number;
  lettersTyped: number;
  correctLetters: number;
  wrongLetters: number;
  wordsCompleted: number;
  lastSpawnAt: number;
  spawnIntervalMs: number;
  lastDamageAt: number;
  mistakeFlashTime: number;
  shakeTime: number;
  wordQueue: WordEntry[];
  settings: GameSettings;
  creatures: Creature[];
  letterBursts: LetterBurst[];
  particles: Particle[];
  floatingTexts: FloatingText[];
};

export type GameSnapshot = {
  status: GameStatus;
  score: number;
  highScore: number;
  lives: number;
  streak: number;
  level: number;
  accuracy: number;
  elapsedSeconds: number;
  longestStreak: number;
  lettersTyped: number;
  wordsCompleted: number;
  survivalTime: number;
  levelReached: number;
  currentWord: string;
  typedIndex: number;
  gradeBand: GradeBand;
};

export type RunStats = {
  score: number;
  highScore: number;
  survivalTime: number;
  accuracy: number;
  longestStreak: number;
  levelReached: number;
  lettersTyped: number;
  wordsCompleted: number;
};
