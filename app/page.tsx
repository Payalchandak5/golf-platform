export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">

      {/* Hero Section */}
      <h1 className="text-4xl font-bold mb-4">
        Play. Win. Give Back.
      </h1>

      <p className="text-lg mb-6 max-w-xl">
        Enter your golf scores, participate in monthly draws, 
        win exciting rewards, and support charities you care about.
      </p>

      {/* CTA Button */}
      <a href="/signup">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Get Started
        </button>
      </a>

    </main>
  )
}