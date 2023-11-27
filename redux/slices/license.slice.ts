import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { License } from '@/types/license';
import { getLicenseKey } from '@/redux/thunks/license.thunk';

export interface LicenseState {
  license?: License;
  loading: boolean;
}

export const initialState: LicenseState = {
  loading: false,
};

const licenseSlice = createSlice({
  name: 'license',
  initialState,
  reducers: {
    setLicense: (state, { payload }: PayloadAction<LicenseState['license']>) => {
      state.license = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLicenseKey.fulfilled, (state, { payload }) => {
        state.license = payload;
        state.loading = false;
      })
      .addCase(getLicenseKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLicenseKey.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLicense } = licenseSlice.actions;

export const licenseReducer = licenseSlice.reducer;
