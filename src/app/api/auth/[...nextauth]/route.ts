import connectDB from "@/lib/db";
import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOption";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
