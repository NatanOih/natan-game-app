"use client";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useAtom, useAtomValue } from "jotai";
import { Grid, InitGrid, PickCell } from "~/store/atomStates";
import NumberButton from "./NumberButton";

function Numbers() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [grid, setGrid] = useAtom(Grid);
  const selectedCell = useAtomValue(PickCell);

  const initialGrid = useAtomValue(InitGrid);

  const setActiveNumber = (number: number) => {
    if (selectedCell[0] > 20) return;
    const [row, col] = selectedCell;
    if (!initialGrid[row]) {
      throw new Error("s");
    }

    if (initialGrid[row][col] === 0) {
      const newGrid = [...grid];

      if (!newGrid[row]) {
        throw new Error("s");
      }

      newGrid[row][col] = number;
      setGrid(newGrid);
    }
  };

  const handleDelete = () => {
    setActiveNumber(0);
  };

  return (
    <section className="flex flex-col items-center gap-2 sm:gap-4">
      <AiFillDelete
        onClick={handleDelete}
        className="h-8 w-[25%] rounded border-2 border-white text-xl text-white transition duration-200 ease-in-out hover:border-black hover:bg-white hover:text-black active:scale-90"
      />

      <div className="flex gap-2">
        {numbers.map((number) => {
          return (
            <NumberButton
              setActiveNumber={setActiveNumber}
              number={number}
              key={number}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Numbers;
