import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"; // Correct import
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        // Ensure that user returned has the correct type
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        return {
          _id: user._id.toString(), // Ensure _id is returned as string
          email: user.email,
          name: user.name,
          admin: user.admin,
        } as any; // Type assertion to bypass type checking temporarily
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    // Ensure token has the correct types
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id; // Attach _id to JWT token
        token.admin = user.admin; // Attach admin status to JWT token
      }
      return token;
    },
    // Ensure session user has the correct types
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string; // Ensure id is a string
        session.user.admin = token.admin as boolean; // Ensure admin is a boolean
      }
      return session;
    },
  },
};
