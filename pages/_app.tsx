import type { AppProps } from 'next/app'

import { SnackbarProvider } from 'notistack'
import { EntriesProvider } from '@/context/entries'
import { UIProvider } from '@/context/ui'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { Roboto } from 'next/font/google'
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

import { ThemeDark } from '../themes'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={ThemeDark}>
            <div className={`${roboto.className}`}>
              <CssBaseline />
              <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}
