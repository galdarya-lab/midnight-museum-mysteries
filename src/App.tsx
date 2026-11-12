import { useEffect } from 'react';
export function App() {
  useEffect(()=>{import('../game.js');},[]);
  return <><div id="app"/><dialog id="modal"/></>;
}
