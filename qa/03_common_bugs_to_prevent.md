# Common Bugs to Prevent

## Animation Loop Duplication
Bug:
- Restart creates multiple requestAnimationFrame loops.

Prevention:
- Always cancel existing RAF before restarting.
- Track rafId.

## React Re-render Storm
Bug:
- Updating React state every animation frame causes lag.

Prevention:
- Emit HUD snapshot 10-15 times per second.

## Stale Entities After Restart
Bug:
- Old projectiles or enemies remain after restart.

Prevention:
- Recreate entire GameState object on restart.

## Keyboard Listener Leak
Bug:
- Event listeners stack up after component remount.

Prevention:
- Add listeners once.
- Remove listeners on cleanup.

## Unfair Collisions
Bug:
- Projectile visually overlaps but does not hit.

Prevention:
- Use generous collision radius.
- Make enemy radius match visual size.

## Spawn Overload
Bug:
- Difficulty creates too many enemies.

Prevention:
- Cap enemies at 40.
- Cap projectiles at 80.
- Cap particles at 150.

## Tab Switching Jump
Bug:
- Game jumps after returning to tab.

Prevention:
- Clamp delta time to max 0.033.

## localStorage Crash
Bug:
- localStorage unavailable causes error.

Prevention:
- Wrap storage reads/writes in try/catch.
