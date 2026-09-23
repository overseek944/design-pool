---
id: stroke-coded-empty-target
category: interaction
tags: [interaction,form,file,upload,state,border]
axes: {energy: 1, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A drop or pick target can state "empty" versus "holding something" through its
border *style* alone: dashed while it waits, solid once a file is held. A dashed
edge reads as a slot to fill, a solid one as a settled object, so the change
needs no icon, no hue and survives a monochrome palette. Raise the border alpha
and lay a faint fill on the filled state so it also gains weight.
```css
.drop { border: 1px dashed var(--line) }
.drop:has(input:valid) { border-style: solid; border-color: var(--line-strong);
  background: rgb(255 255 255 / .03) }
```
⚠ Style change alone fails for low vision at 1px — show the file name inside the
filled target as well. Fill alpha .02–.06.
