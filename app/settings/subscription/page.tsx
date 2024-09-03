import React from 'react';
import axios from 'axios';
import sortBy from 'lodash/sortBy';

import Subscription from '@/containers/Subscription/Subscription';
import { Plan } from '@/types/plan';

export async function getProductPlans() {
  const { SAAS_API_URL = '' } = process.env;

  try {
    const { data } = await axios.get<Array<Plan>>(`${SAAS_API_URL}/api/v1/payment/plans`);

    return sortBy(data, (product) => product && product.metadata && product.metadata['order']);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error getting product plans', error);
    return [];
  }
}

export default async function Page() {
  const plans = await getProductPlans();

  return <Subscription plans={plans} />;
}
