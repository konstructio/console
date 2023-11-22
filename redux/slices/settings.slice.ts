import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SettingsTab } from '@/constants/setttings';

export interface SettingsState {
  isLoading: boolean;
  activeTab: number;
}

export const initialState: SettingsState = {
  isLoading: false,
  activeTab: SettingsTab.PLANS,
};

const settingsSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setActiveTab: (state, { payload }: PayloadAction<number>) => {
      state.activeTab = payload;
    },
  },
});

export const { setActiveTab } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
