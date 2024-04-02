import { type SVGProps } from 'react'

export function CommandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill='none'
      height='24'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M0 0h24v24H0z' fill='none' stroke='none' />
      <path d='M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10' />
    </svg>
  )
}
