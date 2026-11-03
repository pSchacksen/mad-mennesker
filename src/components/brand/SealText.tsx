import { Ornament } from "./BrandIcon";
import { cn } from "@/lib/cn";

/** Rundt stempel: round-seal-ornamentet omkranset af tekst på en cirkelbane. */
export function SealText({
  text = "God dansk mad · Gode mennesker · God tid · ",
  className,
  spin = true,
  id = "seal-circle",
}: {
  text?: string;
  className?: string;
  spin?: boolean;
  id?: string;
}) {
  return (
    <div aria-hidden className={cn("relative size-36 text-brass", className)}>
      <svg viewBox="0 0 200 200" className={cn("absolute inset-0 size-full", spin && "animate-spin-slow")}>
        <defs>
          <path id={id} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <text className="fill-current font-sans text-[13.5px] font-semibold tracking-[0.32em] uppercase">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <Ornament name="round-seal" className="absolute inset-[24%] size-auto" />
    </div>
  );
}
