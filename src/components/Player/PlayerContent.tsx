'use client'

import { useEffect, useState } from 'react'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import useSound from 'use-sound'

import usePlayer from '@/hooks/usePlayer'
import { Song } from '@/types'

import LikeButton from '../Button/LikeButton'
import MediaItem from '../MediaItem/MediaItem'
import Slider from '../Slider/Slider'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer()
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) {
      player.setId(player.ids[player.ids.length - 1])
    } else {
      player.setId(previousSong)
    }
  }

  const onPlayNext = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) {
      player.setId(player.ids[0])
    } else {
      player.setId(nextSong)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    sound?.play()

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      sound?.unload()
    }
  }, [sound])

  const handlePlay = () => {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

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
        onClick={handlePlay}
      >
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1">
          <Icon size={30} className="text-black" />
        </div>
      </button>

      <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex">
        <AiFillStepBackward
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={onPlayPrevious}
        />
        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
          onClick={handlePlay}
        >
          <Icon size={30} className="text-black" />
        </button>
        <AiFillStepForward
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={onPlayNext}
        />
      </div>

      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <VolumeIcon
            size={34}
            className="cursor-pointer"
            onClick={toggleMute}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
