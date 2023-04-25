import { createAsyncThunk } from '@reduxjs/toolkit';

import { endpoints } from '../api';
import { AppDispatch, RootState } from '../store';

export const createCluster = createAsyncThunk<
  unknown,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('cluster/provisioning', async (body, { dispatch }) => {
  console.log('provisioning');
  const { clusterName } = body;
  delete body.clusterName;

  try {
    const response = await fetch(`http://localhost:8081/api/v1/cluster/kubefirst`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clusterName: 'cris-cluster',
        admin_email: 'cristhian@kubeshop.io',
        cloud_provider: 'civo',
        cloud_region: 'nyc1',
        domain_name: 'k-ray.space',
        git_owner: 'kubefirst-one',
        git_provider: 'github',
        git_token: '...',
        type: 'mgmt',
      }),
    });

    // const res = await dispatch(endpoints.provision.initiate(body));
    // if ('error' in res) {
    //   throw res.error;
    // }

    console.log(response);
    return response;
  } catch (error) {
    console.log('error', error);
  }
});
