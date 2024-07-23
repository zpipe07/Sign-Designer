import queryString from "query-string"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useGetSignSvg = (
  inputs: DesignFormInputs,
  queryKeySuffix?: string,
  enabled = true,
  showShadow?: boolean,
  validate?: boolean,
) => {
  // const queryClient = useQueryClient()

  const getSignSvg = async (
    { signal }: any,
    inputs: DesignFormInputs,
    // queryKeySuffix?: string,
    // enabled = true,
    showShadow?: boolean,
    validate?: boolean,
  ) => {
    console.log("getSignSvg()")
    console.log({ inputs, showShadow, validate })
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
    // initialData: () => {
    //   const cache = queryClient.getQueryCache()
    //   const queries = cache.findAll({
    //     queryKey: [
    //       `/api/v1/svg${queryKeySuffix ? `-${queryKeySuffix}` : ""}`,
    //     ],
    //   })
    //   const previousQuery = queries[queries.length - 1]

    //   return previousQuery?.state.data as string
    // },
    enabled,
  })
}
