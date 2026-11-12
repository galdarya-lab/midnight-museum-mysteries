"""Extract the 170 approved student-facing prompts from MD V2, with explicit IDs."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
md = (ROOT / 'The_Midnight_Museum_Mysteries_CODEX_V2.md').read_text(encoding='utf-8')
legacy = json.loads((ROOT / 'gameData.json').read_text(encoding='utf-8'))
hot = json.loads((ROOT / 'src/data/differenceHotspotsV2.json').read_text(encoding='utf-8'))
manifest = json.loads((ROOT / 'src/data/assetManifestV2.json').read_text(encoding='utf-8'))
paths = {Path(a['path']).stem: a.get('assetId', a['path'].split('/v2/')[1].rsplit('.', 1)[0]) for a in manifest['assets']}
tasks = {
 'S1_T1': ('Security Camera Check','true_false', [True,False,True,True,False,True,True,False,False,True]),
 'S1_T2': ('Magic Flashlight','find_object','ticket_red hat_blue torch_yellow backpack_green key_silver book_brown glove_white umbrella_purple camera_black ball_orange'.split()),
 'S1_T3': ('The Ticket Machine','portrait_match','visitor_red_cap_boy visitor_green_dress_girl visitor_black_hat_man visitor_yellow_bag_woman visitor_blue_shoes_boy visitor_purple_jacket_girl visitor_glasses_man visitor_red_umbrella_woman visitor_orange_tshirt_boy visitor_pink_scarf_girl'.split()),
 'S2_T1': ('Find the Dinosaur Body Part','picture_choice_10',['dino_part_'+x for x in 'head tail leg foot arm teeth horn neck body claw'.split()]),
 'S2_T2': ('Who Am I? Dinosaur Edition','choice_3','t_rex triceratops brachiosaurus triceratops t_rex brachiosaurus t_rex triceratops brachiosaurus t_rex'.split()),
 'S2_T3': ('The Moving Dinosaurs','picture_choice_10','dino_running_red dino_drinking_green dino_sleeping_blue dino_eating_yellow dino_jumping_orange dino_hiding_purple dino_playing_ball dino_walking_big dino_baby_nest dino_looking_bird_brown'.split()),
 'S3_T1': ('Repair the Paintings','drag_drop','sun blue_bird cat flowers_two boat moon owl red_flag stars_three dragon_small'.split()),
 'S3_T2': ('Professions & Skills Matching','profession_match','artist artist artist scientist scientist scientist teacher teacher swimmer swimmer'.split()),
 'S3_T3': ('Spot the Difference','spot_difference',[h['id'] for p in hot.values() for h in p['changes']]),
 'S4_T1': ('Decode the Hieroglyphs','symbol_choice','sun cat snake boat moon bird crown star eye key'.split()),
 'S4_T2': ('Mummy’s Wardrobe — Find the Clothes','clothing_choice',['clothes_'+x for x in 'dress trousers hat shoes scarf skirt tshirt jacket socks boots'.split()]),
 'S5_T1': ('What Is Missing?','memory',['memory_'+x for x in 'yellow_hat blue_cup silver_coin red_star gold_bell purple_book white_glove green_scarf red_apple small_spoon'.split()]),
 'S5_T2': ('Whose Is It?','owner_match',['item_'+x for x in 'paintbrush map crown bottle_blue compass torch spoon ribbon_pink toy_dinosaur necklace_gold'.split()]),
 'S5_T3': ('The Detective Evidence Board','true_false',[True,False,True,False,True,False,True,True,False,False]),
 'S6_T1': ('Fix the Giant Clock','clock_placement',[12,6,3,9,1,2,4,5,7,8]),
 'S6_T2': ('Repair the Broken Sentences','multiple_choice',['is','are','under','has','are','wearing','can','behind','Are','isn’t']),
 'S6_T3': ('Who Took the Moon Key?','true_false',[True,True,True,False,False,True,False,True,True,True]),
}
skills=['skill_'+x for x in 'paint_picture draw_cat mix_colours experiment microscope stars teach_english write_board swim_pool swim_goggles'.split()]
owners=['owner_'+x for x in 'artist explorer king scientist pirate guard cook girl boy queen'.split()]
clues='small_footprints grey_fur long_tail gold_dust helpful_note pip_with_key'.split()
data={k:v for k,v in legacy.items() if k!='stations'}
data.update(schemaVersion=2, stations=[], title='The Midnight Museum Mysteries V2')
sections=dict(re.findall(r'#### (S\d_T\d)\.([^#]+?)(?=\n###|\n##|\Z)',md,re.S))
for si,old in enumerate(legacy['stations']):
 s={k:v for k,v in old.items() if k!='tasks'}
 s.update(id=f'S{si+1}',tasks=[],clueAsset='evidence/'+clues[si])
 for tid,(title,mechanic,answers) in tasks.items():
  if not tid.startswith(f'S{si+1}_'): continue
  prompts=re.findall(r'^\|\s*\d+\s*\|\s*(.*?)\s*\|',sections[tid],re.M)
  assert len(prompts)==10,(tid,len(prompts))
  t=dict(id=tid,title=title,mechanic=mechanic,coreQuestionIds=[1,2,3,6,7] if tid in ['S3_T1','S3_T3'] else [1,2,3,4,5,6],questions=[])
  options=list(dict.fromkeys(answers))
  if tid=='S4_T2': options+=['clothes_'+x for x in ['gloves','shorts','sweater','shirt']]
  for i,(prompt,correct) in enumerate(zip(prompts,answers)):
   q=dict(id=f'{tid}_Q{i+1:02}',index=i+1,prompt=prompt,correct=correct,correctId=correct,options=options,assetId=None,feedbackText='That’s right! Fantastic detective work!')
   if isinstance(correct,bool):
    q['correctBoolean']=correct
    q['assetId']='backgrounds/security_hall_clean' if tid=='S1_T1' else 'characters/suspect_grey_mouse_neutral_3d' if tid=='S6_T3' else ['evidence/small_footprints','evidence/small_footprints','evidence/grey_fur','evidence/grey_fur','evidence/long_tail','evidence/gold_dust','evidence/gold_dust','evidence/helpful_note','backgrounds/security_hall_clean','clock/clock_face_3d'][i]
   elif tid=='S1_T2':q['assetId']='props/'+correct
   elif tid=='S3_T1':q.update(assetId='paintings/props/'+correct,scene='village' if i<5 else 'castle',targetId=['sky_above_house','tree','under_bench','in_front_house','lake','sky_above_castle','roof','tower','sky','behind_castle'][i])
   elif tid=='S3_T2':q.update(assetId='professions/actions/'+skills[i],skillId=skills[i],correctOwner=correct,prompt=prompt)
   elif tid=='S3_T3':q.update(pairId='gallery_1' if i<5 else 'gallery_2',assetId='differences/'+('gallery_1_base' if i<5 else 'gallery_2_base'))
   elif tid=='S4_T1':q['assetId']='egypt/hieroglyphs/'+correct
   elif tid=='S5_T2':q.update(correctOwner=owners[i],correctItem=correct,assetId='owners/items/'+correct)
   elif tid=='S6_T1':q.update(assetId=f'clock/clock_digit_{correct:02}',targetId='slot_'+str(correct))
   elif tid=='S6_T2':q.update(choices=[['is','are'],['is','are'],['under','above'],['has','have'],['is','are'],['wearing','wear'],['can','can’t'],['behind','on'],['Is','Are'],['isn’t','aren’t']][i],assetId='clock/clock_face_3d')
   else:q['assetId']=paths[correct]
   if tid=='S5_T1':q['missingAssetId']=correct
   t['questions'].append(q)
  s['tasks'].append(t)
 data['stations'].append(s)
assert sum(len(t['questions']) for s in data['stations'] for t in s['tasks'])==170
(ROOT/'src/data/museumGameV2.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print('V2: extracted 170 exact prompts into src/data/museumGameV2.json')
