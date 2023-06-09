'use client'

import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

import useAuthModal from '@/hooks/useAuthModal'
import useOnPlay from '@/hooks/useOnPlay'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'

import MediaItem from '../MediaItem/MediaItem'

interface LibraryProps {
  songs: Song[]
}

const Library = ({ songs }: LibraryProps) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const subscribeModal = useSubscribeModal()
  const { user, subscription } = useUser()

  const onPlay = useOnPlay(songs)

  const onClick = () => {
    if (!user) return authModal.onOpen()

    if (!subscription) return subscribeModal.onOpen()

    return uploadModal.onOpen()
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-md font-medium text-neutral-400">Your library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            data={song}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
