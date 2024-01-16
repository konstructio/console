import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SettingsTab } from '@/constants/setttings';

export interface SettingsState {
  isLoading: boolean;
  activeTab: number;
  isBannerOpen: boolean;
}

export const initialState: SettingsState = {
  isLoading: false,
  activeTab: SettingsTab.PLANS,
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
});

export const { setActiveTab, setIsBannerOpen } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
