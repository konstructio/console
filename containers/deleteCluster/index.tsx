import React, { FunctionComponent } from 'react';
import { Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Typography from 'components/typography';

import Modal from '../../components/modal';
import { LAUGHING_ORANGE } from '../../constants/colors';
import Button from '../../components/button';

import { Content, Footer, Header } from './deleteCluster.styled';

export interface DeleteClusterProps {
  clusterName?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteCluster: FunctionComponent<DeleteClusterProps> = ({
  clusterName,
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <Box sx={{ width: '400px', height: '200px', backgroundColor: 'white' }}>
        <Header>
          <ErrorOutlineIcon htmlColor={LAUGHING_ORANGE} />
          <Typography variant="subtitle2">Delete {clusterName}</Typography>
        </Header>
        <Content>
          <Typography>
            Are you sure you want to delete the cluster <strong>{clusterName}</strong>?
            <br />
            <br />
            This action cannot be undone.{' '}
          </Typography>
        </Content>
        <Footer>
          <Button variant="text" onClick={onClose} color="info">
            Cancel
          </Button>
          <Button variant="contained" onClick={onDelete} color="error">
            Yes, delete
          </Button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default DeleteCluster;
