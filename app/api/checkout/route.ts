import Stripe from "stripe"
import { NextResponse } from "next/server"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  
  const { priceId, email } = await req.json()
  

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    payment_method_types: ["card"],
    mode: "subscription",   // ✅ FIXED
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/dashboard",
    cancel_url: "http://localhost:3000/subscribe",
  })

  return NextResponse.json({ url: session.url })
}