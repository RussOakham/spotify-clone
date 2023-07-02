'use client'

import Box from '@/components/Box/Box'

const ErrorFallback: React.FC = () => {
  return (
    <Box className="flex h-full items-center justify-center">
      <div className="text-neutral-400">Something went wrong.</div>
    </Box>
  )
}

export default ErrorFallback
