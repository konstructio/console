import React, { FunctionComponent, useState } from 'react';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

import Typography from '../typography';
import TextFieldWithRef from '../textField';
import Modal, { IModalProps } from '../modal';
import { LAUGHING_ORANGE } from '../../constants/colors';
import Button from '../button';
import { Cluster, ClusterType, DraftCluster } from '../../types/provision';
import CopyText from '../copyText';

import { Content, CopyTextContainer, Footer, Header, NextLink } from './deleteCluster.styled';

export interface DeleteClusterProps extends Omit<IModalProps, 'children'> {
  cluster: Cluster | DraftCluster;
  onDelete: () => void;
}

const DeleteCluster: FunctionComponent<DeleteClusterProps> = ({ cluster, onDelete, ...rest }) => {
  const [matchingClusterName, setMatchingClusterName] = useState('');

  const isManagementCluster = cluster.type === ClusterType.MANAGEMENT;

  return (
    <Modal {...rest}>
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
                <strong>Note:</strong>{' '}
                {`deleting a management cluster will also delete all it's
                corresponding worker clusters`}
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
              <CopyTextContainer>
                <Typography>Are you sure you want to delete the cluster</Typography>
                <CopyText textToCopy={cluster.clusterName as string} />
                <Typography>? This action cannot be undone.</Typography>
              </CopyTextContainer>
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
          <Button variant="text" onClick={rest.onCloseModal} color="info">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={isManagementCluster ? rest.onCloseModal : onDelete}
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
