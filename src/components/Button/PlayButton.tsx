import { FaPlay } from 'react-icons/fa'

const PlayButton: React.FC = () => {
  return (
    <button
      type="button"
      className="drop-shadow-mf translate flex translate-y-1/4 items-center rounded-full bg-green-500 p-4 opacity-0 transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100"
    >
      <FaPlay className="text-black" />
    </button>
  )
}

export default PlayButton
