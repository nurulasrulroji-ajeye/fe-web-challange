import { connection } from "@/config";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const AuthOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: "my-credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        if (!username || !password) {
          throw new Error(`Missing Username or password`);
        }

        const userData = { username, password };

        try {
          const response = await connection.post("/auth/login", userData);

          return response.data;
        } catch (error: any) {
          throw new Error(`wrong password or username`);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ account, token, user }) {
      if (account && user) {
        token.data = {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          image: user.image,
        },
          token.accessToken = user.token;
      }
      return token
    },
    async session({ token, session }: any) {
      session.user.data = token.data;
      session.user.token = token.accessToken;
      return session
    },
  },
};

export default NextAuth(AuthOption);