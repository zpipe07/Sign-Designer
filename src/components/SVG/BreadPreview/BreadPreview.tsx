import { PreviewSvgProps } from "@/src/components/SVG/types"

export const BreadPreview: React.FC<PreviewSvgProps> = ({
  height = 60,
  width = 75,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 292"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M399.956 51.0574C399.985 50.7058 400 50.3533 400 50C400 22.3858 310.457 0 200 0C89.543 0 0 22.3858 0 50C0 50.3533 0.0146484 50.7058 0.0439453 51.0574C0.0148926 51.3677 0 51.6821 0 52V282C0 287.523 4.47705 292 10 292H390C395.523 292 400 287.523 400 282V52C400 51.6821 399.985 51.3677 399.956 51.0574Z"
        fill="#D9D9D9"
      />
    </svg>
  )
}
