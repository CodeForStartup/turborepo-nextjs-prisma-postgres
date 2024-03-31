import React from "react"
import { redirect } from "next/navigation"

import { authConfigs } from "configs/auth"
import { getServerSession } from "next-auth"

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
