"use client"

import { useSearchParams } from "next/navigation"

export default function VerifyEmail() {
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  return <div>Verify Email</div>
}
