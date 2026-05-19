# Systems and Algorithms

## InputSystem
Responsibilities:
- Listen for keydown.
- Normalize letters.
- Route controls.
- Fire projectiles during playing state.

Algorithm:
1. On keydown:
2. If key is Enter and status title/gameOver, start/restart.
3. If key is P/Escape and status playing/paused, toggle pause.
4. If status is playing and key is A-Z, call `fireProjectile(letter)`.

## SpawnSystem
Responsibilities:
- Spawn enemies according to difficulty.
- Randomize x position, type, label, speed.

Algorithm:
1. Calculate level from elapsed time.
2. Calculate spawn interval.
3. If now - lastSpawnAt >= spawnInterval, spawn enemy.
4. Occasionally spawn mini-burst.
5. Keep enemy count under max.

## Difficulty Algorithm
Normal:
```ts
level = 1 + Math.floor(elapsedSeconds / 30);
spawnIntervalMs = Math.max(450, 1600 - level * 90);
enemySpeed = 35 + level * 6;
```

Chill:
```ts
spawnIntervalMs = Math.max(700, 1900 - level * 70);
enemySpeed = 28 + level * 4;
```

Brutal:
```ts
spawnIntervalMs = Math.max(320, 1300 - level * 110);
enemySpeed = 45 + level * 8;
```

## Enemy Type Weights
Level 1-2:
- Letter Goblin: 100%

Level 3-5:
- Letter Goblin: 75%
- Fast Bat: 20%
- Shield Blob: 5%

Level 6-9:
- Letter Goblin: 55%
- Fast Bat: 25%
- Shield Blob: 15%
- Word Boss: 5%

Level 10+:
- Letter Goblin: 45%
- Fast Bat: 25%
- Shield Blob: 20%
- Word Boss: 10%

## CollisionSystem
Use circle overlap:
```ts
distanceSquared <= (projectile.radius + enemy.radius) ** 2
```

Check every alive projectile against every alive enemy.

Only apply hit if projectile.letter equals enemy current required letter.

## ScoringSystem
On hit:
1. Calculate base points.
2. Apply combo multiplier.
3. Add score.
4. Increment combo.
5. Update longestCombo.
6. Increment hits.
7. Create floating text.

On wrong shot:
1. Increment lettersFired.
2. Optionally reset combo.
3. Allow projectile to continue upward.

## RenderSystem
Draw order:
1. Background grid
2. Stars/noise/details
3. Enemies
4. Projectiles
5. Player
6. Particles
7. Floating text
8. Danger line if lives low

## CleanupSystem
Every frame remove:
- dead projectiles
- offscreen projectiles
- dead enemies
- expired particles
- expired floating texts

## StorageSystem
Use localStorage keys:
- `typoblaster.highScore`
- `typoblaster.settings`

Never store personal data.
