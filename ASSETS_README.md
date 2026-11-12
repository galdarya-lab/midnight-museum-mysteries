# Asset pack for The Midnight Museum Mysteries

The assets in `public/assets/museum` have **English ASCII filenames**, are all `.png`, and are ready to reference in Codex.

## What is production-ready versus concept art

- **High-resolution hand-off**: `characters/professor_hoot.png`, `backgrounds/intro_museum.png`, `backgrounds/finale_museum.png`, the procedural visitor cards, the clock-number discs, the five-per-pair spot-the-difference puzzles and `scenes/security_scene.png`.
- **Concept/thumbnail assets**: other characters, dinosaur clips, most small object stickers and six station backdrops are **carefully cropped from an illustrated atlas** and enlarged; they are useful for prototyping, but **are not equivalent to freshly commissioned high-resolution isolated art**. Do not claim that they are 4K artwork. They may be replaced by better illustrations using exactly the same path names without changing game logic.
- **Logical buttons and small items**: `ui` and some `objects` are clear procedural PNG icons (not AI character illustrations). They are suitable for functional gameplay, but need not dominate screens.

## How to use

- Source assets live in `public/assets/museum` and should appear under URLs `/assets/museum/...` in the browser.
- `assetManifest.json` contains **all exact paths, dimensions and source notes**. It should be the single source of truth for asset paths.
- The full teacher-facing gameplay content is in `The_Midnight_Museum_Mysteries_Codex.md`; all 180 machine-checkable prompts are in `gameData.json`.
- `differenceHotspots.json` holds 10 validated difference positions matching `puzzles/spot_difference/village_A.png`, `village_B.png`, `castle_A.png`, `castle_B.png`.
- Native speaker will read aloud. Images cannot provide sound files or real interaction: Codex must implement those in HTML/JS.
- Dinosaur skeleton / costume / moving-action sprites contain a mix of conceptual crops and simplified placeholder sprites, with stable names for later replacement.

## Important no-fake-interaction rule

Every answer, drop target, click zone and evidence cue must be driven from `gameData.json` and clear manual coordinates or CSS overlay composition. Do not silently mark an answer correct using arbitrary illustration pixels.
