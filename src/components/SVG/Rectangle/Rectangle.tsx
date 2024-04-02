import { SvgProps } from "@/src/components/SVG/types";

export const Rectangle: React.FC<SvgProps> = ({
  height = 315,
  width = 400,
}) => {
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
      <rect width="400" height="315" rx="10" fill="#D9D9D9" />
    </svg>
  );
};
