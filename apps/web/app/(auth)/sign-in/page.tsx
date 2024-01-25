import React from "react"
import { authConfigs } from "configs/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import SignInForm from "@/molecules/sign-in-form"

export default async function Page() {
  const session = await getServerSession(authConfigs)

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex justify-center">
      <SignInForm />
    </div>
  )
}
