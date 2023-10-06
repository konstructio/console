import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Message = {
  id: string;
  message: string;
  type: 'error' | 'success';
};

export interface NotificationsState {
  messages: Message[];
  notifiedOfBetaPhysicalClusters: boolean;
}

export const initialState: NotificationsState = {
  messages: [],
  notifiedOfBetaPhysicalClusters: false,
};

const notificationsSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setNotifiedOfBetaPhysicalClusters: (state, { payload }: PayloadAction<boolean>) => {
      state.notifiedOfBetaPhysicalClusters = payload;
    },
  },
});

export const { setNotifiedOfBetaPhysicalClusters } = notificationsSlice.actions;

export const notificationsReducer = notificationsSlice.reducer;
