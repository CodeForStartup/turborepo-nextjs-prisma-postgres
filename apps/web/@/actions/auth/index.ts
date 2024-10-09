"use server"

import { redirect } from "next/navigation"

import { signIn, signOut } from "configs/auth"
import { Prisma } from "database"
import { createUser } from "database/src/users/queries"
import { z } from "zod"

import { SignUpDataOutput } from "./type"

export const signInWithCredentials = async (email: string, password: string) => {
  await signIn("credentials", {
    email,
    password,
  })
}

export const signInWithGithub = async () => {
  await signIn("github")
}

export const onSignOut = async () => {
  await signOut({
    redirectTo: "/",
  })
}

// SIGN UP
export const signUp = async (
  data: Pick<Prisma.UserCreateInput, "email" | "password">
): Promise<SignUpDataOutput> => {
  try {
    await createUser({ data })

    redirect("/login")
  } catch (error) {
    if (error.code === "P2002") {
      return {
        formErrors: [],
        fieldErrors: {
          email: ["Email already exists"], // TODO: localize error message
        },
      }
    }

    return {
      formErrors: [error?.message],
      fieldErrors: {},
    }
  }
}
