# QA and privacy release gate

## Visual checks

- Render the first, midpoint, transition, densest, and final frames of every scene.
- Confirm labels do not overlap at the delivery aspect ratio.
- Check small-screen readability if the output targets social feeds.
- Inspect a contact sheet for discontinuities, repeated frames, and pacing dead zones.
- Watch the export, not only the studio preview.

## Media checks

- Confirm expected duration within one frame or the documented tolerance.
- Confirm dimensions, sample aspect ratio, pixel format, and frame rate.
- Confirm H.264 exports use a broadly compatible pixel format such as `yuv420p`.
- Confirm audio exists when expected and is absent when intentionally omitted.
- Use black-frame and silence detection near both ends.
- Ensure the final visual hold and final audio fade are intentional.

## Privacy scan

Search tracked and untracked source files before publication:

```bash
rg -n --hidden --glob '!node_modules/**' --glob '!out/**' \
  '(voice.?id|api.?key|authorization:|bearer |/Users/|/home/|@gmail\.com|@icloud\.com)'
git grep -n -I -E '(voice.?id|api.?key|authorization:|bearer |/Users/|/home/)'
```

Review every match. Do not assume a value is safe because it is not formatted like a conventional secret. Check filenames, comments, transcript metadata, EXIF data, and Git history.

## Clean-room check

Clone the public repository to a new temporary directory, install dependencies from its lockfile, run validation, and render the example. This catches accidental reliance on local fonts, ignored assets, global packages, or private paths.
