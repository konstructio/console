import React from 'react';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function MainPage() {
  const session = await getServerSession<typeof authOptions, Session>(authOptions);
  const isClusterZero = process.env.IS_CLUSTER_ZERO === 'true';
  const isAuthDisabled = process.env.DISABLE_AUTH === 'true';

  if (!session && !isClusterZero && !isAuthDisabled) {
    return redirect('/auth/signin');
  }

  if (isAuthDisabled) {
    return redirect('/dashboard/services');
  }

  redirect(isClusterZero ? '/provision' : '/dashboard/cluster-management');

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={20} />
    </Box>
  );
}
