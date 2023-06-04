import { Figtree } from 'next/font/google'

import Sidebar from '@/components/Sidebar/Sidebar'
import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'

import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}

export default RootLayout
