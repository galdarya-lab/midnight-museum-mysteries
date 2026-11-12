# Corrected neutral suspect portrait

The supplied `public/assets/museum/v2/characters/suspect_grey_mouse_3d.png` shows the Moon Key and a scarf, which conflicts with the V2 mystery reveal rules. That original file is preserved unchanged.

**New saved asset:** `public/assets/museum/v2/characters/suspect_grey_mouse_neutral_3d.png` (1254 × 1254, RGBA, genuine transparent background). Used only for the neutral suspect and the grammar illustration. The supplied Pip illustration is still used after the final confirmation.

**Method:** built-in imagegen tool, image edit with the supplied suspect as the reference. No fallback API or CLI was used. The generated source was copied into this project and registered in both V2 manifests.

**Final prompt:**

```text
Use case: precise-object-edit. Asset type: neutral suspect portrait sprite for an existing children's 3D museum mystery browser game. Edit target: the provided local mouse image. Create ONE full-body friendly grey mouse, using the target's same warm high quality 3D cartoon rendering, large round pink ears, kind brown eyes, plump soft proportions and long thin pink tail. Remove EVERY key, all gold objects, all scarf/clothing, bag and other accessories, and all stray cut-off object fragments at the edges. Both paws should be empty and naturally relaxed. Ordinary cute neutral mouse suspect, no name or lettering. Keep whole body, feet, ears and tail fully visible, centered and filling about 80 percent of a square transparent canvas with clean silhouette. Warm soft studio light and realistic fluffy grey fur. Transparent background with genuine alpha. No background, floor, cast shadow, frame, text, collage, additional characters, crown, scarf, key, robot or mechanical parts. The investigation must not disclose the mouse has the key.
```
