# Build Phases

## Phase 1: App Shell
Deliver:
- Vite React TypeScript setup
- Main layout
- Title screen
- Game shell
- Canvas mounted
- HUD placeholder

Done when:
- App loads without errors.
- Start button moves to playing state.
- Canvas is visible.

## Phase 2: Game Engine Skeleton
Deliver:
- GameEngine class
- requestAnimationFrame loop
- start, pause, resume, restart methods
- snapshot callback to React

Done when:
- Elapsed time increments while playing.
- Pause freezes game.
- Restart resets state.

## Phase 3: Player and Projectiles
Deliver:
- Stick wizard rendered at bottom
- Keyboard input
- Letter projectiles

Done when:
- Pressing A-Z fires visible letters upward.
- Projectiles are removed offscreen.
- Non-letter keys do not fire.

## Phase 4: Enemies
Deliver:
- Random letter enemies
- Downward movement
- Breach detection

Done when:
- Enemies spawn forever.
- Enemies move downward.
- Lives decrease when enemies breach.

## Phase 5: Collision and Score
Deliver:
- Matching projectile collision
- Score
- Combo
- Particles
- Floating text

Done when:
- Matching letters destroy enemies.
- Wrong letters do not.
- Score and combo update correctly.

## Phase 6: Game Over and Replay
Deliver:
- Lives reach zero
- Game over screen
- Final stats
- Restart

Done when:
- Game over appears.
- Play again fully resets run.
- High score persists.

## Phase 7: Difficulty and Variety
Deliver:
- Difficulty ramp
- Faster spawns over time
- Enemy type architecture
- Optional Fast Bat, Shield Blob, Word Boss

Done when:
- Game becomes harder over time.
- No hard stop exists.

## Phase 8: Polish
Deliver:
- Screen shake
- Reduced motion setting
- Sound toggle
- HUD polish
- Responsive layout

Done when:
- Game feels satisfying.
- UI matches HTML references.
