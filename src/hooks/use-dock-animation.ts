import { type RefObject, useCallback } from 'react'

import { useAnimationControls, useSpring, useTransform, type MotionValue } from 'framer-motion'

interface DockAnimation<T extends HTMLElement | null> {
  mouseX: MotionValue<number>
  ref: RefObject<T>
}

export function useDockAnimation<T extends HTMLElement | null>({ mouseX, ref }: DockAnimation<T>) {
  const animate = useAnimationControls()

  const distance = useTransform(mouseX, (value) => {
    const { x, width } = ref.current?.getBoundingClientRect() ?? { x: 1, width: 0 }

    return value - x - width / 2
  })

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const width = useSpring(widthTransform, { mass: 0.2, damping: 15, stiffness: 200 })

  const handleTap = useCallback(() => {
    void animate.start({ y: [4, -8, 0] }, { type: 'tween' })
  }, [animate])

  const handleTapCancel = useCallback(() => {
    void animate.start({ y: 0 })
  }, [animate])

  const handleTapStart = useCallback(() => {
    void animate.start({ y: 8 })
  }, [animate])

  return { animate, handleTap, handleTapCancel, handleTapStart, width }
}
