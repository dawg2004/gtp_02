import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PRICE_MAP: Record<string, string> = {
  BASIC: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC!,
  STANDARD: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD!,
  PRO: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO!,
  ULTRA: process.env.NEXT_PUBLIC_STRIPE_PRICE_ULTRA!,
}

const TOPUP_PACKS: Record<string, { name: string; credits: number; amount: number }> = {
  starter: { name: 'スターター', credits: 100, amount: 1000 },
  standard: { name: 'スタンダード', credits: 330, amount: 3000 },
  pro: { name: 'プロ', credits: 580, amount: 5000 },
  bulk: { name: 'まとめ買い', credits: 1200, amount: 10000 },
}

export async function POST(request: NextRequest) {
  try {
    const { priceId, type, packId } = await request.json()

    if (type === 'topup') {
      const pack = TOPUP_PACKS[packId]
      if (!pack) {
        return NextResponse.json({ error: '無効なチャージパックです' }, { status: 400 })
      }

      const token = request.headers.get('authorization')?.replace('Bearer ', '')
      const { data: { user }, error: authError } = await supabase.auth.getUser(token!)
      if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'jpy',
              product_data: {
                name: `LUMIVEIL ${pack.name}クレジット`,
                description: `${pack.credits.toLocaleString('ja-JP')}クレジット`,
              },
              unit_amount: pack.amount,
            },
            quantity: 1,
          },
        ],
        metadata: {
          type: 'topup',
          userId: user.id,
          packId,
          credits: String(pack.credits),
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?topup=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?topup=canceled`,
      })

      return NextResponse.json({ url: session.url })
    }

    const stripePriceId = PRICE_MAP[priceId] || priceId

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
