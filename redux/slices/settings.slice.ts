import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getClusterTourStatus, updateClusterTourStatus } from '../thunks/settings.thunk';

import { SettingsTab } from '@/constants/settings';

export interface SettingsState {
  isLoading: boolean;
  activeTab: number;
  takenConsoleTour: boolean;
  isBannerOpen: boolean;
}

export const initialState: SettingsState = {
  isLoading: false,
  activeTab: SettingsTab.PLANS,
  takenConsoleTour: false,
  isBannerOpen: false,
};

const settingsSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setActiveTab: (state, { payload }: PayloadAction<number>) => {
      state.activeTab = payload;
    },
    setIsBannerOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isBannerOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClusterTourStatus.rejected, () => {
        // eslint-disable-next-line no-console
        console.error('unable to retrieve console tour secret');
      })
      .addCase(getClusterTourStatus.fulfilled, (state, { payload }) => {
        const tourStatus = payload === 'true';
        state.takenConsoleTour = tourStatus;
      })
      .addCase(updateClusterTourStatus.rejected, () => {
        // eslint-disable-next-line no-console
        console.error('unable to update cluster tour status');
      });
  },
});

export const { setActiveTab, setIsBannerOpen } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
