"use client";

import useIsMobile from "~/hooks/useMobile";
import { cn } from "~/lib/utils";

export default function Logo() {
  const isMobile = useIsMobile();
  console.log("isMobile", isMobile);

  return (
    <span
      className={cn(
        "flex h-fit min-w-fit items-center rounded-lg border-2 border-black bg-gray-50/90 p-2 text-gray-950 drop-shadow-[-8px_6px_0.3px_rgba(222,22,222,22.25)] transition-all duration-150 hover:border-white hover:bg-black hover:text-gray-50 hover:drop-shadow-[-2px_2px_0.1px_rgba(222,22,222,22.25)] active:scale-95",
        isMobile && "rounded-full",
      )}
    >
      <span className="text">{isMobile ? "NG" : "Natan's Games"}</span>
    </span>
  );
}
