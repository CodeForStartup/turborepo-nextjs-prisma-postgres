import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token
    },
  },
  pages: {
    signIn: "/signIn",
  },
})

export const config = { matcher: "/user/:path*" }
