# Technical Architecture

## Recommended Stack
- Vite
- React
- TypeScript
- HTML Canvas
- CSS Modules or plain CSS

## Core Principle
React should not re-render every animation frame. Canvas should handle frame-level rendering.

## Suggested Folder Structure

```txt
src/
  App.tsx
  main.tsx
  styles/
    globals.css
    ui.css
  components/
    TitleScreen.tsx
    GameShell.tsx
    Hud.tsx
    GameOverlay.tsx
    GameOverScreen.tsx
    SettingsPanel.tsx
  game/
    GameEngine.ts
    types.ts
    constants.ts
    input.ts
    spawning.ts
    collision.ts
    scoring.ts
    rendering.ts
    audio.ts
    storage.ts
    random.ts
  hooks/
    useGameEngine.ts
```

## GameEngine Responsibility
The GameEngine owns:
- Game state
- Entity arrays
- Animation loop
- Input handling
- Collision
- Spawning
- Scoring
- Rendering

## React Responsibility
React owns:
- Mounting canvas
- Screens
- Buttons
- Settings controls
- HUD snapshots
- Game over display

## State Sync
The engine should expose a lightweight snapshot to React:
```ts
type GameSnapshot = {
  status: "title" | "playing" | "paused" | "gameOver";
  score: number;
  highScore: number;
  lives: number;
  combo: number;
  level: number;
  accuracy: number;
  elapsedSeconds: number;
  longestCombo: number;
  lettersFired: number;
  enemiesDestroyed: number;
};
```

Update React snapshot at 10-15 FPS, not every animation frame.

## Timing
Use `requestAnimationFrame`.
Calculate delta time:
```ts
const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.033);
```
Clamp dt to prevent huge jumps after tab switching.

## Canvas Resolution
Use internal logical resolution:
- width: 960
- height: 540

Scale canvas with CSS to fit container.

Handle high DPI:
- Set canvas width/height multiplied by devicePixelRatio.
- Scale context accordingly.
