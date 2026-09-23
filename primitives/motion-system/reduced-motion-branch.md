---
id: reduced-motion-branch
category: motion-system
tags: [motion,accessibility,required]
axes: none
cost: 1
seen: 105
requires: []
conflicts: []
completes: []
tension: []
---
Branch at setup, not per-animation: if the user prefers reduced motion, set end
states directly and skip building timelines entirely. Cheaper than guarding
every tween, and guarantees nothing is left mid-transform.
```js
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.set(targets, { opacity: 1, y: 0, clearProps: "all" }); return
}
```

Variant — for motion that lives in CSS, invert the query: declare the animation
inside `@media (prefers-reduced-motion: no-preference)` rather than undoing it
inside `reduce`. Still is then the default state and a new animation cannot ship
without an accessibility branch, because it has nowhere else to go.

Variant — where a transition must stay in one place, keep the declaration and
neutralise it centrally: redefine the duration *tokens* to `0s` under `reduce`.
Every consumer reading `var(--dur-nav)` goes still at once, and the reduced
branch is three lines rather than one per component.

The query can flip mid-session. Read `matches` once at setup and you miss the
user reaching for the OS switch — listen for `change` and re-run the branch.

Variant — for a blanket reset over code you do not own, collapse rather than
cancel: `animation-duration: 1ms`, `animation-iteration-count: 1`,
`transition-duration: 1ms`. `animation: none` cancels outright, so `animationend`
never fires and a script waiting on it stalls with content still hidden. The
iteration cap is the half that stops infinite loops.

For a sequence that *cycles* — steps appearing one at a time — neither the first
nor the last frame is the right still state. Elect one and pin it: every step
`opacity: 0`, the elected one `1`, and any property mid-transit written to rest
(`clip-path: inset(0)`, `stroke-dashoffset: 0`). `animation: none` alone leaves
each element at its authored 0%, which for a wipe is invisible.

For a continuously-rendered surface the still state is a *drawn* frame: render
once with every time term at rest and never re-request the loop. Skipping the
draw leaves a blank canvas.

A blanket reset that only collapses durations still strands any system whose
resting state is *paused* or delayed — a marquee waiting on a play flag, a
cascade holding at 0% behind `animation-delay`. Force both in the same reset:
`animation-play-state: running !important` and `animation-delay: 0s !important`.

A scrubbed sequence of *scenes* has a better still state than one elected frame:
keep the scroll driving it and quantise the progress value onto the scene stops.
Every scene stays reachable and only the interpolation between them is gone —
the argument survives, the movement does not. Bias the snap slightly ahead of
each boundary so a scene commits as its copy arrives rather than after it.
```js
const stops = [0, 1.3, 2.4, 3.4]                    // one per authored scene
const p = reduced ? stops[clamp(Math.floor(raw + .15), 0, stops.length - 1)] : raw
```

A procedural scene has no authored end state to set — the resting composition is
whatever the simulation converges to. Run it rather than skipping it: under
`reduce`, step the same update function to completion inside a bounded loop,
then draw one frame and never request another. The still image is then exactly
the one a reader who waited would have seen, with no second hand-built
"static version" to drift out of sync with the real one.
```js
for (let i = 0; i < 200 && !settled(); i++) step(FIXED_DT)
draw(); return
```
⚠ Bound the loop by iteration count as well as by the settled test — a rule that
never converges otherwise hangs the main thread instead of playing too long.

Where the sequence is *authored* rather than simulated, the still state is the
schedule fast-forwarded: walk every cue in order, calling each immediately with
no waiting, then draw once and never request a frame. The reader sees the final
composition — every stage resolved, every log line present — and it cannot
drift from the animated version because it is the same list of cues.
```js
cues.forEach(c => c.fn())      // no clock, no waiting
draw()
```
⚠ Only safe when the cues are idempotent end-state writes. A cue that toggles,
appends or increments runs the whole timeline's worth of side effects in one
tick and lands somewhere the animation never reaches.

Where the scene is CSS, the still state is decided per element by what the
element *means*, not by one blanket rule. Narrative parts — a card that
travelled, a bar that filled, a line that faded in — get their end state
written out as a static declaration, so the diagram still says the thing it was
animating to say. Purely decorative parts — a scan beam, a drifting field — are
removed rather than frozen, because a loop stopped mid-cycle is a composition
nobody authored. A semantic indicator is *slowed*, not stopped: a caret that
stops blinking stops reading as a caret.
```css
@media (prefers-reduced-motion: reduce) {
  .card { transform: translateX(var(--travel)); animation: none !important }
  .bar  { clip-path: none; animation: none !important }
  .beam { display: none }
  .caret { animation-duration: 2s }          /* 1s → 1.5–3s, never none */
}
```
⚠ A blanket `animation-duration: .01ms !important` reset reaches the caret too —
restate the slowed value after it, or the clamp wins on equal specificity.

Clamp transitions to a small non-zero duration rather than to `0s` wherever
script waits on `transitionend`. At `0s` the event never fires in some engines
and a state machine that advances on it stalls with the interface half-open.
8–20ms is imperceptible and still dispatches.
```css
@media (prefers-reduced-motion: reduce) { .card, .panel { transition-duration: 10ms } }
```

Where the loop's clock is a *wrapped period* — `t = now / 1000 % P` — the still
state is the same draw call at an elected phase, not at zero. Phase 0 is
routinely the empty frame the cycle builds out of, so pick the phase where the
composition says the most and pass it in. One renderer serves both states and
neither can drift from the other.
```js
const draw = t => { /* every time term reads t */ }
reduced ? draw(STILL_PHASE) : loop()      // STILL_PHASE ~ .6–.8 of P
```
⚠ Elect the phase by looking at it, not by arithmetic — the most legible frame
is rarely the one where the most things are on screen.

When the motion *is* a payload, the branch is a network decision and not only a
render one. A reader who has asked for less motion should not be sent the frames
that carry it: elect a separate still frame, ship that inline, and let the fetch
be the thing the branch guards. Re-check on the query's `change` event so a
reader who turns motion back on gets the payload then, not never.
```js
const load = () => { if (data || mq.matches) return; fetch(url).then(…) }
mq.addEventListener('change', load); load()
```
⚠ The still frame must be elected, not frame zero — and it is the *only* thing
some readers ever see, so it carries the whole composition on its own.

The branch is per *property*, not per animation. `reduce` asks for less motion,
not less change — an opacity fade displaces nothing and is not what makes a
reader ill, so a fade-up under `reduce` should keep fading and lose only the
travel. Zero the transform's duration and leave the opacity's at 150–250ms;
removing both makes content pop into place, which is a harsher arrival than the
one being avoided. Separate transform channels make this expressible in CSS
alone.
```css
@media (prefers-reduced-motion: reduce) {
  .rise { transition: opacity .2s, translate 0s }   /* the fade survives */
}
```
⚠ Only holds while the moving property is genuinely decorative travel. A
displacement that carries meaning — a panel sliding in from the side it belongs
to — has to be written to its end state, not merely made instant.

A drawn still needs its clock elected, not zeroed. Setting every time term to
rest gives the composition at t=0, which for anything that travels, accumulates
or disperses is the empty frame nobody authored. Advance the shared clock to a
representative value — a few seconds in, past the build — then draw once from
the same path the loop uses and never request a frame. No second composition
exists to drift.
```js
if (reduced) { clock = 4; draw(); return }      // same draw(), one frame
```

The blunt form — `* { animation: none !important }` inside the query — is the
only branch that needs no knowledge of what is animating, which is what makes
it survivable on markup whose styles are emitted rather than authored: an
important author rule outranks even an inline `animation`. It is correct on one
condition, that no element's *resting* CSS is its hidden state. Kill the
animation on something that sits at `opacity: 0` until a keyframe lifts it and
the content is simply gone.
```css
@media (prefers-reduced-motion: reduce) { * { animation: none !important } }
```
⚠ The condition is the whole technique: author the settled frame as the
markup's own style and let the keyframe's `from` hold the hidden state, never
the reverse.

`reduce` asks for less vestibular motion, not for no feedback. Branch by
*property* rather than by animation: drop transform, layout and scroll-linked
movement, keep opacity and colour on their original durations. A state change
that snaps is harder to follow than one that crossfades, so the blanket still
state costs comprehension in the one place reduce was meant to protect. Where a
runtime creates the animations, set this once at the provider — every call
site, including ones added later, inherits it.

⚠ The property split is not a licence to keep scale. A large element easing
from .9 to 1 is movement in the peripheral field and triggers exactly what the
preference is about; only genuinely static properties survive the branch.

A mask is the one property whose rest state is not a final position. A layer
revealed by animating `mask-position` is still masked when the animation stops,
so `animation: none` under `reduce` leaves whatever the mask was clipping
clipped for good — and where the mask exists only to make the reveal possible,
the honest still state is `mask-image: none`, not a settled offset. Decide per
layer whether the residue is composition or leftover: a feathered edge that
meets a neighbour is worth keeping, a wipe never is.
```css
@media (prefers-reduced-motion: reduce) {
  .swept { animation: none; mask-image: none }        /* not mask-position: 0 0 */
  .swept::after { opacity: 0; animation: none }       /* and kill the second pass */
}
```
⚠ Removing the mask also removes any softening the layer relied on at its own
edges — restate a static mask rather than dropping it where the fade is part of
the design.

A blanket that collapses durations still leaves `scroll-behavior: smooth` in
force, so every in-page jump and every `scrollIntoView` keeps animating — the one
motion this preference most reliably needs to stop. It is not a duration to
shorten and has to be named separately in the same reset, on the scroll
container as well as the root. Scope the blanket to the subtree you author
rather than `*`, or it also flattens motion inside an embedded player or map
whose own reduced-motion handling is already correct.
```css
@media (prefers-reduced-motion: reduce) { .app, .app *, .app ::before {
  scroll-behavior: auto !important; transition-duration: .001ms !important;
  animation-duration: .001ms !important; animation-iteration-count: 1 !important } }
```

The drawn still frame has a failure the animated path cannot have: nothing
redraws it. A `ResizeObserver` delivers an initial callback on `observe()`,
after the one-shot draw, and a handler that resizes the backing store wipes the
bitmap — reassigning `width` clears it even at the same value. Under rAF the
next frame repaints and nobody notices; under `reduce` the surface is simply
blank, and only for the readers who asked for less motion. Redraw from inside
the resize handler, never resize alone.
```js
const fit = () => { c.width = c.clientWidth * dpr; draw() }   // draw, not just size
new ResizeObserver(fit).observe(c)
```
⚠ Verify by reading pixels, not by eye — a canvas that never drew and one whose
marks are faint look identical in a screenshot.

Variant — where the resting pose differs per element and enumerating it is the
drift risk, redefine the `@keyframes` block itself inside `reduce` rather than
touching any element. Keyframes are document-global, so one override makes every
stop identical and every animation resolves to its own base styles, with no
per-element still state to list and none to forget. `animationstart` and
`animationend` still fire on schedule, so a sequence chained off them completes
where `animation: none` would strand it.
```css
@keyframes step-in { from { opacity: 0; translate: 0 -4px } }
@media (prefers-reduced-motion: reduce) {
  @keyframes step-in { from, to { opacity: 1; translate: none } } }
```
⚠ The override must sit after the original in source order — same name, same
origin, last one wins — so a build that hoists media blocks silently undoes it.

The drawn-once still has a second failure beyond resize, and it is the reader's
own input. A surface that is *interactive* as well as animated — a cloud that
orbits under drag, a figure that answers a slider — loses the loop that was
picking those changes up, so the pose updates in state and nothing repaints.
Under `reduce` the input handler has to become the clock: call the same draw
from inside it, in exactly the branch where no frame was requested. The bug
only exists for the readers who asked for less motion, which is why it ships.
```js
onPointerMove = e => { if (!dragging) return
  yaw += e.movementX * .01; if (reduced) draw() }    // rAF path redraws anyway
```
⚠ Guard the call rather than throttling it — a pointer stream can outrun a
draw. Where the render is expensive, coalesce to one `requestAnimationFrame`
per event burst; that is a frame the preference does not object to, because it
is the reader's own movement.

The bounded loop above steps state and draws once, which is wrong wherever the
image lives in the framebuffer rather than in state — trails, feedback, any
effect built by compositing over the previous frame. Stepping and drawing once
yields a single frame of bare marks that looks nothing like the running effect.
Run the whole `draw` in the loop instead, accumulation included, and stop; the
still is the composite a reader would have arrived at. 40–120 iterations, enough
for the decay to reach its floor.
```js
if (reduced) { for (let i = 0; i < 60; i++) draw(); return }   // draw, not step
```
⚠ Time still for it to look settled, not still because it froze — a preroll
this short leaves a trail-based field visibly sparse. Check the count against
the fade, not by eye on one machine.

A very narrow viewport wants the same branch for a different reason. A rig that
needs horizontal room to read — something travelling a track, a wide figure with
parts that lag each other — does not merely shrink below roughly 360px, it
becomes jitter in a space too small to show what it was doing. Comma the width
into the preference query rather than writing a second block, and let the one
fallback serve both. It is usually not `animation: none`: the parts that carried
the motion should go, and what remains has to be recomposed to stand alone.
```css
@media (prefers-reduced-motion: reduce), (max-width: 359px) {
  .rig__track, .rig__trailer { display: none }
  .rig__label { border-radius: 10px; box-shadow: var(--lift) }  /* now a chip */
}
```
⚠ Only for decoration that degrades to nothing. Anything the narrow reader still
needs must keep a still form in the same branch, not be hidden by it.

Where an animation *is* the element's lifetime — a confirmation pill that fades
in, holds and fades out in one keyframe with `forwards` — neither cancelling nor
collapsing is right: one leaves it on screen, the other flashes it. Swap only
`animation-name` under `reduce` to an opacity-only twin with identical stops, so
duration, hold and exit survive and only the travel goes.
```css
@media (prefers-reduced-motion: reduce) { .pill { animation-name: pill-still } }
```
