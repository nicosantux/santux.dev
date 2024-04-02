import { type SVGProps, type ReactElement } from 'react'

export interface NavigationLink {
  download?: boolean
  href: string
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement
  isExternal?: boolean
  tooltip: string
}
