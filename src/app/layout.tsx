import { type Metadata } from 'next'
import localFont from 'next/font/local'
import { type ReactNode } from 'react'

import { Command } from '@/components/command'
import { Dock } from '@/components/dock'
import { Logo } from '@/icons/logo'
import { ThemeProvider } from '@/providers/theme-provider'

import './globals.css'

const cabinet = localFont({
  src: './assets/fonts/cabinet-grotesk-variable.woff2',
  display: 'swap',
  variable: '--font-cabinet',
})

const satoshi = localFont({
  src: './assets/fonts/satoshi-variable.woff2',
  display: 'optional',
  variable: '--font-satoshi',
})

export const metadata: Metadata = {
  title: 'santux.dev',
  description: 'Generated by create next app',
}

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body
        className={`${cabinet.variable} ${satoshi.variable} grid min-h-dvh grid-rows-[1fr_auto] bg-background font-sans text-foreground antialiased [text-rendering:optimizeLegibility] selection:bg-accent selection:text-background`}
      >
        <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange>
          <main className='mx-auto w-[min(70ch,100%-2.5rem)] overflow-x-hidden px-1 py-20'>
            <h1 className='mb-16 flex justify-center'>
              <span className='sr-only'>Santux</span>
              <Logo className='w-20' />
            </h1>
            {children}
          </main>
          <Command />
          <Dock />
        </ThemeProvider>
      </body>
    </html>
  )
}
