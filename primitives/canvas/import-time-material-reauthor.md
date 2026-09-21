---
id: import-time-material-reauthor
category: canvas
tags: [canvas,material,import,architecture,correctness,scene]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An imported model arrives wearing whatever its exporter wrote — flat diffuse
colours, none of the page's material language. Mapping each material by name is
the obvious fix and the fragile one: it breaks on the next export. Classify by
the material's own colour instead and return a replacement, so any asset with a
plausible palette takes the scene's finish and a re-export costs nothing. Three
or four buckets is enough.

```js
const reskin = m => { const { r, g, b } = m.color ?? { r: .5, g: .5, b: .5 }
  if (r > .5 && g > .35 && b < .25) return new MeshPhysicalMaterial({ color: ACCENT, clearcoat: .55, roughness: .42 })
  if ((r + g + b) / 3 < .25)        return new MeshStandardMaterial({ color: m.color, metalness: .45, roughness: .6 })
  return new MeshStandardMaterial({ color: m.color, metalness: .55, roughness: .5 }) }
obj.traverse(o => o.isMesh && (o.material = [o.material].flat().map(reskin)))
```
⚠ Dispose what you replace or the old materials and their maps stay resident.
Keep the source `map` where there is one — classification is about finish, and
dropping it throws away the only detail the asset carried.
