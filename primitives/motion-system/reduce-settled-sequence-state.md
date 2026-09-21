---
id: reduce-settled-sequence-state
category: motion-system
tags: [motion,accessibility,reduced-motion,state,sequence,correctness]
axes: none
cost: 2
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
A panel that builds itself over time — steps landing one at a time — holds its
content in state, not in styles, so `prefers-reduced-motion` cannot be served by
cancelling an animation: nothing exists yet and the branch renders empty. The
still state is the sequence's *last* frame, because the outcome is the argument.
Fold the preference into each derived value rather than branching the render, so
one path draws both and a later step cannot forget it. Schedules 6–12s.

```js
const still = reduceMotion()
const shown = still || revealed
const count = still ? items.length : n
```
⚠ Only where the sequence builds: a cycling one has no last frame, so elect one
and pin it.

A scroll-scrubbed scene has the same shape and no render to branch: its still
state is every driver variable at its terminal value, written from inside the
same writer before it returns. One function then serves both paths, and a
channel added later cannot be present in one and missing from the other. Kill
the transitions on exactly those properties in the reduced-motion block too, or
the settle animates — which is the motion the preference asked you not to run.
```js
if (reduce) { for (const [k, v] of END) el.style.setProperty(k, v); return }
```
⚠ The terminal value is not always 1. A channel that rises and falls ends at 0,
and copying 1 into every driver leaves the scene stopped mid-beat with two
states painted over each other.

A *field* of looping elements has the elect-one-frame problem N times over, and
electing the same frame for all of them is the trap: a drifting set whose
members are distinguished only by `animation-delay` all resolve to the start
pose, so the still state stacks them in one place and reads as a bug. Pin each
member at a distinct phase instead — the position it would hold at its own
offset — so the reduced branch lands a composition rather than a pile.
```css
@media (prefers-reduced-motion: reduce) {
  .drift { animation: none }
  .drift:nth-child(1) { transform: translateX(120%) }
  .drift:nth-child(2) { transform: translateX(320%) } }
```
⚠ The pinned poses are a second copy of the loop's geometry. Derive them from
the same custom properties the keyframes read, or the two drift apart the first
time the travel distance is retuned.

A *status* loop has no settled frame worth pinning, because its states differ
only in how they move — a mark waiting, working, blocked, finished. Freeze it
and four states collapse into one picture. Give the state a second channel that
is static and always on — fill, count, silhouette — and let the motion be the
enhancement rather than the encoding.
```css
@media (prefers-reduced-motion: reduce) {
  .mark [data-part] { animation: none; filter: none }
  .mark[data-state="blocked"] [data-part] { fill: var(--warn) }
  .mark[data-state="done"]    [data-part] { fill: var(--ok) } }
```
⚠ A `role="status"` whose only change is its own `aria-label` is announced
unreliably — put the state word in a text node inside the region so the update
is a content change. Colour alone repeats the problem one axis over; pair it
with a shape or a count.

An entrance whose *start* pose ships in the markup inverts the branch. Writing
the offset as an inline `transform` so the server's first paint is already
frame zero, then handing over to a CSS animation with `both`, costs no script
and cannot flash — but `animation: none` now strands the element at that offset
forever. The reduced branch has to undo the markup as well, and because the
pose is inline it takes `!important` to reach.
```css
.col { animation: rise .8s var(--ease) both; animation-delay: var(--d, 0s) }
@media (prefers-reduced-motion: reduce) {
  .col { animation: none !important; transform: none !important } }
```
⚠ Nothing fails loudly. The page is correct for everyone who never set the
preference, and broken only for the readers who did.

An ambient canvas loop has the same shape and one extra trap. The still is one
call to the *same* draw function — never a second code path that would drift —
but the argument matters: at `t = 0` every phase is at its start value, which
for anything built from sines or shared periods is the one frame where the
scene is degenerate and aligned. Pass a time a second or two in, chosen by
looking at it, then return before requesting a frame at all.
```js
if (matchMedia('(prefers-reduced-motion: reduce)').matches) return draw(ctx, 2.5)
raf = requestAnimationFrame(step)                       // 1.5–4s into the loop
```
⚠ Return before the loop starts rather than cancelling inside it, or the first
animated frame still paints. A mid-session flip of the query leaves the still
stale unless the effect re-runs on `change`.
