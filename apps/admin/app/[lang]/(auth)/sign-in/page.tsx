import React from "react"
import { redirect } from "next/navigation"

import SignInForm from "@/molecules/sign-in-form"
import { getServerSession } from "@/utils/auth"

export default async function Page() {
  const session = await getServerSession()

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex justify-center">
      <SignInForm />
    </div>
  )
}
