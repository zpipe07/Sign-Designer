import { SvgProps } from "@/src/components/SVG/types";

export const TopRound: React.FC<SvgProps> = ({ height = 315, width = 400 }) => {
  return (
    <svg
      // width="400"
      width={width}
      // height="315"
      height={height}
      viewBox="0 0 400 315"
      // viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M90.3147 65C111.55 26.2631 152.708 0 200 0C247.292 0 288.45 26.2631 309.685 65H380C391.046 65 400 73.9543 400 85V295C400 306.046 391.046 315 380 315H20C8.95432 315 0 306.046 0 295V85C0 73.9543 8.95432 65 20 65H90.3147Z"
        fill="#D9D9D9"
      />
    </svg>
  );
};
