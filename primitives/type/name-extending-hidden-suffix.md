---
id: name-extending-hidden-suffix
category: type
tags: [accessibility,label,correctness,type,navigation]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Every card ending in the same two words — *Read more*, *View* — hands a screen
reader's link list a column of identical entries. Extend the name rather than
replace it: a visually-hidden span inside the control carries that item's title,
so the name is unique and the visible label stays short. `aria-label` does it in
one attribute and is the wrong tool: it overrides content for assistive tech but
not for in-page find or a translation layer.

```html
<a href="…">Read more<span class="sr-only">: Why the rail stops at three</span></a>
```
```css
.sr-only { position: absolute; width: 1px; height: 1px;
           overflow: hidden; clip-path: inset(50%); white-space: nowrap }
```
⚠ The title sits directly above the link, so a linear reader hears it twice —
the right trade, the link list is where the choice is made, but it rules out any
suffix longer than a title.
