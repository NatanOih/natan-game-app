"use client";

import { useSetAtom } from "jotai";
import { newWordleWord } from "~/server/actions/actions";
import {
  currentGuess,
  guessNumber,
  hasWon,
  wordleGuesses,
  wordleWordToGuess,
} from "~/store/atomStates";

export default function WordleInterface() {
  const setWordleWords = useSetAtom(wordleGuesses);
  const setCurrentWord = useSetAtom(currentGuess);
  const setPointer = useSetAtom(guessNumber);
  const setWon = useSetAtom(hasWon);
  const setTargetWord = useSetAtom(wordleWordToGuess);

  const resetGame = (serverWord: string) => {
    setWordleWords(Array(6).fill(""));
    setCurrentWord("");
    setPointer(0);
    setWon(false);
    setTargetWord(serverWord);
  };
  return (
    <section className="flex flex-col text-white">
      <form
        action={async () => {
          resetGame(await newWordleWord());
        }}
      >
        <button type="submit"> New Game</button>
      </form>
    </section>
  );
}
