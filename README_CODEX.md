# The Midnight Museum Mysteries — V2 asset pack

Copy `public/` into the Vite project root. Use `assetManifestV2.json` and `assetManifestV2.ts` for paths. Follow `The_Midnight_Museum_Mysteries_CODEX_V2.md` for gameplay; all 17 activities, 170 rounds, Quick mode and saved Continue/Start Again remain mandatory.

## Important visual notes
- The main dinosaur and profession illustrations come from cohesive 3D character art. All additional parts are separate image files.
- Several small icons (clothing, memory, clues, museum props) are purpose-built vector-style drawings for exact content and counting. Their style is simpler than the large 3D character illustrations.
- The 10 visitors use distinct 3D human artwork with color and accessory adaptations. Inspect each portrait on the projector; some details were adapted programmatically.
- `differences/gallery_1_base.png` and `differences/gallery_2_base.png` are A images; `_B.png` are derived from the SAME pixels with five controlled changes. `differenceHotspotsV2.json` gives the hotspots.
- The 10 clock stages are pre-rendered optional fallbacks in `clock/stages`, while the V2 app should animate layers and save `clockAssemblyStage`.
- No PNG, including ornate button imagery, provides onClick behavior by itself. Codex must wire the actions and localStorage.
- Some scenery uses composited museum backgrounds rather than six separately generated spaces; replace these if you want higher visual variety. Keep the file names unchanged.

## Asset summary
- `backgrounds`: 8
- `characters`: 8
- `clock`: 33
- `differences`: 14
- `dinosaurs`: 23
- `egypt`: 24
- `evidence`: 6
- `memory`: 10
- `owners`: 20
- `paintings`: 12
- `professions`: 14
- `ui`: 15
- `visitors`: 10

**Total: 197 image files.**
