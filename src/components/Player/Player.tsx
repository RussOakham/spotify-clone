'use client'

import useGetSongById from '@/hooks/useGetSongById'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import usePlayer from '@/hooks/usePlayer'

import PlayerContent from './PlayerContent'

const Player: React.FC = () => {
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const songUrl = useLoadSongUrl(song!)

  if (!song || !songUrl || !player.activeId) return null

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-black px-4 py-2">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
