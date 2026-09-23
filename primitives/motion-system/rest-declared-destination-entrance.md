---
id: rest-declared-destination-entrance
category: motion-system
tags: [motion,entrance,correctness,architecture,css-only,state]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An entrance whose end state is *live* — a scroll-written length, a measured
inset, a theme value — must not be authored twice. Omit the `to` frame: the
implicit endpoint is built from the element's own resting declaration, so the
arrival lands exactly where the base rule already says and re-resolves if that
value moves mid-flight. Fill `backwards`, never `forwards` — `forwards` freezes
the element at whatever those properties held when it finished, and every later
write is silently ignored. 0.8–2s.

```css
.rail { clip-path: inset(0 0 calc(100% - var(--reveal)) 0);
        transition: clip-path .45s ease-out;
        animation: arrive 1.6s cubic-bezier(.22,1,.36,1) backwards }
@keyframes arrive { from { clip-path: inset(0 0 100% 0) } }
```
⚠ The implicit endpoint is the *underlying* value, so any later rule or inline
style winning the cascade retargets the entrance without warning. Nothing else
may write the property while the animation runs.
