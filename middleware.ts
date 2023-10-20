import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return (
        !!token || process.env.IS_CLUSTER_ZERO === 'true' || process.env.DISABLE_AUTH === 'true'
      );
    },
  },
});

export const config = { matcher: ['/dashboard', '/dashboard/:path*', '/api', '/api/:path*'] };
