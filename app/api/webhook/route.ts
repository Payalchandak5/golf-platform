import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ IMPORTANT
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.log("Webhook Error:", err)
    return new NextResponse("Webhook Error", { status: 400 })
  }

  // 🎯 HANDLE EVENT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const email = session.customer_details?.email

    if (!email) return NextResponse.json({ received: true })

    // 🔍 Find user in Supabase
    const { data: users } = await supabase.auth.admin.listUsers()

    const user = users.users.find((u) => u.email === email)

    if (!user) return NextResponse.json({ received: true })

    // ✅ INSERT SUBSCRIPTION
    await supabase.from("subscriptions").upsert({
      user_id: user.id,
      status: "active",
    })
  }

  return NextResponse.json({ received: true })
}