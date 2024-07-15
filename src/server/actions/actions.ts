/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import { copyGrid } from "~/utils/utilFunctions";
import { Sudoku } from "../sudukuLogic/sudoku";

export async function myAction(action: string, grid: number[][]) {
  const sudoku = new Sudoku();
  switch (action.toLowerCase()) {
    case "create":
      // let sudoku = new Sudoku();
      console.log("creating...");
      const game = (await sudoku.puzzle) as number[][];
      return {
        game: game,
        status: "NEW GAME-ENJOY",
        init: true,
      };

    case "solve":
      console.log("solving...");

      const puzzle = [] as number[][];
      copyGrid(grid, puzzle);
      // let sudoku = new Sudoku(puzzle);
      const solution = sudoku.isSolvable();
      console.log("solution", solution);
      let solvedSudoku;
      let status;
      if (solution) {
        solvedSudoku = sudoku.solvedPuzzle;
        status = "** SOLVED **";
      } else {
        solvedSudoku = grid;
        status = "** UNSOLVABLE **";
      }
      return { game: solvedSudoku, status: status };

    case "validate":
      try {
        console.log("validating...");
        const puzzle = [] as number[][];
        copyGrid(grid, puzzle);
        const sudokuToSolve = new Sudoku(puzzle);
        const status = sudokuToSolve.validate();
        const puzzleStatus = status ? "**SOLVED**" : "**UNSOLVED**";
        return Promise.resolve({ game: grid, status: puzzleStatus });
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      throw new Error("Invalid action");
  }
}

type HangGameResetResult = string | { error: unknown };

export async function hangGameReset(): Promise<HangGameResetResult> {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?lang=en",
      {
        cache: "no-store",
      },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const newWordData = data[0] as string;

    return newWordData;
  } catch (error) {
    return { error: error };
  }
}

type getHintType = {
  word: string;
};
export async function getHint({
  word,
}: getHintType): Promise<HangGameResetResult> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();
    if (data.title == "No Definitions Found") {
      return "cant get a hint for this word.. shitty api sorry";
    }

    const hint = data[0].meanings[0].definitions[0].definition as string;

    return hint;
  } catch (error) {
    return { error: "error" };
  }
}
