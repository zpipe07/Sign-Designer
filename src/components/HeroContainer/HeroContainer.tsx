import { useTheme } from "@mui/material"
import Box from "@mui/material/Box"

type Props = {
  children: React.ReactNode
}

export const HeroContainer: React.FC<Props> = ({ children }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: theme.palette.primary.light,
        paddingTop: 4,
        paddingBottom: 4,
        boxShadow: `0px 3px 0 0px ${theme.palette.primary.main} inset, 0px -3px 0 0px ${theme.palette.primary.main} inset`,

        "&:before, &:after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "calc((100vw - 100%) / 2)",
          backgroundColor: theme.palette.primary.light,
          boxShadow: "inherit",
        },

        "&:before": {
          right: "100%",
        },

        "&:after": {
          left: "100%",
        },
      }}
    >
      {children}
    </Box>
  )
}
