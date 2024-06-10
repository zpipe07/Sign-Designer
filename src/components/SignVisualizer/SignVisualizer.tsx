import { useWatch } from "react-hook-form"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"
import { useGetSignSvg } from "@/src/hooks/queries/useGetSignSvg"

export const SignVisualizer: React.FC = () => {
  const inputs = useWatch<DesignFormInputs>()

  const { data: svg, isLoading } = useGetSignSvg(inputs)

  if (!svg) {
    return null
  }

  return <div dangerouslySetInnerHTML={{ __html: svg }} />
}
