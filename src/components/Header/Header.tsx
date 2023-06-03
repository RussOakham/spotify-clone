'use client'

import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import Button from '../Button/Button'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Implement logout
    router.push('/')
  }

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            type="button"
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
            onClick={() => router.forward()}
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <button
            type="button"
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div>
            <Button
              className="bg-transparent font-medium text-neutral-300"
              onClick={() => {}}
            >
              Sign up!
            </Button>
          </div>
          <div>
            <Button className="bg-white px-6 py-2" onClick={() => {}}>
              Login!
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
