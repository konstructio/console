import React from 'react';

import { getProductPlans } from '../page';

import Subscription from '@/containers/Subscription/Subscription';

export default async function Page({ params }: { params: { slug: string } }) {
  const plans = await getProductPlans();

  return <Subscription plans={plans} activeTabParam={params.slug} />;
}
