---
id: motion-runtime-watchdog
category: motion-system
tags: [motion,correctness,accessibility,progressive-enhancement,reveal]
axes: none
cost: 2
seen: 1
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
