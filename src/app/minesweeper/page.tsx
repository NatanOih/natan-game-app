import React from "react";
import SweeperInterface from "./_ui/SweeperInterface";
import HeadLine from "~/components/HeadLine";
import MineBoard from "./_ui/MineBoard";

export default function page() {
  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <HeadLine headline="Minesweeper" />
      <SweeperInterface />
      <MineBoard size={3} />
    </section>
  );
}
