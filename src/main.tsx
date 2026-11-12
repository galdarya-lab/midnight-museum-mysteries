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

// GitHub Pages serves project sites under /repository/; local and Sites builds
// keep the default /. Resolve public assets using the same base as Vite's JS.
const hostedAssets = Object.fromEntries(Object.entries(museumV2Assets).map(([id, url]) => [id, import.meta.env.BASE_URL + url.replace(/^\//, '')]));
Object.assign(window, {GAME_DATA: museumGameV2, ASSETS: {...hostedAssets,...createProceduralAssets()}, PAINTING_LAYOUT:paintingLayout, HOTSPOTS: hotspots, MuseumSession: session});
createRoot(document.getElementById('root')!).render(<App/>);
