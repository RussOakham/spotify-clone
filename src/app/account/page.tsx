import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import Header from '@/components/Header/Header'

import AccountContent from './components/AccountContent'
import ErrorFallback from './error'
import Loading from './loading'

const page = () => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold text-white">
            Account Settings
          </h1>
        </div>
      </Header>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loading />}>
          <AccountContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default page
