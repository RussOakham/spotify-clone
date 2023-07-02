'use client'

import { useEffect, useState } from 'react'

import AuthModal from '@/components/Modal/AuthModal'
import SubscribeModal from '@/components/Modal/SubscribeModal'
import UploadModal from '@/components/Modal/UploadModal'
import { ProductWithPrice } from '@/types'

interface ModalProviderProps {
  products: ProductWithPrice[]
}

const ModalProvider = ({ products }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  )
}

export default ModalProvider
