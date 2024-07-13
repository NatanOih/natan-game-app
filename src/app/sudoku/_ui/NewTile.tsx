"use client";

import { useAtom } from "jotai";
import { Grid } from "~/store/atomStates";

type NewTileProps = {
  row: number;
  col: number;
  val: number;
};

type CellType = [number, number];

type GridType = number[][];

type TileProps = {
  game: GridType;
};

export default function NewTile({ row, col, val }: NewTileProps) {
  const [grid, setGrid] = useAtom<GridType>(Grid);

  return <div className="p-2 text-4xl">{[val]}</div>;
}
