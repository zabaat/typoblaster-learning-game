# TypoBlaster Concept Review from 20 Perspectives

## 1. CEO Perspective
TypoBlaster is a strong weekend-buildable product because it combines a simple input mechanic with immediate visual feedback. The business value is not in monetization first; it is in proving a small, replayable, shareable arcade concept. The MVP should optimize for quick delight, easy sharing, and low implementation risk.

Decision:
- Build as a browser game.
- Avoid accounts, backend, multiplayer, cosmetics marketplace, or mobile-first complexity.
- Prioritize replayability and personality.

## 2. Head of Product Perspective
The core product promise is: "Every key you press becomes ammo." This must be instantly understood within five seconds of play. The MVP should have one primary mode: endless arcade survival. Future modes can wait.

Primary user goal:
- Start quickly.
- Understand what to press.
- Feel rewarded for accurate typing.
- Chase a higher score.

MVP success:
- A new player understands the game without reading more than one sentence.
- A run lasts 30 seconds to 3 minutes for beginners.
- The player wants to retry after losing.

## 3. Game Designer Perspective
The game should have one verb: type. Typing creates projectiles. Matching creates destruction. Wrong typing is allowed but inefficient. This preserves flow and avoids feeling like a school typing test.

Core loop:
1. Enemy appears with letter.
2. Player presses matching key.
3. Letter projectile launches.
4. Collision destroys enemy.
5. Score and combo increase.
6. Difficulty increases over time.
7. Player eventually loses and restarts.

## 4. Engineering Lead Perspective
Use a deterministic game loop with requestAnimationFrame. Keep systems modular:
- InputSystem
- SpawnSystem
- EnemySystem
- ProjectileSystem
- CollisionSystem
- ScoreSystem
- RenderSystem
- GameStateManager

Do not use physics engines. Do not overbuild ECS. Plain TypeScript objects are enough.

## 5. Frontend Architect Perspective
Recommended stack:
- Vite
- React
- TypeScript
- HTML Canvas

React owns screens, HUD, settings, overlays, and lifecycle. Canvas owns gameplay rendering. Game state can be held in a custom hook or game engine class. Do not put every animation frame in React state.

## 6. UX Designer Perspective
The user should never wonder what to do. The title screen should say:
"Press matching letters to blast enemies. Survive as long as you can."

During play:
- Enemy letters must be large and readable.
- The player character must stay visually anchored at bottom center.
- HUD must remain minimal.
- Game over must make restart obvious.

## 7. UI Designer Perspective
Style should feel old-school, not polished SaaS. Use:
- Black/dark navy background
- Monospace font
- Neon accent
- Thick borders
- Pixel-like shadows
- Simple cards and buttons

Avoid:
- Complex gradients
- Modern glassmorphism
- Tiny text
- Overly realistic art

## 8. Accessibility Perspective
Keyboard-first is naturally accessible for many players, but the game must include:
- Reduced motion setting
- Screen shake toggle
- High contrast colors
- Large readable letters
- Pause key
- No required mouse interaction after start
- Clear focus styles on buttons

Do not rely only on color to indicate danger.

## 9. QA Lead Perspective
The main risks are input bugs, runaway spawn rates, stale animation state, collisions feeling unfair, and restart not fully resetting. Testing must include:
- Rapid key presses
- Wrong key spam
- Long play sessions
- Pause/resume
- Game over/restart
- Browser resize
- Reduced motion

## 10. Creative Director Perspective
Theme: "Keyboard Wizard versus letter goblins." The world should be playful. The player is a stick-figure wizard. Enemies are goblins, bats, blobs, and boss words, rendered simply through canvas lines, shapes, and text.

The letters are the star. Make them big, physical, and funny.

## 11. Monetization Perspective
Do not monetize MVP. The best path is proving engagement first. Potential future monetization:
- Sponsored typing challenges
- Classroom version
- Cosmetic packs
- Steam/web premium version
- Daily challenge mode

None of this belongs in the MVP.

## 12. Growth Perspective
The game is shareable if it produces funny end-of-run stats:
- Final score
- Longest combo
- Accuracy
- Most missed letter
- "Typing title" such as Keyboard Goblin, Letter Knight, or Absolute Menace

Add share text later, not in MVP.

## 13. Educator Perspective
This can accidentally become a typing practice game. That is good, but do not make the MVP feel educational. Keep it arcade first. Future classroom mode could support:
- Home row letters
- Sight words
- Custom word lists
- Teacher dashboard

Not in MVP.

## 14. Performance Perspective
Canvas should render at fixed internal resolution and scale to fit. Limit object counts:
- Max enemies: 40
- Max projectiles: 80
- Max particles: 150
- Max floating texts: 30

Cull offscreen objects aggressively.

## 15. Sound Designer Perspective
Sound is optional but helpful. MVP can include generated Web Audio bleeps:
- Shoot
- Hit
- Combo
- Damage
- Game over

No external audio assets required.

## 16. Data/Analytics Perspective
No external analytics in MVP. Track local run stats in memory:
- score
- accuracy
- letters fired
- hits
- misses
- enemies destroyed
- level reached
- longest combo
- survival time

Optionally persist high score in localStorage.

## 17. Security/Privacy Perspective
No accounts. No user data collection. No network requests. localStorage only stores high score and settings.

## 18. Project Manager Perspective
The project should be built in phases:
1. Render canvas and player.
2. Spawn letter enemies.
3. Shoot letter projectiles.
4. Add collision and scoring.
5. Add lives and game over.
6. Add difficulty ramp.
7. Add polish and UI screens.
8. Add QA and bug fixes.

## 19. Technical Writer Perspective
Documentation must define exact behavior. Codex should not invent mechanics. Every mechanic should include:
- Purpose
- Rule
- Inputs
- Output
- Edge cases

## 20. Player Perspective
The game should feel immediate, silly, and satisfying:
"I pressed K and a giant K flew out of my wizard and smashed a goblin."

If that moment feels good, the game works.
