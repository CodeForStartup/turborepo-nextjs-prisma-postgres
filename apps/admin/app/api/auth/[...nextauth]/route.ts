import { authConfigs } from "configs/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authConfigs)

export { handler as GET, handler as POST }
