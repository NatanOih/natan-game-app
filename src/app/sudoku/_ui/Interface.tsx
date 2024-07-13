/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import React, { Fragment, useState } from "react";

import { useAtom } from "jotai";
import { Spinner } from "./spinner";
import { Grid, InitGrid } from "~/store/atomStates";
import { copyGrid, create2DArray } from "~/utils/utilFunctions";
import { myAction } from "~/server/actions/actions";

type GridType = number[][];

const Interface = () => {
  const buttons: string[] = ["Create", "Validate", "Solve", "Reset"];
  const [puzzleStatus, setPuzzleStatus] = useState<string>("");
  const [initialGrid, setInitialGrid] = useAtom<GridType>(InitGrid);
  const [grid, setGrid] = useAtom<GridType>(Grid);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <input
        className="h-[30px] w-[50%] border-2 border-l-indigo-500 text-center outline-none"
        readOnly
        type="text"
        value={puzzleStatus ? puzzleStatus : "hello"}
      />

      <div className="flex flex-row items-center justify-center gap-6">
        {buttons.map((name, index) => (
          <Fragment key={index}>
            <form
              action={async () => {
                if (name == "Reset") {
                  const temp = create2DArray();
                  copyGrid(initialGrid, temp);
                  setGrid(temp);
                  setLoading(false);
                  return;
                }
                const results = await myAction(name, grid);
                console.log("Results", results);
                if (!results) {
                  return 1;
                }

                setGrid(results?.game.map((row) => [...row]));
                setPuzzleStatus(() => results.status);
                if (results?.init) {
                  setInitialGrid(results?.game.map((row) => [...row]));
                }
                setLoading(false);
              }}
            >
              <button
                onClick={() => setLoading(true)}
                className="leading-23 duration-235 z-10 box-border flex h-[3rem] w-[7rem] cursor-pointer touch-manipulation select-none items-center justify-center rounded border-2 border-solid bg-blue-200 p-1 font-['neucha'] text-xl text-black no-underline shadow-md outline-none transition-transform hover:translate-y-1 active:scale-95 md:text-2xl lg:text-3xl"
                type="submit"
              >
                <div className="flex h-[2rem] w-[4rem] justify-center">
                  {loading ? <Spinner /> : name}
                </div>
              </button>
            </form>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default Interface;
