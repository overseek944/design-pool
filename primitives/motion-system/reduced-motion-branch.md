---
id: reduced-motion-branch
category: motion-system
tags: [motion,accessibility,required]
axes: none
cost: 1
seen: 58
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
