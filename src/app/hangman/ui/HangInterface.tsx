/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getHint, hangGameReset } from "~/server/actions/actions";
import { Button } from "~/components/ui/button";
import { guessedWord, lattersUsed } from "~/store/atomStates";
import { HangmanDrawing } from "./HangmanDrawing";

type HangInterfaceType = {
  randomWord: string;
};

export function HangInterface({ randomWord }: HangInterfaceType) {
  const [word, setWord] = useAtom(guessedWord);
  const setLattersUsedState = useSetAtom(lattersUsed);
  const backSpace = useAtomValue(lattersUsed);
  const [hint, setHint] = useState("");
  let won = 0;

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
    <div className="flex flex-col items-center justify-center gap-8 text-gray-50">
      <div className="flex flex-row items-center justify-center gap-12">
        <HangmanDrawing />
        <div className="- flex flex-col items-center justify-center gap-4">
          <form
            className="p-4"
            action={async () => {
              const newWordNew = await hangGameReset();
              setLattersUsedState("");
              setWord(newWordNew!);
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
          {hint ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="max-w-[15rem] items-center text-clip p-2 text-sm">
                {hint}
              </p>
              <Button
                variant={"secondary"}
                onClick={() => setHint("")}
                className="h-[80%] p-2"
              >
                {" "}
                dismiss{" "}
              </Button>
            </div>
          ) : (
            <div className="w-[15rem]" />
          )}
        </div>
      </div>

      <h1 className="flex h-fit w-fit flex-col items-center justify-center gap-4 font-bold text-gray-50">
        <span className="flex flex-row gap-4">
          {word.split("").map((x, i) => {
            const renderLetter = backSpace.includes(x);
            renderLetter && (won += 1);
            return (
              <span
                className={` ${!!renderLetter && "animate-accordion-down bg-slate-950/50"} min-w-fit animate-bounce rounded-sm border-2 border-white/50 bg-slate-400 bg-transparent p-4 px-6`}
                key={x + i}
              >
                {
                  <p
                    className={`${!renderLetter && "opacity-0"} text-xl uppercase`}
                  >
                    {x}
                  </p>
                }
              </span>
            );
          })}
        </span>
      </h1>
      {won == word.length ? <span> You Win </span> : <div />}
    </div>
  );
}
