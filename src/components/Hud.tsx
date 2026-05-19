import type { GameSnapshot } from "../game/types";
import { formatTime } from "./format";

type HudProps = {
  snapshot: GameSnapshot;
};

export function Hud({ snapshot }: HudProps) {
  return (
    <section className="hud-bar learning-hud" aria-label="Run status">
      <div className="hud-stat">
        <span>Score</span>
        <strong>{snapshot.score.toString().padStart(6, "0")}</strong>
      </div>
      <div className="hud-stat">
        <span>Time</span>
        <strong>{formatTime(snapshot.elapsedSeconds)}</strong>
      </div>
      <div className="hud-stat">
        <span>Words</span>
        <strong>{snapshot.wordsCompleted}</strong>
      </div>
      <div className="hud-stat">
        <span>Accuracy</span>
        <strong>{snapshot.accuracy}%</strong>
      </div>
      <div className="hud-stat danger">
        <span>Energy</span>
        <strong>{renderLives(snapshot.lives)}</strong>
      </div>
    </section>
  );
}

function renderLives(lives: number) {
  if (lives <= 0) return "none";
  return Array.from({ length: lives }, () => "♥").join(" ");
}
