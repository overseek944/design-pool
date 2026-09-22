---
id: print-frozen-frame-branch
category: motion-system
tags: [print,correctness,motion,fallback,accessibility]
axes: none
cost: 1
seen: 6
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

Un-hiding is not only about entrances. Paper has no interaction, so every panel
a reader would have opened — an inactive tab, a collapsed disclosure, a block
behind a *show more* — is simply absent, and the print carries a heading with
nothing under it. Force the set open in the same branch and drop the controls
that would have opened them, so the page prints as the document it stands for
rather than as the state it happened to be left in.
```css
@media print {
  [role=tabpanel][data-state=inactive] { display: block !important }
  details:not([open]) > :not(summary)  { display: block !important }
  .clamped { -webkit-line-clamp: none; max-height: none }
  [role=tab], .disclosure-toggle { display: none !important }
}
```
⚠ Forcing every panel open can multiply the page count several times — right for
a spec, wrong for an invoice, so decide per component rather than by selector
sweep. Never force open a panel holding something the screen never showed.

Forcing an opaque ground is only half of it, because the engine's default is to
*drop* backgrounds and shadows entirely — a tinted callout, a filled highlight,
a coloured status pill all come out as unmarked white and the document loses the
distinctions it was making. `print-color-adjust: exact` on the root turns that
off wholesale, which is the right default for anything whose meaning is carried
in fill. Name the sheet in the same block: `@page` is the only place the paper
size and its margins can be set, and leaving it to the dialog means the layout
is tuned against whatever the reader's printer defaults to.
```css
@media print {
  @page { size: A4; margin: 14mm }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact }
}
```
⚠ Exact colour prints every decorative wash at full ink. Pair it with dropping
the decorative layers, or a two-page summary costs a cartridge.

Naming the resting frame per component does not scale past a few, and the one
that gets missed is the one that prints as a stain. There is a blanket form:
give *every* animation a large negative delay and a near-zero duration, so each
one is evaluated past its own end and `fill-mode: both` holds that last
keyframe. One block covers entrances, shimmers and meters without enumerating
them, and it is the right default under a `*` selector because print has no
motion worth keeping. Delay −60s to −120s, duration 0.001s.
```css
@media print { *, *::before, *::after {
  animation-delay: -99s !important; animation-duration: .001s !important;
  animation-iteration-count: 1 !important; animation-fill-mode: both !important;
  animation-play-state: running !important; transition-duration: 0s !important } }
```
⚠ It freezes at the *end*, which is wrong for the two shapes whose end is not
their resting state: an `alternate` loop and any keyframe set whose 100% equals
its 0% both land back where they started, so a fade-in written that way prints
invisible. Those still need a named frame — the blanket rule is the floor under
the exceptions, not a replacement for them.
