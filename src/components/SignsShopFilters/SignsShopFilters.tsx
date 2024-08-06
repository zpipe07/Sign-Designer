import { useState } from "react"
import Button from "@mui/material/Button"
import Collapse from "@mui/material/Collapse"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

import { SignsShopFiltersForm } from "@/src/components/SignsShopFiltersForm"
import { ShopFiltersInputs } from "@/src/components/SignsShop"

type Props = {
  onSubmit: (data: ShopFiltersInputs) => void
}

export const SignsShopFilters: React.FC<Props> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Box marginBottom={2}>
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
          <SignsShopFiltersForm onSubmit={onSubmit} />
        </Card>
      </Collapse>
    </Box>
  )
}
