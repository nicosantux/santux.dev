import { type SVGProps } from 'react'

export function ResumeIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d='M14 3v4a1 1 0 0 0 1 1h4' />
      <path d='M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z' />
      <path d='M11 12.5a1.5 1.5 0 0 0-3 0v3a1.5 1.5 0 0 0 3 0M13 11l1.5 6 1.5-6' />
    </svg>
  )
}
