'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'

interface LikeButtonProps {
  songId: string
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const router = useRouter()
  const { supabaseClient } = useSessionContext()
  const authModal = useAuthModal()
  const { user } = useUser()

  useEffect(() => {
    if (!user?.id) return

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData().catch(console.error)
  }, [songId, supabaseClient, user?.id])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen()
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(false)
      }
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({ user_id: user.id, song_id: songId })

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(true)
        toast.success('Liked!')
      }
    }

    return router.refresh()
  }

  return (
    <button
      type="button"
      className="transition hover:opacity-75"
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  )
}

export default LikeButton
