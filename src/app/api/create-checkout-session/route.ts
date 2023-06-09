/* eslint-disable import/prefer-default-export */
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getURL } from '@/libs/helpers'
import stripe from '@/libs/stripe'
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin'

interface CheckoutRequest extends Request {
  json: () => Promise<{
    price: { id: string }
    quantity?: number
    metadata?: Record<string, string>
  }>
}

export async function POST(request: CheckoutRequest) {
  const { price, quantity = 1, metadata = {} } = await request.json()

  try {
    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { user },
    } = await supabase.auth.getUser()
    const customer = await createOrRetrieveCustomer({
      email: user?.email ?? '',
      uuid: user?.id ?? '',
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata,
      },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: unknown) {
    console.log(error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
