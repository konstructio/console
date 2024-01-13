import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getClusterTourStatus, updateClusterTourStatus } from '../thunks/settings.thunk';

import { SettingsTab } from '@/constants/setttings';

export interface SettingsState {
  isLoading: boolean;
  activeTab: number;
  takenConsoleTour: boolean;
}

export const initialState: SettingsState = {
  isLoading: false,
  activeTab: SettingsTab.PLANS,
  takenConsoleTour: false,
};

const settingsSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setActiveTab: (state, { payload }: PayloadAction<number>) => {
      state.activeTab = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClusterTourStatus.rejected, () => {
        console.error('unable to retrieve console tour secret');
      })
      .addCase(getClusterTourStatus.fulfilled, (state, { payload }) => {
        const tourStatus = payload === 'true';
        state.takenConsoleTour = tourStatus;
      })
      .addCase(updateClusterTourStatus.rejected, () => {
        console.error('unable to update cluster tour status');
      });
  },
});

export const { setActiveTab } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
