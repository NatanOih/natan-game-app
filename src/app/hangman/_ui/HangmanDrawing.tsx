"use client";
import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { lattersUsed } from "~/store/atomStates";

const EYE = <span> X </span>;
const Fraum = (
  <span className="absolute left-5 top-4 rotate-90 text-white">{"("}</span>
);

type HEADtype = {
  numberOfGuesses: number;
};

const HEAD = ({ numberOfGuesses }: HEADtype) => (
  <div className="absolute -right-4 top-12 h-12 w-12 rounded-full border-4 border-black bg-black text-2xl">
    <span
      className="relative flex flex-row justify-center gap-1 text-[23px]"
      style={{ color: "white" }}
    >
      <span className={`${numberOfGuesses < 2 && "opacity-0"}`}> {EYE}</span>
      <span className={`${numberOfGuesses < 3 && "opacity-0"}`}> {EYE}</span>

      {numberOfGuesses > 3 && Fraum}
    </span>
  </div>
);
const BODY = (
  <div
    className="absolute right-0 top-[100px] h-[100px] w-[10px] bg-black shadow-[0_0_2px_white]"
    key="BODY"
  />
);
const ARML = (
  <div
    className="absolute right-[-18px] top-[130px] h-[7px] w-[70px] rotate-[-75deg] bg-black shadow-[0_0_2px_white]"
    key="ARML"
  />
);
const ARMR = (
  <div
    className="absolute right-[-45px] top-[130px] h-[7px] w-[70px] rotate-[-110deg] bg-black shadow-[0_0_2px_white]"
    key="ARMR"
  />
);

const LEGL = (
  <div
    className="absolute right-[-22px] top-[230px] h-[7px] w-[80px] rotate-[-75deg] bg-black shadow-[0_0_2px_white]"
    key="LEGL"
  />
);

const LEGR = (
  <div
    key="LEGR"
    className="absolute right-[-47px] top-[227px] h-[7px] w-[80px] rotate-[-105deg] bg-black shadow-[0_0_2px_white]"
  />
);

type HangmanProps = {
  numberOfGuesses: number;
};

const BODY_PARTS = ["", "", "", "", BODY, ARML, ARMR, LEGL, LEGR];

export const HangmanDrawing = () => {
  const numberOfGuesses = useAtomValue(lattersUsed).length;

  return (
    <section className="neo-brutalism-inner-shadow relative max-w-fit scale-[80%] overflow-hidden rounded-lg bg-blue-100/80 p-24">
      <div className="relative left-[25%]">
        <div className="right-10 h-[10px] w-[150px] bg-[#0A2647]" />
        <div className="right-10 h-[400px] w-[10px] bg-[#0A2647]" />
        <div className="h-[10px] w-[200px] -translate-x-24 bg-[#0A2647]" />
        <div className="absolute left-[150px] top-0 h-[60px] w-[4px] bg-[#0A2647]" />

        <div className={`stickman absolute left-[155px] top-2`}>
          {numberOfGuesses > 0 && <HEAD numberOfGuesses={numberOfGuesses} />}
          {BODY_PARTS.slice(3, numberOfGuesses)}
        </div>
      </div>
    </section>
  );
};
