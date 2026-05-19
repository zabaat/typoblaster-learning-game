# Data Models

## GameStatus
```ts
type GameStatus = "title" | "playing" | "paused" | "gameOver";
```

## GameState
```ts
type GameState = {
  status: GameStatus;
  width: number;
  height: number;
  elapsedSeconds: number;
  score: number;
  highScore: number;
  lives: number;
  combo: number;
  longestCombo: number;
  level: number;
  lettersFired: number;
  hits: number;
  misses: number;
  enemiesDestroyed: number;
  lastSpawnAt: number;
  spawnIntervalMs: number;
  settings: GameSettings;
  enemies: Enemy[];
  projectiles: Projectile[];
  particles: Particle[];
  floatingTexts: FloatingText[];
};
```

## GameSettings
```ts
type GameSettings = {
  reducedMotion: boolean;
  screenShake: boolean;
  soundEnabled: boolean;
  difficulty: "chill" | "normal" | "brutal";
};
```

## Enemy
```ts
type EnemyType = "letterGoblin" | "fastBat" | "shieldBlob" | "wordBoss";

type Enemy = {
  id: string;
  type: EnemyType;
  label: string;
  requiredIndex: number;
  x: number;
  y: number;
  radius: number;
  speed: number;
  health: number;
  maxHealth: number;
  alive: boolean;
  breached: boolean;
  createdAt: number;
  wobbleSeed: number;
};
```

## Enemy Current Required Letter
For one-letter enemies:
```ts
enemy.label[0]
```

For word bosses:
```ts
enemy.label[enemy.requiredIndex]
```

## Projectile
```ts
type Projectile = {
  id: string;
  letter: string;
  x: number;
  y: number;
  radius: number;
  speed: number;
  alive: boolean;
  createdAt: number;
};
```

## Particle
```ts
type Particle = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};
```

## FloatingText
```ts
type FloatingText = {
  id: string;
  text: string;
  x: number;
  y: number;
  vy: number;
  life: number;
  maxLife: number;
};
```

## RunStats
```ts
type RunStats = {
  score: number;
  highScore: number;
  survivalTime: number;
  accuracy: number;
  longestCombo: number;
  levelReached: number;
  lettersFired: number;
  enemiesDestroyed: number;
};
```
