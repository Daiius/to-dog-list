import { createRoot } from 'react-dom/client'

import { SettingsProvider } from '@/providers/SettingsProvider'
import { ThemeProvider } from 'next-themes'

import { MainContainer } from '@/components/domain/MainContainer'
import { Header } from '@/components/domain/Header'

import '@/globals.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <ThemeProvider attribute="class" enableSystem={true}>
    <SettingsProvider>
      <Header />
      <MainContainer />
    </SettingsProvider>
  </ThemeProvider>,
)
