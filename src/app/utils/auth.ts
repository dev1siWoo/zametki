import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import prisma from "./db"

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		})
	],
} satisfies NextAuthOptions
