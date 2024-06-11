import queryString from "query-string"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const useGetSignSvg = (
  inputs: DesignFormInputs,
  isThumbnail?: boolean,
) => {
  const queryClient = useQueryClient()

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
    queryKey: [
      `/api/v1/svg${isThumbnail ? "-thumbnail" : ""}`,
      inputs,
    ],
    queryFn: getSignSvg,
    initialData: () => {
      const cache = queryClient.getQueryCache()
      const queries = cache.findAll({
        queryKey: [`/api/v1/svg${isThumbnail ? "-thumbnail" : ""}`],
      })
      const previousQuery = queries[queries.length - 1]

      return previousQuery?.state.data as string
    },
  })
}
