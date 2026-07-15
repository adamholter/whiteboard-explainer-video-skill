# Whiteboard visual language

## Base palette

- paper: `#fbfaf7`
- ink: `#171717`
- graphite: `#6b6b66`
- faint construction line: `#d8d5cc`
- primary accent: `#4c6fff`
- optional warm accent: `#f08a5d`
- optional positive highlight: `#5aa469`

Use black and graphite until color has explanatory meaning.

## Mixed-media canvas

Treat Excalidraw as the canvas language around the evidence. A scene may combine hand-drawn marks with:

- original charts and screenshots supplied by the user
- authoritative charts, product imagery, photographs, maps, diagrams, and document excerpts sourced from the web
- generated illustrations or edited reference images converted into an Excalidraw-like treatment
- transparent PNG, SVG, or video assets created specifically for the composition
- exact charts and diagrams rendered in code

Prefer the original or official source when viewers are being asked to trust a factual claim. Prefer a styled recreation when the visual is explanatory, generic, visually incompatible, unavailable at usable quality, or needs to animate at the level of individual marks.

Integrate raster and photographic assets intentionally: crop to the relevant evidence, preserve enough context to establish provenance, place them inside a reserved frame, and use hand-drawn arrows or annotations outside the content rather than covering labels. Do not stretch, blur, or enlarge a source beyond useful resolution.

For generated Excalidraw-style assets, request sparse black linework, restrained accent color, no embedded text unless unavoidable, and a transparent or easily keyed solid background. Inspect the alpha edge after background removal; halos and paper-colored rectangles are release blockers.

## Typography

Prefer an official hand-drawn font from the Excalidraw package (Excalifont in current releases or Virgil in compatible older releases). Load it locally with `@font-face`; never rely on a remote font at render time. Provide a readable fallback and test missing-font behavior.

Use large type. A 1920x1080 composition should generally keep explanatory labels at 30 px or above and key claims at 48 px or above.

## Rough geometry

Use RoughJS with restrained roughness (roughness around 0.7-1.2 and bowing around 0.5-1). Keep a stable seed per object so lines do not shimmer from frame to frame. Animate transforms on the generated object or keep the seed constant; do not regenerate a new random path on every frame.

## Motion principles

- Preserve object identity across coordinate systems.
- Use short, eased moves for local explanation and slower camera-like turns for conceptual changes.
- Stagger labels after points settle.
- Draw frontier lines only after the points that define them are understood.
- Use highlighting to focus attention, not to decorate every object.
- Match the asset to the claim: diagrams for mechanisms, authoritative source visuals for evidence, and generated imagery for illustration or metaphor.

## Multidimensional charts

Document every encoding in the scene itself. Scale bubble area linearly to the value. Use perceptually ordered gradients for quantitative color. Keep categorical colors distinct from quantitative gradients. If a dimension is not comparable across all rows, do not smuggle it into the encoding.
