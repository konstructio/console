import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  createContext,
  useState,
  useCallback,
} from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Message, deleteNotificationById } from '@/redux/slices/notifications.slice';

const NotificationsContext = createContext(null);

export const NotificationsProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { messages } = useAppSelector(({ notifications }) => notifications);

  const dispatch = useAppDispatch();

  const [displayedMessage, setDisplayedMessage] = useState<Message>();

  const handleClose = useCallback(() => {
    if (displayedMessage) {
      dispatch(deleteNotificationById(displayedMessage.id));
      setDisplayedMessage(undefined);
    }
  }, [dispatch, displayedMessage]);

  useEffect(() => {
    const messageIds = Object.keys(messages);
    if (messageIds.length) {
      setDisplayedMessage(messages[messageIds[0]]);
    }
  }, [messages]);

  return (
    <NotificationsContext.Provider value={null}>
      {children}
      <Snackbar
        open={!!displayedMessage}
        anchorOrigin={displayedMessage?.snackBarOrigin}
        autoHideDuration={3000}
        message={displayedMessage?.message}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          severity={displayedMessage?.type}
          iconMapping={{
            success: <CheckCircleIcon fontSize="inherit" />,
          }}
        >
          {displayedMessage?.message}
        </Alert>
      </Snackbar>
    </NotificationsContext.Provider>
  );
};
