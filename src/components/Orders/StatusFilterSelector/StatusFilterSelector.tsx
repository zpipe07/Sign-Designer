import { ChangeEvent } from "react"
import { useSearchParams } from "next/navigation"
import {
  FormControl,
  InputLabel,
  NativeSelect,
  OutlinedInput,
} from "@mui/material"

import { orderStatuses } from "@/src/lib/bigcommerce/constants"
import { STATUS_ID_MAP } from "@/src/lib/bigcommerce/types"

export const StatusFilterSelector: React.FC = () => {
  const params = useSearchParams()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const url = new URL(window.location.toString())

    if (value === "all") {
      url.searchParams.delete("status_id")
    } else {
      url.searchParams.set("status_id", value)
    }

    history.pushState(null, "", url)
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel variant="outlined">Order status</InputLabel>

      <NativeSelect
        onChange={handleChange}
        input={<OutlinedInput label="Order status" />}
        defaultValue={params.get("status_id") || "all"}
      >
        <option value="all">All</option>

        {orderStatuses.map((status) => {
          return (
            <option key={status} value={STATUS_ID_MAP[status]}>
              {status}
            </option>
          )
        })}
      </NativeSelect>
    </FormControl>
  )
}
