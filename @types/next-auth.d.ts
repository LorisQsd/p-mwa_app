import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
  interface User {
    id: string;
    lastname: string;
    firstname: string;
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: string;
    ulastname: string;
  }
}
