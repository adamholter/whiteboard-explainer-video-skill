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
- Avoid realistic 3D assets when a diagram communicates the idea more directly.

## Multidimensional charts

Document every encoding in the scene itself. Scale bubble area linearly to the value. Use perceptually ordered gradients for quantitative color. Keep categorical colors distinct from quantitative gradients. If a dimension is not comparable across all rows, do not smuggle it into the encoding.
