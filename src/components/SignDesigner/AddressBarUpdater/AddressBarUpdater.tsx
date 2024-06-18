import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useWatch } from "react-hook-form"
import queryString from "query-string"

import { DesignFormInputs } from "@/src/components/SignDesigner/types"

export const AddressBarUpdater: React.FC = () => {
  const router = useRouter()

  const inputs = useWatch<DesignFormInputs>()

  const pathname = usePathname()

  useEffect(() => {
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
  }, [inputs, pathname, router])

  return null
}
