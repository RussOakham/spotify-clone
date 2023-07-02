'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useUser } from '@/hooks/useUser'
import { postData } from '@/libs/helpers'
import getStripe from '@/libs/stripeClient'
import { Price, ProductWithPrice } from '@/types'

import Button from '../Button/Button'

import Modal from './Modal'

interface SubscribeModalProps {
  products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-Uk', {
    style: 'currency',
    currency: price.currency,
  }).format((price?.unit_amount ?? 0) / 100)

  return priceString
}

const SubscribeModal = ({ products }: SubscribeModalProps) => {
  const [priceIdLoading, setPriceIdLoading] = useState('')
  const { isLoading, user, subscription } = useUser()
  const subscribeModal = useSubscribeModal()

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose()
    }
  }

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id)

    if (!user) {
      setPriceIdLoading('')
      return toast.error('You must be logged in to subscribe')
    }

    if (subscription) {
      setPriceIdLoading('')
      return toast('Already subscribed')
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
      })

      const stripe = await getStripe()

      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      setPriceIdLoading('')
      return toast.error((error as Error)?.message)
    } finally {
      setPriceIdLoading('')
    }

    return null
  }

  let content = <div className="text-center">No products available</div>

  if (products.length > 0) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              type="button"
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
            >
              {`Subscribe for ${formatPrice(price)}`}
            </Button>
          ))
        })}
      </div>
    )
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed</div>
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium."
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  )
}

export default SubscribeModal
