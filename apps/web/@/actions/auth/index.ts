"use server"

import { auth, signIn, signOut } from "auth"
import bcryptjs from "bcryptjs"
import { Prisma } from "database"
import { createUser } from "database/src/users/queries"
import { sendEmail } from "emails"
import VerifyEmail from "emails/verify-email"

import { redirect } from "@/utils/navigation"

import { SignUpDataOutput } from "./type"

export const getAuth = async () => {
  return await auth()
}

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

    console.log("create user...successfully")

    // create verification code
    const token = bcryptjs.randomUUID()
    await prisma.verificationToken.create({
      data: {
        token, // 6 digits code
        identifier: email,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
      },
    })

    console.log("verification token...successfully")

    // send email
    // await sendEmail({
    //   email,
    //   subject: "Welcome to Next Forum",
    //   react: VerifyEmail({
    //     token,
    //     email,
    //   }),
    // })
  } catch (error) {
    console.error("signUp.error", error)
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
