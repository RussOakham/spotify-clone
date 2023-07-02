import { Figtree } from 'next/font/google'

import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player/Player'
import Sidebar from '@/components/Sidebar/Sidebar'
import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import UserProvider from '@/providers/UserProvider'

import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
}

export const revalidate = 0

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const userSongs = await getSongsByUserId()
  const products = await getActiveProductsWithPrices()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}

export default RootLayout
