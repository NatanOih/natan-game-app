import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <section className="min-h[100vh] flex w-full flex-row justify-center gap-4 text-lg">
      <Button className="h-fit w-fit p-2 text-2xl hover:bg-white hover:text-black">
        <Link href="/sudoku">Play Suduko </Link>
      </Button>
      <Button className="h-fit w-fit p-2 text-2xl hover:bg-white hover:text-black">
        <Link href="/hangman">play Hang-man </Link>
      </Button>
    </section>
  );
}
