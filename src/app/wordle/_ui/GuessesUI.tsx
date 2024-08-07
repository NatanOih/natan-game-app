/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useEffect, useState } from "react";
import WordUI from "./WordUI";
import { checkValidWord } from "~/server/actions/actions";
import {
  currentGuess,
  guessNumber,
  hasWon,
  wordleGuesses,
  wordleWordToGuess,
} from "~/store/atomStates";
import { useAtom } from "jotai";

type GuessesUIType = {
  serverWord: string;
};
export default function GuessesUI({ serverWord }: GuessesUIType) {
  const [wordleWords, setWordleWords] = useAtom(wordleGuesses);
  const [currentWord, setCurrentWord] = useAtom(currentGuess);
  const [pointer, setPointer] = useAtom(guessNumber);
  const [won, setWon] = useAtom(hasWon);
  const [targetWord, setTargetWord] = useAtom(wordleWordToGuess);
  const [errorMsg, setErrorMsg] = useState(false);

  if (typeof window !== "undefined") {
    const prevWord = window.localStorage.getItem("wordleWordToGuess")!;
    const wordToSet = prevWord ? (JSON.parse(prevWord) as string) : serverWord;
    setTargetWord(() => wordToSet);
  }

  useEffect(() => {
    const keyUpHandler = async (e: KeyboardEvent) => {
      if (won) return;
      const key = e.key;
      if (key === "Backspace") {
        e.preventDefault();
        handleBackSpace();
        return;
      }
      if (key === "Enter") {
        await handleNextLine();
        return;
      }
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();

      handleCurrentWord(key);
      return;
    };

    document.addEventListener("keydown", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyUpHandler);
    };
  }, [currentWord, wordleWords]);

  useEffect(() => {
    wordleSetter();
  }, [currentWord]);

  const wordleSetter = () => {
    pointer < wordleWords.length &&
      setWordleWords((prev: string[]) => {
        const oldArray = [...prev] as string[];
        oldArray[pointer] = [...currentWord].join("");
        return oldArray;
      });
  };

  const handleCurrentWord = (key: string) => {
    currentWord.length < 5 && setCurrentWord((prev) => prev + key);
  };

  const handleNextLine = async () => {
    const checkValidLine = async () => {
      if (currentWord.length === 5 && (await checkValidWord(currentWord))) {
        return true;
      }
      return false;
    };

    if (!(await checkValidLine())) {
      setErrorMsg(true);
      return;
    }

    setErrorMsg(false);

    if (currentWord == targetWord) {
      setWon(true);
    }

    setPointer((prev) => prev + 1);
    setCurrentWord("");
  };

  const handleBackSpace = () => {
    setErrorMsg(false);
    setCurrentWord((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col gap-2 font-bold text-white">
      word is:{targetWord}
      {wordleWords.map((word, index) => (
        <div
          className={`relative ${won && index == pointer - 1 && "animate-pulse bg-green-700/20 text-neutral-800"} `}
          key={word + index}
        >
          <WordUI
            rowIndex={index}
            pointer={pointer}
            targetWord={targetWord}
            word={word}
          />
          {errorMsg && index === pointer && (
            <div className="text-md animateDown absolute left-[110%] top-0 h-fit w-40 cursor-pointer rounded-lg border-[1px] border-black/50 bg-red-700 p-2 text-center font-extrabold text-black drop-shadow-[-12px_28px_0.5px_rgba(13,13,13,22.95)] transition-all hover:bg-red-600 hover:drop-shadow-[-5px_4px_0.5px_rgba(13,13,13,22.95)] active:bg-red-400">
              Word not in storage, Please type a possible 5 letter word
            </div>
          )}
        </div>
      ))}
      {won && <h1> won </h1>}
    </div>
  );
}
