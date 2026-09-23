---
id: dual-driven-progress-property
category: scroll
tags: [scroll,progress,custom-property,progressive-enhancement,architecture]
axes: none
cost: 2
seen: 4
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

The registered property earns its keep when several declarations read the value.
Where there is exactly one consumer and it is a transform, skip the apparatus
entirely: `transform` animates without `@property`, so a plain keyframe on
`scroll(root)` fills a bar across the whole document in two declarations and no
script. `animation-duration: auto` is what binds the keyframe to the timeline's
range — omit it and the animation takes its default second and is over before
the reader moves.
```css
@supports (animation-timeline: scroll(root block)) {
  .rail { transform-origin: 0; animation: fill linear both;
    animation-duration: auto; animation-timeline: scroll(root) } }
@keyframes fill { from { transform: scaleX(0) } to { transform: scaleX(1) } }
```
⚠ No script branch means no fallback, so the `@supports` miss has to be
acceptable — for a progress hairline that is nothing at all. `aria-hidden`, and
at 1px on an existing header rule it adds no furniture and no layout.
