import React from "react";

type NumberButtonProps = {
  number: number;
  setActiveNumber: (number: number) => void;
};

function NumberButton(props: NumberButtonProps) {
  return (
    <button
      className="duration-400 h-[2rem] w-[2rem] items-center rounded-lg border-[1px] border-black bg-slate-100 text-center text-xl font-bold text-black shadow-[#EB6440_3px_8px_4px_-4px] transition ease-in-out hover:scale-110 hover:cursor-pointer hover:shadow-[#0000004D_2px_8px_8px_5px] focus:shadow-[#0000004D_2px_8px_4px_6px] active:scale-95 sm:h-[3rem] sm:w-[3rem] sm:text-3xl"
      onClick={() => {
        props.setActiveNumber(props.number);
      }}
    >
      {props.number}
    </button>
  );
}

export default NumberButton;
