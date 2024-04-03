import { Color, Decoration, FontFamily } from "@/src/components/SignDesigner/SignDesignerForm";

export type SvgProps = {
  height?: number;
  width?: number;
  borderWidth?: number;
  streetNumber?: string;
  streetName?: string;
  foregroundColor?: Color;
  backgroundColor?: Color;
  fontFamily?: FontFamily;
  decoration?: Decoration | "";
}
