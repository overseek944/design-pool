---
id: name-pinned-transition-chrome
category: motion-system
tags: [motion,navigation,transition,chrome,accessibility]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A root view transition snapshots the whole page, so a tab bar present on both
sides of a navigation leaves with the old page and returns with the new — the
one thing an application never does. Give it its own `view-transition-name` to
lift it out of the root snapshot, then pin its group with `animation-name: none`
and it holds still while the page slides beneath. Cross-fade old to new at
60–140ms so an active-tab mark still updates.

```css
[data-tabbar] { view-transition-name: tabbar }
::view-transition-group(tabbar) { animation-name: none; z-index: 60 }
::view-transition-old(tabbar), ::view-transition-new(tabbar) { animation-duration: .1s }
```
⚠ The name must be unique at capture time — apply it from the attribute marking
the transition in flight, or two instances abort the transition outright. The
group needs a `z-index` above the root or the pinned bar paints under the page.
