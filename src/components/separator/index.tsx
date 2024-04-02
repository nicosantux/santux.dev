'use client'

import { type ComponentPropsWithoutRef } from 'react'

import { Root } from '@radix-ui/react-separator'

import { cn } from '@/utils/cn'

type SeparatorProps = ComponentPropsWithoutRef<typeof Root>

export function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
  return (
    <Root
      className={cn(
        'shrink-0 bg-foreground',
        orientation === 'horizontal' ? 'h-[1px]' : 'w-[1px]',
        className,
      )}
      decorative
      orientation={orientation}
      {...props}
    />
  )
}
