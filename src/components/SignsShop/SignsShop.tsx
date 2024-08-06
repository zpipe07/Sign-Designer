"use client"

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import {
  FEATURED_SIGNS,
  FeaturedSign,
} from "@/src/components/FeaturedSigns"
import { SignsShopList } from "@/src/components/SignsShopList"
import { SignsShopFilters } from "@/src/components/SignsShopFilters"
import { ColorCombo } from "@/src/components/SignDesigner/types"

const SIGNS: FeaturedSign[] = [
  ...FEATURED_SIGNS,
  {
    title: "",
    inputs: {
      shape: "rectangle",
      size: "large",
      color: "white::black",
      fontFamily: "Gemola",
      mountingStyle: "hanging",
      edgeStyle: "square",
      borderWidth: "0",
      textLines: [
        { value: "-Text-", fontSize: "4.4", offset: "0" },
        { value: "Your custom", fontSize: "2.6", offset: "0.75" },
        { value: "Goes here", fontSize: "2.8", offset: "-0.75" },
      ],
    },
    imageUrl: "/images/product/rectangle/6730_bellview-pines.jpg",
  },
  {
    title: "",
    inputs: {
      shape: "donnelly",
      size: "medium",
      color: "white::black",
      fontFamily: "Arbutus",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0.2",
      textLines: [
        { value: "Custom Text", fontSize: "1.8", offset: "-2.25" },
        { value: "Your", fontSize: "4.8", offset: "-2" },
      ],
    },
    imageUrl: "/images/product/donnelly/1995_donnelly-ave.jpg",
  },
  {
    title: "",
    inputs: {
      shape: "donnelly",
      size: "extra small vertical",
      color: "white::black",
      fontFamily: "JosefinSlab",
      mountingStyle: "hanging",
      edgeStyle: "round",
      borderWidth: "0",
      textLines: [
        { value: "Your text", fontSize: "1.8", offset: "0" },
      ],
    },
    imageUrl: "/images/product/vertical/6447.jpg",
  },
  //
  // {
  //   title: "",
  //   inputs: {
  //     shape: "rectangle",
  //     size: "medium",
  //     color: "darkgreen::tan",
  //     fontFamily: "Danfo",
  //     mountingStyle: "hanging",
  //     edgeStyle: "round",
  //     borderWidth: "0.3",
  //     textLines: [
  //       { value: "Here", fontSize: "4.6", offset: "-1.25" },
  //       { value: "Your text", fontSize: "2.2", offset: "-1" },
  //     ],
  //   },
  // },
  // {
  //   title: "",
  //   inputs: {
  //     shape: "ellipse",
  //     size: "medium",
  //     color: "saddlebrown::white",
  //     fontFamily: "AdventPro",
  //     mountingStyle: "hanging",
  //     edgeStyle: "round",
  //     borderWidth: "0.2",
  //     textLines: [
  //       { value: "Here", fontSize: "4.2", offset: "-1" },
  //       { value: "Your text", fontSize: "2", offset: "-0.75" },
  //     ],
  //   },
  // },
  // {
  //   title: "",
  //   inputs: {
  //     shape: "top round",
  //     size: "medium",
  //     color: "white::saddlebrown",
  //     fontFamily: "LifeKittie",
  //     mountingStyle: "hanging",
  //     edgeStyle: "square",
  //     borderWidth: "0.2",
  //     textLines: [
  //       { value: "Here", fontSize: "4.2", offset: "-1.5" },
  //       { value: "Your text", fontSize: "2", offset: "-1" },
  //     ],
  //   },
  // },
  // {
  //   title: "",
  //   inputs: {
  //     shape: "bread",
  //     size: "medium",
  //     color: "black::white",
  //     fontFamily: "Shrikhand",
  //     mountingStyle: "hanging",
  //     edgeStyle: "round",
  //     borderWidth: "0.2",
  //     textLines: [
  //       { value: "Here", fontSize: "4.2", offset: "-1.5" },
  //       { value: "Your text", fontSize: "2.2", offset: "-1" },
  //     ],
  //   },
  // },
  // {
  //   title: "",
  //   inputs: {
  //     shape: "donnelly",
  //     size: "medium",
  //     color: "darkgreen::tan",
  //     fontFamily: "Forque",
  //     mountingStyle: "hanging",
  //     edgeStyle: "round",
  //     borderWidth: "0.2",
  //     textLines: [
  //       { value: "Here", fontSize: "5", offset: "-1.25" },
  //       { value: "Your text", fontSize: "3", offset: "-1" },
  //     ],
  //   },
  // },
  // {
  //   title: "",
  //   inputs: {
  //     shape: "rectangle",
  //     size: "extra small vertical",
  //     color: "white::black",
  //     fontFamily: "GermaniaOne",
  //     mountingStyle: "hanging",
  //     edgeStyle: "round",
  //     borderWidth: "0",
  //     textLines: [
  //       { value: "Your text", fontSize: "1.8", offset: "0" },
  //     ],
  //   },
  // },
]

export type ShopFiltersInputs = {
  textLines: { value: string }[]
  color: ColorCombo
}

export const SignsShop: React.FC = () => {
  const [filteredSigns, setFilteredSigns] = useState(SIGNS)

  const formMethods = useForm<ShopFiltersInputs>({
    defaultValues: {
      textLines: [{ value: "" }, { value: "" }, { value: "" }],
      color: undefined,
    },
  })

  const onSubmit = (data: ShopFiltersInputs) => {
    const isTextUpdated = data.textLines.some(
      (textLine: { value: string }) => textLine.value,
    )
    const updatedSigns = SIGNS.map((sign) => {
      return {
        ...sign,
        inputs: {
          ...sign.inputs,
          textLines: isTextUpdated
            ? sign.inputs.textLines.map((textLine, index) => {
                return {
                  ...textLine,
                  value: data.textLines[index].value,
                }
              })
            : sign.inputs.textLines,
          color: data.color || sign.inputs.color,
        },
      }
    })

    setFilteredSigns(updatedSigns)
  }

  return (
    <FormProvider {...formMethods}>
      <SignsShopFilters onSubmit={onSubmit} />

      <SignsShopList signs={filteredSigns} />
    </FormProvider>
  )
}
