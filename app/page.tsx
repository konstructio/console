import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Route } from '@/constants';

export default async function MainPage() {
  const session = await getServerSession<typeof authOptions, Session>(authOptions);
  const isClusterZero = process.env.IS_CLUSTER_ZERO === 'true';
  const isAuthDisabled = process.env.DISABLE_AUTH === 'true';

  if (!session && !isClusterZero && !isAuthDisabled) {
    return redirect(Route.SIGN_IN);
  }

  if (isAuthDisabled) {
    return redirect(Route.APPLICATIONS);
  }

  redirect(isClusterZero ? Route.PROVISION : Route.CLUSTER_MANAGEMENT);
}
