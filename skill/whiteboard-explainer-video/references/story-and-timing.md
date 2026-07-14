# Story and timing

## Write a visual proof

Structure the narration as a chain of questions:

1. What intuitive choice would a viewer make?
2. What hidden dimension makes that choice incomplete?
3. What rule lets us compare alternatives fairly?
4. What changes when another dimension is added?
5. What decision can the viewer now make?

For every paragraph, identify the object that changes on screen. Rewrite paragraphs that have no visible action.

## Scene map

Use a table or typed object with:

- `start`: frame or seconds
- `end`: frame or seconds
- `purpose`: the viewer's new understanding
- `voiceover`: exact spoken line
- `visual`: objects and transformations
- `invariant`: what stays identifiable across the transition
- `sound`: optional effect or music cue

## Narration timing

- Draft around 130-165 spoken words per minute, then measure the actual recording.
- Use transcript timestamps as truth. Do not guess timing from character counts after audio exists.
- Start visual changes slightly before the word that names them when anticipation helps comprehension.
- Keep labels visible long enough to be read after the narration introduces them.
- Allow 0.3-1.0 seconds of visual settling after dense transformations.
- End with a deliberate hold rather than a frozen accidental tail.

## Voice privacy

Store provider credentials outside the repository. Use environment variables for generation and keep provider request/response files ignored. A public project may document an interface such as `VOICEOVER_PATH=public/voiceover.wav`; it must not contain a private voice identifier.
