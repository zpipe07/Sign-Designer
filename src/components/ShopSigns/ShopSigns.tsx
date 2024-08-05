import { Grid } from "@mui/material"

import { FEATURED_SIGNS } from "@/src/components/FeaturedSigns"
import { FeaturedSignCard } from "@/src/components/FeaturedSigns/FeaturedSignCard"
import { DesignFormInputs } from "@/src/components/SignDesigner/types"

const SIGNS: {
  title: string
  inputs: DesignFormInputs
}[] = [
  ...FEATURED_SIGNS,
  {
    title: "",
    inputs: {
      shape: "rectangle",
      size: "large",
      color: "darkgreen::white",
      fontFamily: "XCompany",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0",
      textLines: [
        { value: "Text", fontSize: "4", offset: "0" },
        { value: "Your custom", fontSize: "1.8", offset: "0.25" },
        { value: "Goes here", fontSize: "2.2", offset: "-0.25" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "donnelly",
      size: "large",
      color: "black::white",
      fontFamily: "Limelight",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0.3",
      textLines: [
        { value: "Text", fontSize: "3.8", offset: "0" },
        { value: "Your custom", fontSize: "1.6", offset: "0.25" },
        { value: "Goes here", fontSize: "2", offset: "-0.25" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "rectangle",
      size: "medium",
      color: "darkgreen::tan",
      fontFamily: "Danfo",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0.3",
      textLines: [
        { value: "Here", fontSize: "4.6", offset: "-1.25" },
        { value: "Your text", fontSize: "2.2", offset: "-1" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "ellipse",
      size: "medium",
      color: "saddlebrown::white",
      fontFamily: "AdventPro",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0.2",
      textLines: [
        { value: "Here", fontSize: "4.2", offset: "-1" },
        { value: "Your text", fontSize: "2", offset: "-0.75" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "top round",
      size: "medium",
      color: "white::saddlebrown",
      fontFamily: "LifeKittie",
      mountingStyle: "hanging",
      edgeStyle: "square",
      borderWidth: "0.2",
      textLines: [
        { value: "Here", fontSize: "4.2", offset: "-1.5" },
        { value: "Your text", fontSize: "2", offset: "-1" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "bread",
      size: "medium",
      color: "black::white",
      fontFamily: "Shrikhand",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0.2",
      textLines: [
        { value: "Here", fontSize: "4.2", offset: "-1.5" },
        { value: "Your text", fontSize: "2.2", offset: "-1" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "donnelly",
      size: "medium",
      color: "darkgreen::tan",
      fontFamily: "Forque",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0.2",
      textLines: [
        { value: "Here", fontSize: "5", offset: "-1.25" },
        { value: "Your text", fontSize: "3", offset: "-1" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "rectangle",
      size: "extra small vertical",
      color: "white::black",
      fontFamily: "GermaniaOne",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0",
      textLines: [
        { value: "Your text", fontSize: "1.8", offset: "0" },
      ],
    },
  },
  {
    title: "",
    inputs: {
      shape: "donnelly",
      size: "extra small vertical",
      color: "green::white",
      fontFamily: "Audiowide",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0",
      textLines: [
        { value: "Your text", fontSize: "1.8", offset: "0" },
      ],
    },
  },
]

export const ShopSigns: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {SIGNS.map(({ title, inputs }) => {
        return (
          <Grid item xs={12} sm={4} md={4} key={title}>
            <FeaturedSignCard title={title} inputs={inputs} />
          </Grid>
        )
      })}
    </Grid>
  )
}
