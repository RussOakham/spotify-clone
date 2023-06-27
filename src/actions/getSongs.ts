import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Song } from '@/types'

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return (data as unknown as Song[]) || []
}

export default getSongs
