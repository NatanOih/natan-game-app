import Link from "next/link";
import Board from "./_ui/Board";
import Numbers from "./_ui/Numbers";
import Interface from "./_ui/Interface";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center gap-8">
      <Board />
      <Numbers />
      <Interface />
    </main>
  );
}
