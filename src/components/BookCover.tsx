import { useId } from "react";
import type { Book } from "../data/books";

const DISPLAY = "'Cormorant Garamond', Garamond, Georgia, serif";
const CAPS = "'IM Fell English SC', Georgia, serif";

const svgUrl = (body: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300">${body}</svg>`)}`;

const GRAIN = svgUrl(
  '<filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2"/>' +
    '<feColorMatrix values="0 0 0 0 .3  0 0 0 0 .22  0 0 0 0 .14  0 0 0 .2 0"/></filter>' +
    '<rect width="200" height="300" filter="url(#g)"/>',
);

const marbleCache = new Map<number, string>();
const marble = (seed: number) => {
  let url = marbleCache.get(seed);
  if (!url) {
    url = svgUrl(
      `<filter id="m"><feTurbulence type="turbulence" baseFrequency=".012 .05" numOctaves="3" seed="${seed}"/>` +
        '<feColorMatrix values="0 0 0 0 1  0 0 0 0 .95  0 0 0 0 .85  .9 0 0 0 -.15"/></filter>' +
        '<rect width="200" height="300" filter="url(#m)"/>',
    );
    marbleCache.set(seed, url);
  }
  return url;
};

export function BookCover({ book }: { book: Book }) {
  const uid = useId().replace(/:/g, "");
  const { bg, ink, accent, title, author, style } = book;

  return (
    <svg
      viewBox="0 0 200 300"
      className="cover-svg"
      role="img"
      aria-label={`${title.join(" ")}, ${author}`}
    >
      <defs>
        <linearGradient id={`spine-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".32" />
          <stop offset=".07" stopColor="#000" stopOpacity=".32" />
          <stop offset=".075" stopColor="#fff" stopOpacity=".08" />
          <stop offset=".09" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="200" height="300" fill={bg} />
      {style === "cloth" && <Cloth ink={ink} title={title} author={author} />}
      {style === "paperback" && (
        <Paperback ink={ink} accent={accent} title={title} author={author} />
      )}
      {style === "academic" && (
        <Academic
          ink={ink}
          accent={accent}
          title={title}
          author={author}
          uid={uid}
        />
      )}
      {style === "marbled" && (
        <Marbled ink={ink} accent={accent} title={title} author={author} />
      )}

      <image href={GRAIN} width="200" height="300" />
      <rect width="200" height="300" fill={`url(#spine-${uid})`} />
    </svg>
  );
}

type Parts = { ink: string; title: string[]; author: string };

function Lines({
  lines,
  x = 100,
  y,
  size,
  gap,
  family,
  fill,
  weight,
  spacing,
  italic,
}: {
  lines: string[];
  x?: number;
  y: number;
  size: number;
  gap: number;
  family: string;
  fill: string;
  weight?: number;
  spacing?: number;
  italic?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={fill}
      fontFamily={family}
      fontSize={size}
      fontWeight={weight}
      letterSpacing={spacing}
      fontStyle={italic ? "italic" : undefined}
    >
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : gap}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

const Fleuron = ({ y, fill }: { y: number; fill: string }) => (
  <text
    x="104"
    y={y}
    textAnchor="middle"
    fill={fill}
    fontFamily="Georgia, serif"
    fontSize="14"
  >
    ❦
  </text>
);

function Cloth({ ink, title, author }: Parts) {
  return (
    <g>
      <rect
        x="26"
        y="16"
        width="160"
        height="268"
        fill="none"
        stroke={ink}
        strokeWidth="1.6"
      />
      <rect
        x="32"
        y="22"
        width="148"
        height="256"
        fill="none"
        stroke={ink}
        strokeOpacity=".6"
        strokeWidth=".8"
      />
      <Fleuron y={70} fill={ink} />
      <Lines
        lines={title}
        x={106}
        y={124}
        size={25}
        gap={27}
        family={DISPLAY}
        fill={ink}
        weight={500}
        italic
      />
      <path d="M80 214 h52" stroke={ink} strokeWidth=".8" />
      <Lines
        lines={[author.toUpperCase()]}
        x={106}
        y={246}
        size={9}
        gap={0}
        family={CAPS}
        fill={ink}
        spacing={1.8}
      />
    </g>
  );
}

function Paperback({ ink, accent, title, author }: Parts & { accent: string }) {
  return (
    <g>
      <rect x="26" y="22" width="160" height="1.6" fill={ink} />
      <rect x="26" y="26" width="160" height=".6" fill={ink} />
      <Lines
        lines={[author.toUpperCase()]}
        x={106}
        y={52}
        size={9}
        gap={0}
        family={CAPS}
        fill={accent}
        spacing={1.6}
      />
      <Lines
        lines={title}
        x={106}
        y={96}
        size={26}
        gap={27}
        family={DISPLAY}
        fill={ink}
        weight={600}
      />
      <circle
        cx="106"
        cy="196"
        r="30"
        fill="none"
        stroke={accent}
        strokeWidth="1"
      />
      <circle
        cx="106"
        cy="196"
        r="24"
        fill="none"
        stroke={accent}
        strokeWidth=".6"
        strokeDasharray="1 3"
      />
      <path d="M106 176 l5 20 -5 20 -5 -20z" fill={accent} opacity=".8" />
      <rect x="26" y="272" width="160" height=".6" fill={ink} />
      <rect x="26" y="275" width="160" height="1.6" fill={ink} />
    </g>
  );
}

function Academic({
  ink,
  accent,
  title,
  author,
  uid,
}: Parts & { accent: string; uid: string }) {
  return (
    <g>
      <defs>
        <pattern
          id={`pat-${uid}`}
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(30)"
        >
          <path
            d="M0 11 Q5.5 4 11 11 T22 11"
            fill="none"
            stroke={ink}
            strokeOpacity=".22"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="200" height="300" fill={`url(#pat-${uid})`} />
      <rect
        x="38"
        y="66"
        width="136"
        height={30 + title.length * 22}
        fill={accent}
      />
      <rect
        x="43"
        y="71"
        width="126"
        height={20 + title.length * 22}
        fill="none"
        stroke={ink}
        strokeOpacity=".7"
        strokeWidth=".8"
      />
      <Lines
        lines={title.map((t) => t.toUpperCase())}
        x={106}
        y={96}
        size={15}
        gap={21}
        family={CAPS}
        fill={ink}
        spacing={1}
      />
      <Lines
        lines={[author]}
        x={106}
        y={262}
        size={13}
        gap={0}
        family={DISPLAY}
        fill={ink}
        italic
      />
    </g>
  );
}

function Marbled({ ink, accent, title, author }: Parts & { accent: string }) {
  return (
    <g>
      <rect width="200" height="300" fill={accent} />
      <image
        href={marble(title.join("").length)}
        width="200"
        height="300"
        opacity=".45"
      />
      <rect
        x="44"
        y="92"
        width="124"
        height={46 + title.length * 26}
        rx="4"
        fill="#F3EAD8"
      />
      <rect
        x="49"
        y="97"
        width="114"
        height={36 + title.length * 26}
        rx="2"
        fill="none"
        stroke="#6B1E23"
        strokeWidth=".8"
      />
      <Lines
        lines={title}
        x={106}
        y={128}
        size={24}
        gap={26}
        family={DISPLAY}
        fill="#1F1A17"
        weight={600}
        italic
      />
      <Lines
        lines={[author.toUpperCase()]}
        x={106}
        y={262}
        size={8.5}
        gap={0}
        family={CAPS}
        fill={ink}
        spacing={1.6}
      />
    </g>
  );
}
