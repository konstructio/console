import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }) => {
      const isValid =
        !!token || process.env.IS_CLUSTER_ZERO === 'true' || process.env.DISABLE_AUTH === 'true';

      if (!isValid && req.method === 'POST') {
        const { url } = await req.json();
        return url.includes('/vclusters');
      }

      return isValid;
    },
  },
});

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/settings',
    '/settings/:path*',
    '/api',
    '/api/:path*',
  ],
};
