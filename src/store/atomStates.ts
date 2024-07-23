/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type GridType = number[][];

// sudoku
export const PickCell = atom<[number, number]>([100, 100]);
export const Grid = atomWithStorage<GridType>("grid", []);
export const InitGrid = atomWithStorage<GridType>("InitGrid", []);

// hangman

export const guessedWord = atomWithStorage<string>("guessedWord", "initWord");
export const lattersUsed = atomWithStorage<string>("lattersUsed", "");

// wordle

export const wordleGuesses = atomWithStorage<string[]>(
  "wordleGuesses",
  Array(6).fill(""),
);

export const currentGuess = atomWithStorage<string>("currentGuess", "");
export const guessNumber = atomWithStorage<number>("guessNumber", 0);
export const hasWon = atomWithStorage<boolean>("hasWon", false);
export const wordleWordToGuess = atomWithStorage<string>(
  "wordleWordToGuess",
  "",
);
