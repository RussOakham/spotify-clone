'use client'

import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { usePathname } from 'next/navigation'

import { Song } from '@/types'

import Box from '../Box/Box'
import Library from '../Library/Library'

import SidebarItem from './SidebarItem'

interface SidebarProps {
  children: React.ReactNode
  songs: Song[]
}

const Sidebar = ({ children, songs }: SidebarProps) => {
  const pathname = usePathname()
  const routes = useMemo(
    () => [
      {
        label: 'Home',
        href: '/',
        Icon: HiHome,
        active: pathname !== '/search',
      },
      {
        label: 'Search',
        href: '/search',
        Icon: BiSearch,
        active: pathname === '/search',
      },
    ],
    [pathname]
  )

  return (
    <div className="flex h-full">
      <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
        <Box>
          <div className="gap-yp4 flex flex-col px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  )
}

export default Sidebar
