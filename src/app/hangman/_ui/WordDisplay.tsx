type wordDisplayType = {
  word: string;
  backSpace: string;
};

export default function WordDisplay({ word, backSpace }: wordDisplayType) {
  return (
    <h1 className="flex h-fit w-fit flex-col items-center justify-center gap-4 font-bold text-gray-50">
      <span className="flex flex-row gap-4">
        {word.split("").map((x, i) => {
          const renderLetter = backSpace.includes(x);
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
  );
}
