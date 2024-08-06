import { useState } from "react"
import Button from "@mui/material/Button"
import Collapse from "@mui/material/Collapse"
import Box from "@mui/material/Box"
// import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

import { SignsShopFiltersForm } from "@/src/components/SignsShopFiltersForm"

type Props = {
  onSubmit: any
}

export const SignsShopFilters: React.FC<Props> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Box marginBottom={1}>
      <Box textAlign="right">
        <Button
          startIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleClick}
        >
          Preview options
        </Button>
      </Box>

      <Collapse in={isOpen}>
        <Card variant="outlined" sx={{ padding: 1 }}>
          {/* <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Choose your options and click apply to update the signs
            below.
          </Typography> */}

          <SignsShopFiltersForm onSubmit={onSubmit} />
        </Card>
      </Collapse>
    </Box>
  )
}
