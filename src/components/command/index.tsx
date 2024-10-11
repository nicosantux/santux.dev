'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog'
import { Command as Cmdk } from 'cmdk'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const overlayVariants = {
  hide: { opacity: 0 },
  show: { opacity: 1 },
}

const dialogVariants = {
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9 },
  initial: { opacity: 0.5, scale: 0.9 },
}

interface Cmd {
  heading: string
  items: { label: string; action: () => void }[]
}

export function Command() {
  const [open, setOpen] = useState(false)
  const { setTheme } = useTheme()
  const router = useRouter()

  const cmd: readonly Readonly<Cmd>[] = [
    {
      heading: 'Páginas',
      items: [
        { label: 'Inicio', action: () => router.push('/') },
        { label: 'Blog', action: () => router.push('/blog') },
      ],
    },
    {
      heading: 'Social',
      items: [
        {
          label: 'Descarga mi cv',
          action: () => {
            const resumePath = './nicolas-santuccio-resume.pdf'
            const link = document.createElement('a')

            link.href = resumePath
            link.setAttribute('download', 'nicolas-santuccio-resume.pdf')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          },
        },
        { label: 'Envíame un mail', action: () => window.open('mailto:nico.santuccio@gmail.com') },
        {
          label: 'Conectar en LinkedIn',
          action: () =>
            window.open('https://www.linkedin.com/in/nicosantuccio/', '_blank', 'noopener'),
        },
        {
          label: 'Sígueme en GitHub',
          action: () => window.open('https://github.com/nicosantux', '_blank', 'noopener'),
        },
      ],
    },
    {
      heading: 'Modo de color',
      items: [
        { label: 'Modo claro', action: () => setTheme('light') },
        { label: 'Modo oscuro', action: () => setTheme('dark') },
      ],
    },
  ]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((open) => !open)
      }

      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Root onOpenChange={setOpen} open={open}>
      <AnimatePresence>
        {open ? (
          <Portal forceMount>
            <Overlay asChild forceMount>
              <motion.div
                animate='show'
                className='fixed inset-0 z-50 bg-dock/50 backdrop-blur'
                exit='hide'
                initial='hide'
                transition={{ duration: 0.1 }}
                variants={overlayVariants}
              />
            </Overlay>
            <Content asChild forceMount>
              <motion.div
                animate='animate'
                className='fixed left-1/2 top-4 z-50 w-[min(420px,100%-2rem)] rounded-md bg-code shadow-lg [translate:-50%_0] md:top-1/2 md:[translate:-50%_-50%]'
                exit='exit'
                initial='initial'
                transition={{ type: 'spring', duration: 0.2 }}
                variants={dialogVariants}
              >
                <Cmdk>
                  <Cmdk.Input
                    className='w-full border-b border-border bg-transparent p-3 focus:outline-none'
                    placeholder='Escribe un comando o busca...'
                  />
                  <Cmdk.List className='max-h-[421px] overflow-y-auto overflow-x-hidden'>
                    <Cmdk.Empty className='px-3 py-2'>No results found.</Cmdk.Empty>
                    {cmd.map(({ heading, items }) => {
                      return (
                        <Cmdk.Group heading={heading} key={heading}>
                          {items.map(({ action, label }) => {
                            return (
                              <Cmdk.Item
                                key={label}
                                onSelect={() => {
                                  action()
                                  setOpen(false)
                                }}
                              >
                                {label}
                              </Cmdk.Item>
                            )
                          })}
                        </Cmdk.Group>
                      )
                    })}
                  </Cmdk.List>
                </Cmdk>
              </motion.div>
            </Content>
          </Portal>
        ) : null}
      </AnimatePresence>
    </Root>
  )
}
