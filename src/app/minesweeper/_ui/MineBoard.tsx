/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from "react";

export default function MineBoard({ size }: { size: number }) {
  const mineSweeperGrid = Array.from({ length: size }, () =>
    Array(size).fill(0),
  ) as number[][];

  return (
    <section>
      <div className="flex flex-col gap-0 p-0">
        {mineSweeperGrid.map((x, i) => (
          <span className="" key={i.toString()}>
            {x}
          </span>
        ))}
      </div>
    </section>
  );
}
