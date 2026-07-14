# Whiteboard Explainer Video Skill

A reusable Codex/agent skill for producing narrated, hand-drawn whiteboard explainers with deterministic Remotion animation, Excalidraw-style geometry, data-driven storytelling, and release-grade media QA.

The repository includes a compact Pareto-frontier example adapted from a real multidimensional benchmark explainer. It contains no private voice, voice ID, credentials, source recordings, or user-specific paths.

## Install the skill

Point your skill installer at:

```text
https://github.com/adamholter/whiteboard-explainer-video-skill/tree/main/skill/whiteboard-explainer-video
```

The skill checks whether the official Remotion skill is available and asks before installing any missing skills. It remains usable without private local skills.

## Run the example

```bash
cd examples/pareto-frontier
npm install
npm run setup:font
npm run typecheck
npm run render
```

The render is visual-only by default. Supply narration you own or are licensed to use, then enable the optional audio track as described in the example.

## Public dependencies and upstream skills

- [Official Remotion skill](https://github.com/remotion-dev/skills/tree/main/skills/remotion)
- [OpenAI skill creator](https://github.com/openai/skills/tree/main/skills/.system/skill-creator)
- [Excalidraw](https://github.com/excalidraw/excalidraw)
- [RoughJS](https://github.com/rough-stuff/rough)

The production and QA guidance needed by this workflow is bundled in sanitized form. No unpublished private skill is required.

## Privacy

Do not commit TTS request payloads, private transcripts, provider metadata, voice IDs, API keys, or unlicensed voice recordings. The skill contains a concrete privacy gate for clean public releases.

## License

MIT. Third-party packages and fonts retain their own licenses.
