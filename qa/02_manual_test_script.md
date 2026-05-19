# Manual Test Script

## Smoke Test
1. Load app.
2. Confirm title screen appears.
3. Press Enter.
4. Confirm game starts.
5. Press A, B, C.
6. Confirm letter projectiles appear.
7. Wait for enemies.
8. Shoot matching enemy.
9. Confirm score increases.
10. Let enemy breach.
11. Confirm lives decrease.
12. Lose all lives.
13. Confirm game over screen appears.
14. Press Enter.
15. Confirm fresh game starts.

## Wrong Letter Test
1. Start game.
2. Find enemy letter.
3. Press a different key.
4. Confirm projectile does not destroy enemy.
5. Confirm game continues.

## Rapid Input Test
1. Start game.
2. Mash A-Z quickly for 10 seconds.
3. Confirm no crash.
4. Confirm projectiles clean up.

## Pause Test
1. Start game.
2. Press P.
3. Confirm enemies stop moving.
4. Press P again.
5. Confirm enemies resume.

## Restart Reset Test
1. Start game.
2. Build score.
3. Lose all lives.
4. Restart.
5. Confirm score is zero.
6. Confirm lives reset to three.
7. Confirm no old projectiles/enemies remain.

## Long Run Test
1. Start game.
2. Play or idle for five minutes.
3. Confirm performance is stable.
4. Confirm level and spawn rate increased.

## Resize Test
1. Start game.
2. Resize browser.
3. Confirm UI remains usable.
4. Confirm canvas remains visible and proportional.

## Settings Test
1. Toggle reduced motion.
2. Confirm screen shake/large motion is reduced.
3. Toggle sound.
4. Confirm no sound plays when disabled.
