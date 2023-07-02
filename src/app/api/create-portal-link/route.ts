/* eslint-disable import/prefer-default-export */
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getURL } from '@/libs/helpers'
import stripe from '@/libs/stripe'
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin'

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error('User not found')

    const customer = await createOrRetrieveCustomer(
      user?.email ?? '',
      user?.id ?? ''
    )

    if (!customer) throw new Error('Customer not found')

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`,
    })

    return NextResponse.json({ url })
  } catch (error: unknown) {
    console.log(error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
