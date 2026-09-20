---
id: coordinated-group-state
category: interaction
tags: [interaction,surface,hover]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Hover the container, animate the parts. A single `group` parent lets an arrow
translate, a border brighten and a glow lift from one state change — the whole
card responds as one object instead of three independent hovers.
```html
<a class="group"> <svg class="transition-transform group-hover:translate-x-[.15vw]">
```

The parent state need not be hover. Key the same container selector off a
native `[open]`, `[aria-current]` or `:checked` and one attribute flip drives
every part — a `+` rotating 45° into a close mark, a chevron turning, a rail
tinting. The state then lives where the platform already keeps it rather than
in a class the script has to remember to remove.
