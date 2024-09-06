import React from "react"
import { redirect } from "next/navigation"

import { auth } from "configs/auth"

import SignInForm from "@/molecules/sign-in-form"

export default async function Page() {
  const session = await auth()
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex justify-center">
      <SignInForm />
    </div>
  )
}
