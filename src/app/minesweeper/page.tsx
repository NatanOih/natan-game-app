import React from "react";
import SweeperInterface from "./SweeperInterface";
import HeadLine from "~/components/HeadLine";

export default function page() {
  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <HeadLine headline="Minesweeper" />
      <SweeperInterface />
    </section>
  );
}
