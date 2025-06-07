'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        Sorry, the page you were looking for doesn't exist.
      </p>
      <button
        onClick={() => router.back()}
        className="px-6 py-3 bg-primary hover:bg-primary/50 transition rounded-xl text-black"
      >
        Go Back
      </button>
    </div>
  )
}