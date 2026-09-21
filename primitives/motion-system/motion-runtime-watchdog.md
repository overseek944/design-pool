---
id: motion-runtime-watchdog
category: motion-system
tags: [motion,correctness,accessibility,progressive-enhancement,reveal]
axes: none
cost: 2
seen: 13
requires: []
conflicts: []
completes: []
tension: []
---
A reveal system that hides content in CSS and un-hides it from JS has one
catastrophic failure: the script never arrives and the page is blank. Arm the
hidden state from an inline script before first paint — it then exists only once
something has claimed responsibility for undoing it — and start a timer in that
same script. If the runtime has not registered by 2–4s, strip the flag and set
an *off* flag that flattens every choreographed rule to static layout.
```html
<script>const d=document.documentElement;d.setAttribute('data-motion-ready','');
setTimeout(()=>{if(!window.Motion){d.removeAttribute('data-motion-ready');
d.setAttribute('data-motion-off','')}},3000)</script>
```
```css
[data-motion-ready] [data-rv] { opacity: 0 }
```
⚠ A runtime arriving after the timer must not re-hide content already on screen.

The timer covers a bundle that failed; it does not cover script switched off,
where nothing ever runs to start it. Add a `<noscript>` block in the head that
flattens the hidden state outright — no timer, no flash, and the two branches do
not overlap because one of them only exists when the other cannot.
```html
<noscript><style>[data-rv]{opacity:1!important;transform:none!important}</style></noscript>
```

Inverted polarity, where the risk is script *absent* rather than script late:
an inline script in the head adds a class to the root, and every hidden state is
scoped under it. No timer, no `noscript` duplicate of the hidden rules, and the
flag cannot be set by anything that has not already run.
```html
<script>document.documentElement.classList.add('js')</script>
```
```css
html.js [data-reveal] { opacity: 0 }
```
One flag, several causes. A layout that only makes sense with a runtime present
— callouts absolutely positioned over a canvas, a fixed stage behind them —
needs the same escape hatch when the *canvas* is what failed. Add a second class
from the renderer's own `try`/`catch`, select on both, and one block of CSS
returns the overlay to ordinary document flow whatever the reason.
```css
html.no-scene .callout, html:not(.js) .callout { position: relative; opacity: 1 }
```

The script arriving and then *declining* to animate is a third case, and neither
the timer nor the `noscript` block covers it. Put the reduced-motion escape in
the same rule that hides: the pre-hide class carries its own undo, so a runtime
that branches away from animating leaves nothing hidden even if it forgets to
clean up, and the guarantee is the stylesheet's rather than every code path's.
```css
.reveal-pending { opacity: 0 }
@media (prefers-reduced-motion: reduce) { .reveal-pending { opacity: 1 } }
```
⚠ Specificity must match or exceed the hide rule — `!important` on both, or the
media block after it in source order. It fires on a mid-session flip too, which
the script's own setup-time branch does not.

The cheapest form of the same gate is one class, not a timer: an inline script
in the head adds `js` to the root element, and every hidden rule is scoped
under it. Nothing is duplicated into a `<noscript>` block, there is no window
where both branches apply, and a reader with script off — which includes every
crawler and text extractor — is served the settled page.
```html
<script>document.documentElement.classList.add('js')</script>
```
```css
.js [data-reveal] { opacity: 0; transform: translateY(12px) }
```
⚠ Covers script absent, not script broken. Where the bundle can fail after
parsing, this is the floor under the timer above, not a replacement for it.

Positive-scope the hidden state rather than undoing it. Put the pre-hide rule
*inside* `@media (prefers-reduced-motion: no-preference)` instead of writing an
override inside `reduce`: there is then no second rule, no specificity contest
and no source-order dependency — the state does not exist at all for a reader
who asked for stillness. Stack it with the `js` gate and the pre-state needs two
positive conditions before it can appear, which is the strongest form of this
guard.
```css
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] { opacity: 0; transform: translateY(14px) } }
```
⚠ A mid-session flip to `reduce` now un-hides instantly rather than
transitioning — correct, but any script that cached `matches` at setup will
disagree with the stylesheet until it re-reads.

Every branch above is still script releasing script. For anything that *blocks*
— a cover over the first view, a gate held for fonts — put the last failsafe in
the stylesheet, where it runs whether or not a bundle ever executes: a
zero-length animation at a long delay, `forwards`, that clears the overlay. The
JS path stays the real signal and normally wins by seconds; this only decides
what a dead bundle looks like. Delay 3–6s, well past the timer it backs.
```css
.cover { animation: bail 10ms 4s forwards }
@keyframes bail { to { opacity: 0; visibility: hidden } }
```
⚠ Only for a layer whose failure state is *absent*. Content hidden awaiting a
reveal has no such frame to animate to — there the CSS cannot know the target
pose and the inline script remains the only release.
