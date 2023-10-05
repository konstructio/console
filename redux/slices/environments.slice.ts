import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ClusterEnvironment } from '../../types/provision';
import {
  createEnvironment,
  deleteEnvironment,
  getAllEnvironments,
} from '../thunks/environments.thunk';
import { EnvCache } from '../../types/redux';

export interface EnvironmentsState {
  loading: boolean;
  environments: ClusterEnvironment[];
  /**
   * environments cache for environments in use by cluster(s)
   */
  boundEnvironments: EnvCache;
}

export const initialState: EnvironmentsState = {
  loading: false,
  environments: [],
  boundEnvironments: {},
};

const environmentsSlice = createSlice({
  name: 'environments',
  initialState,
  reducers: {
    setEnvironments: (state, { payload }: PayloadAction<ClusterEnvironment[]>) => {
      state.environments = payload;
    },
    setBoundEnvironments: (state, { payload }: PayloadAction<EnvCache>) => {
      state.boundEnvironments = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnvironments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEnvironments.rejected, (state) => {
        state.loading = false;
        state.environments = [];
      })
      .addCase(getAllEnvironments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.environments = payload;
      })
      .addCase(createEnvironment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEnvironment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createEnvironment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.environments.push(payload);
      })
      .addCase(deleteEnvironment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEnvironment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteEnvironment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.environments = state.environments.filter((env) => env.name !== payload);
      });
  },
});

export const { setEnvironments, setBoundEnvironments } = environmentsSlice.actions;

export const environmentsReducer = environmentsSlice.reducer;
