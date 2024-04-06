import { PreviewSvgProps } from "@/src/components/SVG/types";

export const SideRoundPreview: React.FC<PreviewSvgProps> = ({
  height = 60,
  width = 75,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 480 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 12.5C40 5.59645 44.4772 0 50 0H430C435.523 0 440 5.59645 440 12.5V33.1253C462.822 41.8117 480 79.6445 480 125C480 170.355 462.822 208.188 440 216.875V237.5C440 244.404 435.523 250 430 250H50C44.4772 250 40 244.404 40 237.5V216.875C17.1776 208.188 0 170.355 0 125C0 79.6445 17.1776 41.8117 40 33.1253V12.5Z"
        fill="#D9D9D9"
      />
    </svg>
  );
};
