import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AlertProps } from '@mui/material/Alert';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { v4 as uuid } from 'uuid';

export type Message = {
  id: string;
  message: string;
  type: AlertProps['severity'];
  snackBarOrigin?: SnackbarOrigin;
};

export interface NotificationsState {
  messages: Record<Message['id'], Message>;
  notifiedOfBetaPhysicalClusters: boolean;
}

export const initialState: NotificationsState = {
  messages: {},
  notifiedOfBetaPhysicalClusters: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifiedOfBetaPhysicalClusters: (state, { payload }: PayloadAction<boolean>) => {
      state.notifiedOfBetaPhysicalClusters = payload;
    },
    createNotification: (state, { payload }: PayloadAction<Omit<Message, 'id'>>) => {
      const messageId = uuid();
      const newNotification: Message = {
        ...payload,
        id: messageId,
      };

      state.messages[messageId] = newNotification;
    },
    deleteNotificationById: (state, { payload }: PayloadAction<Message['id']>) => {
      delete state.messages[payload];
    },
  },
});

export const { setNotifiedOfBetaPhysicalClusters, createNotification, deleteNotificationById } =
  notificationsSlice.actions;

export const notificationsReducer = notificationsSlice.reducer;
