import { type SVGProps } from 'react'

export function BlogIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M0 0h24v24H0z' stroke='none' />
      <path d='M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1-4 0V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a3 3 0 0 0 3 3h11M8 8h4M8 12h4M8 16h4' />
    </svg>
  )
}
