import queryString from "query-string"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useGetSignSvg = (
  inputs: DesignFormInputs,
  queryKeySuffix?: string,
  enabled = true,
  showShadow?: boolean,
  validate?: boolean,
) => {
  const getSignSvg = async (
    { signal }: any,
    inputs: DesignFormInputs,
    showShadow?: boolean,
    validate?: boolean,
  ) => {
    const formattedInputs = {
      ...inputs,
      ...(showShadow && { showShadow }),
      ...(validate && { validate }),
      textLines: JSON.stringify(
        // inputs.textLines.map((line) => line.value),
        inputs.textLines,
      ),
    }
    const qs = queryString.stringify(formattedInputs, {
      arrayFormat: "bracket",
    })

    const res = await fetch(`/api/v1/svg?${qs}`, { signal })
    const svg = await res.text()

    return svg
  }

  return useQuery<string>({
    queryKey: [
      `/api/v1/svg${queryKeySuffix ? `-${queryKeySuffix}` : ""}`,
      inputs,
      showShadow,
      validate,
    ],
    queryFn: (arg) => getSignSvg(arg, inputs, showShadow, validate),
    placeholderData: keepPreviousData,
    enabled,
  })
}
