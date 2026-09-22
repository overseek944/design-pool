---
id: wavy-annotation-underline
category: type
tags: [type,underline,link,detail,informal]
axes: {energy: 2, density: 2, weight: 2, finish: 2}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A wavy decoration stops reading as a link and starts reading as a drawn mark,
which is what makes it usable for emphasis inside running prose rather than
only on anchors. Two properties carry it: `skip-ink: none`, without which every
descender punches a gap and the wave is no longer one continuous line, and a
thickness raised with the type size or the crest flattens into a smudge.
Thickness 2px at body size, 3–5px at display; offset 2–4px.
```css
.mark { text-decoration: underline wavy var(--accent);
  text-decoration-thickness: 2px;
  text-decoration-skip-ink: none;
  text-underline-offset: 3px }
```
⚠ Amplitude and period are engine-defined and cannot be tuned. If the exact
wave matters, draw it as a repeating background instead.
