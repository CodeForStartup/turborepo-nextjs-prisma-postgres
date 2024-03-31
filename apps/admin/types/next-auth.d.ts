import "next-auth/jwt"
import "next-auth"

import { type DefaultSession } from "next-auth"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface Session {
    user?: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession["user"]
  }
}
