import Link from "next/link";
import Logo from "./Logo";
import { games } from "~/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-20 w-full items-center justify-between overflow-hidden rounded-xl border-[1px] border-dashed border-white/10 bg-gray-800/20 px-16 text-xl font-bold shadow-sm shadow-white/50 transition-all">
      <div>
        <Link className="" href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex h-10 flex-row items-center justify-end gap-8 rounded-sm p-1 px-20 text-lg text-white">
        {games.map((gameName, index) => (
          <Link key={gameName} className="hover:text-gray-200" href={gameName}>
            {gameName}
          </Link>
        ))}

        {/* <div className="absolute right-0 top-0 h-2 w-[40vw] rotate-[12deg] bg-blue-600/50" />
        <div className="absolute left-[5rem] z-0 flex h-3 w-[70vw] -rotate-[12deg] bg-red-300/50"></div>
        <div className="absolute left-[9rem] z-0 flex h-3 w-[70vw] -rotate-[12deg] bg-red-300/50"></div> */}
      </div>
    </header>
  );
}
