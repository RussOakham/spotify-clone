'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button/Button'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useUser } from '@/hooks/useUser'
import { postData } from '@/libs/helpers'

const AccountContent: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const subscribeModal = useSubscribeModal()
  const { isLoading, subscription, user } = useUser()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, router, user])

  const redirectToCustomerPortal = async () => {
    setLoading(true)

    try {
      const { url } = await postData({
        url: '/api/create-portal-link',
      })
      window.location.assign(url)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-7 px-6">
      {!subscription ? (
        <div className="flex flex-col gap-y-4">
          <p>No active subscription.</p>
          <Button
            type="button"
            className="w-[300px]"
            onClick={subscribeModal.onOpen}
          >
            Subscribe
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{' '}
            <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            type="button"
            className="w-[300px]"
            disabled={loading ?? isLoading}
            onClick={redirectToCustomerPortal}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  )
}

export default AccountContent
