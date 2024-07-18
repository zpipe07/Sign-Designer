import { ChangeEvent } from "react"
import { useSearchParams } from "next/navigation"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import NativeSelect from "@mui/material/NativeSelect"
import OutlinedInput from "@mui/material/OutlinedInput"

import { useGetProduct } from "@/src/hooks/queries/useGetProduct"

export const ColorFilterSelector: React.FC = () => {
  const params = useSearchParams()

  const { data } = useGetProduct(112)

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const url = new URL(window.location.toString())

    if (value === "all") {
      url.searchParams.delete("color")
    } else {
      url.searchParams.set("color", value)
    }

    history.pushState(null, "", url)
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel variant="outlined">Color</InputLabel>

      <NativeSelect
        onChange={handleChange}
        input={<OutlinedInput label="Color" />}
        defaultValue={params.get("color") || "all"}
      >
        <option value="all">All</option>

        {data?.productOptionsMap.color.values.map(({ label }) => {
          return (
            <option key={label} value={label}>
              {label}
            </option>
          )
        })}
      </NativeSelect>
    </FormControl>
  )
}
