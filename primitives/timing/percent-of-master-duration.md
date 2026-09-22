---
id: percent-of-master-duration
category: timing
tags: [timing,choreography,keyframes,css-animation,token,sequence]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 28
requires: []
conflicts: []
completes: []
tension: []
---
For a long multi-beat loop, give every participating element the *same* duration
token and express its beats as percentages of the whole rather than as delays.
Nothing accumulates error, because there is no offset to accumulate; the
sequence is one clock read from many places. Retiming the piece is one token
edit and every beat keeps its proportion. Totals 12–30s read as ambient;
under 8s the holds disappear. Keep a beat's hold as a pair of equal stops.
```css
:root { --seq: 24s }                         /* 14.63% = 3.51s */
.lens  { animation: lens  var(--seq) cubic-bezier(.4,0,.2,1) infinite }
.frost { animation: frost var(--seq) linear infinite }
@keyframes frost { 0%,11.5% { filter: none } 14.6%,73.4% { filter: grayscale(1) } }
```
⚠ Percentages are unreadable as intent — leave the authored seconds in a comment
or the next edit is arithmetic. Independently-started animations still begin at
different wall times; see a shared-clock driver if exact phase lock matters.

The same construction runs far shorter than ambient if the beat is a *pulse*:
hold 1.5–3s total, spend the first 20–30% on the move and make every remaining
stop identical so the rest of the cycle is dead air. Read as a heartbeat rather
than a sequence, and a dozen elements sharing that one period stay locked with
no delay to drift.
```css
@keyframes step { 0% { transform: translate(0) } 25%, 100% { transform: translate(4px) } }
```
⚠ Below ~1.2s the hold stops registering and it reads as a twitch.

One element can carry a perpetual loop and a one-shot settle at once: two
entries in the `animation` list, the loop on the shared token and the settle on
its own period with `forwards`. A badge that jitters forever while its fill
drifts once from cold to warm is two short keyframe sets, not one long
compromise.
```css
.mark { animation: jitter 2s linear infinite,
                   warm var(--seq) linear forwards }
```
⚠ Later entries in the list win on any property two of them both touch, and the
loop is usually listed first — so the one-shot must not name the looped
property or it silently freezes the loop.

Split the declaration so the clock has exactly one home: a base class carries
duration, timing function, iteration count and `animation-fill-mode: both`, and
each participant's own class supplies nothing but `animation-name`. Ten
elements then share one timing decision instead of ten copies of it, and adding
an eleventh is one line. `both` matters — without it a participant whose window
opens at 30% paints its unanimated state for the first three-tenths of every
cycle.
```css
.beat     { animation: var(--seq) linear infinite both }
.beat--b  { animation-name: reveal-b }
```
⚠ Shorthand `animation` in the base resets `animation-name` to `none`; the
modifier must come after it in source order or nothing plays.

Inside one continuous track a *discrete* change is a pair of stops a fraction of
a percent apart: `13.6%` then `14%` cuts a panel from one state to the next with
no visible tween, and a 0.6%-wide dip in `scale` reads as a click. A whole
scripted demonstration — pointer travel, presses, panel swaps, a bar stepping
through stages — then lives in one keyframe block per element, with no state
machine and nothing to reset. Cut pairs 0.3–0.8% of the period.
```css
@keyframes panel { 0%,13.6% { opacity: 1 } 14%,94.6% { opacity: 0 } 95%,100% { opacity: 1 } }
@keyframes press { 11.4% { scale: 1 } 12% { scale: .85 } 12.6% { scale: 1 } }
```
⚠ Sub-percent gaps are below the resolution of most animation inspectors —
annotate them in the source or the next edit rounds them back into tweens.

Give every participant the same blackout window at the end of the period —
opacity 1 held to ~96%, 0 by 99% — and the loop restarts from nothing rather
than cutting from each element's end state back to its start. Start and end
states then no longer have to match, which is what usually forces a multi-part
sequence to be authored backwards from its own wrap. Fade window 3–5% of the
period; below 2% it reads as a flicker rather than a reset.
```css
@keyframes step-a { 0%,30% { opacity: 1 } 96% { opacity: 1 } 99%,100% { opacity: 0 } }
```
⚠ The window must be identical everywhere. One element fading a percent late
draws the eye straight to the seam the technique exists to hide.

That synchronisation problem disappears if one node carries the blackout for
everyone: an absolutely-positioned veil in the scene's ground colour, opaque at
`0%` and again over the last fraction of the period, transparent through the
middle. Participants then need no wrap window at all and their start and end
states never have to agree — adding a nineteenth element changes nothing.
Cover 3–5% at each end, and it must sit above every participant.
```css
.veil { position: absolute; inset: 0; background: var(--ground); pointer-events: none;
        animation: veil var(--seq) linear infinite }
@keyframes veil { 0% { opacity: 1 } 4%, 96% { opacity: 0 } 99.6%, to { opacity: 1 } }
```
⚠ It hides the reset by hiding the scene — it cannot be used where the loop
runs over a transparent or textured ground the veil cannot match.

Declarative SVG animation has no `animation-delay`, and spreading a set with
`begin` offsets gives every element its own start — the drift a shared period
exists to prevent. Give each `<animate>` the identical `dur` and carry its phase
in `keyTimes` instead; an `animateMotion` waits and parks with
`keyPoints="0;0;1;1"` against the same stops. The figure then has exactly one
period, which script can read with `getCurrentTime()` and stop in full with
`pauseAnimations()`.
```html
<animate attributeName="opacity" values="0;0;1;1;0;0"
  keyTimes="0;.085;.108;.40;.423;1" dur="8.125s" repeatCount="indefinite"/>
```
⚠ `keyTimes` must start at 0, end at 1 and match `values` in length, or the
animation is dropped with no error. No media query reaches any of this — the
reduced-motion branch has to be the script call.

The same clock runs a *one-shot* entrance, where the payoff is different: with
`forwards` and one shared duration and delay on every participant, nothing can
finish after the entrance is over, and the order is edited as percentages rather
than re-derived as a column of delays. A participant that must wait holds its
start state as a pair of equal stops instead of taking a delay of its own.
Total 1.8–3.2s; past 4s the reader has already tried to scroll.
```css
.copy { animation: copy-in var(--intro) var(--ease) var(--intro-delay) forwards }
@keyframes copy-in { 0%,78% { opacity: 0; translate: 0 1.25rem } 96%,to { opacity: 1; translate: 0 } }
```
⚠ Zero-opacity text is not painted content, so the stop at which copy arrives is
the floor for Largest Contentful Paint — a long entrance fails the metric on its
own, however cheap each animation is.

A one-shot sequence on a single element needs neither a master percentage nor a
state machine: list the animations and stagger the comma-separated
`animation-delay` beside them. Each beat stays a two-stop keyframe block with
its own duration, `forwards` holds every finished state, and the running order
is one line to read and one number to retime. This is the right shape for an
entrance that draws, settles and then hands over — a sequence played once, not
a loop.
```css
.stencil { stroke-dasharray: 0 300;
  animation: draw .5s ease-out forwards, fade .4s ease-out forwards;
  animation-delay: .05s, 1.1s }
```
⚠ The lists are matched by position and the shorter one *cycles* rather than
padding — two names against one delay silently gives both the same delay, and
the whole sequence collapses into one beat.

The same delay list covers the opposite case — one element that arrives once and
then idles forever — which a single shorthand cannot express. Give slot one the
entrance with `both` and slot two a perpetual loop, and let only the first slot
carry the per-item index: the group cascades in, then every member settles onto
the same steady pulse regardless of when it landed. Hold the loop's delay at or
past the longest entrance so nothing breathes while it is still arriving.
```css
.seg { animation: grow .32s var(--ease-spring) both, breathe 1.8s ease-in-out infinite;
       animation-delay: calc(var(--i, 0) * 45ms), .6s }   /* stagger 35–60ms */
```
⚠ `animation-fill-mode` is a list too, and the loop slot must not inherit
`both` — a filled infinite animation pins its start state during the delay and
the element sits at the loop's 0% rather than where the entrance left it.

Invert the whole construction where every beat is the *same* beat — a highlight
marching down a step list, a pointer walking a row of cells. Author one keyframe
holding a single narrow on-window, give every participant that same animation,
and let `animation-delay: calc(var(--i) * var(--stage))` be the only thing that
differs. The cycle is then `N × stage` by arithmetic, the on-window is
`stage / cycle` of the period, and adding a step is one inline custom property
rather than a re-cut keyframe block. Stage 1–2s; the lit window 40–60% of it, so
consecutive steps neither overlap nor leave the list dark.
```css
.step { --stage: 1.5s; animation: lit calc(4 * var(--stage)) ease-in-out infinite;
        animation-delay: calc(var(--i) * var(--stage)) }
@keyframes lit { 1%, 12.5% { opacity: 1 } 16%, to { opacity: 0 } }
```
⚠ Positive delays mean nothing runs until the first stage elapses, so the list
starts blank — offset the whole set negatively, or accept a dead first pass.
Changing N without changing the keyframe silently desynchronises the wrap.

Where the beats are absolute delays rather than percentages — a generated scene,
a demo whose cues were tuned by eye — two staged one-shots on one element take
*different* fill modes, and this is the trap. The first carries `both`; the
second must carry `forwards` alone. Give the second `both` and its 0% frame is
applied backwards for the whole of its delay, holding the element at the second
beat's start pose and silently overriding everything the first animation did.
A badge that fades in at 0.3s and out at 8s is then invisible for eight seconds.
```css
.badge { animation: b-in .48s var(--ease) .25s both,
                    b-out .4s var(--ease) 8.3s forwards }
```
⚠ The bug scales with the gap: at a 200ms delay it reads as a flicker, at 8s as
a missing element, so it survives review on a short scene and breaks on a long one.

A gesture assembled from several parts of one mark — a face, its brows, the
sparks around it — takes the same construction with the *settle* staggered
rather than the start: one duration on every part, `both`, and each part's
motion front-loaded into its own fraction of the timeline. The parts land in
order with no delay to maintain, the gesture is guaranteed to finish on one
frame, and the remaining tail is deliberate dead air in which the mark is simply
a legible static icon. Motion inside the first 30–58%, total 2–2.5s.
```css
.part { animation: var(--gesture) cubic-bezier(.2,.78,.3,1) both }  /* --gesture: 2.4s */
@keyframes brows { 0%,7% { translate: 0 5px } 18% { translate: 0 -4px } 34%,to { translate: 0 } }
```
⚠ Repeat every settle pose at `to`. A part whose last authored stop is earlier
interpolates from there back to the element's base value across the whole tail,
and the hold everything else is keeping becomes a slow drift on that one part.

Where a participant's opacity already carries its own track — an SVG stroke, a
border, a shadow — it cannot also hold the shared blackout, and that
construction's failure is exactly one element fading a percent out of step. Put
the wash on a single full-bleed sibling in the ground colour instead, on the
same token: opaque at 0% and 100%, clear across the middle. One element owns the
seam, nothing has to agree with anything else, and participants keep their own
alpha. Clear by 3–5%, hold clear to 92–96%.
```css
.wash { position: absolute; inset: 0; background: hsl(var(--ground));
        pointer-events: none; animation: seam var(--seq) linear infinite }
@keyframes seam { 0% { opacity: 1 } 4%,94% { opacity: 0 } to { opacity: 1 } }
```
⚠ It dims every participant equally at the wrap, so a sequence whose last beat
is its conclusion loses the frame worth holding — end on a hold, not on the wash.
