import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { createClient } from "@supabase/supabase-js"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

import { Header } from "@/src/components/Header"
import theme from "../theme"

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <CssBaseline />

      <html lang="en">
        <Box
          component="body"
          className={inter.className}
          paddingBottom={4}
        >
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Header />

              <Container maxWidth="lg">{children}</Container>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Box>
      </html>
    </>
  )
}
