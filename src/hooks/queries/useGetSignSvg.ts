import queryString from "query-string"
import { useQuery } from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useGetSignSvg = (inputs: DesignFormInputs) => {
  const getSignSvg = async () => {
    const formattedInputs = {
      ...inputs,
      textLines: JSON.stringify(
        inputs.textLines.map((line) => line.value),
      ),
    }
    const qs = queryString.stringify(formattedInputs, {
      arrayFormat: "bracket",
    })
    const res = await fetch(`/api/v1/svg?${qs}`)
    const svg = await res.text()

    return svg
  }

  return useQuery<string>({
    queryKey: ["/api/v1/svg", inputs],
    queryFn: getSignSvg,
  })
}
