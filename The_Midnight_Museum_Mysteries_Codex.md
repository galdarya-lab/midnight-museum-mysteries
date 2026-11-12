# THE MIDNIGHT MUSEUM MYSTERIES
### Production specification for Codex · A1 · Grade 3–5 · 50 minutes

> **Goal:** Build a complete **interactive local-browser game**, not a slideshow, not a mockup and not a list of questions. The teacher controls one computer projected on a screen; students answer aloud in English. Use the supplied PNG assets and `gameData.json`. No external APIs, online login, accounts, or server required.

## 1. Contract / must-haves
- Exactly **6 stations × 3 exercises × 10 prompts = 180 mini-questions**, with real interactive mechanics, answer data, audio/replay hooks, progression and teacher controls.
- **50-minute lesson**, timed as 3-minute introduction + 6 × 7-minute stations + 5-minute reveal and recap. Timing is more important than forcing all 180 questions at a slow pace.
- **Two modes inside each exercise**: Full (10 fast rounds); Quick (questions 1–6 essential, questions 7–10 optional bonus). In Quick mode, extra rounds are available via `More questions`; skipping them must not block the clue. Never secretly discard tasks or content.
- Teacher holds mouse/keyboard; the children do **not** need individual phones or devices. Native speaker reads the prompts. Child-friendly large type (≥28 px on a 1920×1080 projector); 16:9 desktop first, responsive at 1366×768.
- UI language **English only**. This development guide is bilingual/explanatory as needed; all visible gameplay text must be English.
- Every click has real semantics. No decorative, non-functional fake buttons. Wrong answer: gentle try-again feedback, no score penalty. Correct: feedback with clear highlight, optional chime and next.
- Every visual task must use **deterministic, testable source-of-truth** placements. All image claims and mystery clues must match what the children see. Never let generated random art dictate the answer key.
- **No SVG assets** in the supplied pack. Use PNG/JPG only; CSS/HTML canvas/vector drawing by the runtime is allowed for crisp functional interactive shapes and hitboxes.

## 2. Plot and tone
At midnight, the Moon Key disappears and the grand museum clock stops. Professor Hoot, a friendly owl detective, invites the class to investigate the museum. In each of six rooms they find evidence. At the top of the tower they find Pip, a little grey mechanical mouse who borrowed the key **to repair the broken clock**. He is not a villain. Help him restart the clock, then celebrate the class.

### Required character dialogue (exact English copy)
**Opening (Hoot):** “Welcome, detectives! It is midnight. Oh no! The Moon Key is missing, and our big clock has stopped! Can you help me? We have six rooms to explore. Look, listen, think and speak English. Let’s go!”
**After each clue:** “Fantastic detective work! We found a clue. Let’s put it in our notebook.”
**Reveal (Pip):** “Hello! I’m Pip. I took the Moon Key because I wanted to fix the clock. I’m sorry! Can you help me?”
**Hoot ending:** “You solved the mystery! Pip wanted to help. The clock works again! You are amazing museum detectives!”

## 3. Exact timing (fixed windows)
| Clock | Scene | Requirement |
|---|---|---|
| 00:00–03:00 | Prologue | Hoot introduces characters, mission and controls. Students answer “We can help!” |
| 03:00–10:00 | Station 1: Security Hall | Three exercises (~2 min each), one clue (~1 min); there is/are; colours; prepositions; descriptions. |
| 10:00–17:00 | Station 2: Dinosaur Gallery | Three exercises (~2 min each), one clue (~1 min); body parts; have got; can; present continuous. |
| 17:00–24:00 | Station 3: The Living Paintings | Three exercises (~2 min each), one clue (~1 min); prepositions; descriptions; have got; there is/are. |
| 24:00–31:00 | Station 4: Egyptian Chamber | Three exercises (~2 min each), one clue (~1 min); word order; vocabulary; clothes; prepositions; imperatives. |
| 31:00–38:00 | Station 5: Lost & Found Office | Three exercises (~2 min each), one clue (~1 min); memory; object names; possessives; descriptions. |
| 38:00–45:00 | Station 6: The Clock Tower | Three exercises (~2 min each), one clue (~1 min); numbers; missing words; grammar revision; deduction. |
| 45:00–50:00 | Finale | Reveal Pip, restart clock, 5 simple oral recap questions and certificate screen. |

**Micro-timing each 7-minute station:** 00:00–00:20 enter/intro; 00:20–02:15 exercise A; 02:15–04:10 exercise B; 04:10–06:05 exercise C; 06:05–07:00 clue and transition. Add 5-second transitions, reduce prompt dwell as needed. Full mode: up to 10–12 s/prompt; teacher may finish all 10 if pupils are fast. Quick mode: 6 core prompts, then proceed to clue. Do not auto-jump the teacher’s interaction.

### Progress system
- Show one page/room map, `STATION 1/6`, `TASK 1/3`, `Q 1/10`, optional short timer, **Evidence Notebook** and Hoot tip bubble.
- Give +10 detective points for each correct answer, no penalties. A station clue is awarded after the teacher selects `Finish station`, once all 3 exercise screens were visited and ≥6 correct/attempted prompts per exercise (teacher may force-advance in emergency).
- Six clues are a story inventory (not consumable currency): 1 small footprints, 2 grey fur, 3 long tail, 4 gold dust, 5 helpful note, 6 Pip and Moon Key. Final clue appears **after** solving suspect game; do not reveal solution beforehand.
- On Task 18 hide the Pip reveal until the last clue is acknowledged, show all five suspect portraits throughout investigation.

## 4. UX and controls
- Screens: `intro` → `museum_map` → `station_intro` → `task` (question index) → `station_clue` → next station → `reveal` → `victory`.
- Teacher controls: Start, Next, Back, Replay, Hint, Skip, Quick/Full mode, Evidence notebook, Pause/resume timer, Full-screen, Mute, Reset (confirmation).
- Keyboard: Enter select / next, arrows navigate maze or answer focus, Space replay/help, Esc close modal; pointer/click fallback for all drag-and-drop.
- A1 readable one-line prompts, one meaningful illustration per task, large hit areas (≥64px), visible focus outlines and high-contrast foreground on museum-warm backgrounds.
- Developer answer overlay only through password-free **Teacher Mode** toggle requiring a long press or hidden shortcut `Ctrl+Shift+T`; hide it from projected children. Never show answer key in student mode.
- Persist station, task, index, clues, mode and mute in `localStorage`; provide “Reset game” button with confirmation. No student personal data or analytics tracking.
- Use sound effects optionally; no copyrighted music. Native speaker reads English aloud; speech synthesis optional, but should not replace the teacher and must not invent prerecorded voice files.

## 5. Asset contract
All graphics sit under `public/assets/museum/`; the starter pack includes 2 main characters, supporting characters, museum scene images, item icons, clue icons, some puzzle components, guaranteed difference-picture pairs, the security reference scene and reusable interface textures. See `assetManifest.json` for exact paths and sizes, and `ASSETS_README.md` for which graphic elements are decorative vs deterministic.

### Data wiring example
```ts
import gameData from './data/gameData.json';
import assets from './data/assetManifest.json';
const task = gameData.stations[0].tasks[0];
const question = task.questions[0]; // {prompt, correct:true, ...}
// render question.prompt and verify selected === question.correct
```

## 6. All six stations and all 180 prompts

### STATION 1: SECURITY HALL — 03:00–10:00
**Focus:** there is/are; colours; prepositions; descriptions. **Clue:** Small footprints.
**Scene:** The security cameras have strange recordings. Professor Hoot asks children to check the lobby, search with a magic torch and identify museum visitors.
**Teacher station opener:** “Detectives, welcome to the Security Hall! We have three challenges. Are you ready?”

#### 1.1 Security Camera Check — `true_false`
**How it looks/works:** Choose TRUE or FALSE from the *fixed* security-hall scene. Do not generate a new scene per question.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | There are two doors in the hall. | TRUE |
| 2 | The clock is under the desk. | FALSE |
| 3 | There is a red bag next to the chair. | TRUE |
| 4 | There are three paintings on the wall. | TRUE |
| 5 | The lamp is green. | FALSE |
| 6 | There is a ticket under the bench. | TRUE |
| 7 | The guard has got a blue hat. | TRUE |
| 8 | The window is open. | FALSE |
| 9 | There are four keys on the desk. | FALSE |
| 10 | The plant is next to the stairs. | TRUE |
**Asset usage:** `security_scene.png` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 1.2 Magic Flashlight — `find_object`
**How it looks/works:** Reveal the scene with a circular flashlight mask; students identify the object in each instruction. Hide each found item in the inventory.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | Find the red ticket. | ticket_red.png |
| 2 | Find the blue hat. | hat_blue.png |
| 3 | Find the yellow torch. | torch_yellow.png |
| 4 | Find the green backpack. | backpack_green.png |
| 5 | Find the silver key. | key_silver.png |
| 6 | Find the brown book. | book_brown.png |
| 7 | Find the white glove. | glove_white.png |
| 8 | Find the purple umbrella. | umbrella_purple.png |
| 9 | Find the black camera. | camera_black.png |
| 10 | Find the orange ball. | ball_orange.png |
**Asset usage:** `flashlight_objects` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 1.3 The Ticket Machine — `portrait_match`
**How it looks/works:** Show exactly 10 visitors with stable visible attributes. Display one clue at a time; click correct portrait. Use portraits as illustration cards, not random generated models.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | The boy has got a red cap. | visitor_01.png |
| 2 | The girl is wearing a green dress. | visitor_02.png |
| 3 | The man has got a black hat. | visitor_03.png |
| 4 | The woman is holding a yellow bag. | visitor_04.png |
| 5 | The boy has got blue shoes. | visitor_05.png |
| 6 | The girl is wearing a purple jacket. | visitor_06.png |
| 7 | The man has got glasses. | visitor_07.png |
| 8 | The woman is holding a red umbrella. | visitor_08.png |
| 9 | The boy is wearing an orange T-shirt. | visitor_09.png |
| 10 | The girl has got a pink scarf. | visitor_10.png |
**Asset usage:** `visitors` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

**Clue overlay:** Show evidence icon `/assets/museum/evidence/footprints.png` and write “CLUE 1: Small footprints”. Voice: “What can this clue tell us?” Save to notebook on `Collect clue`.

### STATION 2: DINOSAUR GALLERY — 10:00–17:00
**Focus:** body parts; have got; can; present continuous. **Clue:** Grey fur.
**Scene:** The fossils have come alive! Rebuild the skeleton, guess dinosaurs from clues and identify moving dinosaurs.
**Teacher station opener:** “Detectives, welcome to the Dinosaur Gallery! We have three challenges. Are you ready?”

#### 2.1 Build the Dinosaur — `drag_drop`
**How it looks/works:** Use 10 separate bones and 10 fixed target zones. Add accessible click-to-select + click-to-place fallback; place parts in order.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | Put the head above the neck. | head |
| 2 | Put the neck above the body. | neck |
| 3 | Put the body in the middle. | body |
| 4 | Put the tail behind the body. | tail |
| 5 | Put the left arm on the left. | left_arm |
| 6 | Put the right arm on the right. | right_arm |
| 7 | Put the left leg under the body. | left_leg |
| 8 | Put the right leg under the body. | right_leg |
| 9 | Put the left foot under the left leg. | left_foot |
| 10 | Put the right foot under the right leg. | right_foot |
**Asset usage:** `bone_parts` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 2.2 Who Am I? — `choice_3`
**How it looks/works:** Show T-Rex, Triceratops and Brachiosaurus large on the screen at the same time. Click the dinosaur described.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | I have got two short arms. | t_rex |
| 2 | I have got three horns. | triceratops |
| 3 | I have got a very long neck. | brachiosaurus |
| 4 | I have got a big head shield. | triceratops |
| 5 | I have got sharp teeth. | t_rex |
| 6 | I have got a long neck and a small head. | brachiosaurus |
| 7 | I can run on two legs. | t_rex |
| 8 | I have got a horn on my nose. | triceratops |
| 9 | I can eat leaves from tall trees. | brachiosaurus |
| 10 | I am big and I eat meat. | t_rex |
**Asset usage:** `dinosaurs` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 2.3 The Moving Dinosaurs — `find_character`
**How it looks/works:** Find each unique colour/action dinosaur from a set of 10 labelled, visually distinct character cards; gentle CSS motions are enough.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | The red dinosaur is running. | dino_action_01 |
| 2 | The green dinosaur is drinking water. | dino_action_02 |
| 3 | The blue dinosaur is sleeping. | dino_action_03 |
| 4 | The yellow dinosaur is eating leaves. | dino_action_04 |
| 5 | The orange dinosaur is jumping. | dino_action_05 |
| 6 | The purple dinosaur is hiding behind a rock. | dino_action_06 |
| 7 | The little dinosaur is playing with a ball. | dino_action_07 |
| 8 | The big dinosaur is walking slowly. | dino_action_08 |
| 9 | The baby dinosaur is sitting in a nest. | dino_action_09 |
| 10 | The brown dinosaur is looking at a bird. | dino_action_10 |
**Asset usage:** `dino_actions` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

**Clue overlay:** Show evidence icon `/assets/museum/evidence/grey_fur.png` and write “CLUE 2: Grey fur”. Voice: “What can this clue tell us?” Save to notebook on `Collect clue`.

### STATION 3: THE LIVING PAINTINGS — 17:00–24:00
**Focus:** prepositions; descriptions; have got; there is/are. **Clue:** A long tail.
**Scene:** Art is alive! Put objects back into the paintings, listen to portraits and find precise visual differences.
**Teacher station opener:** “Detectives, welcome to the The Living Paintings! We have three challenges. Are you ready?”

#### 3.1 Repair the Paintings — `drag_drop`
**How it looks/works:** Split ten placements across two pictures: first 5 village, next 5 castle. Each target slot must exist and be shown in exactly one place.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | Put the sun above the house. | sun |
| 2 | Put the blue bird in the tree. | bird_blue |
| 3 | Put the cat under the bench. | cat |
| 4 | Put two flowers in front of the house. | flowers_two |
| 5 | Put the boat on the lake. | boat |
| 6 | Put the moon above the castle. | moon |
| 7 | Put the owl on the castle roof. | owl_small |
| 8 | Put a red flag on the tower. | flag_red |
| 9 | Put three stars in the sky. | stars_three |
| 10 | Put the little dragon behind the castle. | dragon_small |
**Asset usage:** `painting_objects` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 3.2 The Talking Portraits — `listening_match`
**How it looks/works:** Native speaker reads without text first; on Replay reveal English subtitle. Five portraits, each matched twice.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | I have got a gold crown. | king |
| 2 | I am sitting on a throne. | king |
| 3 | I am wearing a red hat. | artist |
| 4 | I have got a paintbrush. | artist |
| 5 | I have got a black eye patch. | pirate |
| 6 | I have got a treasure chest. | pirate |
| 7 | I am wearing glasses. | scientist |
| 8 | I am holding a blue bottle. | scientist |
| 9 | I am wearing a green dress. | princess |
| 10 | I have got a white cat. | princess |
**Asset usage:** `portraits` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 3.3 The Changing Picture — `spot_difference`
**How it looks/works:** Two pairs, five differences per pair, 10 total. PNGs are programmatically composited from identical bases. Click target hotspot and say an English sentence.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | The bird is blue in picture B. | village_bird |
| 2 | There are two apples in picture B. | village_apples |
| 3 | The door is open in picture B. | village_door |
| 4 | The flowers are yellow in picture B. | village_flowers |
| 5 | The cat is under the table in picture B. | village_cat |
| 6 | The flag is green in picture B. | castle_flag |
| 7 | There are two stars in picture B. | castle_stars |
| 8 | The dragon is behind the castle in picture B. | castle_dragon |
| 9 | The left window is dark in picture B. | castle_window |
| 10 | The boat is not on the lake in picture B. | castle_boat |
**Asset usage:** `spot_difference` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

**Clue overlay:** Show evidence icon `/assets/museum/evidence/long_tail.png` and write “CLUE 3: A long tail”. Voice: “What can this clue tell us?” Save to notebook on `Collect clue`.

### STATION 4: EGYPTIAN CHAMBER — 24:00–31:00
**Focus:** word order; vocabulary; clothes; prepositions; imperatives. **Clue:** Gold dust.
**Scene:** A gentle mummy needs help with symbols, dressing up and navigating the pyramid.
**Teacher station opener:** “Detectives, welcome to the Egyptian Chamber! We have three challenges. Are you ready?”

#### 4.1 Decode the Hieroglyphs — `symbol_choice`
**How it looks/works:** Ten sentences; replace one word with a pictogram. Choices must contain 1 correct + 2 plausible incorrect terms. Children read complete sentence after choosing.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | The [SUN] is yellow. | sun |
| 2 | The [CAT] is sleeping. | cat |
| 3 | The [SNAKE] is long. | snake |
| 4 | The [BOAT] is on the river. | boat |
| 5 | The [MOON] is white. | moon |
| 6 | The [BIRD] can fly. | bird |
| 7 | The king has got a [CROWN]. | crown |
| 8 | The [STAR] is blue. | star |
| 9 | The [EYE] is big. | eye |
| 10 | The [KEY] is small. | key |
**Asset usage:** `hieroglyphs` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 4.2 Dress the Mummy — `dress_up`
**How it looks/works:** Place 10 wearables or handheld props on the mummy. Step 9 is a removal and must reverse the hat state.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | Put a blue hat on the mummy. | hat_blue |
| 2 | Put a red scarf around its neck. | scarf_red |
| 3 | Give the mummy a green bag. | bag_green |
| 4 | Put two gold bracelets on its arms. | bracelets_gold |
| 5 | Put purple shoes on its feet. | shoes_purple |
| 6 | Put a silver ring on its hand. | ring_silver |
| 7 | Put a white belt around its waist. | belt_white |
| 8 | Give the mummy a small book. | book_small |
| 9 | Take off the blue hat. | remove_hat_blue |
| 10 | Put a golden crown on its head. | crown_gold |
**Asset usage:** `mummy_clothes` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 4.3 Escape the Pyramid — `maze`
**How it looks/works:** Show a ten-checkpoint route with arrow controls. Each instruction consumes one checkpoint and triggers a visual animation; keyboard arrows work too.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | Go straight to the first door. | checkpoint_01 |
| 2 | Turn left at the cat statue. | checkpoint_02 |
| 3 | Go right at the big vase. | checkpoint_03 |
| 4 | Walk past the green snake. | checkpoint_04 |
| 5 | Stop next to the golden box. | checkpoint_05 |
| 6 | Go straight to the blue door. | checkpoint_06 |
| 7 | Turn right at the two torches. | checkpoint_07 |
| 8 | Go left at the river. | checkpoint_08 |
| 9 | Walk over the bridge. | checkpoint_09 |
| 10 | Open the door with the moon. | checkpoint_10 |
**Asset usage:** `maze` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

**Clue overlay:** Show evidence icon `/assets/museum/evidence/gold_dust.png` and write “CLUE 4: Gold dust”. Voice: “What can this clue tell us?” Save to notebook on `Collect clue`.

### STATION 5: LOST & FOUND OFFICE — 31:00–38:00
**Focus:** memory; object names; possessives; descriptions. **Clue:** A note: “I want to help.”.
**Scene:** The lost-and-found room contains memory challenges, owners’ belongings and the combined evidence board.
**Teacher station opener:** “Detectives, welcome to the Lost & Found Office! We have three challenges. Are you ready?”

#### 5.1 What Has Disappeared? — `memory`
**How it looks/works:** Display ten distinct cards for 12–15 seconds; hide the cover for each fast round. One item disappears per round; preserve other nine in fixed positions. Give four answer options if pupils struggle.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | The yellow hat is missing. | hat_yellow |
| 2 | The blue cup is missing. | cup_blue |
| 3 | The silver coin is missing. | coin_silver |
| 4 | The red star is missing. | star_red |
| 5 | The golden bell is missing. | bell_gold |
| 6 | The purple book is missing. | book_purple |
| 7 | The white glove is missing. | glove_white |
| 8 | The green scarf is missing. | scarf_green |
| 9 | The red apple is missing. | apple_red |
| 10 | The small spoon is missing. | spoon_small |
**Asset usage:** `memory_items` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 5.2 Whose Is It? — `owner_match`
**How it looks/works:** Ten owners on left / ten possessions right. Put only one characteristic item per owner; auto snap correct matches.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | The artist has got a paintbrush. | artist → paintbrush |
| 2 | The explorer has got a map. | explorer → map |
| 3 | The king has got a crown. | king → crown |
| 4 | The scientist has got a blue bottle. | scientist → bottle_blue |
| 5 | The pirate has got a compass. | pirate → compass |
| 6 | The guard has got a torch. | guard → torch |
| 7 | The cook has got a spoon. | cook → spoon |
| 8 | The girl has got a pink ribbon. | girl → ribbon_pink |
| 9 | The boy has got a toy dinosaur. | boy → toy_dinosaur |
| 10 | The queen has got a golden necklace. | queen → necklace_gold |
**Asset usage:** `owner_items` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 5.3 The Detective Evidence Board — `true_false`
**How it looks/works:** Show pinned evidence pictures 1–5; answers are directly grounded in the inventory and fixed scene.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | The footprints are small. | TRUE |
| 2 | The footprints are on the ceiling. | FALSE |
| 3 | There is grey fur on the floor. | TRUE |
| 4 | The fur is pink. | FALSE |
| 5 | There is a long tail in the photo. | TRUE |
| 6 | The Moon Key is made of wood. | FALSE |
| 7 | There is gold dust on the stairs. | TRUE |
| 8 | The note says, “I want to help.” | TRUE |
| 9 | The museum window is broken. | FALSE |
| 10 | The clock is working. | FALSE |
**Asset usage:** `evidence_board` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

**Clue overlay:** Show evidence icon `/assets/museum/evidence/note_help.png` and write “CLUE 5: A note: “I want to help.””. Voice: “What can this clue tell us?” Save to notebook on `Collect clue`.

### STATION 6: THE CLOCK TOWER — 38:00–45:00
**Focus:** numbers; missing words; grammar revision; deduction. **Clue:** Pip and the Moon Key.
**Scene:** The giant clock has stopped. Restore its numbers, repair grammar gears and deduce the culprit.
**Teacher station opener:** “Detectives, welcome to the The Clock Tower! We have three challenges. Are you ready?”

#### 6.1 Fix the Giant Clock — `clock_placement`
**How it looks/works:** A full 12-hour clock: 10 and 11 are already fixed and the remaining ten positions are empty. Number tokens are draggable.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | Put twelve at the top. | 12 |
| 2 | Put six at the bottom. | 6 |
| 3 | Put three on the right. | 3 |
| 4 | Put nine on the left. | 9 |
| 5 | Put one after twelve. | 1 |
| 6 | Put two after one. | 2 |
| 7 | Put four after three. | 4 |
| 8 | Put five after four. | 5 |
| 9 | Put seven after six. | 7 |
| 10 | Put eight after seven. | 8 |
**Asset usage:** `clock_numbers` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 6.2 Repair the Broken Sentences — `multiple_choice`
**How it looks/works:** One short sentence with two answer buttons; each right answer spins a gear.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | There ___ a key in the box. | is (choices: is, are) |
| 2 | There ___ three doors in the hall. | are (choices: is, are) |
| 3 | The cat is ___ the table. | under (choices: under, between) |
| 4 | The dinosaur ___ got a long tail. | has (choices: has, have) |
| 5 | The paintings ___ moving. | are (choices: is, are) |
| 6 | The mummy is ___ a hat. | wearing (choices: wearing, wear) |
| 7 | The owl ___ fly. | can (choices: can, can’t) |
| 8 | The mouse is ___ the clock. | behind (choices: behind, under) |
| 9 | ___ there two lamps? | Are (choices: Is, Are) |
| 10 | The clock ___ working. | isn’t (choices: isn’t, aren’t) |
**Asset usage:** `gears` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

#### 6.3 Who Took the Moon Key? — `true_false`
**How it looks/works:** Show suspects Owl, Cat, Bat, Fox, Mouse plus accumulated evidence. Present true/false characteristics then click mouse.
**Teacher script:** “Look carefully. Listen to the clue. Tell me your answer in English. Ready? Let’s try!”
**Controls:** Show current question and a 1–10 round tracker; after a correct response, animate the target; incorrect choice is never a dead end. Quick mode uses 1–6, Full uses 1–10.
| # | Student-facing line / instruction | Correct answer / target |
|---:|---|---|
| 1 | The mystery animal is small. | TRUE |
| 2 | It has got grey fur. | TRUE |
| 3 | It has got a long tail. | TRUE |
| 4 | It has got wings. | FALSE |
| 5 | It can fly. | FALSE |
| 6 | It has got big round ears. | TRUE |
| 7 | It is wearing a gold crown. | FALSE |
| 8 | It is hiding in the clock. | TRUE |
| 9 | It has got the Moon Key. | TRUE |
| 10 | It wants to help. | TRUE |
**Asset usage:** `suspects` group; use lookup from manifest. Add decorative scene, but drive answer logic from data, never pixel matching.

**Clue overlay:** Show evidence icon `/assets/museum/evidence/pip_moon_key.png` and write “CLUE 6: Pip and the Moon Key”. Voice: “What can this clue tell us?” Save to notebook on `Collect clue`.

## 7. Deterministic art / collision specifications — DO NOT GUESS
### Station 1: security hall (truth source)
The security composition must show: **two visible doors**; clock **above** desk; red bag **next to** chair; **three** framed pictures; **yellow** lamp; ticket **under** bench; guard with **blue** cap; **closed, intact** window; **two** keys on desk; plant **next to** stairs. The `security_scene.png` is a reference built to match; optionally render CSS item overlays. Always keep the teacher answer key from `gameData.json`.
### S1 Magic Flashlight
At 1920×1080 show ten props as individual positioned PNG with clickable hitboxes, no overlapping. Darkness 75%, circular reveal radius 135 px with soft edge. `pointermove` controls mask; click matching item, glow, inventory badge. Keyboard focus `Tab` and `Enter` reveals objects without needing precise cursor control.
### S1 visitor portrait consistency
The ten visitor cards are deterministic simplified drawings with clothing and accessories exactly described in Task 3. Each card has a unique internally named `visitor_01` to `visitor_10`; only show their numbers, not hidden data names. The answer must not depend on body type, age or ethnic guessing.
### S2 skeleton target slots
Base skeleton uses 10 sequential placeholders: head, neck, body, tail, left_arm, right_arm, left_leg, right_leg, left_foot, right_foot; drop region centers on 1600×900 canvas (x,y): `(750,170),(740,265),(745,420),(1060,455),(610,375),(870,375),(680,620),(825,620),(650,755),(850,755)`. Scale all by viewport ratio; never flip anatomical labels after mirroring. Provide click-to-select/click-to-place.
### S2 dinosaurs
T-Rex: two short arms, large head, sharp teeth, two legs, meat-eater. Triceratops: three facial horns (one on nose), big frill/head shield, four legs. Brachiosaurus: long neck, small head, plant-eater. Use these **specific** three characters for Task 5. For Task 6 use separate coloured/prop variants in 10 dedicated cards (do not claim static art is animated if it is not).
### S3 Repair Paintings
The game has two frames, *Village* and *Castle*, with 5 slots each. Require exact location + label; use scene-anchored slots and item snapping. For “two flowers” use one draggable flower-pair object, and for “three stars” use one draggable triple-star object (each still counts as one prompt).
### S3 Changing Picture: validated exact difference maps
Use supplied `village_A.png`, `village_B.png`, `castle_A.png`, `castle_B.png` (1000×640) from `puzzles/spot_difference/`. Both sides are generated from identical bases, with **5 intended differences each**. See `differenceHotspots.json` for the normalized centers and radii, pair IDs and English answer text. Show one pair at a time, up to five hotspots per pair; clicking same hotspot twice scores once. No extra secret differences.
### S4 maze
Keep a predetermined 10-node route with 10 safe checkpoints labeled `checkpoint_01`–`checkpoint_10`, corresponding to the 10 lines. Map design is an illustrative fixed path, not a random maze. At each node, show instruction, 3 arrow buttons; teacher selects route, player moves; wrong path highlights friendly hint then resets to node. Include stop and open interactions as buttons, not directions.
### S5 memory
Show ten objects in 5×2 **stable positions** for memorisation. Each round hides exactly one item (not multiple). Display question “What is missing?” and wait for oral response, then allow teacher to reveal/verify; do not demand exact spelling. Memory resets after a round. Use 10-item stable set matching Task 13.
### S6 clock
Digit 10 and digit 11 are visible from the start, other 10 placeholders blank. Standard clockwise 12-hour positions; each number token snaps to the correct angle. A drag is accepted only at the corresponding numeral position. After task, animate second-hand moving.
### S6 final culprit
Show five suspects throughout: owl, cat, bat, fox, grey mouse. Pip’s ears are **large round**, fur grey, has a long tail, **no wings**, cannot fly, goggles but **no crown**. Cat has triangular ears, the owl and bat have wings, fox has orange fur. Do not reveal `Pip` until final suspect confirmation at end.

## 8. Finale: 45:00–50:00
**00:00–01:00 Reveal:** open clock door, show Pip holding Moon Key. Pip: “I only wanted to help. I wanted to fix the clock.” Hoot: “Thank you for telling us the truth.”
**01:00–02:00 Repair:** children choose what the key goes into, then click `START THE CLOCK`; clock hands spin, lights come on and quiet bells ring (sound can be muted).
**02:00–04:00 Five speaking questions:** 1. Who took the Moon Key? 2. Why did he take it? 3. Where was the grey fur? 4. What was the mummy wearing? 5. Which room did you like best? Accept short answers and model complete sentences.
**04:00–05:00 Celebration:** group badge “MUSEUM DETECTIVE — CASE CLOSED”, total clues `6/6`, optional certificate export/print, “Great work, detectives!”

## 9. How to run for a native English-speaking teacher
**Before class:** open in full-screen, test keyboard/audio and projector, verify backgrounds, set pace to `Quick` if mixed level, check that answer key is hidden. Children sit in teams of 3–6; no phones. Plan to rotate who gets to point to the screen every 2 or 3 prompts.
**Starter phrases:** “What can you see?”, “Look at the picture”, “Can you say it in a full sentence?”, “Tell your partner”, “Let’s check”, “Good try! Look again”, “Which clue have we found?”
**Low-confidence A1:** let children point and then model one short English phrase; avoid reading aloud all text before they have seen it; provide one hint. **Strong A1:** ask “Why?”, “Where is it?”, “What is the dinosaur doing?”, or “Can you say a complete sentence?”.
**If running behind:** press `Quick mode`, complete 6 essential rounds per exercise or use `Finish station` after giving students one chance to explain a choice. Never skip the clue. **If ahead:** press `More questions` for rounds 7–10 or ask learners to justify answers in pairs.
**Technical issue:** `Restart task` restores it, backed by stored progress. `Back` revisits task without re-awarding points. `Mute` disables sounds; subtitles remain readable. Use no web calls.

## 10. Build acceptance checklist
- [ ] 6 stations, 3 activities each and all 180 question records loaded from JSON; no blank slides, filler tasks or repeated generic questions.
- [ ] Every one of the 18 mechanics is functional: TF, masked search, matching, drag/drop, clicking, listening prompt, two controlled difference pairs, symbols, dress up, maze, memory, deductions, clock and grammar gears.
- [ ] Every answer is validated against stable scene props or question data. No mismatch between image and answer.
- [ ] Quick (6) + Full (10) both work, all clues accessible, 50-minute timeline implemented.
- [ ] Teacher mode holds separate answers; in student mode answers are not visible before checking.
- [ ] All asset paths load, transparent PNGs are visually transparent, backgrounds fill 16:9 screen, no missing URLs.
- [ ] Time, task, evidence and user settings survive page reload; Reset requires confirmation.
- [ ] Mouse and keyboard controls work; drag/drop fallback works; answer feedback is child-friendly.
- [ ] No copyrighted music; no external dependency necessary to run game locally. Provide `README_RUN.md` and simple launch commands.

## 11. Directory contract
```text
The_Midnight_Museum_Mysteries_Codex_Package/
├── README_START_HERE.md
├── gameData.json                         # all 180 prompts + answers
├── assetManifest.json                    # exact asset paths & categories
├── differenceHotspots.json               # exact spot-difference targets
└── public/assets/museum/
    ├── backgrounds/                       # 8 scenes
    ├── characters/                        # owls, mouse, suspects, mummy, portraits
    ├── objects/                           # item PNGs, costumes, clues props
    ├── evidence/                          # six unique clues
    ├── dinosaurs/                         # types + skeleton parts
    ├── visitors/                          # deterministic visitor cards
    ├── paintings/                         # movable items for two paintings
    ├── puzzles/spot_difference/           # A and B exact art pairs
    ├── clock/                             # number disks and gears
    └── ui/                                # control art; html button labels allowed
```

**End of specification.** Build the game so the teacher can start at 00:00 and complete the story at exactly 50:00 using 6 stations. Use the question dataset, not an LLM, as the grading source.
