"use client"

import { useState } from "react"
import Collapse from "@mui/material/Collapse"
import ListItemButton from "@mui/material/ListItemButton"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { Typography } from "@mui/material"

type Props = {
  faq: { question: string; answer: string }
}

export const FAQItem: React.FC<Props> = ({ faq }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <ListItem disableGutters sx={{ display: "block" }}>
      <ListItemButton onClick={handleClick}>
        <ListItemText>
          <Typography variant="h5">{faq.question}</Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open}>
        <ListItemText>
          <Typography>{faq.answer}</Typography>
        </ListItemText>
      </Collapse>
    </ListItem>
  )
}
