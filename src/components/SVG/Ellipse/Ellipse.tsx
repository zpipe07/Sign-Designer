import { SvgProps } from "@/src/components/SVG/types";

export const Ellipse: React.FC<SvgProps> = ({ height = 315, width = 400 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="200" cy="157.5" rx="200" ry="157.5" fill="#D9D9D9" />
    </svg>
  );
};
