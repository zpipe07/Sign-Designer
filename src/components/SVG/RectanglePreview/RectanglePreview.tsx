import { PreviewSvgProps } from "@/src/components/SVG/types";

export const RectanglePreview: React.FC<PreviewSvgProps> = ({
  height = 60,
  width = 75,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} rx="5" fill="#D9D9D9" />
    </svg>
  );
};
