import { type SVGProps } from 'react'

export function SunIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d='M14.828 14.828a4 4 0 1 0-5.656-5.656 4 4 0 0 0 5.656 5.656zM6.343 17.657l-1.414 1.414M6.343 6.343 4.929 4.929M17.657 6.343l1.414-1.414M17.657 17.657l1.414 1.414M4 12H2M12 4V2M20 12h2M12 20v2' />
    </svg>
  )
}
