---
id: utility-scale-token-reclamation
category: color
tags: [color,tokens,theming,architecture,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A codebase committed to a utility framework has its palette frozen in markup:
thousands of `text-white` and `text-gray-400` call sites, none of them
themeable. Reclaim them in one stylesheet loaded after the framework —
redeclare each generated colour utility as a read of a semantic token, and the
whole palette swaps from one `:root` block with no markup touched. Collapse the
framework's grey ramp onto a shorter prominence ladder of three to five steps
rather than mapping one to one; the extra steps were never carrying
distinctions.

```css
:root { --fg-strong: #ebdbb2; --fg-muted: #bdae93 }
.text-white { color: var(--fg-strong) !important }
.text-gray-400, .text-gray-500 { color: var(--fg-muted) !important }
```
⚠ Collapsing the ramp merges shades that sat side by side somewhere — find
those pairs before shipping. Any utility whose contrast assumption inverts needs
re-pinning too: a label that was white on a dark accent is unreadable the moment
the accent turns light.
