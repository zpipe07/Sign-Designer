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
          inputs.textLines?.map(({ value }) => value),
        ),
      })
      const url = `${pathname}?${qs}`

      // @ts-ignore
      router.replace(url)
    }
  }, [inputs, pathname, router])

  return null
}
