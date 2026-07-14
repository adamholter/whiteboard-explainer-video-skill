---
name: whiteboard-explainer-video
description: Produce polished narrated videos with Excalidraw-style visuals, spatial canvas animation, deterministic rendering, and evidence-gated visual QA. Use for whiteboard explanations, animated diagrams, data stories, and infinite-canvas videos.
---

# Whiteboard Explainer Video

Produce the finished video autonomously. Infer ordinary creative and delivery choices from the request. Ask only when missing authority or inaccessible input makes completion impossible.

## Render deterministically

Use Remotion or an equivalent code-driven renderer. Check for the official Remotion skill before implementation. If it is unavailable, ask before installing it:

`https://github.com/remotion-dev/skills/tree/main/skills/remotion`

Use structured data for factual charts and comparisons. Compute derived claims programmatically and test calculations that affect the explanation.

## Use the Excalidraw visual system

Read `references/visual-language.md` before drawing.

Use off-white paper, a subtle dot grid, Excalifont or Virgil, RoughJS-style geometry, graphite marks, and restrained semantic color. Render exact text and factual diagrams in code.

Hand-drawn styling does not relax layout precision. Reserve explicit bounds for every label, card, annotation, arrow, underline, and chart mark. Use fixed-width cells or measured text for tag clouds; never rely on incidental text width to prevent collisions.

## Build spatial canvases safely

For an infinite-canvas treatment:

- assign every section a non-overlapping world-space bounding box
- include internal padding and an external isolation gutter around each box
- lay unusually tall or wide content into a shape compatible with the camera viewport
- place sections farther apart when close framing would reveal unrelated neighbors
- keep connectors inside reserved routing corridors that contain no text or cards
- omit decorative connectors when a safe route is unavailable
- keep revisited elements at stable world coordinates
- validate every close camera pose and the fully populated overview

Compute or document section bounds before detailed animation. Reject the layout if any pair of padded bounds intersects.

## Animate the canvas

Use camera pan and zoom, progressive hand-drawn reveals, stable persistent objects, and visible annotation edits. Tie detailed timing to the finished narration timestamps.

Camera movement must settle on a composition where the active section fits completely inside the safe frame. Sample the beginning, midpoint, and end of every camera move; a clean destination frame does not validate the transition.

## Run deterministic QA

Before delivery:

1. Typecheck and test data transformations.
2. Render representative close-ups, every camera transition, and the final full-canvas overview.
3. Inspect section bounds, text boxes, connector corridors, and frame-safe margins.
4. Render the complete video.
5. Run `scripts/video_qa.py`.
6. Inspect the first frame, final frame, contact sheet, individual timeline frames, and transition samples.
7. Run the isolated Luna audit in `references/isolated-detail-audit.md`.
8. Verify all accepted fixes in fresh renders.
9. Reopen the exact final MP4.

The full-canvas overview is a mandatory layout test even when it appears only briefly or never appears in the video.

## Sanitize public artifacts

Before publishing, remove credentials, private voice information, provider metadata, personal paths, private recordings, caches, dependencies, and unintended render outputs. Verify the public package from a clean checkout.

Complete only when the final artifact passes the release gates and its exact path is reported.
