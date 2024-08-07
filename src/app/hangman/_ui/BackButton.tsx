import { FaUndo } from "react-icons/fa";

type BackButtonType = {
  handleBackSpace: () => void;
  backspaceText: string;
};

export default function BackButton({
  handleBackSpace,
  backspaceText,
}: BackButtonType) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <button
        className={`flex h-[45px] w-[45px] cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-black bg-gray-300 text-xl font-bold uppercase text-gray-800 shadow-sm shadow-white transition-all hover:bg-gray-50 hover:text-black disabled:cursor-auto disabled:bg-gray-400 disabled:shadow-none`}
        onClick={handleBackSpace}
      >
        <FaUndo />
      </button>
      <span className="text-white"> {backspaceText} </span>
    </div>
  );
}
