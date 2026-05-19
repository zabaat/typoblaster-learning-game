# File Structure and Commands

## Create Project
```bash
npm create vite@latest typoblaster -- --template react-ts
cd typoblaster
npm install
npm run dev
```

## Suggested Files
```txt
src/
  App.tsx
  main.tsx
  styles/
    globals.css
  components/
    TitleScreen.tsx
    GameScreen.tsx
    Hud.tsx
    GameOverScreen.tsx
    SettingsPanel.tsx
  game/
    GameEngine.ts
    constants.ts
    types.ts
    input.ts
    random.ts
    spawning.ts
    collision.ts
    rendering.ts
    scoring.ts
    storage.ts
    audio.ts
  hooks/
    useGameEngine.ts
```

## NPM Scripts
Use default Vite scripts:
```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

## Dependencies
Required:
- React
- TypeScript
- Vite

Optional:
- none

Avoid:
- Phaser for MVP
- Matter.js
- Redux
- external asset packs
- backend SDKs
