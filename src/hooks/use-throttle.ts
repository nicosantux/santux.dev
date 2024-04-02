import { useRef } from 'react'

export function useThrottle(fn: () => void, limit = 300) {
  const lastRun = useRef(Date.now())

  return () => {
    if (Date.now() - lastRun.current >= limit) {
      fn()
      lastRun.current = Date.now()
    }
  }
}
