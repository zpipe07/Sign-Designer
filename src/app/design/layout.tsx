import { useForm } from "react-hook-form"
import Box from "@mui/material/Box"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { colorCombos } from "@/src/components/SignDesigner/SignDesignerForm"

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const formMethods = useForm<DesignFormInputs>({
    defaultValues: {
      shape: "rectangle",
      orientation: "horizontal",
      size: "small",
      textLines: [{ value: "" }, { value: "" }, { value: "" }],
      color: colorCombos[0],
      fontFamily: "Times",
      decoration: "",
    },
  })

  return <Box sx={{ backgroundColor: "blue" }}>{children}</Box>
}
