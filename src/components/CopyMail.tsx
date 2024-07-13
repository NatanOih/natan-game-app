"use client";

import { useState } from "react";

export default function CopyMail({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText("natanoih@gmail.com");
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 300);
  };

  return (
    <div className="relative" onClick={handleClick}>
      <span className="cursor-pointer hover:text-slate-500">{children}</span>
      {clicked && (
        <span className="absolute -top-6 left-4 select-none text-lg">
          {" "}
          Copied{" "}
        </span>
      )}
    </div>
  );
}
