'use client'

import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'

import { Song } from '@/types'

import LikeButton from '../Button/LikeButton'
import MediaItem from '../MediaItem.tsx/MediaItem'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  // eslint-disable-next-line no-constant-condition
  const Icon = true ? BsPauseFill : BsPlayFill
  // eslint-disable-next-line no-constant-condition
  const VolumeIcon = true ? HiSpeakerXMark : HiSpeakerWave

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <button
        type="button"
        className="col-auto flex w-full items-center justify-end md:hidden"
        onClick={() => {}}
      >
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1">
          <Icon size={30} className="text-black" />
        </div>
      </button>

      <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex">
        <AiFillStepBackward
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={() => {}}
        />
        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
          onClick={() => {}}
        >
          <Icon size={30} className="text-black" />
        </button>
        <AiFillStepForward
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={() => {}}
        />
      </div>

      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <VolumeIcon size={34} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
