---
id: image-plated-interface-mock
category: surface
tags: [product, mock, image, depth, color, surface]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---

On a monochrome dark page, set the interface mock on an atmospheric image plate
rather than on the page ground. The plate
carries all the page's colour and depth, so the UI can stay neutral and still
read as the focal object. Inset the mock 8–14% from the plate's top and sides
and let it run off the bottom edge, framing it as a mat. Plate radius 12–20px.

```css
.plate { background: url(sky.avif) center / cover; border-radius: 16px;
         padding: 8% 10% 0; overflow: clip }
```
⚠ The image sits behind real UI text: keep plate luminance away from the mock's
own surface, or add a 20–40% scrim, and reuse one plate at most twice per page.

Variant — on a light page, plate with a two-stop vertical gradient instead of
an image, reusing the two hues of the opening ground (cool top, warm foot). The
plate then echoes the page's atmosphere without a photograph and costs no
request; 180deg, stops 0% and 100%, radius 16–28px.

Variant — the reuse ceiling lifts when sibling plates are *windows onto one
image* rather than copies of it. Size the image once in pixels for the whole
row and give each plate a `background-position` offset by its own x within the
row, so the gutters between cards read as mullions over one continuous scene.
Pixel sizing is what holds the join; put the plates on a fixed-size stage scaled
as a unit so offsets never resolve against a changing box. Gutter 12–32px.
```css
.plate { background: url(scene.webp) no-repeat; background-size: 1070px 500px }
.plate:nth-child(2) { background-position: -414px -177px }  /* card x, row y */
```
⚠ Reflow breaks the illusion — once cards stack, the offsets show unrelated
crops. Pin separate offsets per breakpoint or accept independent crops below it.

Variant — on a light page, plate with a pale, low-contrast illustration (hazy
terrain, washed sky) and float two or three small cards on it rather than one
mock. The plate's detail stays in its outer 15–25%, the cards cover the centre,
so the art frames the UI instead of competing with it.
