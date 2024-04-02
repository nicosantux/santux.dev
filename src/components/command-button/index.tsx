import { useRef, type ComponentPropsWithoutRef } from 'react'

import { motion, type MotionValue } from 'framer-motion'

import { useDockAnimation } from '@/hooks/use-dock-animation'
import { CommandIcon } from '@/icons/command'
import { cn } from '@/utils/cn'

import { Tooltip } from '../tooltip'

interface CommandButtonProps extends Pick<ComponentPropsWithoutRef<'button'>, 'className'> {
  mouseX: MotionValue<number>
}

export function CommandButton({ className, mouseX }: CommandButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const { animate, handleTap, handleTapCancel, handleTapStart, width } = useDockAnimation({
    mouseX,
    ref,
  })

  const handleClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    })

    document.dispatchEvent(event)
  }

  return (
    <Tooltip content='⌘ K'>
      <motion.button
        animate={animate}
        className={cn('touch-none select-none', className)}
        onClick={handleClick}
        onTap={handleTap}
        onTapCancel={handleTapCancel}
        onTapStart={handleTapStart}
        ref={ref}
        style={{ width }}
      >
        <CommandIcon className='size-2/3' />
      </motion.button>
    </Tooltip>
  )
}
