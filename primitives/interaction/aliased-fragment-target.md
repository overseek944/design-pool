---
id: aliased-fragment-target
category: interaction
tags: [navigation,anchor,fragment,accessibility,architecture,url]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A section can answer to more than one fragment without renaming its canonical
`id` or standing up a redirect: drop an empty, `aria-hidden` span carrying the
alternate `id` inside it, absolutely positioned at the section's top-left so it
takes no box. Old inbound links, campaign slugs and a shorter human name all
land on the same place, and the aliases are visible in the markup as a list
rather than buried in server config. One to three per section; past that the
naming is the problem.
```html
<section id="results" style="position:relative">
  <span id="customers" aria-hidden="true" class="alias"></span>
```
```css
.alias { position: absolute; top: 0; left: 0 }
[id] { scroll-margin-top: var(--chrome, 88px) }
```
⚠ Without `position: absolute` inside a positioned ancestor the span opens a
line box and adds leading. The offset rule must key on `[id]`, not on headings —
an alias is not one, and it would land under fixed chrome.
