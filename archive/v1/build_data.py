"""Rebuild the offline data bundle after editing the supplied JSON files."""
import json
from pathlib import Path

sources = {'GAME_DATA': 'gameData.json', 'ASSETS': 'assetManifest.json', 'HOTSPOTS': 'differenceHotspots.json'}
Path('data.js').write_text('\n'.join('window.' + key + ' = ' + json.dumps(json.loads(Path(file).read_text(encoding='utf-8')), ensure_ascii=True) + ';' for key, file in sources.items()), encoding='utf-8')
