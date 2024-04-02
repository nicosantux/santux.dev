'use client'

import { useState, type ReactNode } from 'react'

import { Provider, Root, Trigger, Portal, Content } from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'

interface TooltipProps {
  children: ReactNode
  content: string
}

const variants = {
  show: { scale: 1, y: 0, opacity: 1 },
  hidden: { scale: 0.5, y: 8, opacity: 0 },
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Provider delayDuration={300}>
      <Root onOpenChange={setIsOpen} open={isOpen}>
        <Trigger asChild>{children}</Trigger>
        <AnimatePresence>
          {isOpen ? (
            <Portal forceMount>
              <Content sideOffset={12}>
                <motion.span
                  animate='show'
                  className='z-50 overflow-hidden rounded-md border border-dock-border bg-dock-icon px-3 py-2 text-lg font-medium text-dock-foreground shadow'
                  exit='hidden'
                  initial='hidden'
                  transition={{ type: 'spring', duration: 0.3 }}
                  variants={variants}
                >
                  {content}
                </motion.span>
              </Content>
            </Portal>
          ) : null}
        </AnimatePresence>
      </Root>
    </Provider>
  )
}
