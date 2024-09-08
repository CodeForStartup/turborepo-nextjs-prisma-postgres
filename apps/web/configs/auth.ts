import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "database"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: Record<string, string>) => {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
              password: credentials.password,
            },
          })

          if (!user) {
            return null
          }

          return user
        } catch (e) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    // secret: process.env.NEXTAUTH_SECRET,
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
})
