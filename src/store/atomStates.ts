import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type GridType = number[][];

export const PickCell = atom<[number, number]>([100, 100]);
export const Grid = atomWithStorage<GridType>("grid", []);
export const InitGrid = atomWithStorage<GridType>("InitGrid", []);
export const guessedWord = atomWithStorage<string>("guessedWord", "initWord");
export const lattersUsed = atomWithStorage<string>("lattersUsed", "");
