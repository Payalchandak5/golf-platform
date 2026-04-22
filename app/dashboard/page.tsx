"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
  const { data } = await supabase.auth.getUser()

  console.log("AUTH USER:", data.user)

  if (!data.user) {
    router.push("/login")
    return
  }

  setUser(data.user)

  // 🔥 TEMP insert (only for testing)
  await supabase.from("subscriptions").upsert({
    user_id: data.user.id,
    status: "active",
  })

  // ✅ FETCH ONLY CURRENT USER + ACTIVE STATUS
  const { data: sub, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", data.user.id)
    .eq("status", "active")

  console.log("FILTERED SUB:", sub)

  // ✅ SET STATE PROPERLY
  if (sub && sub.length > 0) {
    setIsSubscribed(true)
  } else {
    setIsSubscribed(false)
  }

  setLoading(false)
}

  if (loading) return <div className="p-10">Loading...</div>

  if (!isSubscribed) {
    return (
      <div className="p-10">
        <h1>You are not subscribed</h1>
        <button onClick={() => router.push("/subscribe")}>
          Go to Subscribe
        </button>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-slate-900 text-white p-6">
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => router.push("/profile")}
          className="bg-slate-700 px-4 py-2 rounded-xl hover:bg-slate-600 transition"
        >
          Profile
        </button>
      </div>

      {/* Card */}
      <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">
          Welcome 👋
        </h2>
        <p className="text-slate-400">{user?.email}</p>
      </div>

      {/* Subscription Card */}
      <div className="mt-6 bg-slate-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">
          Subscription Status
        </h2>

        {isSubscribed ? (
          <p className="text-green-400">Active ✅</p>
        ) : (
          <>
            <p className="text-red-400 mb-4">Not Subscribed ❌</p>
            <button
              onClick={() => router.push("/subscribe")}
              className="bg-indigo-600 px-5 py-2 rounded-xl hover:bg-indigo-500 transition"
            >
              Subscribe Now
            </button>
          </>
        )}
      </div>

    </div>
  </div>
)
}