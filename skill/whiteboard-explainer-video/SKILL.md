---
name: whiteboard-explainer-video
description: Produce polished narrated whiteboard explainer videos with hand-drawn Excalidraw-style visuals, precise voiceover timing, data-driven animation, and rigorous media QA. Use for educational videos, animated arguments, benchmark explainers, multidimensional data stories, Pareto-frontier visualizations, or any topic that benefits from a visual proof rather than a slideshow.
---

# Whiteboard Explainer Video

Turn source material into a clear, original, narrated whiteboard video. Favor animated reasoning: let objects move, transform, and preserve identity while the explanation changes their meaning.

## Check dependencies before work

1. Inspect the current skill catalog for a Remotion skill.
2. If it is absent, ask the user before installing it. Recommend the official Remotion skill:
   `https://github.com/remotion-dev/skills/tree/main/skills/remotion`
3. If the session has `$skill-installer`, use it only after the user agrees. Otherwise give the exact public URL and continue with Remotion documentation when installation is declined.
4. Treat image-generation and TTS skills as optional. Ask before installing a missing optional skill, and install one only when the storyboard actually requires it.
5. Do not require a private `video-production` skill. This package includes the necessary production and QA workflow in `references/` and `scripts/video_qa.py`.

Never silently install skills. Normal project package installation may proceed after the user has authorized building the video.

## Establish the creative contract

Confirm or infer the following without turning the task into an interview:

- intended audience and single takeaway
- target duration and aspect ratio
- source-of-truth material and whether facts may have changed
- visual identity, including monochrome-to-color rules
- delivery format and publishing destination
- narration source and permission to use it

If a voice is not explicitly supplied, use a generic licensed TTS voice or ask the user to provide one. Never copy, infer, expose, or reuse a private voice ID. Never clone a person's voice without their explicit permission.

## Build the argument before the timeline

1. Reduce the topic to one tension, one mechanism, and one conclusion.
2. Write a scene map with `purpose`, `visual invariant`, `spoken claim`, and `exit transition` for every scene.
3. Make each scene answer a question raised by the previous one.
4. Prefer one evolving visual system over unrelated slides.
5. State assumptions and data directions explicitly: which dimensions are maximized and which are minimized.

Read `references/story-and-timing.md` before finalizing narration.

## Work from structured data

Store factual inputs as typed data, not coordinates embedded in JSX. For multi-objective comparisons:

1. Normalize model/entity names and units.
2. Keep only rows that have every metric needed by the current objective set.
3. Mark estimates and missing values honestly.
4. Compute Pareto membership programmatically for every objective set.
5. Test the dominance function with known dominated and non-dominated examples.
6. Never claim that every item is Pareto-optimal unless the selected dimensions actually establish it.

Use `examples/pareto-frontier/src/data.ts` as the reference implementation.

## Use a restrained whiteboard language

Read `references/visual-language.md`, then follow these defaults:

- off-white paper background
- black and graphite marks for most content
- Excalifont, Virgil, or a documented hand-drawn fallback
- RoughJS for imperfect lines, boxes, circles, arrows, and fills
- one accent color to introduce the graph, then a small semantic palette only when dimensions require it
- no stock dashboard chrome, glossy cards, or decorative motion
- preserve legibility at delivery resolution; hand-drawn does not mean imprecise

Use code-generated visuals first. Generate bitmap assets only when the subject cannot be expressed cleanly with geometry, type, or diagrams.

## Animate ideas, not slides

Implement the video in Remotion or an equivalent deterministic renderer.

1. Give persistent objects stable IDs.
2. Morph or rotate the same objects between views instead of cutting to replacement charts.
3. Use motion to reveal invariants: a point remains the same entity while axes, color, area, or labels change.
4. Map dimensions deliberately:
   - x position: first quantitative measure
   - y position: second quantitative measure
   - color: third measure
   - bubble area, not radius: fourth measure
   - ring/stroke/dash: category, uncertainty, or frontier membership
   - label/annotation: dimensions that cannot remain perceptually quantitative
5. Explain the dominance rule visually before presenting a high-dimensional frontier.
6. Keep transitions causally motivated. A cube turn, camera move, or axis morph must explain the relation between views.

Use `examples/pareto-frontier/` as a compact, renderable code sample from a multidimensional Pareto-frontier explainer.

## Lock narration before detailed animation

1. Draft for speech, not prose.
2. Generate or record narration with a voice the user owns or is permitted to use.
3. Obtain word- or sentence-level timestamps.
4. Build scene timing from those timestamps.
5. Add short visual holds after dense claims.
6. Keep music and effects subordinate to speech.

Never commit TTS request payloads, provider account details, voice IDs, API responses containing metadata, or raw private transcripts. Read `references/story-and-timing.md` for timing conventions.

## Verify the finished artifact

Run all relevant checks before handoff:

1. typecheck and unit-test data transformations
2. render representative stills from every scene
3. render the complete video at delivery settings
4. inspect duration, dimensions, codecs, frame rate, audio streams, and file size
5. scan for black frames and an accidental silent or frozen tail
6. inspect a contact sheet for pacing and visual discontinuities
7. check narration loudness and music ducking
8. watch the actual exported file from start to finish when possible
9. run an isolated micro-detail audit when the video contains dense text, charts, or diagram transitions

Run:

```bash
python3 scripts/video_qa.py path/to/final.mp4 --contact-sheet path/to/contact-sheet.jpg
```

Read `references/qa-and-privacy.md` for the full release gate.
Read `references/isolated-detail-audit.md` for the evidence-gated multi-reviewer pass. Reviewers must receive isolated context (`fork_turns: "none"` or an ephemeral Codex CLI session), not the creative thread that produced the video.

## Sanitize before sharing or publishing

Before committing or uploading anything:

- remove API keys, bearer tokens, cookies, signed URLs, emails, usernames, and absolute home-directory paths
- remove voice IDs and TTS request/response metadata
- remove private audio unless publication rights are explicit
- replace personal names in comments and fixtures with neutral language
- exclude `node_modules`, render caches, source recordings, and large outputs unless intentionally released
- scan both tracked files and commit history

Do not call the project complete until the public artifact has been checked from a clean clone or equivalent isolated checkout.

## Public upstreams

- Remotion skill: `https://github.com/remotion-dev/skills/tree/main/skills/remotion`
- OpenAI skill tooling: `https://github.com/openai/skills/tree/main/skills/.system/skill-creator`
- Excalidraw: `https://github.com/excalidraw/excalidraw`
- RoughJS: `https://github.com/rough-stuff/rough`

Use those upstreams instead of copying local skill files. The bundled references are original, sanitized workflow guidance needed to make this skill self-contained.
