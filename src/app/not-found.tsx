import Image from 'next/image'
import Link from 'next/link'

import notFound from './assets/not-found.gif'

export default function NotFound() {
  return (
    <div className='grid h-full place-items-center'>
      <div className='flex flex-col items-center gap-6'>
        <h1 className='text-xl font-bold'>Oops! Esta página no exite</h1>
        <Image alt='' className='aspect-video w-[420px]' src={notFound} />
        <Link className='font-bold text-accent' href='/'>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
