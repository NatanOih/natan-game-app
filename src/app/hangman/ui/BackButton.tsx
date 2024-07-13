import React from "react";
import { FaUndo } from "react-icons/fa";

type BackButtonType = {
  handleBackSpace: () => void;
};

export default function BackButton({ handleBackSpace }: BackButtonType) {
  return (
    <button
      className={`flex h-[45px] w-[45px] cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-black bg-gray-300 text-xl font-bold uppercase text-gray-800 shadow-sm shadow-white transition-all hover:bg-gray-50 hover:text-black disabled:cursor-auto disabled:bg-gray-400 disabled:shadow-none`}
      onClick={handleBackSpace}
    >
      <FaUndo />
    </button>
  );
}
