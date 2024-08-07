/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { guessedWord, lattersUsed } from "~/store/atomStates";
import { FaUndo } from "react-icons/fa";
import BackButton from "./BackButton";
import { cn } from "~/lib/utils";

const letters = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export const KeyBoard = ({}) => {
  const word = useAtomValue(guessedWord);
  const [backSpace, setBackspace] = useAtom(lattersUsed);

  useEffect(() => {
    const keypressHandler = (e: KeyboardEvent) => {
      e.preventDefault();
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      const disableLetter = backSpace.includes(key);

      if (!disableLetter) {
        addGuessedLetter(key);
      }
    };

    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        handleBackSpace();
      }
    };

    document.addEventListener("keypress", keypressHandler);
    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keypress", keypressHandler);
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [word, backSpace]);

  function handleBackSpace() {
    setBackspace((prev) => prev.slice(0, -1));
  }

  function addGuessedLetter(letter: string) {
    setBackspace((prev) => prev + letter);
  }

  return (
    <section className="relative flex flex-col items-center justify-center gap-4 p-2">
      <BackButton handleBackSpace={handleBackSpace} backspaceText={backSpace} />

      <div className="flex flex-col items-center justify-center gap-1">
        {[...letters].map((array, index) => {
          return (
            <div
              key={index + "asc"}
              style={{ left: `${index * 0.5}rem` }}
              className={`relative flex flex-row items-center justify-center gap-[0.1rem] gap-x-[0.3rem]`}
            >
              {array.split("").map((letter, index) => {
                const disableLetter = backSpace.includes(letter);
                const goodLetter = word.includes(letter) && disableLetter;
                return (
                  <button
                    key={letter}
                    onClick={() => addGuessedLetter(letter)}
                    className={cn(
                      "flex h-[45px] w-[45px] cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-black bg-gray-300 text-2xl font-bold uppercase text-gray-800 shadow-sm shadow-white transition-all duration-200 hover:bg-gray-50 hover:text-black disabled:cursor-auto disabled:bg-gray-400 disabled:shadow-none",
                      disableLetter && "disabled:bg-red-300",
                      goodLetter && "disabled:bg-green-300",
                    )}
                    disabled={disableLetter}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};
