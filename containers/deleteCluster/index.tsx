import React, { FunctionComponent, useState } from 'react';
import { Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Typography from '../../components/typography';
import TextFieldWithRef from '../../components/textField';
import Modal from '../../components/modal';
import { LAUGHING_ORANGE } from '../../constants/colors';
import Button from '../../components/button';

import { Content, Footer, Header } from './deleteCluster.styled';

export interface DeleteClusterProps {
  clusterName: string;
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
  const [matchingClusterName, setMatchingClusterName] = useState('');
  return (
    <Modal isOpen={isOpen}>
      <Box sx={{ width: '500px', backgroundColor: 'white' }}>
        <Header>
          <ErrorOutlineIcon htmlColor={LAUGHING_ORANGE} />
          <Typography variant="subtitle2">Delete {clusterName}</Typography>
        </Header>
        <Content>
          <Typography>
            Are you sure you want to delete the cluster <strong>{clusterName}</strong>? This action
            cannot be undone.
          </Typography>
          <TextFieldWithRef
            style={{ width: '100%' }}
            label="To delete, enter cluster name"
            required
            onChange={(e) => setMatchingClusterName(e.target.value)}
          />
        </Content>
        <Footer>
          <Button variant="text" onClick={onClose} color="info">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onDelete}
            color="error"
            disabled={clusterName !== matchingClusterName}
          >
            Yes, delete
          </Button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default DeleteCluster;
