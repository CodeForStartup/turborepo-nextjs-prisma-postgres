import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "database"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authConfigs = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.uid as string
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
} as NextAuthOptions
