import React, { FunctionComponent, useState } from 'react';
import { Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

import Typography from '../../components/typography';
import TextFieldWithRef from '../../components/textField';
import Modal from '../../components/modal';
import { LAUGHING_ORANGE } from '../../constants/colors';
import Button from '../../components/button';
import { ClusterInfo } from '../../components/clusterTable/clusterTable';
import { ClusterType } from '../../types/provision';

import { Content, Footer, Header, NextLink } from './deleteCluster.styled';

export interface DeleteClusterProps {
  cluster: ClusterInfo;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteCluster: FunctionComponent<DeleteClusterProps> = ({
  cluster,
  isOpen,
  onClose,
  onDelete,
}) => {
  const [matchingClusterName, setMatchingClusterName] = useState('');
  const isManagementCluster = cluster.type === ClusterType.MANAGEMENT;

  return (
    <Modal isOpen={isOpen}>
      <Box sx={{ width: '500px', backgroundColor: 'white' }}>
        <Header>
          <ErrorOutlineIcon htmlColor={LAUGHING_ORANGE} />
          <Typography variant="subtitle2">Delete {cluster.clusterName}</Typography>
        </Header>
        <Content>
          {isManagementCluster ? (
            <>
              <Typography>Deleting a management cluster is carried out via the CLI.</Typography>
              <Typography style={{ marginBottom: '13px' }}>
                <strong>Note:</strong> deleting a management cluster will also delete all it's
                corresponding worker clusters
              </Typography>
              <NextLink href="https://docs.kubefirst.io/common/deprovision" target="_blank">
                <>
                  How to delete a management cluster
                  <LaunchOutlinedIcon />
                </>
              </NextLink>
            </>
          ) : (
            <>
              <Typography style={{ marginBottom: '16px' }}>
                Are you sure you want to delete the cluster <strong>{cluster.clusterName}</strong>?
                This action cannot be undone.
              </Typography>
              <TextFieldWithRef
                style={{ width: '100%' }}
                label="To delete, enter cluster name"
                required
                onChange={(e) => setMatchingClusterName(e.target.value)}
              />
            </>
          )}
        </Content>
        <Footer>
          <Button variant="text" onClick={onClose} color="info">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={isManagementCluster ? onClose : onDelete}
            color={isManagementCluster ? 'primary' : 'error'}
            disabled={cluster.clusterName !== matchingClusterName && !isManagementCluster}
          >
            {isManagementCluster ? 'Got it!' : 'Yes, Delete'}
          </Button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default DeleteCluster;
