import { Color, Decoration, DesignFormInputs, FontFamily } from "@/src/components/SignDesigner/SignDesignerForm";

export type SvgProps = {
  height: number;
  width: number;
  borderWidth: number;
  inputs: DesignFormInputs;
}

export type PreviewSvgProps = {
  height?: number;
  width?: number;
}

export type FiligreeProps = {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
  transform?: string;
  color?: Color;
};
