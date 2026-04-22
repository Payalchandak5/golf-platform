
"use client"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Subscribe() {
  const handleCheckout = async (priceId: string) => {
    const { data } = await supabase.auth.getUser()

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        email: data.user?.email,
      }),
    })

    const result = await res.json()

    if (result.url) {
      window.location.href = result.url
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-5">Choose a Plan</h1>

      <button
        onClick={() => handleCheckout("price_1TOteG1bQfEz9edJiGES2Eth")}
        className="bg-blue-500 text-white px-4 py-2 mr-4"
      >
        Monthly Plan
      </button>

      <button
        onClick={() => handleCheckout("price_1TOtft1bQfEz9edJd4o2qt94")}
        className="bg-green-500 text-white px-4 py-2"
      >
        Yearly Plan
      </button>
    </div>
  )
}
