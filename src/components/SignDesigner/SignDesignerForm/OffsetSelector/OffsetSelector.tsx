import { useRef } from "react"
import { useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import TextField from "@mui/material/TextField"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

type Props = {
  index: number
}

export const OffsetSelector: React.FC<Props> = ({ index }) => {
  const ref = useRef<HTMLDivElement>(null)

  const { register, setValue } = useFormContext()

  return (
    <Box
      sx={{
        position: "relative",
        flex: "0 0 100px",
      }}
      ref={ref}
    >
      <TextField
        type="number"
        label="Offset"
        inputProps={{
          step: "0.25",
          tabIndex: index === 1 ? 1 : 2,
        }}
        sx={{ flex: "0 0 100px" }}
        fullWidth
        {...register(`textLines.${index}.offset`)}
      />

      <ButtonGroup
        orientation="vertical"
        size="small"
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
        }}
      >
        <Button
          variant="contained"
          sx={{ borderRadius: 1 }}
          onClick={() => {
            const input = ref.current?.querySelector("input")
            input?.stepUp()
            setValue(`textLines.${index}.offset`, input?.value)
          }}
        >
          <ArrowDropUpIcon />
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: 1 }}
          onClick={() => {
            const input = ref.current?.querySelector("input")
            input?.stepDown()
            setValue(`textLines.${index}.offset`, input?.value)
          }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
    </Box>
  )
}
