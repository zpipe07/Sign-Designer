"use client"

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"

import theme from "@/src/theme"

const queryClient = new QueryClient()

type Props = { children: React.ReactNode }

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </QueryClientProvider>
  )
}
