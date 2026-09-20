# Manifest

244 primitives. Format: `category/id | axes cost | tags | gist`
Axes: E=energy D=density W=weight F=finish. Read `axes.md` first.

```
canvas/alpha-bucketed-path-batch | E2 D4 W1 F5 $3 | canvas svg performance generative texture batching | Thousands of individually-faded SVG marks means thousands of nod
canvas/canvas-behind-dom-not-instead-of-it | neutral  $2 | canvas architecture accessibility | Absolutely-positioned inset-0 canvas with pointer-events-none un
canvas/described-canvas-figure | neutral  $1 | canvas accessibility architecture diagram | A canvas carrying the argument — a diagram, a chart, a staged ex
canvas/eased-pointer-influence | E3 D2 W2 F5 $2 | shader interaction feel | Never feed raw pointer state to a shader. Keep a uMouseActive fl
canvas/glyph-ramp-image-field | E2 D4 W2 F3 $4 | canvas type texture image ambient generative | Encode a photograph as a field of characters: draw it into an of
canvas/hash-dither-before-quantise | E1 D3 W2 F4 $2 | canvas color ramp noise grain banding generative | Snapping a continuous value onto a short palette — eight to twel
canvas/named-uv-spaces | neutral  $3 | shader architecture responsive correctness reference | One vertex shader can emit several named coordinate spaces so ea
canvas/override-material-edge-pass | E2 D3 W2 F5 $5 | webgl shader wireframe render-pass narrative | Render one set of geometry in two visual registers and cross-fad
canvas/palette-as-uniforms | neutral  $2 | shader color system | Pass the site's palette into the shader as named vec3 uniforms r
canvas/parametric-thickness-variation | E3 D3 W2 F4 $3 | shader organic detail | Drive line or ribbon thickness with uThickness + uThickVary nois
canvas/precomputed-cell-attenuation-field | E1 D2 W2 F5 $2 | canvas legibility performance ambient contrast generative | A generative field at full strength everywhere either drowns the
canvas/projected-label-visibility-budget | neutral  $3 | webgl label projection density correctness | Projecting a 3D point to screen coordinates gives a position for
canvas/scroll-driven-frame-atlas | E4 D3 W3 F4 $4 | canvas scroll performance | For scrubbed sequence playback, draw frames from a sprite atlas 
canvas/standard-uniform-set | neutral  $2 | shader architecture reference | A small reusable uniform contract covers most decorative shaders
canvas/svg-userspace-pointer-mapping | neutral  $1 | svg pointer correctness interaction geometry | An SVG with a viewBox is drawn in its own coordinate system, and
canvas/unit-box-asset-framing | neutral  $2 | canvas correctness scale geometry architecture | A loaded 3D asset arrives at whatever scale and origin its expor
color/declared-contrast-escalation | neutral  $1 | accessibility contrast tokens type color | prefers-contrast: more is not a second theme — it is permission 
color/gamut-ladder-fallback | neutral  $1 | color tokens progressive-enhancement correctness | Ship every colour token twice: an sRGB hex baseline, then the wi
color/near-black-single-ramp | E2 D2 W4 F4 $1 | color palette dark restraint | Pure #000 ground, off-white #ededed text, and ONE neutral ramp (
color/parallel-alpha-ramp | neutral  $2 | color tokens alpha borders theming | Ship two neutral ramps of equal length: one opaque, one alpha-on
color/pattern-encoded-series | E1 D3 W2 F4 $2 | color accessibility pattern data contrast texture | Hue alone cannot carry series identity — it fails in greyscale, 
color/root-filter-inversion | E2 D2 W4 F2 $2 | color dark filter invert theme effect | filter: invert(1) hue-rotate(180deg) on the root flips lightness
color/runtime-shade-derivation | neutral  $1 | color tokens theming architecture | Derive hover, active and disabled shades from a colour you will 
color/self-painting-theme-scope | neutral  $2 | color tokens theming architecture dark | A theme is one class that both defines the semantic colour token
color/sequence-value-ramp | E1 D2 W3 F4 $1 | color hierarchy surface sequence contrast | Tint a row of peer surfaces along one lightness ramp so sequence
interaction/anchor-focus-handoff | neutral  $1 | accessibility navigation focus correctness anchor | An in-page link that only scrolls leaves the keyboard where it w
interaction/auto-advance-yields-to-input | E2 D2 W2 F5 $2 | carousel autoplay accessibility state | A self-advancing sequence must stop the instant a reader touches
interaction/breakpoint-dual-mode-details | neutral  $2 | disclosure navigation responsive accessibility progressive-enhancement | One <details> can be a permanently-open sidebar above a breakpoi
interaction/breakpoint-scoped-overlay-dismiss | neutral  $1 | navigation overlay responsive correctness accessibility | An overlay that exists only below a breakpoint — a mobile nav sh
interaction/coordinated-group-state | E3 D2 W2 F5 $1 | interaction surface hover | Hover the container, animate the parts. A single group parent le
interaction/dimension-coded-position-dot | E2 D2 W2 F5 $1 | interaction state indicator accessibility carousel | Let the active item in a position indicator change size, not onl
interaction/edge-hotzone-sibling-reveal | E2 D2 W2 F5 $2 | interaction hover panel chrome css-only accessibility | Reclaim the width a hidden rail costs without a toggle: park an 
interaction/gesture-affordance-label | E1 D2 W2 F4 $1 | affordance interaction accessibility detail ux | A surface whose only affordance is a gesture — drag to orbit, sc
interaction/hysteretic-lock-zone | neutral  $1 | interaction pointer state correctness threshold | Any boolean derived from a continuous input — pointer inside a z
interaction/idle-scroll-cue | E2 D1 W2 F4 $1 | scroll affordance feedback motion | A page whose motion is entirely scroll-driven stops when the rea
interaction/inert-tracks-opacity | neutral  $1 | accessibility focus correctness overlay pointer-events | An element faded to opacity: 0 is still in the tab order, still 
interaction/inline-target-floor | neutral  $1 | accessibility interaction correctness detail | A row of small print — legal links, meta, a footer — fails targe
interaction/micro-interaction-defaults | E2 D2 W2 F5 $1 | interaction polish consistency | One transition duration (200ms) and one property set for every n
interaction/native-disclosure-animation | E2 D2 W2 F5 $2 | motion disclosure accessibility progressive-enhancement height | ::details-content with interpolate-size: allow-keywords animates
interaction/offset-shadow-press | E3 D2 W4 F2 $1 | interaction state depth detail border | A hard offset shadow reads as a solid object sitting above the p
interaction/outward-corner-target | E3 D2 W1 F5 $2 | interaction state focus border precision detail | Four L-brackets absent at rest, then flying outward past the ele
interaction/paired-focus-offset-tokens | neutral  $1 | accessibility focus tokens correctness | Ship the focus ring as three tokens — width, an outer offset, an
interaction/partial-modality-inert-siblings | neutral  $2 | interaction dialog accessibility inert focus correctness | Not every overlay should take the whole page. A panel hung off a
interaction/pointer-transparent-copy-layer | neutral  $1 | interaction pointer accessibility layout correctness | Copy laid over a background that reacts to the pointer swallows 
interaction/reserved-state-border | neutral  $1 | accessibility focus cls border correctness | A control that gains a border on focus or selection must carry t
interaction/snap-scroll-as-dismiss-gesture | E3 D2 W2 F5 $3 | gesture dialog scroll accessibility sheet | Build a drag-to-dismiss sheet out of a scroll container rather t
interaction/state-as-numeric-custom-property | E3 D2 W2 F5 $1 | interaction hover state tokens architecture | Express interaction state as a number, then derive every depende
interaction/state-seeded-at-listener-attach | neutral  $1 | correctness state events scroll architecture | Events report transitions, not the current value. Any class deri
interaction/withheld-value-reveal | E2 D2 W3 F4 $1 | interaction disclosure redaction accessibility state | Withholding a figure claims more than printing it, but only if t
layout/border-clamped-annotation-leader | E1 D3 W1 F5 $2 | layout annotation connector svg diagram | A leader line drawn from a label's centre to its subject crosses
layout/boxless-wrapper | neutral  $1 | layout grid architecture correctness accessibility | display: contents removes an element's box while keeping its chi
layout/breakout-grid-named-lines | neutral  $2 | layout grid tokens architecture full-bleed | One grid on the page wrapper with named lines for the bleed gutt
layout/column-aligned-disclosure | E1 D2 W2 F5 $2 | layout grid disclosure alignment native | Let a <details> row sit on the page's column grid: make the <sum
layout/container-edge-rule-lattice | E1 D3 W1 F5 $2 | layout grid hairline precision responsive technical | Draw the measurement system, not only the content. Vertical hair
layout/count-threshold-shape-shift | neutral  $1 | layout has quantity-query chrome css-only density | Let a container change what it is once its contents pass a count
layout/cropped-stage-mock | E1 D2 W2 F5 $2 | layout responsive overflow media scale detail | Show a framed artifact — a handset, a browser chrome, a console 
layout/em-reserved-swap-height | neutral  $1 | layout layout-shift responsive correctness tabs | Content that swaps in place — a tab's copy, a rotating claim — c
layout/fractional-grid-with-fluid-rail | E1 D3 W3 F4 $2 | layout grid asymmetry | Asymmetric two-column via minmax() where the rail is viewport-pr
layout/height-budgeted-media-width | neutral  $2 | layout container-query aspect fit cls | When a card must fit one screen exactly — media plus chrome, not
layout/in-flow-overlay-header | neutral  $1 | layout sticky overlay correctness cls | A header that must float over the first section and still stick 
layout/intrinsic-size-abstaining-child | neutral  $1 | layout correctness type detail | A width: fit-content block is sized by its widest child, which i
layout/labelled-elastic-rule | E1 D2 W1 F5 $1 | layout type hairline metadata editorial | A section divider carries more than separation when the rule its
layout/legibility-floor-scroll-port | neutral  $1 | overflow responsive scroll correctness table figure | A table or a diagram has a width below which it stops being read
layout/measured-copy-keepout | neutral  $2 | layout measurement legibility canvas | Background art told to keep clear of the copy is usually given a
layout/occupancy-negotiated-label-placement | neutral  $4 | layout label annotation collision diagram correctness | Annotations placed independently overlap the moment two anchors 
layout/overflow-clip-over-hidden | neutral  $1 | overflow correctness accessibility scroll | overflow: clip crops without creating a scroll container. hidden
layout/per-edge-clip-polygon | neutral  $1 | overflow clip correctness bleed | overflow only works per axis, so there is no way to crop one edg
layout/ring-placed-upright-labels | E1 D3 W2 F4 $2 | layout diagram radial label geometry | Rotating a container to arrange labels around a circle tips ever
layout/ruled-definition-rows | E1 D3 W2 F5 $1 | layout type metadata responsive hairline | Metadata reads as a datasheet when it is a list of label-to-valu
layout/safe-area-floor-gutter | neutral  $1 | layout tokens safe-area responsive correctness | A gutter written as a plain value gets eaten by notches, rounded
layout/scroll-contracted-bar | E2 D2 W2 F5 $2 | header scroll sticky chrome | A header can start edge-to-edge and contract into an inset float
layout/scroll-lock-via-has | neutral  $1 | overlay correctness overflow dialog cls | Lock the page behind an overlay from CSS alone by keying off the
layout/self-drawing-grid-debug | neutral  $2 | layout grid tooling debug architecture | A layout system worth having can show its own work. One class re
layout/shared-percent-coordinate-space | E1 D3 W1 F5 $2 | diagram svg schematic accessibility responsive | A node diagram wants SVG lines and real DOM nodes: strokes that 
layout/single-edge-cell-rules | E1 D3 W1 F5 $1 | layout grid hairline rules precision | In a ruled grid every interior line is drawn by both neighbours 
layout/stacking-register | neutral  $1 | architecture z-index tokens correctness overlay | One file owns every stacking value in the product as named token
layout/viewport-height-bands | neutral  $1 | layout responsive media-query ornament correctness | Some decisions belong to the short axis. An opening frame, a pin
light/blend-doubled-headline | E2 D2 W4 F5 $3 | type blend legibility contrast compositing | Set the headline twice in one grid cell: an opaque copy under th
light/emitted-light-not-borders | E2 D1 W3 F5 $2 | color effect depth restraint | Separate surfaces with glow and luminance rather than 1px solid.
light/gradient-through-text | E3 D2 W4 F3 $2 | color type effect | background-clip: text with a transparent fill turns a headline i
light/offscreen-anchored-wash | E1 D2 W2 F4 $1 | gradient ground atmosphere ambient color cheap | A radial gradient centred inside its box shows its hot core and 
light/screen-blend-light-layer | E3 D3 W3 F4 $3 | effect blend compositing dark | mix-blend-mode: screen on an overlay makes it add light and drop
light/stacked-chromatic-bloom | E3 D2 W4 F4 $3 | effect glow filter svg depth | filter: drop-shadow() chains, and follows the alpha channel — so
media/approach-loaded-video | neutral  $2 | media video performance intersection-observer accessibility bandwidth | Background footage is usually the heaviest thing on a page and u
media/aspect-locked-media | neutral  $1 | layout media cls | Lock every media slot with an explicit aspect-ratio and let widt
media/blend-normalised-logo-wall | neutral  $1 | media logos blend-mode assets normalisation | Supplied logo files arrive as opaque rectangles — baked-in white
media/dialog-scoped-embed-lifecycle | neutral  $2 | media performance dialog correctness lifecycle | A third-party embed is not yours to pause — you cannot reach int
media/mask-swap-over-shared-paint | E2 D2 W2 F4 $2 | mask icon gradient media state | When a family of glyphs must share one fill — a gradient, a vide
media/optical-height-logo-row | neutral  $1 | media logos normalisation scale responsive | Supplied marks are drawn to different conventions — a wordmark f
media/origin-conditional-sandbox | neutral  $1 | media iframe embed security correctness | A sandboxed iframe that is also allow-same-origin and served fro
media/sheared-ghost-silhouette | E1 D3 W2 F5 $2 | depth line-art silhouette projection stroke | Flat line work reads as volume if the outline is drawn twice. Ke
media/single-source-focal-crop | neutral  $1 | media responsive performance detail | One photograph can hold a headline at every width without a seco
media/stacked-contour-volume | E1 D4 W2 F5 $2 | svg mark depth stroke currentcolor | Describe a solid as a stack of cross-sections instead of as a sh
media/state-preserving-frame-relocation | neutral  $3 | media iframe embed lifecycle dom correctness | appendChild removes and reinserts: an iframe reloads, a video re
media/stepped-transform-sprite | E3 D2 W2 F4 $2 | media sprite animation svg performance | Play a short looping illustration as a filmstrip: frames in one 
media/video-as-surface-not-frame | E3 D2 W4 F4 $3 | media surface hero | autoplay muted loop playsinline preload="auto" with object-conta
media/welded-figure-caption | E1 D2 W2 F5 $1 | media figure caption accessibility editorial | A caption set as a paragraph under a figure reads as body copy a
motion-system/attribute-driven-motion-hooks | neutral  $1 | architecture motion maintainability | Target animations off data- attributes, never class names. Styli
motion-system/camera-over-static-scene | E3 D2 W3 F5 $2 | motion transform scale focus diagram narrative | To walk a reader through a diagram, move the viewport rather tha
motion-system/context-scoped-cleanup | neutral  $1 | motion lifecycle correctness | Create every animation inside a scoped context and revert it on 
motion-system/distance-eased-camera-push | E2 D2 W3 F5 $3 | camera 3d easing scroll narrative | Interpolating a camera's position between two waypoints looks wr
motion-system/fire-on-arrival-propagation | E3 D3 W2 F5 $3 | entrance propagation graph canvas emergent | An entrance authored as a list of delays must be rewritten whene
motion-system/keyframe-variant-bank | E3 D4 W2 F3 $2 | motion generative ambient tokens architecture | Phase and period offsets only ever translate one curve; they can
motion-system/marquee-playhead | E3 D3 W2 F5 $3 | marquee motion state observer rhythm | Give a moving track one stationary reading position. A marker si
motion-system/marquee-still-state | neutral  $1 | motion accessibility marquee correctness overflow | A marquee's reduced-motion state is not a paused marquee. The tr
motion-system/motion-runtime-watchdog | neutral  $2 | motion correctness accessibility progressive-enhancement reveal | A reveal system that hides content in CSS and un-hides it from J
motion-system/named-completed-motion-state | neutral  $1 | motion state correctness accessibility reveal progressive-enhancement | Give a choreographed scene three named states — waiting, playing
motion-system/namespaced-hook-families | neutral  $1 | architecture motion scale | Prefix hooks by section (data-why-card, data-why-canvas, data-wh
motion-system/non-converging-decorative-meter | E2 D2 W2 F4 $1 | motion mock meter progress accessibility | A meter animated inside a product mock gets read as data. Fill i
motion-system/origin-signed-entrance | E3 D2 W2 F5 $1 | motion tabs state custom-properties transition | A tab set whose panels all enter from the same side throws away 
motion-system/path-scrubbed-entrance | E3 D2 W2 F5 $3 | motion scroll motion-path choreography scrub | Give each element its own curve instead of a shared translate. A
motion-system/paused-as-authored-rest | neutral  $1 | motion architecture correctness scene performance | A decorative scene whose resting state is running has already pl
motion-system/reduced-motion-branch | neutral  $1 | motion accessibility required | Branch at setup, not per-animation: if the user prefers reduced 
motion-system/scrubbable-waapi-timeline | E3 D2 W3 F5 $3 | motion scroll scrub architecture performance | A scroll-scrubbed timeline needs no animation library. Build eve
motion-system/self-dissolving-entrance-queue | neutral  $2 | motion sequencing correctness reveal scroll | Serialising entrances stops a long page arriving as noise, but a
motion-system/sequenced-root-view-transition | E2 D1 W2 F5 $2 | motion navigation transition accessibility | The default root view transition cross-fades outgoing and incomi
motion-system/slot-permutation-rotation | E2 D3 W2 F5 $3 | motion grid state responsive | To show more items than a grid has cells, swap one cell at a tim
motion-system/svg-geometry-keyframes | E3 D2 W2 F5 $1 | motion svg diagram precision detail | r, cx, cy, x, y and width are CSS properties on SVG, not just at
motion-system/transient-class-scoped-transition | neutral  $2 | motion-system view-transition theme correctness reduced-motion | A view transition, or a global colour transition, must animate f
perf/data-saver-media-branch | neutral  $1 | performance media-query bandwidth video progressive-enhancement accessibility | prefers-reduced-data: reduce is a reader saying their connection
perf/dead-banded-resize-rebuild | neutral  $1 | resize canvas mobile correctness | A generative scene that re-seeds on resize restarts every time a
perf/device-hint-quality-tier | neutral  $2 | performance webgl capability progressive-enhancement correctness | Resolve one integer tier at startup and let every expensive deci
perf/font-display-per-role | neutral  $1 | type font-loading cls performance correctness | font-display is a decision per face, not per project. Body and U
perf/layer-order-preamble | neutral  $1 | architecture cascade css correctness code-splitting | Cascade layers are ordered by first mention, so with code-split 
perf/loop-gated-on-attention | neutral  $2 | performance animation intersection-observer visibility battery correctness | An infinite decorative animation never stops — it keeps composit
perf/markup-declared-instrumentation | neutral  $1 | architecture instrumentation events delegation maintenance | Declare the event name and its payload as data- attributes and l
perf/media-query-parity-listeners | neutral  $1 | responsive correctness architecture motion breakpoint | Where script and stylesheet must agree on a layout, ask the brow
perf/offscreen-subtree-deferral | neutral  $1 | performance containment rendering scroll correctness | Below-fold grids of cards, figures or rows cost style, layout an
perf/post-teardown-asset-disposal | neutral  $2 | performance correctness lifecycle canvas architecture memory | An asynchronous asset load outlives the view that started it. Sc
perf/prefetch-on-intent-band | neutral  $2 | performance navigation prefetch observer architecture | Prefetching is two policies, not one. Intent arms on mouseenter,
perf/revert-split-on-resize | neutral  $1 | type motion correctness | Split text hard-codes line breaks at split time. On resize or we
perf/self-throttled-raf-loop | neutral  $1 | performance animation canvas battery frame-budget correctness | requestAnimationFrame offers the display's rate; it is not a con
perf/single-flight-external-script | neutral  $2 | performance architecture correctness lifecycle embed | Several components on a page may each need the same third-party 
perf/stylesheet-failure-reload-guard | neutral  $2 | correctness performance progressive-enhancement architecture cls | A hashed stylesheet that 404s after a deploy paints the whole do
perf/velocity-scaled-preload-margin | neutral  $2 | perf lazy-load scroll images loading | A fixed lazy-load margin is tuned for one scroll speed. Under a 
perf/will-change-on-split-children | neutral  $1 | motion performance promotion | Split text creates dozens of nodes animated simultaneously; with
reveal/arc-window-overstroke | E3 D2 W3 F5 $2 | draw-on highlight canvas pulse path | A path being drawn reads as inert when the settled trail and the
reveal/char-opacity-drift | E3 D4 W2 F5 $4 | type motion reveal ambient | Per-character with opacity + small y, will-change:opacity,transf
reveal/glyph-scramble-settle | E4 D3 W2 F3 $2 | type reveal motion technical text | Resolve a label out of noise rather than fading it in: hold the 
reveal/masked-line-rise | E3 D2 W3 F5 $2 | type motion reveal | Split to lines, wrap each in an overflow-hidden outer with a tra
reveal/mirrored-sign-pair | E3 D2 W3 F4 $2 | reveal motion rotation symmetry pairing | Two peer blocks on one row share a single progress value and rea
reveal/normalised-path-draw | E3 D2 W2 F5 $1 | svg stroke reveal draw geometry correctness | A draw-on stroke normally needs the path's measured length, whic
reveal/radius-held-inset-wipe | E3 D2 W2 F5 $2 | reveal clip-path wipe panel motion | A panel widening under clip-path: inset() squares its corners of
reveal/trailing-mask-sweep | E3 D3 W2 F4 $2 | reveal mask scan grid sweep technical | Reveal a field — a measurement grid, a texture, a dot matrix — b
reveal/word-mask-variant | E4 D3 W3 F4 $2 | type motion reveal | Same nested-mask structure at word granularity (inline-block on 
scale/breakpoint-fallback-chain | neutral  $2 | tokens responsive architecture components css | Let a caller pass per-breakpoint values as custom properties and
scale/conditional-token-space-toggle | neutral  $2 | tokens architecture css correctness | A custom property whose value is an empty token stream is a CSS 
scale/endpoint-named-fluid-tokens | neutral  $1 | tokens fluid naming architecture responsive | Name a fluid token after the two pixel values it interpolates be
scale/fixed-canvas-root-scale | E1 D2 W3 F4 $2 | scale layout proportion transform responsive | Author the page once at one pixel width and scale the whole canv
scale/one-hairline-token | E1 D2 W1 F5 $1 | unit tokens border precision coherence | Every thin line in a system should be the same line. Declare one
scale/percentage-root-with-divided-type | neutral  $2 | scale tokens accessibility unit architecture | Spacing and type share the rem and usually cannot be tuned apart
scale/proportional-effect-radii | neutral  $1 | unit effect polish coherence | Express blur, glow and shadow radii in vh/vw rather than px, so 
scale/registered-property-scope | neutral  $1 | tokens architecture animation correctness | @property registration is an API decision, not a formality. synt
scale/role-named-spacing-tiers | neutral  $2 | tokens architecture rhythm layout scale | A t-shirt spacing scale makes every author guess which step a gi
scale/sub-floor-density-breakpoint | neutral  $1 | responsive breakpoints density correctness | Designing to a 390px floor leaves a real 320–380px band unhandle
scale/three-tier-token-redefinition | neutral  $2 | unit tokens architecture | One token name, three definitions: fluid desktop → fluid mobile 
scale/viewport-centred-band | neutral  $1 | tokens responsive unit layout rhythm | A hero that should sit optically centred but must not vanish on 
scale/viewport-proportional-scale | E2 D2 W4 F4 $3 | unit typography layout responsive poster | Size type AND spacing in vw so the page scales as one proportion
scale/zoom-as-reflowing-scale | neutral  $1 | unit scale architecture responsive correctness | zoom is the one scale that reflows. transform: scale() leaves th
scroll/anchor-into-scrubbed-pin | neutral  $2 | scroll navigation anchor correctness pin | An in-page link into a scrubbed pin lands at the top of the pin 
scroll/aria-current-scrollspy-state | neutral  $1 | accessibility navigation scroll state architecture | A table of contents entry is a location, and the platform has a 
scroll/collapsed-observer-band | neutral  $1 | scroll observer navigation architecture correctness | Squeeze an observer's root to a single horizontal line and "whic
scroll/css-owned-pin-geometry | neutral  $2 | scroll pin architecture correctness responsive | Let the stylesheet decide whether a section pins and for how lon
scroll/element-scoped-read-progress | neutral  $2 | scroll progress correctness observer reading | Reading progress belongs to the article, not the document. Measu
scroll/embed-claims-wheel-on-hover | neutral  $1 | scroll embed iframe overflow pointer correctness | An interactive embed inside a scrolling page — a map, a 3D scene
scroll/hoisted-scroll-timeline | neutral  $2 | scroll motion architecture progressive-enhancement | A named scroll-timeline is visible only to descendants of the sc
scroll/once-versus-toggle | neutral  $1 | scroll reveal ux | Two reveal policies, chosen per intent, never mixed arbitrarily:
scroll/overflow-probe-via-scroll-timeline | neutral  $2 | scroll overflow progressive-enhancement correctness | A scroll-driven animation only advances if its scroll port can a
scroll/pin-and-progress-stack | E4 D3 W4 F4 $4 | scroll layout narrative | Pin a tall container and drive discrete state from a single scru
scroll/pointer-scoped-snap | neutral  $1 | scroll snap pointer input correctness | Mandatory snap is right for a thumb and wrong for a wheel: a tra
scroll/pre-hydration-scroll-restore | neutral  $2 | scroll navigation hydration restoration architecture | A client-routed page that restores scroll after hydration shows 
scroll/reveal-trigger-band | E2 D2 W2 F4 $1 | scroll reveal thresholds | Entrance triggers fire at top 85%–top 90% — just inside the fold
scroll/scripted-scroll-abort-band | neutral  $1 | scroll correctness accessibility events navigation | A scripted scroll animation owns the viewport for its whole dura
scroll/scroll-beat-live-region | neutral  $1 | accessibility scroll aria-live narrative correctness | When scrolling is what changes the content — a pinned scene, a c
scroll/scrollbar-on-activity | E1 D1 W1 F5 $1 | scroll scrollbar chrome restraint state | A permanent scrollbar rules a line down every panel that owns on
scroll/scrub-lag-band | E3 D2 W3 F5 $2 | scroll motion feel | scrub as a number adds catch-up lag in seconds and is what separ
scroll/smooth-scroll-driving-timeline | E3 D2 W3 F5 $3 | scroll motion architecture | Pair a smooth-scroll library (Lenis) with the animation library'
scroll/sticky-as-cheap-pin | E1 D2 W2 F3 $1 | scroll layout performance | position: sticky for anything that only needs to hold position —
scroll/tall-target-intersection-clause | neutral  $1 | scroll correctness observer reveal | intersectionRatio is a fraction of the element, so a section tal
surface/backdrop-blur-tier-system | E1 D3 W3 F4 $3 | surface depth glass | Treat backdrop blur as a depth scale, not a decoration: sm for i
surface/baseline-closed-area-path | E2 D2 W2 F5 $1 | svg chart sparkline data precision | A sparkline's tinted area and its stroke must never disagree by 
surface/corner-tick-frame | E1 D2 W1 F5 $1 | surface border frame detail currentcolor precision | Four short L-marks at the corners instead of a closed border: th
surface/dash-phase-flow | E2 D2 W1 F5 $1 | svg dash motion connector diagram precision | Animating stroke-dashoffset on a dashed connector makes a static
surface/drained-field-clear-window | E2 D2 W3 F5 $3 | surface mask backdrop-filter focus attention de-emphasis | Direct attention by de-emphasising everything else: a full-bleed
surface/eased-fade-stop-ramp | E1 D2 W2 F5 $2 | surface gradient fade mask precision | A two-stop fade interpolates alpha linearly and the eye reads th
surface/gradient-dot-lattice | E1 D3 W1 F4 $1 | surface texture pattern blueprint cheap | One radial-gradient plus a background-size gives a dot lattice a
surface/gradient-over-opaque-glass | E1 D3 W3 F5 $1 | surface glass gradient depth cheap performance | Glass without a backdrop filter: stack a vertical alpha gradient
surface/grid-intersection-crosshair | E1 D3 W1 F5 $2 | surface grid detail blueprint ornament | Mark a grid intersection with a small plus centred exactly on th
surface/hairline-overhang | E1 D2 W1 F5 $1 | surface detail precision | Negative inset of exactly 1px with calc(100% + 2px) sizing so a 
surface/inverted-bevel-state-pair | E2 D2 W2 F3 $1 | surface depth detail affordance state border | One inset hairline decides whether a box is raised or recessed, 
surface/inverted-field-ground | E1 D2 W3 F4 $1 | surface form contrast figure-ground accessibility | Invert the form figure-ground: tint the panel below the page val
surface/masked-edge-highlight | E1 D2 W2 F5 $2 | surface border light mask detail | A hairline that is bright at one point and fades to nothing arou
surface/multi-edge-mask-fade | E1 D2 W2 F5 $2 | surface mask edge composition bleed | Let an oversized panel run past the layout and dissolve instead 
surface/overflow-visible-for-glow-bleed | neutral  $1 | surface effect svg gotcha | SVG clips to its viewBox by default, which decapitates any drop-
surface/paired-hard-shadow-sheet | E1 D2 W2 F4 $1 | surface depth border detail editorial | To imply a second sheet under a panel, two zero-blur shadows do 
surface/phase-matched-gradient-drift | E2 D2 W2 F4 $1 | surface gradient loop ambient background | An oversized gradient translated behind its box gives a ground a
surface/projected-lattice-ground | E2 D3 W1 F4 $2 | surface grid texture ambient depth geometry | A flat hairline lattice reads as a sheet behind the page. Tilt t
surface/radius-inset-connector-rail | E1 D3 W1 F5 $1 | diagram hairline precision detail schematic | Connectors in a node diagram are hairlines on pseudo-elements, n
surface/receding-annulus-mask | E1 D3 W2 F4 $2 | surface mask gradient depth texture | Concentric rings that grow geometrically and fade as they widen 
surface/receding-bar-plate | E2 D1 W2 F4 $1 | surface chrome scroll opacity accessibility | Invert the usual scroll chrome: a floating bar starts fully opaq
surface/rotating-conic-border | E4 D3 W3 F4 $3 | surface border motion svg | An animated gradient border without a pseudo-element hack: an SV
surface/scrim-terminated-ground | E1 D2 W2 F5 $1 | gradient ground surface section seam cheap | A decorative ground that stops at its section's edge leaves a ho
surface/single-hue-lit-bead | E2 D2 W3 F5 $1 | surface gradient identity marker presence contrast | At 8–24px a flat disc is a dot; three stops make it a bead. Take
surface/slope-held-diagonal-edge | E1 D2 W3 F4 $2 | surface clip-path edge section responsive geometry | A clip-path: polygon() with percentage vertices does not keep it
surface/stacked-gradient-star-field | E2 D3 W1 F4 $1 | surface texture ambient depth performance | A regular lattice reads as ruled ground; an irregular point fiel
surface/tangent-oriented-mark-field | E2 D4 W2 F5 $3 | surface texture generative ambient detail svg | A field of round dots reads as spray. Give each mark a long axis
surface/tiled-dash-border | E1 D2 W1 F4 $2 | surface border dash precision texture | border-style: dashed offers no control — dash length is derived 
surface/tiled-shape-edge-mask | E2 D3 W2 F3 $2 | surface mask edge ornament texture section | Cut a section boundary with a shape rather than a straight line:
surface/twinned-elevation-tokens | E1 D2 W2 F5 $1 | shadow elevation tokens hover card | box-shadow interpolates only when both lists carry the same numb
surface/user-space-ruling-path | E1 D3 W1 F5 $1 | surface svg texture blueprint diagram cheap | Rule a drawing inside its own viewBox, not behind it. A single <
timing/asymmetric-enter-exit-delay | E3 D2 W2 F5 $1 | motion sequencing state transition | A staggered group should cascade in and collapse out together. C
timing/capped-total-stagger | neutral  $1 | motion sequencing scale | For unknown-length collections use stagger:{amount} not stagger:
timing/cumulative-gap-schedule | E3 D2 W2 F4 $1 | motion sequencing choreography entrance | A hand-authored entrance is a list of pauses, not absolute delay
timing/non-linear-loop-periods | E3 D3 W2 F4 $2 | motion ambient rhythm | Give concurrent ambient loops coprime-ish periods (4s / 5s / 7s)
timing/opacity-masked-loop-cut | E3 D2 W2 F4 $2 | timing keyframes loop opacity conveyor | A track that reads as endless usually means duplicated DOM. One 
timing/overshoot-for-pop-elements | E4 D2 W2 F3 $1 | motion easing delight | back.out(n) on small elements that should feel physical — badges
timing/parked-tail-loop-gap | E3 D1 W2 F4 $1 | motion timing rhythm detail | A sweep that should pass, rest, then pass again cannot get its r
timing/percent-of-master-duration | E2 D3 W2 F5 $2 | timing choreography keyframes css-animation token sequence | For a long multi-beat loop, give every participating element the
timing/phase-offset-as-sequence | E3 D2 W2 F4 $1 | motion sequencing rhythm ambient css | Same period, different phase. Give every looping indicator in a 
timing/production-timing-vocabulary | E2 D2 W2 F5 $1 | motion easing duration reference system | A coherent set beats a clever one. Durations cluster tightly and
timing/rate-integrated-phase-clock | neutral  $1 | motion timing correctness loop | A loop whose speed is a variable — tied to scroll position, a ho
timing/role-offset-cascade | E3 D2 W2 F5 $1 | timing motion sequencing choreography tokens | Split a cascade into two independent halves: the group's entry t
timing/segment-eased-keyframes | E3 D2 W2 F5 $1 | motion easing keyframes choreography loop | animation-timing-function declared inside a keyframe block sets 
timing/stagger-band | E3 D3 W2 F4 $1 | motion rhythm sequencing | Sibling stagger lives in a narrow band: .06–.08s reads as one ge
timing/state-scoped-duration | E2 D2 W2 F5 $1 | motion timing transition state asymmetry | Put transition-duration on the state selector rather than the ba
timing/stepped-two-frame-blink | E2 D1 W2 F3 $1 | motion easing indicator status ambient | An indicator that fades reads as decoration; one that snaps betw
timing/unit-aware-token-read | neutral  $1 | tokens correctness motion build | Script reading duration tokens out of computed style must parse 
type/balanced-headline-wrap | neutral  $1 | type polish | text-wrap: balance on every headline so line lengths even out in
type/cap-height-trim | neutral  $1 | type spacing precision alignment | Every text block ships with invisible half-leading above and bel
type/character-grid-as-texture | E3 D5 W2 F3 $2 | type texture ornament ascii | A field of monospace glyphs (+ x X 8 0 @ # % $) on a grid, used 
type/em-sheared-highlight | E3 D2 W4 F4 $1 | type highlight clip-path emphasis inline scale | A slanted block behind a phrase gives a headline a cut-in, marke
type/language-conditional-type-tokens | neutral  $2 | type i18n tokens localisation correctness | The type scale is a function of script, not only viewport. Redef
type/mono-as-ui-texture | E1 D3 W2 F4 $1 | type ui technical register | Run a monospace face for all chrome — nav, labels, captions, cou
type/optical-width-text-fit | E1 D2 W4 F5 $3 | type fit measurement display responsive | A headline that must fill a fixed box cannot be sized by charact
type/padded-ordinal-counter | E1 D2 W2 F4 $1 | type list counter detail technical | 01 02 … 09 10 numbering without hand-written zeros and without t
type/role-leading-ladder | E1 D2 W3 F5 $1 | type tokens scale rhythm precision | Leading is a function of role, not of size, and the ladder is st
type/serif-accent-in-technical-context | E1 D2 W3 F5 $1 | type contrast editorial restraint | One high-contrast serif, used sparingly against a geometric sans
type/sub-baseline-marker-band | E2 D2 W3 F3 $1 | type emphasis highlight contrast accessibility | A full accent block behind a phrase has to clear 4.5:1 against t
type/three-family-stack | E2 D3 W3 F4 $1 | type system | Geometric sans (body/headline) + mono (chrome/code) + display se
type/tonal-lead-in-clause | E1 D2 W3 F5 $1 | type emphasis hierarchy editorial colour | Carry two levels inside one sentence: the clause holding the cla
type/tracking-as-size-ratio | E1 D2 W3 F5 $1 | type tracking precision fluid tokens | Tracking fixed in px or em is wrong at one end of a fluid range:
type/variable-axis-tokens | E1 D2 W2 F5 $1 | type tokens opentype variable-font precision | A variable face is a continuum, not nine presets — so name the e
type/wavy-annotation-underline | E2 D2 W2 F2 $1 | type underline link detail informal | A wavy decoration stops reading as a link and starts reading as 
type/width-stable-changing-number | E2 D3 W3 F5 $1 | numerals data motion correctness | A figure that animates or streams needs two guarantees, and tabu
```
