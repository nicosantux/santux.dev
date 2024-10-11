'use client'

import dynamic from 'next/dynamic'
import { type ComponentPropsWithoutRef, useRef } from 'react'

import { AnimatePresence, motion, type MotionValue } from 'framer-motion'
import { useTheme } from 'next-themes'

import { useDockAnimation } from '@/hooks/use-dock-animation'
import { useThrottle } from '@/hooks/use-throttle'
import { MoonIcon } from '@/icons/moon'
import { SunIcon } from '@/icons/sun'
import { cn } from '@/utils/cn'

import { Tooltip } from '../tooltip'

interface ThemeToggleButtonProps extends Pick<ComponentPropsWithoutRef<'button'>, 'className'> {
  mouseX: MotionValue<number>
}

const variants = {
  animate: { opacity: 1, rotate: 0, x: 0, y: 0 },
  exit: { opacity: 0, rotate: 180, x: 24, y: 24 },
  initial: { opacity: 1, rotate: -180, x: -24, y: 24 },
}

function Toggle({ className, mouseX }: ThemeToggleButtonProps) {
  const { theme, setTheme } = useTheme()
  const ref = useRef<HTMLButtonElement>(null)

  const { animate, handleTap, handleTapCancel, handleTapStart, width } = useDockAnimation({
    mouseX,
    ref,
  })

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Tooltip content={theme === 'light' ? 'Cambiar al modo oscuro' : 'Cambiar al modo claro'}>
      <motion.button
        animate={animate}
        aria-label={theme === 'ligth' ? 'Cambiar al modo oscuro' : 'Cambiar al modo claro'}
        className={cn(className, 'touch-none select-none overflow-hidden')}
        onClick={useThrottle(handleClick, 700)}
        onTap={useThrottle(handleTap, 700)}
        onTapCancel={handleTapCancel}
        onTapStart={useThrottle(handleTapStart, 700)}
        ref={ref}
        style={{ width } as unknown as { width: number }}
      >
        <AnimatePresence initial={false} mode='popLayout'>
          <motion.span
            animate='animate'
            className='inline-flex w-full items-center justify-center'
            exit='exit'
            initial='initial'
            key={theme}
            transition={{ type: 'spring', mass: 0.2, damping: 20, stiffness: 200 }}
            variants={variants}
          >
            {theme === 'dark' ? (
              <SunIcon className='size-2/3' />
            ) : (
              <MoonIcon className='size-2/3' />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </Tooltip>
  )
}

// eslint-disable-next-line @typescript-eslint/require-await
export const ThemeToggleButton = dynamic(async () => Toggle, {
  ssr: false,
  loading: () => {
    return (
      <button className='inline-flex aspect-square size-10 items-center justify-center rounded-full border border-dock-border bg-dock-icon text-dock-foreground'>
        <SunIcon className='hidden size-2/3 dark:block' />
        <MoonIcon className='size-2/3 dark:hidden' />
      </button>
    )
  },
})
