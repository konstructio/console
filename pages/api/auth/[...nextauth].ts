import NextAuth, { NextAuthOptions } from 'next-auth';
import { OAuthConfig } from 'next-auth/providers';

interface User {
  id: string;
  name: string;
  email: string;
  groups: Array<string>;
}

const nestJSOAuth: OAuthConfig<User> = {
  id: 'vault',
  name: 'vault',
  type: 'oauth',
  version: '2.0',
  jwks_endpoint: `https://vault.${process.env.DOMAIN}.com/v1/identity/oidc/provider/kubefirst/.well-known/keys`,
  authorization: {
    url: `https://vault.${process.env.DOMAIN}.com/ui/vault/identity/oidc/provider/kubefirst/authorize`,
    params: {
      scope: 'openid email profile user groups id',
    },
  },
  token: `https://vault.${process.env.DOMAIN}.com/v1/identity/oidc/provider/kubefirst/token`,
  issuer: `https://vault.${process.env.DOMAIN}.com/v1/identity/oidc/provider/kubefirst`,
  idToken: true,
  async profile(profile: User): Promise<User> {
    return { ...profile, id: profile.email };
  },
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET_ID,
};

export const authOptions: NextAuthOptions = {
  providers: [nestJSOAuth],
  session: {
    strategy: 'jwt',
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.groups = profile?.groups;
      }
      return token;
    },
    async session({ user, session, token }) {
      return { ...user, ...session, groups: token.groups };
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
