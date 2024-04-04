import { Color, Decoration, FontFamily } from "@/src/components/SignDesigner/SignDesignerForm";

export type SvgProps = {
  height?: number;
  width?: number;
  borderWidth?: number;
  // streetNumber?: string;
  // streetName?: string;
  textLines?: {value: string}[];
  foregroundColor?: Color;
  backgroundColor?: Color;
  fontFamily?: FontFamily;
  decoration?: Decoration | "";
}

export type FiligreeProps = {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
  transform?: string;
  color?: Color;
};
