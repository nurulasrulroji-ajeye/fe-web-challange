import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

export interface IUserAuth {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  token: string
}

declare module "next-auth" {
  interface User extends DefaultUser, IUserAuth { }
  interface Session {
    user: {
      data: IUserAuth
    } & DefaultSession["user"];
  }

}
declare module "next-auth/jwt" {
  interface JWT {
    data: any;
    expired: number;
    accessToken: string;
    refreshToken: string;
  }
}