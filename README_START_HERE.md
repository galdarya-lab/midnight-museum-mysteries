# The Midnight Museum Mysteries — Codex handoff

> V2 is now the active game. See `README_RUN_V2.md` for launch instructions and `src/data/` for the imported V2 data. The original V1 handoff below is retained for reference.

1. Put all files in this folder in your web project, preserving `public/assets/museum` paths.
2. Read `The_Midnight_Museum_Mysteries_Codex.md` (also included inside the ZIP). It specifies all 18 mechanics and exact 50-minute timing.
3. Use `gameData.json` for every one of 180 questions and correct answers.
4. Use `assetManifest.json` for the graphics; see `ASSETS_README.md` for asset notes and visibility limitations.
5. Use `differenceHotspots.json` for pixel-accurate clickable differences in the two picture pairs.
6. Implement real drag/drop, flashlight, clock, memory, question state, and story progression; pictures by themselves are not a playable game.
7. Prepare two modes: Quick (6 rounds per task + optional 4) and Full (all ten).

All visible text is in English. The teacher operates the game in class on one projected screen.

## Quality rework v2
See `ASSET_QA_REVIEW.md` for the repaired asset list and quality caveats. Paths and names are unchanged.

## Updated assets v2
These corrected images keep the original asset names and paths. Read `ASSET_QA_REVIEW.md` before applying them.
