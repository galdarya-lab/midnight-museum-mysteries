# ASSET QUALITY REVIEW — VERSION 2

## What was wrong

The earlier ZIP contained clipped individual characters, broken dinosaur cutouts containing fragments of the original collage, many abstract generic object tokens with labels in place of actual items, and severely blurred station-room backdrops. Some object labels did not match the number or colour of visible items.

## What was corrected

- Preserved the original **166 asset paths** expected by Codex.
- Replaced all 55 object items with standalone, legible illustrations; corrected exact visible counts in `stars_three.png` and `flowers_two.png`, and key colours, clothes and objects.
- Replaced broken dinosaur characters and 10 action pictures with intact, recognizable illustrated animals and activity cues.
- Rebuilt 19 dinosaur skeleton pieces without cropping cut-offs, suitable for drag-and-drop (flat illustration style).
- Rebuilt 10 visitor portrait cards and adjusted their accessories to match question descriptions.
- Repaired the clipped museum portrait characters using thematic avatar cards or higher-resolution 3D character portraits for the key characters Professor Hoot and Pip.
- Revised six station backgrounds at 1600×900 with a **cinematic high-detail museum base**; added six optional sharper, simplified `backgrounds_vector/` alternatives. The same cinematic base illustration underlies several station views and thus some scenes repeat museum details.
- The original two spot-the-difference pairs have been retained so the 10 verified clickable hotspot coordinates remain valid. They have a simpler, flat style.
- Repaired evidence illustrations: grey fur rather than a feather, a long tail rather than a mouse icon, correctly worded note.

## Limitations worth knowing

The revised package deliberately uses clear **flat illustrated PNGs** for small props, visitors and dinosaur parts, mixed with cinematic 3D museum scenes. This is a functional, higher-clarity replacement, not 166 freshly generated high-resolution 3D illustrations. On selected game screens, their styles are therefore not perfectly identical. Pip's complex key glow and fuzzy fur may retain minor edge artefacts on contrasting backgrounds.

## Using in Codex

Unpack into the project root; the original relative paths remain unchanged. The regular station backdrop paths are `public/assets/museum/backgrounds/*.png`; the sharper vector alternates are in `public/assets/museum/backgrounds_vector/` and may be chosen manually if text contrast is preferred.

The story, full set of tasks, JSON question data and spot-difference hotspots were **not changed**.
