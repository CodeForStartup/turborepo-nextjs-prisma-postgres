"use server"

import { signIn, signOut } from "configs/auth"

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
