import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { museumGameV2 } from './data/museumGameV2';
import { museumV2Assets } from './data/assetManifestV2';
import hotspots from './data/differenceHotspotsV2.json';
import paintingLayout from './data/paintingLayoutV2.json';
import * as session from './state/session';
import '../style.css';
import '../scenes.js';
import { createProceduralAssets } from './proceduralAssets';

Object.assign(window, {GAME_DATA: museumGameV2, ASSETS: {...museumV2Assets,...createProceduralAssets()}, PAINTING_LAYOUT:paintingLayout, HOTSPOTS: hotspots, MuseumSession: session});
createRoot(document.getElementById('root')!).render(<App/>);
