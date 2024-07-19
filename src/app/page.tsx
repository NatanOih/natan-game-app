import Link from "next/link";
import GameCard from "~/components/GameCard";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const games = ["sudoku", "hangman", "wordle"];

  return (
    <section className="min-h[100vh] flex w-full flex-row flex-wrap justify-center gap-6 px-16 text-lg">
      {games.map((game) => {
        return <GameCard key={game} length={games.length} name={game} />;
      })}
    </section>
  );
}
