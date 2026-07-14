# Isolated micro-detail audit

Use this pass after the creative edit is complete. Its purpose is to catch small objective defects without priming reviewers with the creator's expectations.

## Prepare evidence

Split the final exported video into 8-12 non-overlapping time ranges. Extract a contact sheet and individual full-frame samples for each range. Sample at least once per second, plus frames immediately before, during, and after every known transition.

The bundled helper creates evenly divided ranges:

```bash
scripts/extract-audit-segments.sh final.mp4 audit-frames 10 1
```

## Isolate reviewers

Assign one low-cost visual reviewer per range. Do not send the creative thread, known-defect list, source code, or desired conclusion.

When using built-in Codex subagents, explicitly set:

```json
{
  "model": "gpt-5.6-luna",
  "reasoning_effort": "low",
  "fork_turns": "none"
}
```

If the host cannot guarantee isolated subagent context, use a fresh ephemeral Codex CLI process from the audit directory:

```bash
codex exec \
  --ephemeral \
  --ignore-user-config \
  --skip-git-repo-check \
  --sandbox read-only \
  --cd /absolute/path/to/audit-frames/segment-0 \
  --model gpt-5.6-luna \
  --config 'model_reasoning_effort="low"' \
  --image contact.jpg \
  --image frame-01.jpg \
  --output-last-message result.json \
  'Inspect the supplied frames using the evidence rules below.'
```

Add every individual frame with another `--image` argument or split the range further. Do not use `codex exec resume`; a resumed session is not isolated.

## Reviewer prompt

Use the same neutral prompt for every range:

```text
You are a visual QA auditor with no project context. Inspect the contact sheet
and every supplied frame. Report only objectively visible defects:
- text overlapping other text
- a line, border, underline, or chart stroke crossing text
- clipping outside the frame or container
- unreadable labels caused by collisions
- accidental occlusion or a broken transition artifact

Do not report subjective styling preferences. Do not infer problems from source
code. Do not report intentional full-frame wipes or partial draw-on animation.
Every issue must include the exact frame filename and a literal description of
the visible evidence. If uncertain, omit it. It is correct to report no issues.

Return JSON only:
{"segment":0,"reviewed_frames":16,"issues":[{"frame":"frame-01.jpg","evidence":"..."}]}
```

Do not tell reviewers which frames are suspected or what earlier reviewers found.

## Integrate conservatively

The parent/integrator must inspect every claimed frame directly. Classify each claim as:

- `confirmed`: literal collision, clipping, or unreadability is visible
- `borderline`: overlap is visible but may be intentional foregrounding
- `rejected`: evidence does not match the claim

Fix confirmed defects only. Do not accept an issue because multiple agents repeated it; duplicated priming can produce duplicated errors.

## Verify the correction

1. Render exact before/after frames for every confirmed timestamp.
2. Inspect the corrected frames at full delivery resolution.
3. Re-run isolated reviewers on the affected ranges using fresh sessions.
4. Include at least two previously clean control ranges to detect over-reporting.
5. Render and inspect the complete final artifact.

Record reviewer model, isolation mechanism, reviewed range, number of frames, accepted findings, and rejected findings. Never claim an isolated audit if context was forked from the production thread.
