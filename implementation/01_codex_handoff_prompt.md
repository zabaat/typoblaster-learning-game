# Codex Handoff Prompt

Use this prompt with the full zip package.

```txt
You are building TypoBlaster, a browser-based infinite arcade typing shooter.

Read every Markdown and HTML file in this package before coding.

Non-negotiable requirements:
- Use React + TypeScript + Vite.
- Use HTML Canvas for gameplay rendering.
- React handles screens, HUD, settings, and overlays.
- Canvas handles enemies, projectiles, player, particles, and game animation.
- Implement Endless Arcade Mode first.
- No backend.
- No login.
- No online leaderboard.
- No external art assets required.
- Use simple code-rendered stick figures, shapes, and text.
- Use the HTML files in `/html` as the UI/design reference.
- Use the Markdown specs as source of truth for gameplay, architecture, QA, and acceptance criteria.
- Do not assume missing behavior. If there is ambiguity, choose the simpler behavior and document the choice in comments.

Build the MVP in this order:
1. Create Vite React TypeScript app structure.
2. Build UI screens from HTML references.
3. Create GameEngine class.
4. Render canvas background and player.
5. Implement keyboard input.
6. Implement letter projectiles.
7. Implement enemy spawning.
8. Implement collision and scoring.
9. Implement lives, game over, and restart.
10. Implement difficulty ramp.
11. Add particles, floating score text, and optional screen shake.
12. Add settings and localStorage high score.
13. Run manual QA checklist from `/qa`.

The game must be random and technically playable forever. Difficulty should increase over time, but there must be no final level or hard stop.
```
