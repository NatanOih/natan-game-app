/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getHint, hangGameReset } from "~/server/actions/actions";
import { Button } from "~/components/ui/button";
import { guessedWord, lattersUsed } from "~/store/atomStates";
import { HangmanDrawing } from "./HangmanDrawing";
import WordDisplay from "./WordDisplay";
import ControlPanel from "./ControlPanel";

type HangInterfaceType = {
  randomWord: string;
};

export function HangInterface({ randomWord }: HangInterfaceType) {
  const [word, setWord] = useAtom(guessedWord);
  const backSpace = useAtomValue(lattersUsed);

  const [didWin, setDidWin] = useState(false);

  if (typeof window !== "undefined") {
    const prevWord = window.localStorage.getItem("guessedWord");
    const wordToSet = prevWord ? JSON.parse(prevWord) : randomWord;
    setWord(() => wordToSet as string);
  }

  useEffect(() => {
    let count = 0;
    for (const letter of word) {
      backSpace.includes(letter) && count++;
    }
    count == word.length && setDidWin(true);
  }, [word, backSpace]);

  return (
    <section className="flex flex-col items-center justify-center gap-8 text-gray-50">
      <div className="flex flex-row items-center justify-center gap-12">
        <HangmanDrawing />
        <ControlPanel />
      </div>

      <WordDisplay word={word} backSpace={backSpace} />

      {didWin ? <span> You Win </span> : <div />}
    </section>
  );
}
