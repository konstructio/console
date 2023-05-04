import React, { FunctionComponent } from 'react';
import ModalMui from '@mui/material/Modal';
import { Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  borderRadius: '8px',
  p: 4,
  zIndex: 2000,
};

export interface IModalProps {
  backgroundColor?: string;
  boxShadow?: boolean;
  children: React.ReactElement;
  isOpen: boolean;
  onCloseModal?: () => void;
}

const Modal: FunctionComponent<IModalProps> = ({
  backgroundColor = 'white',
  boxShadow = true,
  children,
  isOpen,
  onCloseModal,
}) => (
  <ModalMui
    open={isOpen}
    onClose={onCloseModal}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    sx={{ zIndex: 2000 }}
  >
    <Box sx={{ ...style, backgroundColor, boxShadow: boxShadow && 24 }}>{children}</Box>
  </ModalMui>
);

export default Modal;
