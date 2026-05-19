# Product Requirements Document

## Product Name
TypoBlaster

## One-Sentence Pitch
A retro arcade typing shooter where every keyboard press becomes a projectile and players survive an endless invasion of letter-carrying goblins.

## Target Platform
Desktop browser first.

## Target Player
People who like quick arcade games, typing games, retro visuals, and silly browser toys.

## Primary Mode
Endless Arcade Mode.

## MVP Goals
- Start game from title screen.
- Spawn randomized enemies forever.
- Let player shoot letters using keyboard.
- Destroy enemies when projectile letter matches enemy letter.
- Track score, lives, combo, accuracy, level, and high score.
- Increase difficulty over time.
- End game when lives reach zero.
- Restart cleanly.

## Out of Scope for MVP
- Backend
- Login
- Online leaderboard
- Multiplayer
- Mobile touch controls
- Asset-heavy art
- Custom level editor
- Paid features
- User-generated content

## User Stories
### Start
As a player, I want to start quickly so I can understand the game immediately.

Acceptance:
- Title screen includes clear Start button.
- Enter key starts the game.
- How-to-play instructions are visible.

### Shoot
As a player, I want pressing a key to shoot that letter so my input feels physical.

Acceptance:
- Pressing A-Z creates a projectile with that exact uppercase letter.
- Projectile starts near player and travels upward.
- Non-letter keys do not fire projectiles, except special controls.

### Hit
As a player, I want matching letters to destroy enemies so the game feels skill-based.

Acceptance:
- Projectile "A" destroys enemy "A".
- Projectile "A" does not destroy enemy "B".
- Destroyed enemy creates particles and score popup.

### Survive
As a player, I want enemies to threaten me so there is urgency.

Acceptance:
- Enemies move downward.
- If an enemy reaches the danger line/bottom, lives decrease.
- Enemy is removed after causing damage.

### Replay
As a player, I want the game to reset cleanly so I can try again.

Acceptance:
- Game over screen shows final stats.
- Restart resets enemies, projectiles, lives, score, combo, timer, and difficulty.
- High score persists.

## Success Criteria
MVP is successful if:
- A player can complete multiple runs without bugs.
- The core loop is understandable within 10 seconds.
- Runs are randomized and different each time.
- Game can technically run forever if the player keeps surviving.
