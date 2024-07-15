import Link from "next/link";
import React from "react";
import { hangGameReset } from "~/server/actions/actions";

import { KeyBoard } from "./ui/KeyBoard";
import { HangInterface } from "./ui/HangInterface";
import { HangmanDrawing } from "./ui/HangmanDrawing";

export default async function page() {
  const randomWord = await hangGameReset();

  if (typeof randomWord !== "string") {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <HangmanDrawing />
      <HangInterface randomWord={randomWord} />
      <KeyBoard />
    </section>
  );
}
