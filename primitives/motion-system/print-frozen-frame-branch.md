---
id: print-frozen-frame-branch
category: motion-system
tags: [print,correctness,motion,fallback,accessibility]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

Anything a reader will print or save as PDF — a report, an invoice, a shared
summary — needs a second output branch, because paper freezes every infinite
animation at whatever frame the layout engine happened to reach. Name the
resting frame explicitly rather than only stopping the clock: a shimmer left
mid-sweep prints as a diagonal stain. Flatten hover elevation, drop decorative
chrome, and force opaque ground, since print defaults discard backgrounds and
light-on-dark panels come out as blank rectangles.

```css
@media print {
  .shimmer { animation: none; background: none }
  .lift, .lift:hover { transform: none !important; box-shadow: none !important }
  .no-print { display: none !important }
  body { background: #fff !important; color: #000 }
  .section { break-before: page }
}
```
⚠ Print has no viewport query, so a layout tuned by breakpoint arrives at
whatever width the paper implies — check at A4 and Letter, not just in preview.

Print must also *un-hide*. An entrance that sets `opacity: 0` in CSS and clears
it from an observer leaves everything below the fold hidden on paper — the
observer never fires for a document the printer lays out at once, so page two
onward comes out blank. Reset every entrance class in the same branch, and add
`break-inside: avoid` so a row does not split at the seam.
```css
@media print { .reveal, .reveal-clip { opacity: 1 !important; transform: none !important;
  clip-path: none !important } li, section { break-inside: avoid } }
```
⚠ Decorative `aria-hidden` layers cost the most ink and carry the least — drop
them in the same block rather than one by one.
