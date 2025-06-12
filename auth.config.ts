import type { NextAuthConfig } from 'next-auth';
 
import type { Provider } from 'next-auth/providers';

export const authConfig = {
  providers: [
    // Add your authentication providers here, for example:
    // GithubProvider({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
  ] as Provider[],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl.origin));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;