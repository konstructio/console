import React, { FunctionComponent } from 'react';
import ModalMui from '@mui/material/Modal';
import { Box } from '@mui/material';

import { FragmentContainer } from './modal.styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  zIndex: 2000,
};

export interface IModalProps {
  children: React.ReactElement;
  isOpen: boolean;
  onCloseModal?: () => void;
}

export interface IFragmentProps {
  children: React.ReactElement;
}

export const Fragment: FunctionComponent<IFragmentProps> = ({ children }) => (
  <FragmentContainer>{children}</FragmentContainer>
);

const Modal: FunctionComponent<IModalProps> = ({ children, isOpen, onCloseModal }) => (
  <ModalMui
    open={isOpen}
    onClose={onCloseModal}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    sx={{ zIndex: 2000 }}
  >
    <Box sx={style}>{children}</Box>
  </ModalMui>
);

export default Modal;
