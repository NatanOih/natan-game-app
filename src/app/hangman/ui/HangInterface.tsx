/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getHint, hangGameReset } from "~/server/actions/actions";
import { Button } from "~/components/ui/button";
import { guessedWord, lattersUsed } from "~/store/atomStates";

type HangInterfaceType = {
  randomWord: string;
};

export function HangInterface({ randomWord }: HangInterfaceType) {
  const [word, setWord] = useAtom(guessedWord);
  const setLattersUsedState = useSetAtom(lattersUsed);
  const backSpace = useAtomValue(lattersUsed);
  const [hint, setHint] = useState("");

  useEffect(() => {
    async function handleStore() {
      if (typeof window !== "undefined") {
        const prevWord = window.localStorage.getItem("guessedWord")!;

        if (prevWord) {
          try {
            const parsedWord = (await JSON.parse(prevWord)) as string;
            setWord(() => parsedWord);
          } catch (e) {
            setWord(() => prevWord);
          }
        } else {
          setWord(randomWord);
        }
      }
    }

    void handleStore();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-gray-50">
      <h1>Random Word from server -- {randomWord}</h1>
      <h1> current word on client -- {word}</h1>

      <div className="- flex flex-row items-center justify-center gap-4">
        <form
          className="p-4"
          action={async () => {
            const newWordNew = await hangGameReset();
            setLattersUsedState("");
            setWord(newWordNew as string);
            setHint("");

            return;
          }}
        >
          <Button variant={"secondary"} type="submit">
            new game
          </Button>
        </form>

        <form
          className="p-4"
          action={async () => {
            const newHint = await getHint({ word });
            setHint(newHint as string);

            return;
          }}
        >
          <Button variant={"destructive"} type="submit">
            need a hint?
          </Button>
        </form>
      </div>

      {hint}

      <h1 className="flex h-fit w-fit flex-col items-center justify-center gap-4 font-bold text-gray-50">
        <span>
          {word.split("").map((x, i) => {
            const renderLetter = backSpace.includes(x);
            return (
              <span className={`${!renderLetter && "invisible"}`} key={x + i}>
                {" "}
                {x}{" "}
              </span>
            );
          })}
        </span>
        <span>{backSpace}</span>
      </h1>
    </div>
  );
}
