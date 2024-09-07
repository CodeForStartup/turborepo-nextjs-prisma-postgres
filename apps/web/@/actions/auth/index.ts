"use server"

import { signIn } from "configs/auth"

export const signInWithCredentials = async (email: string, password: string) => {
  console.log(">>>>>", email, password)
  await signIn("credentials", {
    email,
    password,
  })
}

export const signInWithGithub = async () => {
  await signIn("github")
}
