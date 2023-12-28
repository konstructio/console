import { createSlice } from '@reduxjs/toolkit';

import { getArgoWorkflowTemplates } from '../thunks/repository.thunk';

import { ArgoWorkflowTemplate } from '@/types/argoWorkflows';

export interface RepositoryState {
  isLoading: boolean;
  argoWorkflowTemplates: Array<ArgoWorkflowTemplate>;
}

export const initialState: RepositoryState = {
  isLoading: false,
  argoWorkflowTemplates: [],
};

const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArgoWorkflowTemplates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArgoWorkflowTemplates.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.argoWorkflowTemplates = payload;
      })
      .addCase(getArgoWorkflowTemplates.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const repositoryReducer = repositorySlice.reducer;
