# Game Engine Pseudocode

```ts
class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: GameState;
  private rafId: number | null = null;
  private lastTimestamp = 0;
  private onSnapshot: (snapshot: GameSnapshot) => void;

  constructor(canvas, onSnapshot) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.onSnapshot = onSnapshot;
    this.state = createInitialState();
  }

  start() {
    this.state = createInitialState({ status: "playing" });
    this.lastTimestamp = performance.now();
    this.loop(this.lastTimestamp);
  }

  restart() {
    this.stopLoop();
    this.start();
  }

  pause() {
    if (this.state.status === "playing") this.state.status = "paused";
  }

  resume() {
    if (this.state.status === "paused") {
      this.state.status = "playing";
      this.lastTimestamp = performance.now();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const key = normalizeKey(event.key);

    if (key === "ENTER") handleStartOrRestart();
    if (key === "P" || key === "ESCAPE") togglePause();

    if (this.state.status !== "playing") return;
    if (isLetter(key)) this.fireProjectile(key);
  }

  fireProjectile(letter: string) {
    this.state.lettersFired += 1;
    this.state.projectiles.push(createProjectile(letter));
  }

  loop(timestamp: number) {
    const dt = clamp((timestamp - this.lastTimestamp) / 1000, 0, 0.033);
    this.lastTimestamp = timestamp;

    if (this.state.status === "playing") {
      updateDifficulty(this.state);
      spawnEnemies(this.state, timestamp);
      updateEntities(this.state, dt);
      resolveCollisions(this.state);
      resolveBreaches(this.state);
      cleanup(this.state);
    }

    render(this.ctx, this.state);
    maybeEmitSnapshot(this.state, this.onSnapshot);

    this.rafId = requestAnimationFrame((t) => this.loop(t));
  }
}
```
