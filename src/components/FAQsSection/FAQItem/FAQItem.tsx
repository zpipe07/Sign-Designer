"use client"

import { useState } from "react"
import Collapse from "@mui/material/Collapse"
import ListItemButton from "@mui/material/ListItemButton"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

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
        <ListItemText primary={faq.question} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open}>
        <ListItemText secondary={faq.answer} />
      </Collapse>
    </ListItem>
  )
}
