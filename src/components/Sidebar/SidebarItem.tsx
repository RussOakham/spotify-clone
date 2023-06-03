import { IconType } from 'react-icons'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface SidebarItemProps {
  Icon: IconType
  label: string
  href: string
  active?: boolean
}

const SidebarItem = ({ Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `text-md flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 font-medium text-neutral-400 transition hover:text-white`,
        active && `text-white`
      )}
    >
      <Icon size={26} />
      <p className="w-full truncate">{label}</p>
    </Link>
  )
}

export default SidebarItem
