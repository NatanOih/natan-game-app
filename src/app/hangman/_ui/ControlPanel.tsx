import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { getHint, hangGameReset } from "~/server/actions/actions";
import { guessedWord, lattersUsed } from "~/store/atomStates";

export default function ControlPanel() {
  const [word, setWord] = useAtom(guessedWord);
  const setLattersUsedState = useSetAtom(lattersUsed);
  const backSpace = useAtomValue(lattersUsed);
  const [hint, setHint] = useState("");

  return (
    <div className="- relative flex flex-col items-center justify-center gap-4">
      <form
        className="p-4"
        action={async () => {
          const newWordNew = await hangGameReset();
          setLattersUsedState("");
          setWord(newWordNew!);
          setHint("");

          return;
        }}
      >
        <Button variant={"secondary"} type="submit">
          new game
        </Button>
      </form>

      <form
        className="p-4"
        action={async () => {
          const newHint = await getHint({ word });
          setHint(newHint as string);

          return;
        }}
      >
        <Button variant={"destructive"} type="submit">
          need a hint?
        </Button>
      </form>
      {hint && (
        <div
          className={`text-bold z-100 fixed right-[15%] top-[25%] flex-col items-center justify-center gap-4 rounded-sm border-[1px] border-[#010101] bg-blue-100/90 p-4 text-black ${hint.length > 1 ? "animateDown" : "animateUp"}`}
        >
          <p className="text-md text-clip p-2 font-bold">{hint}</p>
          <Button onClick={() => setHint("")} className="h-[80%] max-w-fit p-2">
            dismiss
          </Button>
        </div>
      )}
    </div>
  );
}
