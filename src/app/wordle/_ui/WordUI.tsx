type wordUIType = {
  word?: string;
  rowIndex?: number;
  pointer?: number;
  targetWord?: string;
};

export default function WordUI({
  word = "",
  rowIndex = 0,
  pointer = 0,
  targetWord = "",
}: wordUIType) {
  const hightlight = rowIndex === pointer;
  const prevRow = rowIndex < pointer;

  const setBgColor = (index: number) => {
    const targetWordArray = targetWord?.split("");
    const wordArray = word?.split("");
    if (targetWordArray[index] == wordArray[index]) {
      return "bg-green-300";
    }
    if (wordArray[index] && targetWordArray?.includes(wordArray[index])) {
      return "bg-orange-300";
    }
    return "bg-neutral-800";
  };
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {new Array(5).fill(0).map((_, i) => {
        const bgColor = setBgColor(i);
        const borderColor =
          i < word.length ? "border-white/60" : "border-white/20";

        const classReturn =
          prevRow && `${bgColor} transition-all duration-400 letterPop `;
        return (
          <div
            style={{ animationDelay: `${i * 0.25}s` }}
            className={`${i == word.length && hightlight && "hightlightAnimation"} flex h-16 w-16 items-center justify-center border-[1px] p-4 text-center text-5xl uppercase ${borderColor} ${classReturn} `}
            key={i}
          >
            <span className={`${i + 1 == word.length && "letterPop"} `}>
              {word[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
