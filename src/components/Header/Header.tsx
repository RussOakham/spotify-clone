'use client'

import toast from 'react-hot-toast'
import { BiSearch } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import useAuthModal from '@/hooks/useAuthModal'
import usePlayer from '@/hooks/usePlayer'
import { useUser } from '@/hooks/useUser'

import Button from '../Button/Button'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter()
  const player = usePlayer()
  const { onOpen } = useAuthModal()
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    player.reset()
    router.refresh()

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out successfully!')
    }
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
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button
                type="button"
                onClick={handleLogout}
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <Button
                type="button"
                onClick={() => router.push('/account')}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              {' '}
              <div>
                <Button
                  type="button"
                  className="bg-transparent font-medium text-neutral-300"
                  onClick={onOpen}
                >
                  Sign up!
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  className="bg-white px-6 py-2"
                  onClick={onOpen}
                >
                  Login!
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
