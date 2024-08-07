"use client";
import React, { useState } from "react";

export default function SweeperInterface() {
  const [size, setSize] = useState("small");

  return (
    <section className="">
      <div className="flex flex-row items-center justify-center p-2 text-center">
        <h1 className="text-2xl text-white"> Choose Size: </h1>
        <div className="flex flex-row items-center justify-center gap-2 p-2 text-white">
          {"small,medium,large".split(",").map((x) => (
            <button
              onClick={() => setSize(x)}
              className={`rounded-lg border-[1px] border-white p-1 transition-all active:scale-95 ${x != size && "hover:bg-neutral-200 hover:text-neutral-900"} ${x == size && "bg-blue-700"}`}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
