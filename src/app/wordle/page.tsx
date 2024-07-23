/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { wordleWords } from "~/lib/data";
import GuessesUI from "./ui/GuessesUI";
import HeadLine from "../../components/HeadLine";
import WordleInterface from "./ui/WordleInterface";

export default function Wordle() {
  const serverWord =
    wordleWords[Math.floor(Math.random() * wordleWords.length)]!;

  return (
    <section className="flex flex-col items-center justify-center gap-12 p-4">
      <HeadLine headline="Wordle" />
      <WordleInterface />
      <GuessesUI serverWord={serverWord} />
    </section>
  );
}
