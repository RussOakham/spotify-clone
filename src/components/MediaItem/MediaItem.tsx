'use client'

import Image from 'next/image'

import useLoadImage from '@/hooks/useLoadImage'
import usePlayer from '@/hooks/usePlayer'
import { Song } from '@/types'

interface MediaItemProps {
  data: Song
  onClick?: (id: string) => void
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const player = usePlayer()
  const imageUrl = useLoadImage(data)

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id)
    }

    return player.setId(data.id)
  }

  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50"
      onClick={handleClick}
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          src={imageUrl ?? '/images/liked.png'}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white">{data.title}</p>
        <p className="truncate text-sm text-neutral-400">{data.author}</p>
      </div>
    </button>
  )
}

export default MediaItem
