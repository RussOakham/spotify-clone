'use client'

import { useEffect } from 'react'
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'

import useAuthModal from '@/hooks/useAuthModal'

import Modal from './Modal'

const AuthModal: React.FC = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const { onClose, isOpen } = useAuthModal()

  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [onClose, router, session])

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  )
}

export default AuthModal
