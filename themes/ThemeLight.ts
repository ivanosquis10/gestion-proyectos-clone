import { createTheme } from '@mui/material'

export const ThemeLight = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8f5f2',
    },
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
})
