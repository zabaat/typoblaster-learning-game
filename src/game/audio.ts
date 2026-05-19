import type { GameSettings } from "./types";

export class AudioSystem {
  private context: AudioContext | null = null;

  play(kind: "shoot" | "hit" | "damage" | "gameOver", settings: GameSettings) {
    if (!settings.soundEnabled) return;
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;
    this.context ??= new AudioContextCtor();

    const ctx = this.context;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const config = {
      shoot: { frequency: 520, duration: 0.055, volume: 0.035 },
      hit: { frequency: 760, duration: 0.09, volume: 0.06 },
      damage: { frequency: 130, duration: 0.18, volume: 0.075 },
      gameOver: { frequency: 82, duration: 0.35, volume: 0.07 },
    }[kind];

    oscillator.type = kind === "damage" || kind === "gameOver" ? "sawtooth" : "square";
    oscillator.frequency.setValueAtTime(config.frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(40, config.frequency * 0.55),
      now + config.duration,
    );
    gain.gain.setValueAtTime(config.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + config.duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + config.duration);
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
