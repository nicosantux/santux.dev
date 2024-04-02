import { Logo } from '@/icons/logo'

export default function Home() {
  return (
    <>
      <h1 className='mb-16 flex justify-center'>
        <span className='sr-only'>Santux</span>
        <Logo className='w-20' />
      </h1>
      <p className='text-center text-xl font-bold'>En construcción...</p>
    </>
  )
}
