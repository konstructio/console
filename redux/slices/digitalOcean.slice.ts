import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DigitalOceanUser } from '@/types/digitalOcean';
import { getDigitalOceanUser } from '@/redux/thunks/digitalOcean.thunk';

export interface DigitalOceanState {
  doUser: DigitalOceanUser | null;
  doStateLoading: boolean;
  doTokenValid: boolean;
  responseError?: string;
}

export const initialState: DigitalOceanState = {
  doUser: null,
  doStateLoading: false,
  doTokenValid: false,
};

const digitalOceanSlice = createSlice({
  name: 'digitalOcean',
  initialState,
  reducers: {
    setDoResponseError: (state, action: PayloadAction<DigitalOceanState['responseError']>) => {
      state.responseError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDigitalOceanUser.pending, (state) => {
        state.doStateLoading = true;
      })
      .addCase(getDigitalOceanUser.fulfilled, (state, { payload }) => {
        state.doStateLoading = false;
        state.doTokenValid = true;
        state.responseError = undefined;
        state.doUser = payload;
      })
      .addCase(getDigitalOceanUser.rejected, (state, action) => {
        state.doStateLoading = false;
        state.doUser = null;
        state.doTokenValid = false;
        state.responseError = action.error.message;
      });
  },
});

export const { setDoResponseError } = digitalOceanSlice.actions;

export const digitalOceanReducer = digitalOceanSlice.reducer;
