---
id: host-overridable-widget-tokens
category: scale
tags: [tokens,embed,widget,theming,specificity,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An embedded widget lands in a stylesheet you do not control and has to be
retintable by a host who will write one plain class. Declare every default
inside `:where()` — zero specificity — so the host's own `.widget { --surface:
… }` wins with no `!important` and no shadow DOM. Read each token back with a
literal fallback so the widget still paints if the token layer is blocked or
served stale. Reset `box-sizing` across the subtree as well: the host's reset is
unknowable and plenty are not border-box. Ten to fifteen tokens covers surface,
ink, rule, radius, shadow and font.

```css
:where(.w) { --w-surface: #fff; --w-fg: #171717; --w-radius: 4px }
.w, .w * { box-sizing: border-box }
.w-panel { background: var(--w-surface, #fff); color: var(--w-fg, #171717);
           border-radius: var(--w-radius, 4px) }
```
⚠ Zero specificity cuts both ways — a host's `*` reset beats the defaults too.
Anything that must hold ships as a normal declaration, not inside `:where()`.
