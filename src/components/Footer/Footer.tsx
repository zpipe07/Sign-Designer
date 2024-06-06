"use client"

import { Box, Container, Typography, useTheme } from "@mui/material"

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
        <Typography>SIGN GENIE — All Rights Reserved</Typography>
      </Container>
    </Box>
  )
}
