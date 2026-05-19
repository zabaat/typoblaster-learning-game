import type { GameSnapshot } from "../game/types";
import { formatTime } from "./format";

type GameOverScreenProps = {
  snapshot: GameSnapshot;
  onRestart: () => void;
  onTitle: () => void;
};

export function GameOverScreen({ snapshot, onRestart, onTitle }: GameOverScreenProps) {
  return (
    <div className="start-overlay">
      <section className="modal-card game-over-card">
        <div className="game-over-title">
          <p className="eyebrow danger-text">Run Complete</p>
          <h1>Game Over</h1>
        </div>

        <div className="final-score-block">
          <span>Final Score</span>
          <strong>{snapshot.score.toLocaleString()}</strong>
        </div>

        <div className="stat-list">
          <div>
            <span>High Score</span>
            <strong>{snapshot.highScore.toLocaleString()}</strong>
          </div>
          <div>
            <span>Survival Time</span>
            <strong>{formatTime(snapshot.survivalTime)}</strong>
          </div>
          <div>
            <span>Longest Streak</span>
            <strong>x{snapshot.longestStreak}</strong>
          </div>
          <div>
            <span>Letters Typed</span>
            <strong>{snapshot.lettersTyped}</strong>
          </div>
          <div>
            <span>Accuracy</span>
            <strong>{snapshot.accuracy}%</strong>
          </div>
          <div>
            <span>Words Completed</span>
            <strong>{snapshot.wordsCompleted}</strong>
          </div>
          <div>
            <span>Level Reached</span>
            <strong>{snapshot.levelReached}</strong>
          </div>
        </div>

        <div className="menu-stack">
          <button className="retro-button primary" onClick={onRestart}>
            Play Again
          </button>
          <button className="retro-button secondary" onClick={onTitle}>
            Back to Title
          </button>
        </div>
      </section>
    </div>
  );
}
