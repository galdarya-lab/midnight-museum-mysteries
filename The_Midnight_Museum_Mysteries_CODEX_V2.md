# THE MIDNIGHT MUSEUM MYSTERIES — CODEX SPECIFICATION V2

**Тип:** полностью интерактивная браузерная игра, а не презентация.  
**Аудитория:** Grades 3–5, English A1, преподаватель-носитель, один проектор / экран.  
**Продолжительность:** **50 минут**. **6 станций, 17 упражнений, по 10 раундов в каждом (170 записей)**.  
**Статус:** утверждённый план **переработки существующего проекта**. Сначала реализовать этот MD; **новые PNG-ассеты будут изготовлены отдельно следующим этапом**. Ничего не считать уже готовым только потому, что имя файла указано в ТЗ.  
**Приоритет:** точное соответствие экранов, текстов и ответов; простота управления с одного компьютера; цельная красивая 3D-стилистика.

> **ВАЖНО для Codex:** прочитай этот документ полностью. Это **V2**, он имеет приоритет над прежними `The_Midnight_Museum_Mysteries_Codex.md`, `gameData.json`, `differenceHotspots.json` и любыми описаниями старых механик. Сохрани работающие полезные компоненты прежней игры; удаляй/заменяй только то, что явно предписано здесь. Никогда не показывай старые некачественные изображения вместо отсутствующих ассетов V2. Если новые PNG ещё не поступили, реализуй функциональную механику и выведи понятный девелоперский placeholder с названием ожидаемого файла **только в режиме разработки** — не выдавай его за готовый арт.

## 1. Что конкретно изменилось (обязательный change log)

| Было в V1 | Должно быть в V2 |
|---|---|
| Запуск без понятного выбора сессии | Главный экран: **START**, **CONTINUE** (если есть сохранение), **START AGAIN** с подтверждением удаления прогресса |
| Справа на фоне первой локации непонятный прямоугольник | Полностью убрать артефакт. Новый чистый полноэкранный 3D-фон; никаких внезапных прямоугольных заглушек |
| Ticket Machine: некрасивые/слабые портреты, совпадающий порядок | **10 новых полноценных 3D-персонажей**, варианты портретов **перемешаны независимо от списка предложений** |
| Build the Dinosaur (сборка скелета) | **ПОЛНОСТЬЮ УДАЛИТЬ**. Теперь `Find the Dinosaur Body Part`: прочитай `Find the head` и **нажми на изображение** среди 10 карточек |
| Triceratops хуже остальных | Заменить на красивого, доброго, объёмного 3D Triceratops **того же качества**, что T-Rex и Brachiosaurus |
| Moving Dinosaurs: сомнительные картинки/повторения | **10 отдельных качественных 3D-кадров с различными движениями**, дети читают предложение и кликают подходящий кадр |
| Repair the Paintings: плоская/размытая графика | **Две красивые 3D-иллюстрации**, по 5 перемещаемых предметов в каждой, 10 заданий; реальные зоны вставки |
| The Talking Portraits: непонятный формат | Полностью заменить на **Professions & Skills Matching**: artist, scientist, teacher, swimmer; 10 карточек действий и 4 персонажа |
| Spot the Difference: случайные/плохие различия | **Две новые красивые пары 3D-сцен**, **строго 5 проверяемых отличий в каждой**; базовое изображение + контролируемые слои, не независимая генерация двух сцен |
| Dress the Mummy: перетаскивание одежды на мумию | **Mummy’s Wardrobe**: красивая 3D-мумия + набор 14 картинок одежды; инструкция `Find the dress` → **клик по одежде**, 10 раундов, НЕ одевание персонажа |
| Escape the Pyramid | **ПОЛНОСТЬЮ УДАЛИТЬ**, без скрытой заглушки и без нового упражнения. На станции 4 остаются **два** задания |
| What Is Missing?: некрасивые предметы | Заменить **все 10 игровых предметов** на крупные качественные 3D-ассеты, сохраняя механику памяти |
| Часы и цифры | Новый выразительный **3D-циферблат** и отдельные красивые цифры 1–12 с точной проверкой положения |
| Repair the Broken Sentences: невнятные шестерёнки | Сохранить грамматическую механику, но **механизм часов реально достраивается после каждого ответа** (10 визуальных стадий) |
| Who Took the Moon Key?: плохие портреты, страшный Pip | Новые добрые 3D-подозреваемые, **новый милый Pip**; до разгадки мышонок скрыт нейтральным портретом, затем красивое раскрытие |
| Изображения иногда следовали текстам по порядку | **Во всех matching / selection заданиях варианты картинок перемешивать**; никакой привязки `1→1`, `2→2`, первая карточка — первый ответ |

## 2. Сюжет и настроение

В полночь исчез **Moon Key**, главный музейный часовой механизм остановился. Добродушная сова **Professor Hoot** ведёт детей через шесть залов. Улики: маленькие следы → серая шерсть → длинный хвост → золотая пыль → записка «I want to help» → мышонок Pip с ключом. В финале выясняется, что Pip хотел **починить часы**, а не украсть сокровище. Детективы помогают ему и спасают музей.

**Дизайн:** тёплое атмосферное 3D-кино для детей, добрые выразительные глаза, приятные эмоции, подробные материалы, золото/слива/бордо/лунно-синий, мягкое музейное освещение, композиции без визуального хаоса. Картинки персонажей едины по размеру головы, освещению, детализации, масштабу и цветокоррекции. Без страшных мумий, глитч-роботов, кислотного неона, дешёвых растровых иконок. Высокое разрешение. **Не нарезать отдельные ассеты из обзорных коллажей с подписями** — это источник предыдущих ошибок.

**Учебная цель:** Colors; Numbers 1–100; animals/dinosaurs; body parts; clothes; objects; professions; `there is/are`, `have got`, `can`, Present Continuous, prepositions, vocabulary matching, basic deduction. Все видимые инструкции внутри игры — только на **простом английском**.

## 3. Жёсткий тайминг: 50 минут

| Минуты | Экран/зал | Число заданий | Отводимое время |
|---|---|---:|---|
| 00:00–03:00 | Вступление + выбор Start/Continue | — | 3 мин |
| 03:00–10:00 | 1. Security Hall | 3 × 10 | 7 мин |
| 10:00–17:00 | 2. Dinosaur Gallery | 3 × 10 | 7 мин |
| 17:00–24:00 | 3. The Living Paintings | 3 × 10 | 7 мин |
| 24:00–31:00 | 4. Egyptian Chamber | **2 × 10** | 7 мин |
| 31:00–38:00 | 5. Lost & Found Office | 3 × 10 | 7 мин |
| 38:00–45:00 | 6. The Clock Tower | 3 × 10 | 7 мин |
| 45:00–50:00 | Финал: Pip + вопросы + награда | — | 5 мин |
| | **Всего** | **17 × 10 = 170 раундов в данных** | **50 мин** |

**Обязательные раунды Quick (явный список, а не слепое правило «первые шесть»):** для большинства заданий `coreQuestionIds=[1,2,3,4,5,6]`. Для `S3_T1` (**две картины**) использовать `[1,2,3,6,7]` — три действия в Village и два в Castle. Для `S3_T3` (**две пары отличий**) использовать `[1,2,3,6,7]` — три различия в Gallery 1 и два в Gallery 2. Для `S6_T2` первые шесть ответов дают стадии 1–6, а кнопка `Finish clock` **явно** достраивает стадии 7–10 без фиктивного начисления баллов. Не менять порядок этих `coreQuestionIds` при восстановлении сохранения.

**Важное решение по темпу:** 170 раундов нельзя проводить по 20–30 секунд каждый и уложиться в 50 минут. В интерфейсе должны быть режимы **CLASSROOM / QUICK** (по 5–6 обязательных раундов за упражнение) и **FULL** (все 10). Все десять реальных раундов обязаны присутствовать в данных и быть доступными, но на живом уроке Quick — режим по умолчанию. На станциях 1/2/3/5/6: ~20 сек ввод, по ~100–110 сек на три упражнения, ~70 сек улика и переход. На станции 4: ~20 сек ввод, 2×~160 сек, ~80 сек улика. Учитель вручную завершает этап; игра не сбрасывает прогресс автоматически из-за таймера.

Если выбран `Full`, игру можно проводить дольше 50 минут или пройти все раунды быстрее — это выбор преподавателя, а не нарушение целевого планирования. При достижении 50 минут кнопка `Wrap Up` позволяет перейти к финалу, не теряя сохранённые ответы.

## 4. Главное меню и сохранение прогресса — КРИТИЧНО

**При первом открытии:** видим крупный заголовок, Professor Hoot, красивые кнопки `START` и `HOW TO PLAY`; если нет сохранения, `CONTINUE` неактивна/скрыта. После начала игры вместо первого `START` удобно показывать `CONTINUE` и `START AGAIN`, при этом `START` может дублировать новый урок только с подтверждением.

**Если прогресс есть:**
- `CONTINUE` — сразу открыть последнее незавершённое задание, включая станцию, номер раунда, выбранный режим, найденные улики, случайный порядок картинок, собранные шестерёнки, позиции предметов и достигнутые результаты.
- `START AGAIN` — модальное подтверждение: **“Start a new lesson? Your saved progress will be replaced.”** Кнопки `CANCEL` и `YES, START AGAIN`. Без подтверждения ничего не стирать.
- `HOME` — вернуться в главное меню, **не уничтожая прогресс**.
- `BACK` — на предыдущий раунд или страницу, **не начислять баллы второй раз**.
- `REPEAT` — заново воспроизвести голос/подсказку или визуальный эффект; не обнулять пройденные другие задания.
- `SKIP` — перейти дальше с отметкой `skipped`, без фиктивно правильного ответа.
- `SAVE & EXIT` — явно сохранить и вернуться на старт. Кроме этого — **автосохранение после каждого ответа / изменения сцены**, а также при переходах.
- Перезагрузка страницы, закрытие вкладки и возврат через несколько дней **не теряют локальный прогресс**, если браузер не очищал данные и используется то же устройство/профиль.

**Хранение:** `localStorage` (или IndexedDB при необходимости) ключ `midnightMuseum:v2:save`. Предпочтительная форма:
```ts
type GameSaveV2 = {
  schemaVersion: 2;
  updatedAt: string;
  sessionId: string;
  mode: 'quick'|'full';
  route: { screen: string; stationId: string | null; taskId: string | null; questionIndex: number };
  completedQuestionIds: string[];
  skippedQuestionIds: string[];
  unlockedClueIds: string[];
  correctAnswersByQuestion: Record<string, string>;
  questionOrders: Record<string, string[]>;
  tileOrders: Record<string, string[]>;
  placedItems: Record<string, string[]>;
  clockAssemblyStage: number; // 0..10
  evidenceNotebookOpen: boolean;
  mute: boolean;
  elapsedLessonSeconds: number;
  completed: boolean;
};
```

При запуске сохранение валидируется: `schemaVersion===2`, перечисленные `taskId` существуют, индексы в допустимом диапазоне. Старые V1 сохранения **не подгружать напрямую**, потому что задачи и их номера изменились. Показывать предложение «Start a new V2 game»; старый V1 ключ оставить нетронутым, пока пользователь сам не подтвердит. Опционально — именованные отдельные профили групп (например, `Group A`, `Group B`) без ФИО детей; не обязательно для первого релиза.

**Безопасность:** не собирать ФИО/личные данные, не использовать облачное сохранение, подключение к аккаунту и внешние API. Сообщать, что продолжение возможно лишь на том же браузере и при сохранённом хранилище.

## 5. Игровой экран и общие правила интерактивности

- Базовая композиция 16:9, адаптация под 1366×768; крупный текст **не менее 28px на стандартном HD-экране**; минимальная зона клика 64×64px. Визуально красивые панели не должны закрывать важные предметы или располагаться случайными прямоугольниками справа.
- Заголовок локации, `STATION 2/6`, `TASK 1/3` (для Station 4: `TASK 1/2`), `Q 1/10`, кнопки Home, Back, Repeat, Skip, Fullscreen, Sound, Evidence, Pause. Кнопки визуально 3D, однако **их кликабельность реализована HTML**, а не замурована в PNG.
- **Рандомизация:** для всех задач выбора из картинок, matching и выбора одежды перемешивать **положение вариантов** независимым seeded shuffle (Fisher–Yates). Не связывать номер вопроса с номером карточки. Для задач с единственным ответом желательно менять 3–6 дистракторов, избегая предсказуемой позиции. Порядок сохранять в `GameSaveV2`, чтобы при `CONTINUE` карточки не переезжали неожиданно. После нового `START AGAIN` seed другой; допускается повторение отдельных позиций, но не исходный систематический порядок.
- Каждый раунд имеет `id`, `prompt`, `correctId`/`correctBoolean`, `options`, `feedbackText` и `assetId`. Ответ определяется **ID**, никогда текстом названия файла, индексом сетки или цветом пикселя.
- До клика не подсвечивать правильный ответ. При ошибке мягкая подсказка и повтор. После правильного ответа отметить выполненным, перейти по кнопке `NEXT` или через задержку 0.7–1.2 сек (в настройках).
- Аудио: носитель произносит фразу; кнопка `REPEAT` повторяет текст через speechSynthesis с `en-GB` если голос доступен, иначе подсветка текста и преподаватель читает сам. Не делать аудио обязательным.
- Доступность: все drag-and-drop механики имеют альтернативу **нажать на предмет → нажать на точку**, Tab/Enter/Escape работают, `prefers-reduced-motion` отключает сильную анимацию.
- 6 улик выдаются при завершении каждой станции и автоматически сохраняются. Улики не пропадают при Back/Continue и не выдают финал раньше времени.
- Преподаватель может скрыто открыть `TEACHER MODE` (`Ctrl+Shift+T`), видеть правильный ответ и нажимать `MARK CORRECT` при устном задании; оверлей не должен случайно появляться на проекторе.
- **Качество изображений:** не использовать стоковые эмодзи и изображения из плохого V1 как финальные иллюстрации; если какого-то V2 файла нет, dev-плашка сообщает точный путь и приложение продолжает работать без краша. В продакшне не должно быть ни одной dev-плашки.

## 6. Поэтапная реализация: все станции и 170 точных раундов

**Нумерация V2:** используйте стабильные ID задач (`S1_T1`, `S1_T2` и т.д.), а не старые сквозные номера — это упрощает миграцию и исправления. Файл данных `src/data/museumGameV2.ts` или `src/data/museumGameV2.json` должен содержать **170 структурированных записей** ниже. В таблицах перечислены **точные student-facing строки и ключи**, а не примеры или черновики.

### STATION 1 — SECURITY HALL (03:00–10:00)

**Сцена:** новый чистый полный 3D-рендер холла `security_hall_clean.jpg`. Никакого чужеродного прямоугольника справа. Слой с предметами (2 двери, часы над столом, красная сумка возле стула, 3 картины, жёлтая лампа, билет под скамьёй, охранник в синей шапке, закрытое окно, 2 ключа на столе, растение возле лестницы) рисуется **контролируемо отдельными кликабельными PNG-слоями**. Учитель: “Welcome to the Security Hall. Let’s check the cameras!”

#### S1_T1. Security Camera Check — `true_false`

Текст поверх стабильной сцены, крупные кнопки `TRUE / FALSE`; после ответа подсветка проверяемого объекта. **Не пытаться проверять факт по случайному фоновому рисунку.**

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | There are two doors in the hall. | TRUE |
| 2 | The clock is under the desk. | FALSE — clock above the desk |
| 3 | There is a red bag next to the chair. | TRUE |
| 4 | There are three paintings on the wall. | TRUE |
| 5 | The lamp is green. | FALSE — yellow lamp |
| 6 | There is a ticket under the bench. | TRUE |
| 7 | The guard has got a blue hat. | TRUE |
| 8 | The window is open. | FALSE — closed |
| 9 | There are four keys on the desk. | FALSE — two keys |
| 10 | The plant is next to the stairs. | TRUE |

**Техническая логика и проверка:** Полностью убрать некрасивый прямоугольник справа из первой локации и не заменять его серым CSS-блоком. Источник правильности — детерминированная композиция из 10 фиксированных элементов.

#### S1_T2. Magic Flashlight — `flashlight_find`

Учитель двигает фонарик над затемнённым залом; дети читают инструкцию и называют предмет; учитель нажимает на найденный объект. Все предметы — отдельные высококачественные 3D PNG со стабильными координатами.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | Find the red ticket. | ticket_red |
| 2 | Find the blue hat. | hat_blue |
| 3 | Find the yellow torch. | torch_yellow |
| 4 | Find the green backpack. | backpack_green |
| 5 | Find the silver key. | key_silver |
| 6 | Find the brown book. | book_brown |
| 7 | Find the white glove. | glove_white |
| 8 | Find the purple umbrella. | umbrella_purple |
| 9 | Find the black camera. | camera_black |
| 10 | Find the orange ball. | ball_orange |

**Техническая логика и проверка:** Непрозрачное затемнение 72–78%, круг фонаря ~140px на 1920×1080; `pointermove` маска + клавиатурный fallback. Дистракторы перемешиваются по позиции для новой игры; каждый объект в разной уникальной точке.

#### S1_T3. The Ticket Machine — `portrait_choice`

Показывать **10 дорогих на вид 3D-портретов** с понятной одеждой и аксессуарами. Сначала показан текст, затем дети **кликают по правильному персонажу**. Не сопоставлять «первое предложение — первая картинка».

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | The boy has got a red cap. | visitor_red_cap_boy |
| 2 | The girl is wearing a green dress. | visitor_green_dress_girl |
| 3 | The man has got a black hat. | visitor_black_hat_man |
| 4 | The woman is holding a yellow bag. | visitor_yellow_bag_woman |
| 5 | The boy has got blue shoes. | visitor_blue_shoes_boy |
| 6 | The girl is wearing a purple jacket. | visitor_purple_jacket_girl |
| 7 | The man has got glasses. | visitor_glasses_man |
| 8 | The woman is holding a red umbrella. | visitor_red_umbrella_woman |
| 9 | The boy is wearing an orange T-shirt. | visitor_orange_tshirt_boy |
| 10 | The girl has got a pink scarf. | visitor_pink_scarf_girl |

**Техническая логика и проверка:** Карточки одной стилистики и масштаба, 5×2 без номеров, подписи с признаками не показывать. 10 отдельных PNG; ID в коде, а не надпись на портрете. У каждой карточки один **однозначный** определяющий признак; для `man with glasses` не добавлять очки кому-либо ещё. Перемешать сетку seeded shuffle один раз при открытии задачи, сохранить порядок при Continue.

**Улика станции:** `CLUE 1 — SMALL FOOTPRINTS`. По `COLLECT CLUE` добавить миниатюру следов в Evidence Notebook. Текст совы: “Look! Small footprints. Who has small feet?”

### STATION 2 — DINOSAUR GALLERY (10:00–17:00)

**Сцена:** 3D-музей динозавров без ужасных обрезков, без старого костяного пазла. Учитель: “The dinosaurs are moving! Let’s find the right pictures.”

#### S2_T1. Find the Dinosaur Body Part — `picture_choice_10`

**Полная замена Build the Dinosaur.** Десять **отдельных** красивых 3D-картинок частей динозавра без швов/пустых трубок. На экране `Find the ...`; дети нажимают на соответствующее изображение среди случайно расположенных 10 карточек. **НЕТ сборки скелета, перетаскивания или целого скелета.**

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | Find the head. | dino_part_head |
| 2 | Find the tail. | dino_part_tail |
| 3 | Find the leg. | dino_part_leg |
| 4 | Find the foot. | dino_part_foot |
| 5 | Find the arm. | dino_part_arm |
| 6 | Find the teeth. | dino_part_teeth |
| 7 | Find the horn. | dino_part_horn |
| 8 | Find the neck. | dino_part_neck |
| 9 | Find the body. | dino_part_body |
| 10 | Find the claw. | dino_part_claw |

**Техническая логика и проверка:** Один объект на картинку, без мелких подписей, все 10 визуально распознаваемы; отдельно проверить, что leg/foot, arm/claw и head/body не путаются. 5×2 карточки; правильный объект не оказывается на позиции своего номера.

#### S2_T2. Who Am I? Dinosaur Edition — `choice_3`

Три **новых единостильных 3D-героя** T-Rex / Triceratops / Brachiosaurus. Особое внимание Triceratops: красивый, симпатичный, с тремя рогами и шейным воротником. Дети по описанию выбирают одного из трёх, позиции троицы меняются по раундам.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
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

**Техническая логика и проверка:** Отрисовать мультяшных динозавров с понятными анатомическими особенностями. Ни один из них не страшный; одинаковые свет, фактура, качество, размер и подставка.

#### S2_T3. The Moving Dinosaurs — `picture_choice_10`

**10 самостоятельных сюжетных 3D-кадров:** динозавры действительно выполняют указанные действия; без подписи правильного глагола на картинке. Дети читают предложение и **кликают подходящий кадр** среди 10 перемешанных картинок.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | The red dinosaur is running. | dino_running_red |
| 2 | The green dinosaur is drinking water. | dino_drinking_green |
| 3 | The blue dinosaur is sleeping. | dino_sleeping_blue |
| 4 | The yellow dinosaur is eating leaves. | dino_eating_yellow |
| 5 | The orange dinosaur is jumping. | dino_jumping_orange |
| 6 | The purple dinosaur is hiding behind a rock. | dino_hiding_purple |
| 7 | The little dinosaur is playing with a ball. | dino_playing_ball |
| 8 | The big dinosaur is walking slowly. | dino_walking_big |
| 9 | The baby dinosaur is sitting in a nest. | dino_baby_nest |
| 10 | The brown dinosaur is looking at a bird. | dino_looking_bird_brown |

**Техническая логика и проверка:** Каждый кадр имеет явную позу и контекст: вода у пьющего, листья у едящего, облачко Zzz у спящего, камень у прячущегося, птичка у смотрящего. Никаких ошибочных цветов. Можно добавить мягкую CSS-анимацию hover, но узнаваемость действия должна обеспечивать **сама картинка**. Карточки перемешать отдельно от вопросов.

**Улика станции:** `CLUE 2 — GREY FUR`. Professor Hoot: “Someone was here! Look, grey fur.”

### STATION 3 — THE LIVING PAINTINGS (17:00–24:00)

**Сцена:** зал живых картин, объёмная сказочная 3D-визуализация, без старого плоского растра. Teacher: “Our paintings are broken. Can you help them?”

#### S3_T1. Repair the Paintings — `drag_drop_two_scenes`

**Ровно 10 действий, как в первом варианте:** 5 для красивой картины `village` (домик у озера), 5 для `castle` (ночной замок). **Новые 3D-картины** и 10 отдельных качественных объектов. Учитель перетаскивает объект на нужную точку; дети проговаривают предложение. Добавить вариант «клик на объект → клик на точку».

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | Put the sun above the house. | village: sun → sky_above_house |
| 2 | Put the blue bird in the tree. | village: blue_bird → tree |
| 3 | Put the cat under the bench. | village: cat → under_bench |
| 4 | Put two flowers in front of the house. | village: flowers_two → in_front_house |
| 5 | Put the boat on the lake. | village: boat → lake |
| 6 | Put the moon above the castle. | castle: moon → sky_above_castle |
| 7 | Put the owl on the castle roof. | castle: owl → roof |
| 8 | Put a red flag on the tower. | castle: red_flag → tower |
| 9 | Put three stars in the sky. | castle: stars_three → sky |
| 10 | Put the little dragon behind the castle. | castle: dragon_small → behind_castle |

**Техническая логика и проверка:** Картины изначально НЕ содержат перемещаемых предметов, иначе появляется дублирование. `flowers_two` содержит **ровно 2 цветка**, `stars_three` — **ровно 3 звезды**. В Quick режиме 5 основных распределить как 3 в village + 2 в castle, чтобы успеть показать обе красивые сцены. Сделать целевое место визуально узнаваемым. При отпускании перетаскивания вне цели возвращать элемент назад.

#### S3_T2. Professions & Skills Matching — `many_to_one_matching`

**Полная замена The Talking Portraits.** На левой стороне четыре 3D-человека: **ARTIST, SCIENTIST, TEACHER, SWIMMER** (можно подписать профессию). Справа 10 отдельных карточек действий — **перемешаны**. Учитель читает глагольную фразу и дети сопоставляют действие с подходящей профессией: кликом или перетаскиванием. Каждая профессия получает несколько карточек.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | paint a picture | ARTIST — skill_paint_picture |
| 2 | draw a cat | ARTIST — skill_draw_cat |
| 3 | mix colours | ARTIST — skill_mix_colours |
| 4 | do an experiment | SCIENTIST — skill_experiment |
| 5 | use a microscope | SCIENTIST — skill_microscope |
| 6 | look at stars | SCIENTIST — skill_stars |
| 7 | teach English | TEACHER — skill_teach_english |
| 8 | write on the board | TEACHER — skill_write_board |
| 9 | swim in a pool | SWIMMER — skill_swim_pool |
| 10 | wear swimming goggles | SWIMMER — skill_swim_goggles |

**Техническая логика и проверка:** Текст-команда над экраном: `Who can ...?` (автоматически составляется по карточке: `Who can paint a picture?`). На карточках справа изображено действие, а текст глагола доступен в крупной строке. Одна карточка может быть использована ровно один раз. Действия и картинки профессионально выверены; не показывать порядок 1→1 и не ставить предметы рядами «3 художника, 3 учёного» рядом — перемешать.

#### S3_T3. Spot the Difference — `two_exact_pairs_five`

**Две новые качественные пары 3D-картинок**, по 5 отличий на пару, в сумме 10. Кликать по изменениям, произносить короткое английское предложение. **Картинки A и B строить на основе одного и того же рендера и пяти строго контролируемых наложений**, а не независимо генерировать. Ниже — конечные 10 корректных состояний.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | The girl has got a star on her hat in picture A. | gallery_1: hat_badge: star A → moon B |
| 2 | The cat has got a red collar in picture A. | gallery_1: cat_collar: red A → blue B |
| 3 | The small painting shows mountains in picture A. | gallery_1: small_painting: mountains A → waterfall B |
| 4 | The lamp is yellow in picture A. | gallery_1: lamp_shade: yellow A → purple B |
| 5 | There is no sunflower in picture A. | gallery_1: flowers: no sunflower A → sunflower B |
| 6 | The moon is round in picture A. | gallery_2: moon: full A → crescent B |
| 7 | The flag is red in picture A. | gallery_2: flag: red A → blue B |
| 8 | There is a dragon in the sky in picture A. | gallery_2: flying_character: dragon A → bird B |
| 9 | There are two stars above the castle in picture A. | gallery_2: stars: two A → three B |
| 10 | There is a crown on the book in picture A. | gallery_2: book_symbol: crown A → star B |

**Техническая логика и проверка:** Первые 5 отличий на паре Gallery 1, вторые 5 — Gallery 2. Записать для каждого нормализованные прямоугольники/hotspots в `differenceHotspotsV2.json`; CSS overlay корректен в обоих изображениях. Каждая правильная зона засчитывается только один раз. **QA:** сравнить пары пиксельно и убедиться, что различия нет за пределами заявленных областей; расположение всех прочих предметов и ракурс идентичны. В Quick режиме показывать 3 отличия из первой пары и 2 из второй.

**Улика станции:** `CLUE 3 — A LONG TAIL`. Hoot: “Look at the shadow! A long tail!”

### STATION 4 — EGYPTIAN CHAMBER (24:00–31:00)

**ТОЛЬКО 2 ЗАДАНИЯ. `Escape the Pyramid` полностью отсутствует:** удалить компонент, маршрут, кнопку, данные и ассеты лабиринта из активной V2 игры. Третья невидимая «задача» здесь НЕ нужна. Красивый добрый 3D-рендер мумии и египетских экспонатов. Teacher: “A friendly mummy needs our help!”

#### S4_T1. Decode the Hieroglyphs — `symbol_choice`

Остаётся интересная механика угадывания слова по иероглифу/картинке. 10 коротких предложений: в тексте слово заменено на качественный символ, по нажатию открываются **3 перемешанных английских слова**, одно правильное. После выбора появляется полное предложение.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
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

**Техническая логика и проверка:** Буквы в квадратных скобках — только для разработки, не показывать их детям: вместо `[SUN]` PNG-солнце. Три словесных дистрактора выбирать по смыслу (например `sun / moon / star`), не всегда правильное слово первое.

#### S4_T2. Mummy’s Wardrobe — Find the Clothes — `clothing_picture_choice`

**Никакого перетаскивания или одевания мумии.** Слева большая дружелюбная 3D-мумия (постоянно видна); справа/внизу **14 отдельных качественных 3D-карточек одежды**, порядок перемешан. На экране `Find the dress.`; ребёнок нажимает на изображение платья.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | Find the dress. | clothes_dress |
| 2 | Find the trousers. | clothes_trousers |
| 3 | Find the hat. | clothes_hat |
| 4 | Find the shoes. | clothes_shoes |
| 5 | Find the scarf. | clothes_scarf |
| 6 | Find the skirt. | clothes_skirt |
| 7 | Find the T-shirt. | clothes_tshirt |
| 8 | Find the jacket. | clothes_jacket |
| 9 | Find the socks. | clothes_socks |
| 10 | Find the boots. | clothes_boots |

**Техническая логика и проверка:** Дистракторы 11–14: `clothes_gloves`, `clothes_shorts`, `clothes_sweater`, `clothes_shirt`. В каждой карточке должен быть **один** вид одежды; чётко различать shoes и boots, shirt и T-shirt, trousers и shorts. Не писать названия на самих картинках; shuffle размещения seeded and persisted.

**Улика станции:** `CLUE 4 — GOLD DUST`. Hoot: “Gold dust! Someone carried something golden through the museum.”

### STATION 5 — LOST & FOUND OFFICE (31:00–38:00)

**Сцена:** уютная музейная комната потерянных вещей. Предметы — чёткие, приятные **3D-рендеры** с прозрачным фоном, без смешанных коллажей и случайных логотипов. Teacher: “Look carefully. Can you remember everything?”

#### S5_T1. What Is Missing? — `memory_hide_one`

Сохранить понравившуюся механику памяти, но полностью сменить предметы на новые красивые 3D. Показывать **все 10 предметов одновременно** 12 секунд, затем на каждом раунде скрывать один (остальные остаются на прежних местах). Ребёнок говорит полное предложение или выбирает исчезнувший предмет из 3–4 картинок.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | What is missing? | memory_yellow_hat |
| 2 | What is missing? | memory_blue_cup |
| 3 | What is missing? | memory_silver_coin |
| 4 | What is missing? | memory_red_star |
| 5 | What is missing? | memory_gold_bell |
| 6 | What is missing? | memory_purple_book |
| 7 | What is missing? | memory_white_glove |
| 8 | What is missing? | memory_green_scarf |
| 9 | What is missing? | memory_red_apple |
| 10 | What is missing? | memory_small_spoon |

**Техническая логика и проверка:** Сет 10 карточек располагается в **перемешанной стабильной сетке 5×2**, а не в порядке скрытия. На раунде конкретная карта исчезает, но затем **восстанавливается** перед следующим. Уникальные цвета соответствуют данным. Ученик должен сказать, например, `The yellow hat is missing.`. Данные `missingAssetId` задаются явно; не полагаться на index положения.

#### S5_T2. Whose Is It? — `owner_item_matching`

10 людей/персонажей и 10 предметов — **не в совпадающем порядке**. Показывать по пять пар на экран, две серии; сопоставление перетаскиванием или двумя кликами. Выбор персонажа открывает дистракторы, правильный предмет фиксируется.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | The artist has got a paintbrush. | owner_artist → item_paintbrush |
| 2 | The explorer has got a map. | owner_explorer → item_map |
| 3 | The king has got a crown. | owner_king → item_crown |
| 4 | The scientist has got a blue bottle. | owner_scientist → item_bottle_blue |
| 5 | The pirate has got a compass. | owner_pirate → item_compass |
| 6 | The guard has got a torch. | owner_guard → item_torch |
| 7 | The cook has got a spoon. | owner_cook → item_spoon |
| 8 | The girl has got a pink ribbon. | owner_girl → item_ribbon_pink |
| 9 | The boy has got a toy dinosaur. | owner_boy → item_toy_dinosaur |
| 10 | The queen has got a golden necklace. | owner_queen → item_necklace_gold |

**Техническая логика и проверка:** В каждой серии и левая, и правая колонки перемешиваются **независимо**; одна рука ребёнка не может угадать по номеру строки. Для проектора не показывать все 20 элементов мелко: 5+5 на одном экране, следующие 5+5 на втором. Преподаватель читает полные английские предложения.

#### S5_T3. The Detective Evidence Board — `true_false`

Красивая 3D-доска расследования. На ней видны 4 уже добытые улики + новая записка, которую дети только что обнаружили среди вещей (пятую улику в блокнот выдать по завершении упражнения). 10 утверждений согласованы с реальными данными, не выдают Pip.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | The footprints are small. | TRUE |
| 2 | The footprints are on the ceiling. | FALSE — on the floor |
| 3 | There is grey fur on the floor. | TRUE |
| 4 | The fur is pink. | FALSE — grey |
| 5 | There is a long tail in the photo. | TRUE |
| 6 | The Moon Key is made of wood. | FALSE — golden |
| 7 | There is gold dust on the stairs. | TRUE |
| 8 | The note says, “I want to help.” | TRUE |
| 9 | The museum window is broken. | FALSE — closed, not broken |
| 10 | The clock is working. | FALSE — stopped |

**Техническая логика и проверка:** До открытия записки в `S5_T3` можно показывать её лицевой стороной вниз; после первого раунда показать текст, так что вопрос 8 основывается на реально показанной улики. Снимки должны соответствовать истине.

**Улика станции:** `CLUE 5 — I WANT TO HELP`. Сохранить в Evidence Notebook без раскрытия имени Pip.

### STATION 6 — THE CLOCK TOWER (38:00–45:00)

**Сцена:** красивые музейные часы 3D с отдельными золотыми цифрами, блестящими шестерёнками и видимым прогрессом восстановления. Teacher: “The clock is broken! Let’s fix it together.”

#### S6_T1. Fix the Giant Clock — `clock_number_placement`

Огромный высокодетализированный **3D-циферблат**. Цифры **10 и 11 уже стоят на месте**. Остальные 10 золотых цифр расположены в произвольном порядке под ним. Предложение по-английски, ребёнок выбирает правильную цифру и указанную ячейку часов.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | Put twelve at the top. | clock_12 → slot_12 |
| 2 | Put six at the bottom. | clock_6 → slot_6 |
| 3 | Put three on the right. | clock_3 → slot_3 |
| 4 | Put nine on the left. | clock_9 → slot_9 |
| 5 | Put one after twelve. | clock_1 → slot_1 |
| 6 | Put two after one. | clock_2 → slot_2 |
| 7 | Put four after three. | clock_4 → slot_4 |
| 8 | Put five after four. | clock_5 → slot_5 |
| 9 | Put seven after six. | clock_7 → slot_7 |
| 10 | Put eight after seven. | clock_8 → slot_8 |

**Техническая логика и проверка:** Часовая разметка строго по стандарту: 12 сверху, 3 справа, 6 снизу, 9 слева, остальные шаг 30°. Клик по токену и затем по слоту; drag/drop как бонус. В Quick режиме после шести вопросов можно показать правильное автозаполнение остальных четырёх с честной отметкой `autoFilled`, не начислять за них XP.

#### S6_T2. Repair the Broken Sentences — `grammar_choice_clock_build`

Сохранить понравившееся упражнение. Для каждого предложения ученик выбирает правильное слово из 2–3 кнопок; **каждый правильный ответ физически восстанавливает механизм часов**. Кнопка преподавателя позволяет проиграть последнюю анимацию повторно.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
| 1 | There ___ a key in the box. | is (choices: is / are) |
| 2 | There ___ three doors in the hall. | are (choices: is / are) |
| 3 | The cat is ___ the table. | under (choices: under / above; show cat-under-table image) |
| 4 | The dinosaur ___ got a long tail. | has (choices: has / have) |
| 5 | The paintings ___ moving. | are (choices: is / are) |
| 6 | The mummy is ___ a hat. | wearing (choices: wearing / wear) |
| 7 | The owl ___ fly. | can (choices: can / can’t) |
| 8 | The mouse is ___ the clock. | behind (choices: behind / on; use generic silhouette behind clock, no Pip reveal) |
| 9 | ___ there two lamps? | Are (choices: Is / Are) |
| 10 | The clock ___ working. | isn’t (choices: isn’t / aren’t) |

**Техническая логика и проверка:** **10 визуальных стадий сборки**, сохраняемые в `clockAssemblyStage`: 1 большая шестерня, 2 вторая шестерня, 3 третья, 4 ось, 5 пружина, 6 минутная стрелка, 7 часовая стрелка, 8 светящиеся цифры, 9 циферблат поворачивается на небольшую дугу и встаёт прямо, 10 часы заводятся и начинают тикать. Каждый компонент отдельным слоем PNG с заранее заданным `z-index`, `transform-origin`, анимацией вращения 0.5–0.8s. В Quick режиме показывать **6 основных предложений**, а для оставшихся стадий применить отдельный `Finish clock` с явным авто-восстановлением, не имитируя, что дети решили 10 пунктов. При Back/Continue верная стадия и заполненные компоненты должны восстанавливаться точно.

#### S6_T3. Who Took the Moon Key? — `suspect_deduction`

Пять **милых качественных 3D-подозреваемых**: Owl, Cat, Bat, Fox, Grey Mouse (сначала **не показывать Pip с золотым ключом**). Дети читают выводы детектива, нажимают TRUE/FALSE и исключают варианты. После последнего раунда выбирают мышь и только потом раскрывают Pip.

| № | Текст на экране (English) | Правильный ответ / asset ID |
|---|---|---|
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

**Техническая логика и проверка:** Признаки стабильны: owl/bat имеют крылья; cat имеет треугольные уши; fox рыжий и с пушистым хвостом; grey mouse серый, маленький, с длинным тонким хвостом и круглыми ушами. Grey Mouse до финала — обычный подозреваемый БЕЗ ключа, имени и красного шарфа; после подтверждения `grey_mouse` отобразить отдельно `pip_mouse_v2.png`, дружелюбного 3D-мышонка в мягких пропорциях, с ключом. Никаких страшных зубов, злых глаз или мрачного металла.

**Улика станции:** `CLUE 6 — PIP AND THE MOON KEY`, выдаётся только **после** выбора `grey_mouse`, не перед расследованием.

## 7. Финал (45:00–50:00)

1. **Reveal (1 мин)** — распахиваются часы, появляется новый милый 3D Pip (рекомендация: пухлый серый мышонок, округлые уши, добрые глаза, небольшой красный шарф; миниатюрные латунные детали, не робот-страшилка). `Pip: “I took the Moon Key because I wanted to fix the clock. I’m sorry!”`
2. **Fix the Clock (1 мин)** — дети указывают, куда вставить Moon Key. Учитель нажимает настоящую кнопку `START THE CLOCK`, появляется мягкая анимация света и движения стрелок.
3. **Speaking (2 мин)** — 5 устных вопросов: `Who took the Moon Key?`, `Why did he take it?`, `Where did you find the grey fur?`, `What clothes did you see?`, `Which room did you like best?`. Возможны короткие ответы A1, носитель моделирует полное предложение.
4. **Congratulations (1 мин)** — `CASE CLOSED! YOU ARE GREAT MUSEUM DETECTIVES!`, шесть улик в блокноте, красивая рамка сертификата/бейджа, меню `START AGAIN` / `HOME`.

**Главное:** итог истории — не наказание мышонка; объяснить простыми фразами, что он хотел помочь.

## 8. Точная спецификация новых ассетов — ИЗГОТОВИТЬ ПОСЛЕ УТВЕРЖДЕНИЯ MD

**В этом этапе ассеты ещё не созданные.** Названия ниже — **контракт для будущей генерации и для ссылок в Codex**, не утверждение о наличии файлов. Все новые файлы добавлять в `public/assets/museum/v2/`; не перезаписывать старые файлы, пока новая игра не проверена. Окончательное применение V2 выполняется импортом `assetManifestV2.ts`.

**Качество:**
- Персонажи и самостоятельные предметы: отдельные, не обрезанные **PNG с реальным alpha-каналом**, приоритет 1024×1024 или не меньше 768px по большей стороне (для мелких props минимум 512px). Один предмет = один файл. Убраны белые/чёрные прямоугольные фоны, названия в изображении, рамки из исходного листа.
- Фоны залов: минимум 1920×1080 (16:9), без встроенных текстов, без интерфейсных прямоугольных блоков. Зона для UI заранее продумана, главный объект не закрывается текстом.
- Единство изображений: богатый тёплый 3D-cartoon рендер, мягкие материалы, дружелюбные эмоции, сдержанная палитра золотой/фиолетовый/бордо/лазурный.
- Картинки для *Spot the Difference*: одна базовая 3D-сцена + 5 аккуратных PNG-слоёв изменений на каждую пару. Не вырезать куски из чужих неидентичных изображений и не создавать пару независимыми промптами.
- В окончательном экспорте **каждый** asset совпадает с названием и реально подходит для задания. `triceratops` действительно 3 рога, `stars_three` действительно 3 звезды, `flowers_two` — 2 цветка, `trousers` — брюки, не шорты.

### 8.1 Backgrounds — full-screen

```text
backgrounds/security_hall_clean.jpg
backgrounds/dinosaur_gallery_3d.jpg
backgrounds/living_paintings_gallery_3d.jpg
backgrounds/egyptian_chamber_3d.jpg
backgrounds/lost_found_office_3d.jpg
backgrounds/clock_tower_3d.jpg
backgrounds/museum_intro_3d.jpg
backgrounds/museum_finale_3d.jpg
```

### 8.2 Main characters / suspects
```text
characters/professor_hoot_3d.png
characters/pip_mouse_v2.png
characters/mummy_friendly_3d.png
characters/suspect_owl_3d.png
characters/suspect_cat_3d.png
characters/suspect_bat_3d.png
characters/suspect_fox_3d.png
characters/suspect_grey_mouse_3d.png
```

### 8.3 Ticket Machine — ровно 10 уникальных портретов
```text
visitors/visitor_red_cap_boy.png
visitors/visitor_green_dress_girl.png
visitors/visitor_black_hat_man.png
visitors/visitor_yellow_bag_woman.png
visitors/visitor_blue_shoes_boy.png
visitors/visitor_purple_jacket_girl.png
visitors/visitor_glasses_man.png
visitors/visitor_red_umbrella_woman.png
visitors/visitor_orange_tshirt_boy.png
visitors/visitor_pink_scarf_girl.png
```

### 8.4 Dinosaur Body Parts — ровно 10 самостоятельных карточек
```text
dinosaurs/parts/dino_part_head.png
dinosaurs/parts/dino_part_tail.png
dinosaurs/parts/dino_part_leg.png
dinosaurs/parts/dino_part_foot.png
dinosaurs/parts/dino_part_arm.png
dinosaurs/parts/dino_part_teeth.png
dinosaurs/parts/dino_part_horn.png
dinosaurs/parts/dino_part_neck.png
dinosaurs/parts/dino_part_body.png
dinosaurs/parts/dino_part_claw.png
```

### 8.5 Dinosaurs + действия
```text
dinosaurs/characters/t_rex.png
dinosaurs/characters/triceratops.png
dinosaurs/characters/brachiosaurus.png
dinosaurs/actions/dino_running_red.png
dinosaurs/actions/dino_drinking_green.png
dinosaurs/actions/dino_sleeping_blue.png
dinosaurs/actions/dino_eating_yellow.png
dinosaurs/actions/dino_jumping_orange.png
dinosaurs/actions/dino_hiding_purple.png
dinosaurs/actions/dino_playing_ball.png
dinosaurs/actions/dino_walking_big.png
dinosaurs/actions/dino_baby_nest.png
dinosaurs/actions/dino_looking_bird_brown.png
```

### 8.6 Repair Paintings, matching, controlled differences
```text
paintings/village_empty_3d.jpg
paintings/castle_empty_3d.jpg
paintings/props/sun.png
paintings/props/blue_bird.png
paintings/props/cat.png
paintings/props/flowers_two.png
paintings/props/boat.png
paintings/props/moon.png
paintings/props/owl.png
paintings/props/red_flag.png
paintings/props/stars_three.png
paintings/props/dragon_small.png
professions/artist_3d.png
professions/scientist_3d.png
professions/teacher_3d.png
professions/swimmer_3d.png
professions/actions/skill_paint_picture.png
professions/actions/skill_draw_cat.png
professions/actions/skill_mix_colours.png
professions/actions/skill_experiment.png
professions/actions/skill_microscope.png
professions/actions/skill_stars.png
professions/actions/skill_teach_english.png
professions/actions/skill_write_board.png
professions/actions/skill_swim_pool.png
professions/actions/skill_swim_goggles.png
differences/gallery_1_base.png
differences/gallery_2_base.png
differences/overlays/gallery_1_hat_moon.png
differences/overlays/gallery_1_collar_blue.png
differences/overlays/gallery_1_waterfall.png
differences/overlays/gallery_1_lamp_purple.png
differences/overlays/gallery_1_sunflower.png
differences/overlays/gallery_2_crescent_moon.png
differences/overlays/gallery_2_blue_flag.png
differences/overlays/gallery_2_blue_bird.png
differences/overlays/gallery_2_three_stars.png
differences/overlays/gallery_2_book_star.png
```
**Две пары A/B собираются в runtime из base + overlays.** Финальный Screenshot для печати можно экспортировать в JPG только после верификации A/B. Количество отличий остаётся строго 5+5.

### 8.7 Egyptian props and wardrobe
```text
egypt/hieroglyphs/sun.png
egypt/hieroglyphs/cat.png
egypt/hieroglyphs/snake.png
egypt/hieroglyphs/boat.png
egypt/hieroglyphs/moon.png
egypt/hieroglyphs/bird.png
egypt/hieroglyphs/crown.png
egypt/hieroglyphs/star.png
egypt/hieroglyphs/eye.png
egypt/hieroglyphs/key.png
egypt/clothes/clothes_dress.png
egypt/clothes/clothes_trousers.png
egypt/clothes/clothes_hat.png
egypt/clothes/clothes_shoes.png
egypt/clothes/clothes_scarf.png
egypt/clothes/clothes_skirt.png
egypt/clothes/clothes_tshirt.png
egypt/clothes/clothes_jacket.png
egypt/clothes/clothes_socks.png
egypt/clothes/clothes_boots.png
egypt/clothes/clothes_gloves.png
egypt/clothes/clothes_shorts.png
egypt/clothes/clothes_sweater.png
egypt/clothes/clothes_shirt.png
```

### 8.8 Memory, owner matching, evidence
```text
memory/memory_yellow_hat.png
memory/memory_blue_cup.png
memory/memory_silver_coin.png
memory/memory_red_star.png
memory/memory_gold_bell.png
memory/memory_purple_book.png
memory/memory_white_glove.png
memory/memory_green_scarf.png
memory/memory_red_apple.png
memory/memory_small_spoon.png
owners/owner_artist.png
owners/owner_explorer.png
owners/owner_king.png
owners/owner_scientist.png
owners/owner_pirate.png
owners/owner_guard.png
owners/owner_cook.png
owners/owner_girl.png
owners/owner_boy.png
owners/owner_queen.png
owners/items/item_paintbrush.png
owners/items/item_map.png
owners/items/item_crown.png
owners/items/item_bottle_blue.png
owners/items/item_compass.png
owners/items/item_torch.png
owners/items/item_spoon.png
owners/items/item_ribbon_pink.png
owners/items/item_toy_dinosaur.png
owners/items/item_necklace_gold.png
evidence/small_footprints.png
evidence/grey_fur.png
evidence/long_tail.png
evidence/gold_dust.png
evidence/helpful_note.png
evidence/pip_with_key.png
```

### 8.9 Clock, progress states, buttons
```text
clock/clock_face_3d.png
clock/clock_hand_hour.png
clock/clock_hand_minute.png
clock/clock_hand_second.png
clock/clock_gold_gear_01.png
clock/clock_gold_gear_02.png
clock/clock_gold_gear_03.png
clock/clock_axle.png
clock/clock_spring.png
clock/clock_digit_01.png ... clock/clock_digit_12.png
clock/clock_keyhole.png
ui/button_start.png
ui/button_continue.png
ui/button_start_again.png
ui/button_next.png
ui/button_back.png
ui/button_repeat.png
ui/button_skip.png
ui/button_home.png
ui/evidence_notebook.png
ui/progress_bar.png
ui/clue_frame.png
```
Цифры создавать из одного проверенного 3D-шаблона с фактическими знаками 1–12, **не генерировать надписи случайно AI**; можно создать один красивый пустой диск PNG, а числа вывести настоящим HTML-текстом поверх (предпочтительно: 100% верное написание). Для кнопок аналогично: красивые пустые плашки + HTML-лейбл обеспечивают безошибочный английский текст. 

## 9. Архитектура для Codex, удаление старой логики и готовность к интеграции

**Стек:** Vite + React + TypeScript + CSS modules (или vanilla CSS). React Router необязателен, если реализован конечный автомат экранов. Data-driven упражнения; изображение и ответ привязаны через ID. Офлайн-работа после локального запуска, без backend.

**Новые/обновлённые модули:**
```text
src/
  App.tsx
  data/museumGameV2.ts
  data/assetManifestV2.ts
  data/differenceHotspotsV2.ts
  state/useMuseumSession.ts
  components/MainMenu.tsx
  components/MuseumMap.tsx
  components/TeacherControls.tsx
  components/EvidenceNotebook.tsx
  components/ShufflePictureGrid.tsx
  components/ClockAssembly.tsx
  games/SecurityCheck.tsx
  games/FlashlightFind.tsx
  games/TicketMachine.tsx
  games/DinoBodyPartChoice.tsx
  games/DinoWhoAmI.tsx
  games/MovingDinoChoice.tsx
  games/RepairPaintings3D.tsx
  games/ProfessionsMatching.tsx
  games/ControlledSpotDifference.tsx
  games/Hieroglyphs.tsx
  games/MummyWardrobe.tsx
  games/MemoryMissing.tsx
  games/OwnerMatching.tsx
  games/EvidenceBoard.tsx
  games/ClockNumbers.tsx
  games/GrammarClockAssembly.tsx
  games/SuspectDeduction.tsx
public/assets/museum/v2/ ...            # будущие ассеты после отдельной поставки
```

**Удалить из активной игры:** `BuildDinosaurSkeleton`, `EscapePyramidMaze`, старые moving-dinosaur collage, Talking Portraits, Dress-Up drag mechanics, старые SpotDifference PNG, устаревшую V1 логику подсчёта `6*3*10`. Сама папка V1 может оставаться в архиве до ручного удаления, но импортов из неё не должно быть.

**Данные задач:** 6 `station` объектов с числом `tasks` **[3,3,3,2,3,3]** и всеми 170 `question` объектами. Вопросы должны содержать текст из таблиц 1:1, не создавайте новую фантазийную лексику вместо заданной. У каждого ID одна валидная цель. Указанные пути PNG в этом MD являются ***ожидаемыми*** файлами будущего этапа, а не реальными файловыми путями текущего проекта; `assetManifestV2` можно заполнять значениями `required: true, status:'pending'` до импорта будущего архива.

**Порядок разработки:**
1. Сначала обновить модель данных, маршруты и проверки (без изменения работающих экранов V1, пока тест не пройден).
2. Реализовать Home/Continue/Start Again + сохранения; тест перезагрузки.
3. Реализовать 17 игровых механик с dataset этого документа и временными **служебными** карточками в dev-mode.
4. Настроить 50-минутный режим Quick, 6 улик, финальное раскрытие Pip, прогрессивную сборку часов.
5. Затем, **отдельным последующим этапом**, подключить новые PNG, не меняя вопросный датасет и корректные IDs.
6. Убрать все dev placeholders, заменить плохие V1 ассеты, проверить проекцию и конечный сценарий.

**Файл запуска:** `README_RUN_V2.md`: `npm install`, `npm run dev`, `npm run build`; пример порядка действий для преподавателя. Не нужна принудительная регистрация / интернет.

## 10. Автотесты и приемка: без них игру не считать завершённой

**Данные/механики:**
- [ ] **Ровно 6 станций**, количество заданий по станциям `[3,3,3,2,3,3]`, всего **17**, `10` раундов в каждом, всего **170**. Ни `Escape the Pyramid`, ни `Build the Dinosaur` как drag-drop скелет не активны.
- [ ] `S1_T3`: 10 реально красивых 3D-портретов, карточки в случайном порядке; тест, что правильный вариант НЕ всегда стоит на предсказуемом индексе. Случайный порядок сохраняется при `Continue`.
- [ ] `S2_T1`: выбор по `Find the head` и т. д.; никакой сборки скелета.
- [ ] `S2_T2`: у трицератопса три рога, он выглядит единообразно с T-Rex и Brachiosaurus.
- [ ] `S2_T3`: 10 картинок с **действительно разными** действиями; соответствие цветам, глаголам и ответам.
- [ ] `S3_T1`: **2 качественные 3D-картины × 5 переносимых предметов**; в quick обязательно показываются обе сцены.
- [ ] `S3_T2`: 4 профессии, 10 действий, правильное множество связей 3/3/2/2, независимо перемешанные карточки.
- [ ] `S3_T3`: две **одинаково построенные** A/B пары, ровно 5 различий в каждой; неверные зоны не дают очков, повторный клик не засчитывается.
- [ ] `S4_T2`: клик по одежде (10 запрошенных + 4 дистрактора), мумия **не одевается**.
- [ ] `S5_T1`: 10 чётких предметов, всегда исчезает ровно один, **стабильная** раскладка, проверка по ID.
- [ ] `S6_T1`: 10 красивых цифровых дисков, 10 и 11 уже на месте, расположение соответствует циферблату.
- [ ] `S6_T2`: ровно **10** визуальных стадий сборки часов; после ответа #1 видна первая, после #10 работает весь механизм; состояние сохраняется после reload/Continue.
- [ ] `S6_T3`: 5 добрых подозреваемых; финальный Pip не раскрыт до последнего выбора.

**Навигация/урок:**
- [ ] После нового запуска `START`; после закрытия вкладки → `CONTINUE` открывает ту же станцию, задачу, вопрос и расположение картинок.
- [ ] `START AGAIN` предупреждает об удалении старой сессии, `CANCEL` ничего не меняет; начало нового урока сбрасывает только V2-сессию.
- [ ] `HOME/BACK/REPEAT/SKIP/MUTE` работают; повторный правильный ответ не удваивает XP.
- [ ] В режиме QUICK можно провести урок **ровно за 50 минут**, включая улики и 5-минутный финал; FULL содержит все раунды.
- [ ] Все 6 улик выдаются строго в сюжете, Evidence Notebook заполняется и остаётся заполненным при reload.
- [ ] Ни одной несуществующей картинки на финальной странице; для pending assets в DEV ясно сообщается нужное имя, но в финальной сборке все пути существуют.

**Качество:**
- [ ] Никаких обрезанных голов/лап/предметов, растровых надписей из коллажа, неуместных прямоугольников справа, размытых изображений на full HD, страшных персонажей.
- [ ] Варианты выбора на экране идут **вразнобой**, не по номерам вопросов. UI читается с задней парты.
- [ ] Аудирование работает без обязательного микрофона или внешних сервисов; преподаватель способен управлять одним компьютером.
- [ ] `npm run build` завершается без ошибок; в браузере не появляется `undefined`, `404`, React exception или console error.

## 11. Реплики учителя (для носителя)

**Opening / Hoot:** “Welcome, detectives! The Moon Key is missing and our museum clock has stopped. Can you help me? We have six rooms to explore!”

**Main classroom instructions:** “Look carefully.” · “Read the sentence.” · “Which picture is correct?” · “Point to the right one.” · “Say it in a full sentence.” · “Good try — have another look!” · “Can you explain your choice?” · “We’ve found another clue!”

**Station intros:**
- Security Hall: “Let’s check the cameras and find our visitors.”
- Dinosaur Gallery: “Look! The dinosaurs are alive. What can you see?”
- Living Paintings: “Help us repair the paintings and match the jobs.”
- Egyptian Chamber: “Decode the symbols. Find the clothes.”
- Lost & Found: “What is missing? Who does it belong to?”
- Clock Tower: “Fix the numbers, repair the gears and solve the mystery!”

**Final Pip dialogue:** “I took the Moon Key because I wanted to fix the clock. I’m sorry!”

**Hoot:** “You solved the mystery! The clock works again. You are great detectives!”

---

**Готовность V2 MD:** этот документ — полная спецификация изменений и данных для 17 игр. **Следующий отдельный этап после этого MD — генерация и проверка PNG-ассетов** строго по разделу 8, с индивидуальными английскими именами файлов для Codex. Не генерировать превью-лист вместо самостоятельных файлов.

