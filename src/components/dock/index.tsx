'use client'

import { Fragment, type MouseEvent } from 'react'

import { useMotionValue } from 'framer-motion'

import { BlogIcon } from '@/icons/blog'
import { GithubIcon } from '@/icons/github'
import { HomeIcon } from '@/icons/home'
import { LinkedInIcon } from '@/icons/linkedin'
import { MailIcon } from '@/icons/mail'
import { ResumeIcon } from '@/icons/resume'
import { type NavigationLink } from '@/types/navigation-link'

import { CommandButton } from '../command-button'
import { Separator } from '../separator'
import { ThemeToggleButton } from '../theme-toggle-button'

import { DockIcon } from './component/dock-icon'

const links: readonly (readonly NavigationLink[])[] = [
  [
    { href: '/', Icon: HomeIcon, tooltip: 'Inicio' },
    { href: '/blog', Icon: BlogIcon, tooltip: 'Blog' },
  ],
  [
    { href: 'mailto:nico.santuccio@gmail.com', Icon: MailIcon, tooltip: 'Envíame un mail' },
    {
      Icon: ResumeIcon,
      download: true,
      href: './nicolas-santuccio-resume.pdf',
      tooltip: 'Descarga mi curriculum',
    },
    {
      href: 'https://www.linkedin.com/in/nicosantuccio/',
      Icon: LinkedInIcon,
      isExternal: true,
      tooltip: 'Conectar en LinkedIn',
    },
    {
      href: 'https://github.com/nicosantux',
      Icon: GithubIcon,
      isExternal: true,
      tooltip: 'Sígueme en GitHub',
    },
  ],
]

const dockIconBaseClasses =
  'relative flex aspect-square items-center justify-center rounded-full border border-dock-border bg-dock-icon text-dock-foreground focus-ring'

export function Dock() {
  return (
    <footer className='sticky bottom-4 mx-auto my-4 w-fit rounded-2xl border border-dock-border bg-dock/70 px-4 backdrop-blur-md'>
      <DesktopDock />
      <MobileDock />
    </footer>
  )
}

function DesktopDock() {
  const mouseX = useMotionValue(Infinity)

  const handleMouseLeave = () => {
    mouseX.set(Infinity)
  }

  const handleOnMouseMove = ({ pageX }: MouseEvent) => {
    mouseX.set(pageX)
  }

  return (
    <div
      className='hidden h-14 items-end gap-4 pb-2 sm:flex'
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleOnMouseMove}
    >
      <nav aria-label='Navegación principal'>
        <ul className='mx-auto flex items-end gap-4'>
          {links.map((group, groupIdx) => {
            return group.map((link, linkIdx) => {
              return (
                <Fragment key={link.tooltip}>
                  <DockIcon className={dockIconBaseClasses} link={link} mouseX={mouseX} />
                  {links.length - 1 !== groupIdx && group.length - 1 === linkIdx && (
                    <Separator className='h-8 bg-dock-border' orientation='vertical' />
                  )}
                </Fragment>
              )
            })
          })}
        </ul>
      </nav>
      <Separator className='h-8 bg-dock-border' orientation='vertical' />
      <CommandButton className={dockIconBaseClasses} mouseX={mouseX} />
      <ThemeToggleButton className={dockIconBaseClasses} mouseX={mouseX} />
    </div>
  )
}

function MobileDock() {
  const mouseX = useMotionValue(Infinity)

  return (
    <div className='flex h-14 items-end gap-4 pb-2 sm:hidden'>
      <nav aria-label='Navegación principal'>
        <ul className='mx-auto flex items-end gap-4'>
          {links[0].map((link) => {
            return (
              <DockIcon
                className={dockIconBaseClasses}
                key={link.tooltip}
                link={link}
                mouseX={mouseX}
              />
            )
          })}
        </ul>
      </nav>
      <Separator className='h-8 bg-dock-border' orientation='vertical' />
      <CommandButton className={dockIconBaseClasses} mouseX={mouseX} />
      <ThemeToggleButton className={dockIconBaseClasses} mouseX={mouseX} />
    </div>
  )
}
