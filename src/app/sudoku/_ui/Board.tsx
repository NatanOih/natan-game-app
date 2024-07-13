/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import Tile from "./Tile";
import { Sudoku } from "~/server/sudukuLogic/sudoku";
import NewTile from "./NewTile";
import "server-only";

async function fetchGame(): Promise<number[][]> {
  try {
    const sudoku = new Sudoku();
    const game = await sudoku.puzzle;
    return game;
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error; // Optional: Rethrow the error for further handling
  }
}

async function Board() {
  const game = await fetchGame();
  if (!game) return null;
  return (
    <section className="grid grid-cols-[repeat(9,auto)] p-2 lg:p-10">
      <Tile game={game} />
    </section>
  );
}

export default Board;
