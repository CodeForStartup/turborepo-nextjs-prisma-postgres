import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "database";
import GithubProvider from "next-auth/providers/github";

export const authConfigs = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};
