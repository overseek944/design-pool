---
id: end-clamped-section-spy
category: scroll
tags: [scroll,navigation,correctness,architecture]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: [aria-current-scrollspy-state]
tension: []
---
A scroll spy that takes the last section whose top has crossed a reading band
can never reach its final entry: a closing section shorter than the scroll
remaining never lifts its top above the band, so the rail stalls one item early
for the whole end of the page. Clamp it — at the bottom of the range the last
section wins outright. Set the band 15–25% of viewport height below the top
edge, so the active entry is the one being read rather than the one at the
frame, and publish the winner on the container so a heading, a progress mark
and the rail read one fact.
```js
const end = innerHeight + scrollY >= document.documentElement.scrollHeight - 2
let cur = end ? last : null
if (!end) for (const s of sections) { if (s.offsetTop <= scrollY + BAND) cur = s; else break }
root.dataset.activeSection = cur?.id ?? ''
```
⚠ `offsetTop` is stale after a reflow — re-resolve on `resize` and
`hashchange`, and throttle the handler to one `requestAnimationFrame`.

`offsetTop` per section is one forced layout per section per scroll frame, and
the staleness is a second problem on top of the cost. Where the sections are
rendered from a list the author controls, the offsets are already known: put
each one's top in the same record that supplies its label, read the
*container's* rect once, and add. One measurement serves every entry, nothing
goes stale on resize because nothing was measured, and walking the list
backwards lets the first match break out.
```js
const top = rail.current.getBoundingClientRect().top, band = innerHeight / 2
let i = 0
for (let k = items.length - 1; k >= 0; k--) if (top + items[k].offset <= band) { i = k; break }
```
⚠ The offsets are now a promise the layout has to keep — a section that reflows
at a breakpoint, or copy that grows, silently desynchronises the rail. Give
each record a per-breakpoint offset or measure once after fonts settle.
