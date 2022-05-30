import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import App from './App'
import theme from './theme'
import { en } from 'make-plural/plurals'

i18n.loadLocaleData('en', { plurals: en })
async function activate(locale: string) {
  const messages = await import(`./locale/${locale}.json`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

activate('en').then()

const container: HTMLElement = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <App />
    </I18nProvider>
  </ThemeProvider>
)
