type HeadLineType = {
  headline: string;
};

export default function HeadLine({ headline }: HeadLineType) {
  return <h1 className="text-8xl font-bold text-white">{headline}</h1>;
}
