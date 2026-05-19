# Gameplay Rules

## Game States
The game has these states:

1. `title`
2. `playing`
3. `paused`
4. `gameOver`

## Player
The player is fixed at bottom center. The player does not move in MVP.

Player visuals:
- Stick figure wizard
- Small wand or arm
- Firing origin located above player head

## Input Rules
Accepted gameplay keys:
- A through Z: fire projectile
- Enter: start from title or restart from game over
- P: pause/resume
- Escape: pause/resume

Input normalization:
- Convert letters to uppercase.
- Ignore repeated keydown events if `event.repeat` is true only if it feels too spammy. Default: allow repeats with fire-rate cap.
- Ignore non-letter keys except controls.

## Projectile Rules
Each letter key creates one projectile.

Projectile properties:
- id
- letter
- x
- y
- vy
- radius
- createdAt
- hasHit

Projectile behavior:
- Starts at player firing origin.
- Moves upward.
- Removed when offscreen.
- Collides only with enemy targets that have matching current target letter.

## Enemy Rules
Enemies descend from the top.

Basic enemy properties:
- id
- type
- label
- currentRequiredLetter
- x
- y
- vy
- radius
- health or remainingLetters
- wobbleOffset
- spawnTime

Enemy types:
1. Letter Goblin
   - Label is one uppercase letter.
   - Dies from one matching projectile.

2. Fast Bat
   - Label is one uppercase letter.
   - Moves faster.
   - Worth more points.

3. Shield Blob
   - Label is one uppercase letter.
   - Requires two matching hits.
   - First hit cracks shield, second hit destroys.

4. Word Boss
   - Label is a short word, 3-5 letters.
   - Must be typed in sequence.
   - Current required letter is highlighted.
   - Each correct hit advances to next letter.
   - Destroyed after final letter.

MVP can start with Letter Goblin only, but architecture must support the full list above.

## Collision Rules
A projectile can hit an enemy only if:
- projectile letter equals enemy currentRequiredLetter
- projectile circle overlaps enemy circle
- projectile has not already hit
- enemy is alive

On valid hit:
- Mark projectile as hit.
- Apply enemy damage.
- Add score.
- Add particles.
- Add floating text.
- Increase combo.

On invalid overlap:
- Do nothing. Wrong letters pass through.

## Scoring Rules
Base points:
- Letter Goblin: 100
- Fast Bat: 150
- Shield Blob: 200
- Word Boss letter hit: 75 per letter, 500 bonus on completion

Combo:
- Correct hit increments combo by 1.
- Wrong letter fired resets combo to 0 only if it does not hit anything within a short grace window of 300ms. Simpler MVP: wrong fired letter immediately resets combo.
- Enemy breach resets combo.
- Combo multiplier: `1 + floor(combo / 10) * 0.25`, capped at 3x.

Accuracy:
- hits / letters fired
- Display as percentage on game over.

## Lives
Starting lives: 3.

When an enemy breaches bottom:
- lives -= 1
- enemy removed
- damage warning shown
- screen shake if enabled
- if lives <= 0, gameOver

## Infinite Random Difficulty
The game has no final level.

Difficulty is calculated from survival time and score.

Recommended formula:
- level = 1 + floor(elapsedSeconds / 30)
- spawnIntervalMs = max(450, 1600 - level * 90)
- enemySpeed = 35 + level * 6
- advancedEnemyChance increases gradually after level 3

Randomness:
- enemy letter chosen from A-Z.
- enemy x position randomized with safe margins.
- enemy type chosen by weighted probabilities.
- occasional mini-bursts spawn 2-4 enemies with spacing.

The game must remain theoretically endless. Difficulty can become very hard, but no hard stop exists.

## Game Over
Game over occurs only when lives reach zero.

Game over screen shows:
- final score
- high score
- survival time
- accuracy
- longest combo
- level reached
- letters fired
- enemies destroyed
