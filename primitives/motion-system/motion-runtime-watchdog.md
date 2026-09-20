---
id: motion-runtime-watchdog
category: motion-system
tags: [motion,correctness,accessibility,progressive-enhancement,reveal]
axes: none
cost: 2
seen: 3
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
