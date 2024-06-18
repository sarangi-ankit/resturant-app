import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import connectDB from "./db";

export const authOptions: NextAuthOptions = {

  providers: [

    CredentialsProvider({

      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {

        const { email, password } = credentials as {
          email: string;
          password: string;
        }
        try {
          await connectDB()
          const user = await User.findOne({ email })
          // console.log("user",user)
          if (!user) {
            return null
          }
          const passwordCompare = await bcrypt.compare(password, user.password)
          
          if (!passwordCompare) {
            return null
          }
          return user
          
        } catch (error) {
          console.log("Error:", error);
        }
      }

    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })

  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        // console.log("clicked")
        try {
          const { name, email } = user;
          await connectDB();
          const ifUserExists = await User.findOne({ email });
          if (ifUserExists) {
            return user;
          }
          const newUser = new User({
            name: name,
            email: email,
          });
          // console.log("newuser",newUser)
          const res = await newUser.save(); 
          // console.log("res",res)
          if (res.status === 200 || res.status === 201) {
            // console.log(res)
            return user;
          }

        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },

    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      // console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
  },
}


