---
id: anchor-focus-handoff
category: interaction
tags: [accessibility,navigation,focus,correctness,anchor]
axes: none
cost: 1
seen: 15
requires: []
conflicts: []
completes: []
tension: []
---
An in-page link that only scrolls leaves the keyboard where it was: the next
Tab goes back into the navigation rather than into the section just jumped to.
Move focus to the target and leave the scrolling to the browser. The heading
takes `tabindex="-1"`, its ring is suppressed because the jump is already the
feedback, and `scroll-margin-top` holds it clear of fixed chrome — 24–40px, or
the chrome height plus one line.
```js
link.addEventListener('click', () => target.focus({ preventScroll: true }))
```
```css
h2[id] { scroll-margin-top: 32px } h2:focus { outline: none }
```
⚠ Suppressing the ring is only safe on a heading. On a link or a button it
removes the focus indicator for every route into it.

No listener is needed when the target itself is focusable. Put `tabindex="-1"`
on the section or heading the fragment names and the browser's own fragment
navigation sets the focus starting point there — which also works on a page
opened directly at the hash, where a click handler never runs. Give every
anchored landmark the attribute, not only the one the skip link points at.

Scripting the jump loses two things the browser was doing for free. CSS
`scroll-behavior: smooth` is cancelled by the reduce query; `scrollTo({behavior:
'smooth'})` is not and ignores the preference outright, so read it and pass
`instant`. And bail on any modifier, or the `preventDefault` swallows
open-in-new-tab and open-in-new-window.
```js
if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
e.preventDefault(); history.replaceState(null, '', '#' + id)
scrollTo({ top: y, behavior: rm.matches ? 'instant' : 'smooth' })
```
⚠ Write the hash yourself once you preventDefault — otherwise the address bar
never advances and a reload or a share link returns to the top.

Key the offset on `[id]`, not on headings. Anything can be a fragment target — a
figure, a row, an empty alias span — and a rule scoped to `h2[id]` silently
drops all of them under the fixed header. One attribute selector at the root
with the chrome height as a token, and nothing that can be linked to is missed.
```css
[id] { scroll-margin-top: var(--chrome, 88px) }
```

Own the tween where the jump is part of the page's manner. Native smooth scroll
exposes neither duration nor easing and each engine picks its own, so a
deliberately unhurried arrival can only be authored: step `scrollTo` from a rAF
loop over a fixed span with an ease-in-out cubic, and hand focus over on the
final frame rather than the first. 600–1000ms — past that the reader starts
scrolling themselves.
```js
const e = t => t < .5 ? 4*t*t*t : 1 - (-2*t + 2)**3 / 2
const step = n => { const k = Math.min((n - t0) / 900, 1)
  scrollTo({ top: y0 + dy * e(k), behavior: 'instant' })
  k < 1 ? requestAnimationFrame(step) : focusTarget() }
```
⚠ No user gesture cancels a rAF loop, so a reader who scrolls mid-flight is
fought all the way down — abort on `wheel`, `touchstart` and `keydown`. The
reduce query has to be read here too: this path never reaches the UA's own
cancellation.

A smooth jump lands short whenever anything below the fold gains height while the
browser is still animating — a late image, a swapped font, a video replacing its
poster. The scroll finished correctly; the target moved afterwards. Once the
position settles, re-measure and close the gap, subtracting the target's own
`scroll-margin-top`. Poll at 150–200ms, give up after 10–15 tries, and treat any
`wheel`, `touchstart` or `keydown` as the reader taking over — a correction that
fights a deliberate scroll is worse than landing short.
```js
if (Date.now() - lastScrollAt < 140) return            // still animating
const gap = target.getBoundingClientRect().top - scrollMarginTop(target)
if (Math.abs(gap) < 2) return done()
scrollBy({ top: gap, behavior: reduced ? 'auto' : 'smooth' })
```
⚠ Fixing the cause is the better half of this: intrinsic `width`/`height` on every
image below the fold removes most of the drift, and the correction then only covers
what cannot be reserved.

None of this reaches a page that scrolls inside an element rather than the
document. Fragment navigation moves the document, which has nowhere to go, so
the landing is silently wrong on every direct hit of a hash URL. Resolve it by
hand once on mount — target rect minus scroller rect plus its `scrollTop` —
and focus the scroller itself with `preventScroll`, or Page Down and the arrow
keys do nothing until something inside is clicked.
```js
c.scrollTo({ top: t.getBoundingClientRect().top - c.getBoundingClientRect().top
             + c.scrollTop, behavior: 'instant' })
c.focus({ preventScroll: true })            // plus tabindex="-1" and a name
```
⚠ Run it after layout settles; a scroller measured mid-hydration lands short.
