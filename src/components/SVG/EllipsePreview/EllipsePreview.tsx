import { PreviewSvgProps } from "@/src/components/SVG/types";

export const EllipsePreview: React.FC<PreviewSvgProps> = ({
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
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        fill="#D9D9D9"
      />
    </svg>
  );
};
