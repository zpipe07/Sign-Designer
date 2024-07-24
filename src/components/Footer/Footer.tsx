"use client"

import { Box, Container, Typography, useTheme } from "@mui/material"

import { SiteMap } from "@/src/components/SiteMap"

export const Footer: React.FC = () => {
  const theme = useTheme()

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography>SIGN GENIE — All Rights Reserved</Typography>

          <SiteMap />
        </Box>
      </Container>
    </Box>
  )
}
