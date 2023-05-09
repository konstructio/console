import React, { FunctionComponent } from 'react';
import { Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

import Typography from '../../components/typography';
import NextLink from '../../components/nextLink';
import { BISCAY, EXCLUSIVE_PLUM, SALTBOX_BLUE, VOLCANIC_SAND } from '../../constants/colors';
import { Cluster } from '../../types/provision';

import { Content, Column, Header, Row } from './clusterDetails.styled';

export interface ClusterDetailsProps {
  cluster: Cluster;
  onClose: () => void;
}

const ClusterDetails: FunctionComponent<ClusterDetailsProps> = ({ cluster, onClose }) => {
  const {
    adminEmail,
    cloudProvider,
    cloudRegion,
    clusterName,
    creationDate,
    domainName,
    gitProvider,
    gitUser,
  } = cluster;
  return (
    <Box sx={{ width: '456px' }}>
      <Header>
        <Typography variant="subtitle2" color={BISCAY}>
          Cluster Details
        </Typography>
        <CloseIcon htmlColor={SALTBOX_BLUE} onClick={onClose} />
      </Header>
      <Divider />
      <Content>
        <Row>
          <Column>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              Cluster name
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {clusterName}
            </Typography>
          </Column>
        </Row>
        <Row>
          <Column>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              GIT provider
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {gitProvider}
            </Typography>
          </Column>
          <Column>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              Cloud provider
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {cloudProvider}
            </Typography>
          </Column>
        </Row>
        <Row>
          <Column>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              Created
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {moment(new Date(creationDate as string)).format('DD MMM YYYY, HH:mm:ss')}
            </Typography>
          </Column>
          <Column>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              Created by
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {gitUser}
            </Typography>
          </Column>
        </Row>
        <Row>
          <Column>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              Cluster domain name
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {domainName}
            </Typography>
          </Column>
          <Column>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              Cloud region
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {cloudRegion}
            </Typography>
          </Column>
        </Row>
        <Row>
          <Column>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              Alerts email
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {adminEmail}
            </Typography>
          </Column>
          <Column>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              Console url
            </Typography>
            <NextLink href={`https://kubefirst.${domainName}/services`} target="_blank">
              <Typography variant="labelLarge">{`kubefirst.${domainName}`}</Typography>
            </NextLink>
          </Column>
        </Row>
      </Content>
    </Box>
  );
};

export default ClusterDetails;
