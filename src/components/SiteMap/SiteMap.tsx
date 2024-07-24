import Link from "next/link"
import { Route } from "next"
import { List, ListItem, Link as MuiLink } from "@mui/material"

const PAGES: { title: string; href: Route }[] = [
  { title: "Contact us", href: "/contact-us" },
  { title: "FAQs", href: "/faqs" },
  { title: "Our work", href: "/our-work" },
]

export const SiteMap: React.FC = () => {
  return (
    <List disablePadding>
      {PAGES.map(({ title, href }) => {
        return (
          <ListItem key={title} disableGutters>
            <MuiLink component={Link} href={href} color="inherit">
              {title}
            </MuiLink>
          </ListItem>
        )
      })}
    </List>
  )
}
