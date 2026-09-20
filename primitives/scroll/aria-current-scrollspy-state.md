---
id: aria-current-scrollspy-state
category: scroll
tags: [accessibility,navigation,scroll,state,architecture]
axes: none
cost: 1
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
A table of contents entry is a location, and the platform has a word for it. Set `aria-current="location"` rather than an `.is-active` class:
the position is announced, styling keys off the attribute a screen reader
already reads, and there is no second source of truth to drift. Mark it with a 2–3px border
pulled back by the rail width so it sits on the line, not beside it.
```css
.toc nav { border-left: 1px solid var(--line) }
.toc a { border-left: 2px solid transparent; margin-left: -1px }
.toc a[aria-current="location"] { border-left-color: currentColor }
```
⚠ `page` marks the current document in a site nav, `location` a position
within it. Both at once reads as two current items.

`aria-current` marks a location; it does not announce one. It is surfaced when
the link is reached, not when the page scrolls past the section it names — so on
a page where scrolling is itself the content change, the attribute is correct
and silent. It answers "where am I in this list", never "what just happened".

The same trade applies to a control's own state. `aria-expanded`, `aria-invalid`
and `aria-selected` are style hooks as good as any class, and keying off them
makes a styled-but-unannounced state impossible to ship. It also reads
negatively: `:not([aria-haspopup])` withholds a momentary press treatment from
triggers whose real feedback is the expanded state, so one rule serves both kinds
of button without a variant prop.

The current-item treatment must differ from `:hover` in kind, not in degree.
Where both resolve to the same fill, hovering the current item does nothing and
hovering any peer impersonates it — the list reports the wrong location for as
long as the pointer rests there. Give current the channel that survives with the
pointer away, and hover a different one.
```css
.nav a[aria-current] { background: var(--ink); color: var(--ground) }
.nav a:not([aria-current]):hover { border-color: var(--ink) }
```
⚠ Both collapse under `forced-colors`, where author backgrounds are discarded —
the current item still needs a mark of its own there.
