---
id: data-saver-media-branch
category: perf
tags: [performance,media-query,bandwidth,video,progressive-enhancement,accessibility]
axes: none
cost: 1
seen: 13
requires: []
conflicts: []
completes: []
tension: []
---
`prefers-reduced-data: reduce` is a reader saying their connection costs money,
and a decorative hero video is the first thing that should go. The branch is
not a lesser page — it is the same page with every non-informative byte
removed: footage replaced by the ground it was sitting on, decorative image
bands dropped, remaining media deferred. Target 10–25% of the default transfer.

```css
@media (prefers-reduced-data: reduce) {
  video, .decor-band { display: none }
  .hero { background: var(--ink) }
}
```
⚠ It never fires by default and support is partial, so the branch may only
remove. Put no layout, contrast or content decision inside it.

The query has a script-side twin that actually fires: `navigator.connection.saveData`
is set by the browser's own data-saver switch, which readers turn on far more
often than they set a CSS-level preference. Fold it into the same predicate as
reduced motion and resolve one boolean at startup — a reader on a metered
connection and a reader who asked for stillness both want the static branch,
and downstream code should not have to know which one it is serving.
```js
const still = matchMedia('(prefers-reduced-motion: reduce)').matches ||
              !!navigator.connection?.saveData
```
⚠ Chromium-only and absent behind privacy settings, so it may only add
restraint — never gate content or a control on it being false.

`saveData` is one bit and a connection has more than two states. `effectiveType`
and `downlink` separate a metered connection from a merely slow one, and slow
wants a different answer — not the content removed but a lighter encode of it,
a second file at 25–40% of the bytes, chosen at the moment of the fetch rather
than declared in markup. Treat 3g-or-worse, or downlink at or under 1.5–2 Mbps,
as the light tier.
```js
const c = navigator.connection
const light = !!c && (c.saveData || ['slow-2g','2g','3g'].includes(c.effectiveType)
  || c.downlink <= 1.6)
v.src = light ? v.dataset.srcLight : v.dataset.srcFull
```
⚠ The API is absent on most engines, so the *default* branch has to be the full
encode — write the predicate so a missing `connection` is false, never a truthy
unknown. `downlink` is a rounded recent average and lags a change of network by
seconds, so never re-pick a source mid-session on it.

One predicate, two consumers. Once the boolean is resolved in script, publish it
as a flag on the root element rather than keeping it in a closure: CSS can then
branch on the same fact — killing a decorative keyframe, resting an interlude at
its visible state — without a second media query that answers a different
question. The script stays the only place the rule is written, and the
stylesheet stops having to guess which of the two reasons applied.
```js
document.documentElement.classList.toggle('limit-motion', still)
```
```css
.limit-motion .drift { animation: none; opacity: 1; transform: none }
```
⚠ Set it before the first paint of anything it governs, or the flagged elements
animate for a frame and then stop — which is worse than not honouring it.
