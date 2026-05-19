type TitleScreenProps = {
  onStart: () => void;
  onHelp: () => void;
  onSettings: () => void;
};

export function TitleScreen({ onStart, onHelp, onSettings }: TitleScreenProps) {
  return (
    <main className="screen-centered">
      <section className="title-card">
        <p className="eyebrow">Word Creature Arcade</p>
        <h1>TypoBlaster</h1>
        <p className="subtitle">Type words. Zap creatures. Keep your buddy safe.</p>
        <p>Finish each word before the creature reaches your helper buddy.</p>

        <div className="menu-stack">
          <button className="retro-button primary" onClick={onStart}>
            Start Game
          </button>
          <button className="retro-button" onClick={onHelp}>
            How to Play
          </button>
          <button className="retro-button secondary" onClick={onSettings}>
            Settings
          </button>
        </div>

        <div className="instruction-strip" aria-label="Core loop">
          <span>Read word</span>
          <span>Type letters</span>
          <span>Zap creature</span>
        </div>
      </section>
    </main>
  );
}
