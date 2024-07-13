/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAtom, useAtomValue } from "jotai";
import useIsMobile from "~/hooks/useMobile";
import { Grid, InitGrid, PickCell } from "~/store/atomStates";
import { copyGrid, create2DArray } from "~/utils/utilFunctions";

type CellType = [number, number];

type GridType = number[][];

type TileProps = {
  game: GridType;
};

const Tile = ({ game }: TileProps) => {
  const [selectedCell, setSelectedCell] = useAtom<CellType>(PickCell);
  const [focus, setFocus] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const [doubleTap, setDoubleTap] = useState<boolean>(false);
  const [grid, setGrid] = useAtom<GridType>(Grid);
  const [initialGrid, setInitialGrid] = useAtom<GridType>(InitGrid);

  useEffect(() => {
    if (grid.length != 0) {
      setGrid(game.map((row) => [...row]));
      setInitialGrid(game.map((row) => [...row]));
    }
  }, []);

  const handleChange = (
    row: number,
    col: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const n = Number(String(e.target.value).slice(-1));
    e.target.value = String(n); // Ensure the input value is updated with the parsed number
    if (!initialGrid[row]) {
      throw new Error("s");
    }

    if (n < 10 && initialGrid[row][col] == 0) {
      let newerGrid = create2DArray();

      newerGrid = [...grid];

      if (!newerGrid[row]) {
        throw new Error("s");
      }

      if (newerGrid[row][col] != undefined) {
        newerGrid[row][col] = n;
      }
      setGrid(newerGrid);
    }
  };

  const handleSelect = (cellIndexes: [number, number]) => {
    const [rowIndex, colIndex] = cellIndexes;

    if (selectedCell.toString() == cellIndexes.toString()) {
      setDoubleTap(!doubleTap);
      doubleTap && console.log("safasf");
    }

    setSelectedCell([rowIndex, colIndex]);
  };

  return grid.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      const value = col;

      if (!initialGrid[rowIndex]) {
        throw new Error("s");
      }

      return (
        <input
          className={twMerge(
            "xm:text-2xl tile flex h-[9.1vw] w-[9.1vw] cursor-pointer items-center justify-center overflow-hidden rounded-[0.8rem] border-[1px] border-black bg-slate-200/90 text-center text-xl font-bold caret-transparent transition-all sm:h-[3.5rem] sm:w-[3.5rem] sm:rounded-[1.1rem]",
            `${colIndex % 3 === 2 && colIndex != 8 ? "mr-2" : ""}`,
            `${rowIndex % 3 === 2 && rowIndex != 8 ? "mb-2" : ""}`,
            `${initialGrid[rowIndex][colIndex] != 0 && "init"}`,
            `${value != 0 && initialGrid[rowIndex][colIndex] == 0 && "taken font-mono font-bold"}`,
            `${rowIndex == selectedCell[0] && focus ? "highlight" : ""}`,
            `${colIndex == selectedCell[1] && focus ? "highlight" : ""}`,
          )}
          type="text"
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
            // setSelectedCell([100, 100]);
          }}
          onChange={(e) => handleChange(rowIndex, colIndex, e)}
          onClick={() => handleSelect([rowIndex, colIndex])}
          value={value == 0 ? "" : value}
          key={rowIndex + "" + colIndex}
          readOnly={isMobile ? true : false}
        />
      );
    });
  });
};

export default Tile;
