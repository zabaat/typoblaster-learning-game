# Acceptance Criteria

## App
- App starts with no console errors.
- App builds successfully.
- Game is playable in latest Chrome, Safari, and Firefox.

## Title Screen
- Shows game title.
- Shows one-sentence instructions.
- Start button works.
- Enter key starts game.

## Canvas
- Canvas renders at 16:9.
- Canvas scales down on smaller screens.
- Player is visible at bottom center.

## Input
- A-Z keys fire matching uppercase projectiles.
- Non-letter keys do not create projectiles.
- P pauses and resumes.
- Escape pauses and resumes.
- Enter restarts after game over.

## Enemies
- Enemies spawn randomly from top.
- Enemies display clear letters.
- Enemies descend toward bottom.
- Enemy breach reduces lives.

## Collision
- Matching projectile destroys or damages matching enemy.
- Non-matching projectile does not destroy enemy.
- Projectile is removed after successful hit.
- Score increases after valid hit.

## Infinite Play
- Spawning continues indefinitely while player is alive.
- Level increases over time.
- Spawn rate increases over time.
- Game does not stop at a fixed level.

## Game Over
- Game ends when lives reach zero.
- Final stats are displayed.
- Restart clears old entities and starts a fresh run.
- High score persists after refresh.

## Settings
- Screen shake can be disabled.
- Reduced motion can be enabled.
- Sound can be disabled if sound is implemented.

## Performance
- No severe slowdown during normal play.
- Object arrays are cleaned up.
- Game remains responsive after five minutes of play.
