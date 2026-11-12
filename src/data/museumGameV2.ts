import data from './museumGameV2.json';
export interface MuseumQuestion {
  id: string; index: number; prompt: string; correctId: string | number | boolean;
  options: (string | number | boolean)[]; assetId: string | null; feedbackText: string;
}
export const museumGameV2 = data;
