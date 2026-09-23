---
id: overrun-digit-reel
category: motion-system
tags: [motion,counter,number,figure,reveal,accessibility]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A figure can arrive rolling like a mechanical counter instead of counting up. Each digit place is a clipped window over a vertical numeral strip that runs one to two laps past zero before its target, so every place spins. The strip's resting transform is the target, so no animation still shows the right number. Stagger places 60–150ms; roll 1.5–3.5s on a hard ease-out.

```css
.win { display: inline-block; height: 1lh; overflow: hidden }
.strip { display: flex; flex-direction: column; transform: translateY(var(--end)) }
.go .strip { animation: roll 2.4s cubic-bezier(0,.75,.15,1) var(--delay) both }
@keyframes roll { from { transform: none } }
```
⚠ Screen readers read every numeral: hide the reel and carry the value in visually-hidden text.

A display-size reel slices its glyphs if the window is one line box tall — ink
overshoots the line box, especially round digits and descending figures. Pad
the window and every strip cell by 20–25% of the line height, and take the same
padding back off with a negative block margin so the row still lays out at its
line height and fixed characters (`.`, `M`, `%`) keep one baseline with the
rolling ones. With proportional figures, set each place's width to its target
digit and transition the width on the same curve and duration as the roll.
```css
.cell { --pad: calc(var(--line) * .24); height: calc(var(--line) + var(--pad) * 2);
  margin-block: calc(var(--pad) * -1); transition: width .9s var(--ease) }
.strip > * { height: 100%; padding-block: var(--pad); line-height: var(--line) }
```
⚠ Exclude the strip itself from the padded-cell rule or it inherits the padding and every digit drops off the baseline.
