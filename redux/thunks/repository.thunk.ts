import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { AppDispatch, RootState } from '../store';

import { ArgoWorkflowTemplate } from '@/types/argoWorkflows';
import { createQueryString } from '@/utils/url/formatDomain';

export const getArgoWorkflowTemplates = createAsyncThunk<
  Array<ArgoWorkflowTemplate>,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('repository/getArgoWorkflowTemplates', async (_, { getState }) => {
  const {
    api: { managementCluster },
  } = getState();

  const result = await axios.get<Array<ArgoWorkflowTemplate>>(
    `/api/proxy?${createQueryString(
      'url',
      `/ci/argo-worflow-templates/${managementCluster?.clusterId}`,
    )}&target=ee`,
  );

  return result.data;
});
