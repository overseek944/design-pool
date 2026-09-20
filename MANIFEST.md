# Manifest

48 primitives. Format: `category/id | axes cost | tags | gist`
Axes: E=energy D=density W=weight F=finish. Read `axes.md` first.

```
canvas/canvas-behind-dom-not-instead-of-it | neutral  $2 | canvas architecture accessibility | Absolutely-positioned inset-0 canvas with pointer-events-none un
canvas/eased-pointer-influence | E3 D2 W2 F5 $2 | shader interaction feel | Never feed raw pointer state to a shader. Keep a uMouseActive fl
canvas/palette-as-uniforms | neutral  $2 | shader color system | Pass the site's palette into the shader as named vec3 uniforms r
canvas/parametric-thickness-variation | E3 D3 W2 F4 $3 | shader organic detail | Drive line or ribbon thickness with uThickness + uThickVary nois
canvas/scroll-driven-frame-atlas | E4 D3 W3 F4 $4 | canvas scroll performance | For scrubbed sequence playback, draw frames from a sprite atlas 
canvas/standard-uniform-set | neutral  $2 | shader architecture reference | A small reusable uniform contract covers most decorative shaders
color/near-black-single-ramp | E2 D2 W4 F4 $1 | color palette dark restraint | Pure #000 ground, off-white #ededed text, and ONE neutral ramp (
interaction/coordinated-group-state | E3 D2 W2 F5 $1 | interaction surface hover | Hover the container, animate the parts. A single group parent le
interaction/micro-interaction-defaults | E2 D2 W2 F5 $1 | interaction polish consistency | One transition duration (200ms) and one property set for every n
layout/fractional-grid-with-fluid-rail | E1 D3 W3 F4 $2 | layout grid asymmetry | Asymmetric two-column via minmax() where the rail is viewport-pr
light/emitted-light-not-borders | E2 D1 W3 F5 $2 | color effect depth restraint | Separate surfaces with glow and luminance rather than 1px solid.
light/gradient-through-text | E3 D2 W4 F3 $2 | color type effect | background-clip: text with a transparent fill turns a headline i
light/screen-blend-light-layer | E3 D3 W3 F4 $3 | effect blend compositing dark | mix-blend-mode: screen on an overlay makes it add light and drop
light/stacked-chromatic-bloom | E3 D2 W4 F4 $3 | effect glow filter svg depth | filter: drop-shadow() chains, and follows the alpha channel — so
media/aspect-locked-media | neutral  $1 | layout media cls | Lock every media slot with an explicit aspect-ratio and let widt
media/video-as-surface-not-frame | E3 D2 W4 F4 $3 | media surface hero | autoplay muted loop playsinline preload="auto" with object-conta
motion-system/attribute-driven-motion-hooks | neutral  $1 | architecture motion maintainability | Target animations off data- attributes, never class names. Styli
motion-system/context-scoped-cleanup | neutral  $1 | motion lifecycle correctness | Create every animation inside a scoped context and revert it on 
motion-system/namespaced-hook-families | neutral  $1 | architecture motion scale | Prefix hooks by section (data-why-card, data-why-canvas, data-wh
motion-system/reduced-motion-branch | neutral  $1 | motion accessibility required | Branch at setup, not per-animation: if the user prefers reduced 
perf/revert-split-on-resize | neutral  $1 | type motion correctness | Split text hard-codes line breaks at split time. On resize or we
perf/will-change-on-split-children | neutral  $1 | motion performance promotion | Split text creates dozens of nodes animated simultaneously; with
reveal/char-opacity-drift | E3 D4 W2 F5 $4 | type motion reveal ambient | Per-character with opacity + small y, will-change:opacity,transf
reveal/masked-line-rise | E3 D2 W3 F5 $2 | type motion reveal | Split to lines, wrap each in an overflow-hidden outer with a tra
reveal/word-mask-variant | E4 D3 W3 F4 $2 | type motion reveal | Same nested-mask structure at word granularity (inline-block on 
scale/proportional-effect-radii | neutral  $1 | unit effect polish coherence | Express blur, glow and shadow radii in vh/vw rather than px, so 
scale/three-tier-token-redefinition | neutral  $2 | unit tokens architecture | One token name, three definitions: fluid desktop → fluid mobile 
scale/viewport-proportional-scale | E2 D2 W4 F4 $3 | unit typography layout responsive poster | Size type AND spacing in vw so the page scales as one proportion
scroll/once-versus-toggle | neutral  $1 | scroll reveal ux | Two reveal policies, chosen per intent, never mixed arbitrarily:
scroll/pin-and-progress-stack | E4 D3 W4 F4 $4 | scroll layout narrative | Pin a tall container and drive discrete state from a single scru
scroll/reveal-trigger-band | E2 D2 W2 F4 $1 | scroll reveal thresholds | Entrance triggers fire at top 85%–top 90% — just inside the fold
scroll/scrub-lag-band | E3 D2 W3 F5 $2 | scroll motion feel | scrub as a number adds catch-up lag in seconds and is what separ
scroll/smooth-scroll-driving-timeline | E3 D2 W3 F5 $3 | scroll motion architecture | Pair a smooth-scroll library (Lenis) with the animation library'
scroll/sticky-as-cheap-pin | E1 D2 W2 F3 $1 | scroll layout performance | position: sticky for anything that only needs to hold position —
surface/backdrop-blur-tier-system | E1 D3 W3 F4 $3 | surface depth glass | Treat backdrop blur as a depth scale, not a decoration: sm for i
surface/hairline-overhang | E1 D2 W1 F5 $1 | surface detail precision | Negative inset of exactly 1px with calc(100% + 2px) sizing so a 
surface/overflow-visible-for-glow-bleed | neutral  $1 | surface effect svg gotcha | SVG clips to its viewBox by default, which decapitates any drop-
surface/rotating-conic-border | E4 D3 W3 F4 $3 | surface border motion svg | An animated gradient border without a pseudo-element hack: an SV
timing/capped-total-stagger | neutral  $1 | motion sequencing scale | For unknown-length collections use stagger:{amount} not stagger:
timing/non-linear-loop-periods | E3 D3 W2 F4 $2 | motion ambient rhythm | Give concurrent ambient loops coprime-ish periods (4s / 5s / 7s)
timing/overshoot-for-pop-elements | E4 D2 W2 F3 $1 | motion easing delight | back.out(n) on small elements that should feel physical — badges
timing/production-timing-vocabulary | E2 D2 W2 F5 $1 | motion easing duration reference system | A coherent set beats a clever one. Durations cluster tightly and
timing/stagger-band | E3 D3 W2 F4 $1 | motion rhythm sequencing | Sibling stagger lives in a narrow band: .06–.08s reads as one ge
type/balanced-headline-wrap | neutral  $1 | type polish | text-wrap: balance on every headline so line lengths even out in
type/character-grid-as-texture | E3 D5 W2 F3 $2 | type texture ornament ascii | A field of monospace glyphs (+ x X 8 0 @ # % $) on a grid, used 
type/mono-as-ui-texture | E1 D3 W2 F4 $1 | type ui technical register | Run a monospace face for all chrome — nav, labels, captions, cou
type/serif-accent-in-technical-context | E1 D2 W3 F5 $1 | type contrast editorial restraint | One high-contrast serif, used sparingly against a geometric sans
type/three-family-stack | E2 D3 W3 F4 $1 | type system | Geometric sans (body/headline) + mono (chrome/code) + display se
```
