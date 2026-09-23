---
id: labelled-elastic-rule
category: layout
tags: [layout,type,hairline,metadata,editorial]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
A section divider carries more than separation when the rule itself is a flex
child: an index on the left, a caption on the right, and a hairline taking
whatever is left between them. Labels of any length keep the band full width
with no `calc` and nothing to measure. Numbering sections this way also gives
running prose something to point at — *see § 03* — without minting a heading
anchor for it.

```css
.band { display: flex; align-items: center; gap: .75rem }
.band > span  { flex-shrink: 0 }
.band > .rule { flex: 1; block-size: var(--hair, 1px); background: var(--line) }
```
⚠ Both labels want the smallest mono tier, 10–12px at 0.18–0.24em tracking. At
body size the band stops reading as apparatus and competes with the heading
under it.

Where the label belongs centred on the rule rather than at one end, knock it out
instead of splitting the line: one absolutely-positioned rule spanning the band,
the label over it carrying the ground as its own background plus 10–16px of
side padding. The rule can then be dashed or doubled and stays continuous
underneath, which the flex form cannot manage, and the label centres itself with
nothing measured.
```css
.band { position: relative; text-align: center }
.band::before { content:""; position:absolute; top:50%; left:0; right:0;
  border-top: var(--hair,1.5px) dashed var(--line) }
.band span { position: relative; background: var(--ground); padding: 0 12px }
```
⚠ The knockout must be painted in the section's actual ground — over a gradient
or an image it shows as a solid patch.

A third form fixes what the knockout cannot. Give the label a short rule span on
*each* side as flex siblings — 2–3rem, hairline — and the band centres over any
ground at all: a gradient, a photograph, a video frame. Nothing is painted to
hide a line behind the text because no line passes behind it. It costs two nodes
and gives up the continuous dashed rule; take it whenever the section ground is
not a flat colour.
```css
.band { display: flex; align-items: center; justify-content: center; gap: 1rem }
.band > .rule { inline-size: 2.5rem; block-size: var(--hair,1px); background: var(--line) }
```
