---
id: unfilled-counterpart-panel
category: layout
tags: [demo,composition,mock,restraint,rhetoric]
axes: {energy: 1, density: 2, weight: 1, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A two-sided demonstration — the reader's product beside yours — fails when both
sides are furnished. Invent content for their half and it becomes a specific
company that is not theirs, and the claim stops landing. Draw their side as
unfilled blocks instead: tinted rectangles at two or three widths, no copy, no
imagery, one accent mark exactly where the argument happens. Every concrete
detail stays on your half. The asymmetry is the message.

```css
.stand-in > i { display:block; block-size:.5rem; border-radius:3px;
                background: color-mix(in oklab, var(--ink) 8%, transparent) }
```
⚠ The whole stand-in is decoration — `aria-hidden` it, and keep the one real
element outside so it is still announced. Blocks that drift past roughly 12%
tint start reading as loading skeletons, which promises content that never
arrives.

Where the whole figure is the stand-in — an illustrated statement, invoice or
report rather than one half of a comparison — the rule inverts and becomes
stronger. Everything is unfilled except the two or three values the argument
actually turns on, which are set as real text at the size they would really be.
The reader's eye goes to the only legible thing in the frame, and the figure
needs no caption to say where to look. Two real values per panel is the ceiling.
⚠ It is still decoration: `aria-hidden` the rules, and repeat those values in
the prose beside it — they are the content, not the illustration.
