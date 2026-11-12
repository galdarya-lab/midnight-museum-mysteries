import { museumGameV2 } from '../data/museumGameV2';
export const SAVE_KEY = 'midnightMuseum:v2:save';
export function freshSession() {
  return { schemaVersion: 2, sessionId: crypto.randomUUID(), started: false,
    screen: 'intro', station: 0, task: 0, index: 0, mode: 'Quick', mute: false,
    paused: true, elapsed: 0, clues: [], correct: {}, skipped: {}, attempted: {},
    visited: {}, bonus: {}, tileOrders: {}, questionOrders: {}, placedItems: {},
    autoFilled: [], clockAssemblyStage: 0, clockAutoFinished: false,
    evidenceNotebookOpen: false, completed: false, suspect: false,
    recap: 0, keyInserted: false, clockStarted: false,
    resumeRoute: null, selection: null, selectedOwner: null, memory: null };
}
const screens = ['intro','museum_map','station_intro','task','task_complete','station_clue','reveal','victory'];
export function validateSession(value: any) {
  if (!value || value.schemaVersion !== 2 || typeof value.sessionId !== 'string') return false;
  const stations = museumGameV2.stations;
  if (!Number.isInteger(value.station) || !stations[value.station]) return false;
  const tasks = stations[value.station].tasks;
  if (!Number.isInteger(value.task) || !tasks[value.task]) return false;
  if (!Number.isInteger(value.index) || value.index < 0 || value.index >= 10) return false;
  if (!screens.includes(value.screen) || !['Quick','Full'].includes(value.mode)) return false;
  if (!Number.isFinite(value.elapsed) || value.elapsed < 0) return false;
  if (!Array.isArray(value.clues) || value.clues.some((n: number)=>!Number.isInteger(n)||n<0||n>5)) return false;
  if (!Number.isInteger(value.clockAssemblyStage) || value.clockAssemblyStage<0 || value.clockAssemblyStage>10) return false;
  const questionIds=new Set(stations.flatMap(s=>s.tasks.flatMap(t=>t.questions.map(q=>q.id))));
  for(const name of ['correct','skipped','attempted']) {
    if (!value[name] || typeof value[name]!=='object' || Array.isArray(value[name])) return false;
    if(Object.keys(value[name]).some(id=>!questionIds.has(id))) return false;
  }
  if (value.resumeRoute) {
    const r=value.resumeRoute;
    if(!screens.includes(r.screen)||!Number.isInteger(r.station)||!stations[r.station]||!Number.isInteger(r.task)||!stations[r.station].tasks[r.task]||!Number.isInteger(r.index)||r.index<0||r.index>=10) return false;
  }
  const taskIds=new Set(stations.flatMap(s=>s.tasks.map(t=>t.id)));
  if(value.route?.taskId && !taskIds.has(value.route.taskId))return false;
  if(value.questionOrders && Object.keys(value.questionOrders).some(id=>!taskIds.has(id)))return false;
  if(value.screen==='reveal' || value.screen==='victory')if(!value.suspect)return false;
  if(value.clues.includes(5)&&!value.suspect)return false;
  return true;
}
export function loadSession() {
  try {const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');
    return validateSession(saved) ? {...freshSession(),...saved} : null;
  }catch {return null;}
}
export function shuffled(values: any[], seed: string) {
  const out=[...values]; let hash=2166136261;
  for(const ch of seed)hash=Math.imul(hash^ch.charCodeAt(0),16777619)>>>0;
  const random=()=>{hash=(Math.imul(hash,1664525)+1013904223)>>>0;return hash/4294967296;};
  for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
  if(out.length>1&&out.every((v,i)=>v===values[i]))out.push(out.shift());
  return out;
}
