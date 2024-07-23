import Image from "next/image";
import Link from "next/link";

type gameCardPropsType = {
  name: string;
  length: number;
};

export default function GameCard({ name, length }: gameCardPropsType) {
  return (
    <Link
      className="spinAnimation bounceAnimation relative flex h-[30vh] w-28 grow flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-l-black bg-neutral-950 p-4 text-center shadow-[inset_3px_-3px_2px_rgba(22,22,22,22.15)] transition-all before:absolute before:h-[200%] before:w-[50%] before:rotate-45 before:bg-white after:absolute after:inset-[2px] after:rounded-lg after:bg-black hover:bg-white/20 hover:shadow-[inset_2px_-3px_2px_rgba(22,22,22,222.001)]"
      href={`/${name}`}
    >
      <h1 className="z-10 text-4xl font-bold text-white">{name}</h1>
      <div className="relative z-30 h-full w-full overflow-hidden p-2 grayscale transition-all hover:grayscale-0">
        <iframe
          className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[25%] overflow-hidden rounded-md border-4 border-white/30 p-4"
          src={name}
          title={name}
          loading="lazy"
        />
      </div>
    </Link>
  );
}
