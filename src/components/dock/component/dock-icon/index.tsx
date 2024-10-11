import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ComponentPropsWithoutRef, useRef } from 'react'

import { motion, type MotionValue } from 'framer-motion'

import { Tooltip } from '@/components/tooltip'
import { useDockAnimation } from '@/hooks/use-dock-animation'
import { type NavigationLink } from '@/types/navigation-link'
import { cn } from '@/utils/cn'

const MotionLink = motion(Link)

interface DockIconProps extends Pick<ComponentPropsWithoutRef<'a'>, 'className'> {
  link: NavigationLink
  mouseX: MotionValue<number>
}

export function DockIcon({ className, link, mouseX }: DockIconProps) {
  const pathname = usePathname()

  const ref = useRef<HTMLAnchorElement>(null)

  const { animate, handleTap, handleTapCancel, handleTapStart, width } = useDockAnimation({
    mouseX,
    ref,
  })

  return (
    <li>
      <Tooltip content={link.tooltip}>
        {link.download ? (
          <motion.a
            animate={animate}
            className={cn(className, {
              'before:absolute before:-bottom-2 before:size-1.5 before:rounded-full before:bg-foreground/50':
                pathname === link.href,
            })}
            download
            href={link.href}
            onTap={handleTap}
            onTapCancel={handleTapCancel}
            onTapStart={handleTapStart}
            ref={ref}
            style={{ width } as unknown as { width: number }}
          >
            <span className='sr-only'>{link.tooltip}</span>
            <link.Icon className='size-2/3' />
          </motion.a>
        ) : (
          <MotionLink
            animate={animate}
            className={cn(className, {
              'before:absolute before:-bottom-2 before:size-1.5 before:rounded-full before:bg-foreground/50':
                pathname === link.href,
            })}
            href={link.href}
            onTap={handleTap}
            onTapCancel={handleTapCancel}
            onTapStart={handleTapStart}
            ref={ref}
            rel={link.isExternal ? 'noopener' : undefined}
            style={{ width } as unknown as { width: number }}
            target={link.isExternal ? '_blank' : undefined}
          >
            <span className='sr-only'>{link.tooltip}</span>
            <link.Icon className='size-2/3' />
          </MotionLink>
        )}
      </Tooltip>
    </li>
  )
}
