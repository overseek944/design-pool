---
id: overflow-probe-via-scroll-timeline
category: scroll
tags: [scroll,overflow,progressive-enhancement,correctness]
axes: none
cost: 2
seen: 7
requires: []
conflicts: []
completes: [conditional-token-space-toggle]
tension: []
---
A scroll-driven animation only advances if its scroll port can actually scroll,
so an empty keyframe attached to `scroll(inline self)` becomes a pure-CSS "am I
overflowing?" test. No ResizeObserver, no layout read, and it re-evaluates free
on resize, font swap and content change. Show edge fades or scroll buttons
only when content genuinely spills.

```css
@keyframes probe { from, to { --spills: ; } }
.rail { overflow: auto; animation: probe linear; animation-timeline: scroll(inline self);
        --fade-on: var(--spills) 1; --fade-off: 0 }
.rail .edge { opacity: var(--fade-on, var(--fade-off)) }
```
⚠ Gate on `@supports (animation-timeline: scroll())`. Unsupported engines never
run the keyframe, so the fallback must be the *non*-overflowing state —
affordances stay hidden rather than stuck on.

The same timeline gives a *continuous per-end* readout, not only a boolean.
Register two `<number>` properties and animate one 0→1 and the other 1→0 across
`scroll(self)`, then multiply each into its own end of the mask stop list: the
lead fade grows in as the rail leaves its start and the trail fade retracts as
it reaches the end, so one declaration replaces a scroll listener, a resize
observer and two threshold classes. Fade 12–24px on a rail, up to 40px on a
tall block — and cap it against the port with `min(12%, 40px)`, or a short
panel is most of the way faded at both ends.
```css
@property --lead { syntax: "<number>"; inherits: false; initial-value: 0 }
.rail { animation: lead linear both, tail linear both;
  animation-timeline: scroll(self x), scroll(self x);
  mask-image: linear-gradient(90deg, #0000, #000 calc(var(--lead) * var(--fade)),
    #000 calc(100% - var(--tail) * var(--fade)), #0000) }
```
⚠ An inactive timeline falls back to the registered initial values, so both must
be `0` — set them to `1` for the scrolling case and a rail that fits, or an
engine without support, is permanently dimmed at both ends.

A fade that tracks the whole scroll is a gradient of information nobody reads.
Register the mask distance itself as a `<length-percentage>` and give the
keyframe an `animation-range` covering only the last stretch of travel: the edge
stays fully faded for the entire scroll and retracts in the final 60–120px, so
the affordance is constant while there is more and resolves once, on arrival.
```css
@property --fade-b { syntax: "<length-percentage>"; inherits: false; initial-value: 0 }
@keyframes unfade { from { --fade-b: var(--size) } to { --fade-b: 0px } }
.port { mask-image: linear-gradient(#000 0, #000 calc(100% - var(--fade-b)), #0000);
  animation: unfade 1ms linear both; animation-timeline: scroll(self y);
  animation-range: calc(100% - var(--reveal, 96px)) 100% }
```
⚠ The fallback polarity inverts from the probe above. Here the port is known to
overflow, so `@supports not (animation-timeline: scroll())` must pin the
distance at full size — left at the registered `0`, an unsupported engine gets a
port with no edge cue at all.

The scripted fallback wants one declaration, not four. Let the state attributes
write the whole *argument list* of the gradient into a single custom property —
angle and stop positions together — and `mask-image:
linear-gradient(var(--fade))` never changes. Each of the four states (neither
end, top only, bottom only, both) is then one line, and the element that carries
the mask has no idea which rule won.
```css
[data-scroll-top]    { --fade: 0deg,   #000 calc(100% - var(--size)), #0000 }
[data-scroll-bottom] { --fade: 180deg, #000 calc(100% - var(--size)), #0000 }
```
⚠ A custom property holding an incomplete value list is only invalid where it is
*used*, so a typo blanks the mask and hides the whole panel rather than failing
at the declaration. Ship a complete opaque default.
