---
id: dual-driven-progress-property
category: scroll
tags: [scroll,progress,custom-property,progressive-enhancement,architecture]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Register one `<number>` property, let it be the only thing scroll produces, and
write every consumer as `calc()` against it. A native scroll timeline animates
it to 1 where that exists; a script writes the same property where it does not.
Neither driver knows about the other and no consumer knows which ran — widths,
offsets and radii are authored once. Test with `CSS.supports` so the script
stays idle rather than fighting the timeline.

```css
@property --p { syntax: "<number>"; inherits: true; initial-value: 0 }
@keyframes widen { to { --p: 1 } }
@supports (animation-timeline: scroll()) {
  .stage { animation: widen linear both scroll(root); animation-range: 0 var(--room) } }
```
⚠ Without `@property` the value is an unanimatable token: the native branch
jumps 0→1 in one step and reads as a glitch, not as a scrub.
