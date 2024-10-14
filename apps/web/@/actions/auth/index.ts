"use server"

import bcryptjs from "bcryptjs"
import { signIn, signOut } from "configs/auth"
import { Prisma } from "database"
import { createUser } from "database/src/users/queries"

import { redirect } from "@/utils/navigation"

import { SignUpDataOutput, signUpSchema } from "./type"

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
    // hash password
    const { email, password } = data
    const hashedPassword = await bcryptjs.hash(password, 10)

    await createUser({
      data: {
        email,
        password: hashedPassword,
      },
    })

    // send email
  } catch (error) {
    if (error?.error?.code === "P2002") {
      return {
        formErrors: null,
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

  // TODO: white this redirect not work
  redirect("/login")
}
