import Image from "next/image";
import Link from "next/link";

type gameCardPropsType = {
  name: string;
  length: number;
};

export default function GameCard({ name, length }: gameCardPropsType) {
  return (
    <Link
      className="spinAnimation bounceAnimation relative flex h-[30vh] min-w-fit grow flex-col items-center justify-center overflow-hidden rounded-lg border-l-black bg-neutral-950 p-2 text-center shadow-[inset_3px_-3px_2px_rgba(22,22,22,22.15)] transition-all before:absolute before:h-[200%] before:w-[50%] before:rotate-45 before:bg-white after:absolute after:inset-[2px] after:rounded-lg after:bg-black hover:shadow-[inset_2px_-3px_2px_rgba(222,22,22,222.01)]"
      href={`/${name}`}
    >
      <h1 className="z-10 text-xl font-bold text-white">{name}</h1>
      {/* <Image /> */}
    </Link>
  );
}
