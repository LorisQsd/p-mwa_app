import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/signin-signup',
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    jwt ({token, user}) {
      if (user) {
        token.uid = user.id;
        token.lastname = user.lastname
        token.firstname = user.firstname
      }

      return token
    },
    session ( { session, token } ) {
      session.user.id = token.uid;
      session.user.lastname = token.lastname;
      session.user.firstname = token.firstname;

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      // console.log(auth?.user)
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to home page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    }
  },
  providers: [], // Add providers with an empty array for now
} 

export default authConfig;