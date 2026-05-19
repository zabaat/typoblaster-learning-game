import { DANGER_LINE_Y, GAME_HEIGHT, GAME_WIDTH, PLAYER_X, PLAYER_Y } from "./constants";
import { currentRequiredLetter } from "./collision";
import type { Creature, GameState } from "./types";

export function resizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = GAME_WIDTH * dpr;
  canvas.height = GAME_HEIGHT * dpr;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export function render(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.save();
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  if (state.settings.screenShake && state.shakeTime > 0 && !state.settings.reducedMotion) {
    const shake = state.shakeTime * 10;
    ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  }

  drawBackground(ctx, state);
  drawLearningHeader(ctx, state);
  drawDangerLine(ctx, state);
  state.creatures.forEach((creature) => drawCreature(ctx, creature, state.elapsedSeconds));
  drawLetterBursts(ctx, state);
  drawPlayerCreature(ctx, state);
  drawParticles(ctx, state);
  drawFloatingText(ctx, state);
  ctx.restore();
}

function drawBackground(ctx: CanvasRenderingContext2D, state: GameState) {
  const drift = state.settings.reducedMotion ? 0 : (state.elapsedSeconds * 7) % 36;
  const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
  gradient.addColorStop(0, "#06152a");
  gradient.addColorStop(0.55, "#08111f");
  gradient.addColorStop(1, "#100d22");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.strokeStyle = "rgba(255,255,255,0.055)";
  ctx.lineWidth = 1;
  for (let x = -36 + drift; x < GAME_WIDTH + 36; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, GAME_HEIGHT);
    ctx.stroke();
  }
  for (let y = -36 + drift; y < GAME_HEIGHT + 36; y += 36) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(GAME_WIDTH, y);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(121,255,207,0.09)";
  ctx.fillRect(0, 0, GAME_WIDTH, 92);
}

function drawLearningHeader(ctx: CanvasRenderingContext2D, state: GameState) {
  const active = state.creatures.find((creature) => creature.active && creature.alive);
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#f4f7ff";
  ctx.font = "700 18px 'Courier New', monospace";
  ctx.fillText("Type the word to zap the creature", GAME_WIDTH / 2, 28);

  if (active) {
    drawWordProgress(ctx, active, GAME_WIDTH / 2, 66, 34);
  }

  if (state.mistakeFlashTime > 0) {
    ctx.fillStyle = "rgba(255,94,120,0.18)";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  ctx.restore();
}

function drawDangerLine(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.save();
  ctx.strokeStyle = state.lives <= 1 ? "#ff5e78" : "rgba(255,94,120,0.4)";
  ctx.setLineDash([14, 10]);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, DANGER_LINE_Y);
  ctx.lineTo(GAME_WIDTH, DANGER_LINE_Y);
  ctx.stroke();
  ctx.fillStyle = "rgba(255,94,120,0.82)";
  ctx.font = "700 15px 'Courier New', monospace";
  ctx.textAlign = "left";
  ctx.fillText("finish words before they reach your buddy", 24, DANGER_LINE_Y - 12);
  ctx.restore();
}

function drawCreature(ctx: CanvasRenderingContext2D, creature: Creature, elapsedSeconds: number) {
  const wobble = Math.sin(elapsedSeconds * 2.5 + creature.wobbleSeed) * (creature.active ? 5 : 3);
  const x = creature.x + wobble;
  const y = creature.y;

  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = creature.active ? 1 : 0.55;

  ctx.fillStyle = creature.color;
  ctx.strokeStyle = creature.active ? "#f4f7ff" : "rgba(244,247,255,0.6)";
  ctx.lineWidth = creature.active ? 5 : 3;

  ctx.beginPath();
  ctx.ellipse(0, 0, creature.radius * 1.18, creature.radius, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#05070d";
  ctx.beginPath();
  ctx.arc(-14, -8, 5, 0, Math.PI * 2);
  ctx.arc(14, -8, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#05070d";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 6, 16, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.fillStyle = "#05070d";
  ctx.beginPath();
  ctx.moveTo(-28, -22);
  ctx.lineTo(-42, -42);
  ctx.lineTo(-18, -32);
  ctx.closePath();
  ctx.moveTo(28, -22);
  ctx.lineTo(42, -42);
  ctx.lineTo(18, -32);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  drawCreatureWord(ctx, creature, x, y);
}

function drawCreatureWord(ctx: CanvasRenderingContext2D, creature: Creature, x: number, y: number) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(5,7,13,0.86)";
  roundRect(ctx, x - wordWidth(creature.word) / 2 - 18, y - creature.radius - 68, wordWidth(creature.word) + 36, 48, 10);
  ctx.fill();
  ctx.strokeStyle = creature.active ? "#79ffcf" : "rgba(121,255,207,0.45)";
  ctx.lineWidth = 3;
  ctx.stroke();
  drawWordProgress(ctx, creature, x, y - creature.radius - 44, creature.active ? 30 : 24);
  ctx.restore();
}

function drawWordProgress(
  ctx: CanvasRenderingContext2D,
  creature: Creature,
  centerX: number,
  centerY: number,
  fontSize: number,
) {
  const letters = creature.word.toUpperCase().split("");
  const spacing = Math.min(38, Math.max(25, 360 / Math.max(letters.length, 1)));
  const startX = centerX - ((letters.length - 1) * spacing) / 2;

  ctx.save();
  ctx.font = `800 ${fontSize}px 'Courier New', monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  letters.forEach((letter, index) => {
    const x = startX + index * spacing;
    if (index < creature.typedIndex) {
      ctx.fillStyle = "#79ffcf";
    } else if (index === creature.typedIndex) {
      ctx.fillStyle = "#f9dc5c";
      ctx.strokeStyle = "rgba(249,220,92,0.28)";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(x, centerY, fontSize * 0.68, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.fillStyle = "rgba(244,247,255,0.74)";
    }
    ctx.strokeStyle = "#05070d";
    ctx.lineWidth = 5;
    ctx.strokeText(letter, x, centerY);
    ctx.fillText(letter, x, centerY);
  });
  ctx.restore();
}

function drawPlayerCreature(ctx: CanvasRenderingContext2D, state: GameState) {
  const bob = state.settings.reducedMotion ? 0 : Math.sin(state.elapsedSeconds * 4) * 3;
  ctx.save();
  ctx.translate(PLAYER_X, PLAYER_Y + bob);

  ctx.fillStyle = "#79ffcf";
  ctx.strokeStyle = "#f4f7ff";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 62, 46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f9dc5c";
  ctx.beginPath();
  ctx.arc(-32, -18, 18, 0, Math.PI * 2);
  ctx.arc(32, -18, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#05070d";
  ctx.beginPath();
  ctx.arc(-20, -8, 6, 0, Math.PI * 2);
  ctx.arc(20, -8, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#05070d";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 6, 22, 0.1, Math.PI - 0.1);
  ctx.stroke();

  ctx.fillStyle = "#ff8fb3";
  ctx.beginPath();
  ctx.moveTo(0, -48);
  ctx.lineTo(-16, -76);
  ctx.lineTo(16, -76);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#05070d";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function drawLetterBursts(ctx: CanvasRenderingContext2D, state: GameState) {
  state.letterBursts.forEach((burst) => {
    const ease = 1 - Math.pow(1 - burst.progress, 3);
    const x = burst.x + (burst.targetX - burst.x) * ease;
    const y = burst.y + (burst.targetY - burst.y) * ease;
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - burst.progress * 0.35);
    ctx.fillStyle = "#f9dc5c";
    ctx.strokeStyle = "#05070d";
    ctx.lineWidth = 4;
    ctx.font = "800 28px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(burst.letter.toUpperCase(), x, y);
    ctx.fillText(burst.letter.toUpperCase(), x, y);
    ctx.restore();
  });
}

function drawParticles(ctx: CanvasRenderingContext2D, state: GameState) {
  state.particles.forEach((particle) => {
    const alpha = Math.max(0, particle.life / particle.maxLife);
    ctx.fillStyle = hexToRgba(particle.color, alpha);
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  });
}

function drawFloatingText(ctx: CanvasRenderingContext2D, state: GameState) {
  state.floatingTexts.forEach((text) => {
    const alpha = Math.max(0, text.life / text.maxLife);
    const isDanger = text.text.toLowerCase().includes("oops") || text.text.toLowerCase().includes("try");
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = isDanger ? "#ff8fb3" : "#f9dc5c";
    ctx.strokeStyle = "#05070d";
    ctx.lineWidth = 5;
    ctx.font = `800 ${isDanger ? 22 : 28}px 'Courier New', monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(text.text, text.x, text.y);
    ctx.fillText(text.text, text.x, text.y);
    ctx.restore();
  });
}

function wordWidth(word: string) {
  return Math.min(520, Math.max(120, word.length * 32));
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
