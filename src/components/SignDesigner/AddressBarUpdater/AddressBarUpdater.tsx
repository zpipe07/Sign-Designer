import { useEffect, useMemo } from "react"
import { usePathname } from "next/navigation"
import { useWatch } from "react-hook-form"
import queryString from "query-string"
import debounce from "@mui/material/utils/debounce"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const AddressBarUpdater: React.FC = () => {
  const inputs = useWatch<DesignFormInputs>()

  const pathname = usePathname()

  const updateAddressBar = useMemo(
    () =>
      debounce((inputs, pathname) => {
        if (inputs) {
          const qs = queryString.stringify({
            ...inputs,
            textLines: JSON.stringify(
              // inputs.textLines?.map(({ value }) => value),
              inputs.textLines,
            ),
          })
          const url = `${pathname}?${qs}`

          window.history.replaceState(
            { ...window.history.state, as: url, url },
            "",
            url,
          )
        }
      }, 500),
    [],
  )

  useEffect(() => {
    updateAddressBar(inputs, pathname)
  }, [inputs, pathname, updateAddressBar])

  return null
}
