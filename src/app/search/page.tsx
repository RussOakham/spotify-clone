import { ErrorBoundary } from 'react-error-boundary'

import getSongsByTitle from '@/actions/getSongsByTitle'
import SearchInput from '@/components/Form/SearchInput'
import Header from '@/components/Header/Header'

import SearchContent from './components/SearchContent'
import ErrorFallback from './error'

interface SearchProps {
  searchParams: {
    title: string
  }
}

export const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title)

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold text-white">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <SearchContent songs={songs} />
      </ErrorBoundary>
    </div>
  )
}

export default Search
