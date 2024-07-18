import { Select } from "@mui/material"

import { orderStatuses } from "@/src/lib/bigcommerce/constants"
import { STATUS_ID_MAP } from "@/src/lib/bigcommerce/types"

export const StatusSelector: React.FC = () => {
  const handleChange = (event: any) => {
    const url = new URL(window.location.toString())

    url.searchParams.set("status_id", event.target.value)
    history.pushState(null, "", url)
  }

  return (
    <Select native onChange={handleChange}>
      {orderStatuses.map((status) => {
        return (
          <option key={status} value={STATUS_ID_MAP[status]}>
            {status}
          </option>
        )
      })}
    </Select>
  )
}
