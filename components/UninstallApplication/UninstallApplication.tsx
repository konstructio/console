import React, { FunctionComponent, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Typography from '../Typography/Typography';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import { Content, Footer, Header } from './UninstallApplication.styled';

import { LAUGHING_ORANGE, VOLCANIC_SAND } from '@/constants/colors';

export interface UninstallApplicationProps extends PropsWithChildren {
  application: string;
  canDeleteSelectedApp: boolean;
  cluster: string;
  isOpen: boolean;
  isLoading: boolean;
  onDelete: () => void;
  onCloseModal?: () => void;
}

const UninstallApplication: FunctionComponent<UninstallApplicationProps> = ({
  application,
  canDeleteSelectedApp,
  cluster,
  isOpen,
  onDelete,
  onCloseModal,
}) => {
  return (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal}>
      <Box sx={{ width: '500px', backgroundColor: 'white' }}>
        <Header>
          <ErrorOutlineIcon htmlColor={LAUGHING_ORANGE} />
          <Typography variant="subtitle2">
            {canDeleteSelectedApp ? 'Uninstall application' : 'Application not found'}
          </Typography>
        </Header>
        <Content>
          <>
            {canDeleteSelectedApp ? (
              <Typography color={VOLCANIC_SAND} variant="body2">
                Are you sure you want to uninstall <strong>{application}</strong> from cluster{' '}
                <strong>{cluster}</strong>?
              </Typography>
            ) : (
              <>
                <Typography color={VOLCANIC_SAND} variant="body2">
                  It appears that this application has been manually removed from your repository.
                </Typography>
                <Typography>Do you want to remove the application tile from this view?</Typography>
              </>
            )}
          </>
        </Content>
        <Footer>
          <Button variant="text" color="text" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onDelete}>
            Yes, {canDeleteSelectedApp ? 'uninstall' : 'remove'}
          </Button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default UninstallApplication;
