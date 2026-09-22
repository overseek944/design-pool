---
id: css-owned-pin-geometry
category: scroll
tags: [scroll,pin,architecture,correctness,responsive]
axes: none
cost: 2
seen: 18
requires: []
conflicts: []
completes: [media-query-parity-listeners]
tension: []
---
Let the stylesheet decide whether a section pins and for how long: a sticky
child plus a sibling spacer sized in viewport units, 150–300vh. The controller
only *reads* spacer height and wrapper top; it never writes inline geometry,
which a re-rendering framework reconciles away and which fights the media query.
Turning the pin off is then one CSS rule, needing no teardown path.
```css
[data-pin] > section { position: sticky; top: 0 }
[data-pin-spacer]    { height: var(--pin-dist, 200vh) }
@media (max-height: 719px) { [data-pin] > section { position: static } }
```
⚠ A spacer measuring zero means the CSS unpinned. Park the timeline on its
**finished** frame; parking at zero leaves an unreached section blank forever.

The spacer has an alternative: let the content itself be the scroll distance.
A sticky stage at `100svh`, then the copy column pulled back over it with a
negative margin of the same height and `pointer-events: none` — each block sized
120–150svh so its own height decides how long its scene holds. Nothing to keep
in sync with the stage, and the stage stays reachable by pointer underneath.
```css
.stage  { position: sticky; top: 0; height: 100svh }
.column { margin-top: -100svh; pointer-events: none }
.column > section { height: 125svh }
```
⚠ The margin must equal the stage height in the same unit or the first scene
opens mid-scroll. `svh`, not `vh` — mobile chrome makes the two differ by the
height of the toolbar, and the error compounds down a long story.

The same argument reaches the beats inside the runway. A trigger point given to
the controller in pixels has to be recomputed whenever the spacer changes; given
as a *fraction* of it, the stylesheet places a zero-size marker and the
controller only observes that element. Retuning the runway then moves every beat
with it, and the two numbers that describe the section — how long it holds and
where it turns over — sit together in one rule.
```css
.runway { --len: 2.3; --turn: .46; height: calc(var(--len) * 100vh) }
.runway .mark { position: absolute; width: 0; height: 0;
                top: calc((var(--len) * 100vh - 100vh) * var(--turn)) }
```
⚠ The marker must be inside the spacer, not the sticky child — a sticky
ancestor's offsets stop describing document position the moment it sticks.

A height query guesses at the content; the content can be measured. Where the
stage holds copy that reflows — a column whose length no breakpoint predicts —
test the fit at runtime instead: pin only if the stage's own height plus a
margin clears the space under the fixed chrome, and publish the verdict as one
attribute so the stylesheet still owns everything downstream of the decision.
Margin 32–64px.
```js
el.dataset.scrollMode =
  !reduced && innerWidth >= 1000 && stage.getBoundingClientRect().height + 48 <= room
    ? 'pinned' : 'static'
```
⚠ Re-run it on resize, on the reduced-motion change event and after fonts load —
a verdict taken once at mount is wrong for the rest of the session. The static
branch must still park the timeline finished.

Beats given as fractions of the runway are two decisions held in step by hand:
lengthening one hold means renormalising every boundary below it. Author
relative weights instead and let the runway be their sum — the section's length
and the position of every boundary then fall out of the same numbers, and adding
a beat renumbers nothing. Weights as multiples of a screen, 0.3–1.5 each.
```css
.runway { --intro: 1; --hold: .3; --beats: 4;
  --total: calc(var(--intro) + var(--hold) + var(--beats));
  height: calc((1 + var(--total)) * 100svh);
  --turn: calc(var(--intro) / var(--total)) }
```
⚠ The `1 +` is the sticky child's own screen and is not a beat — drop it and
every boundary lands one viewport early.
