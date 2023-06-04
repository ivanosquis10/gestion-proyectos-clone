import { createTheme } from '@mui/material'

export const ThemeDark = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f0e17',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#4338ca',
        },
      },
    },
  },
})
