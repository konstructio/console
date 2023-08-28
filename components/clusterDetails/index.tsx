import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import moment from 'moment';

import { ClusterInfo } from '../clusterTable/clusterTable';
import Typography from '../../components/typography';
import Row from '../../components/row';
import Column from '../../components/column';
import { ClusterStatus, ClusterType } from '../../types/provision';

import {
  Content,
  ColumnInfo,
  RowInfo,
  StyledLabel,
  StyledValue,
  InfoIcon,
  Link,
  StatusContainer,
} from './clusterDetails.styled';

export interface ClusterDetailsProps extends ComponentPropsWithoutRef<'div'> {
  cluster: ClusterInfo;
}

const ClusterDetails: FunctionComponent<ClusterDetailsProps> = ({ cluster }) => {
  const {
    adminEmail,
    cloudProvider,
    cloudRegion,
    creationDate,
    domainName,
    gitProvider,
    gitUser,
    nodes,
    instanceSize,
    status,
    type,
  } = cluster;
  return (
    <>
      <StatusContainer>
        <Row>
          <InfoIcon />
        </Row>
        <Column>
          {status === ClusterStatus.PROVISIONING || type === ClusterType.DRAFT ? (
            <>
              <Typography variant="body2">
                The cluster has been registered and will be synced
              </Typography>
              <Typography variant="body2">
                Provisioning details: <Link href="">Link</Link>
              </Typography>
            </>
          ) : (
            <Typography>
              Cluster details: <Link href="">Link</Link>{' '}
            </Typography>
          )}
        </Column>
      </StatusContainer>
      <Content>
        {/* Top Row */}
        <RowInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Cluster domain name</StyledLabel>
            <StyledValue variant="body2">{domainName}</StyledValue>
          </ColumnInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Alerts email</StyledLabel>
            <StyledValue variant="body2">{adminEmail}</StyledValue>
          </ColumnInfo>
        </RowInfo>

        {/* Second Row */}
        <RowInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Created</StyledLabel>
            <StyledValue variant="body2">
              {moment(new Date(creationDate as string)).format('DD MMM YYYY, HH:mm:ss')}
            </StyledValue>
          </ColumnInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Created by</StyledLabel>
            <StyledValue variant="body2">{gitUser}</StyledValue>
          </ColumnInfo>
        </RowInfo>

        {/* Third Row */}
        <RowInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">GIT provider</StyledLabel>
            <StyledValue variant="body2">{gitProvider}</StyledValue>
          </ColumnInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Cloud provider</StyledLabel>
            <StyledValue variant="body2">{cloudProvider}</StyledValue>
          </ColumnInfo>
        </RowInfo>

        {/* Fourth Row */}
        <RowInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Cloud region</StyledLabel>
            <StyledValue variant="body2">{cloudRegion}</StyledValue>
          </ColumnInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Number of nodes</StyledLabel>
            <StyledValue variant="body2">{nodes}</StyledValue>
          </ColumnInfo>
        </RowInfo>

        {/* Fifth Row */}
        <RowInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Instance size</StyledLabel>
            <StyledValue variant="body2" style={{ width: '100%' }}>
              {instanceSize}
            </StyledValue>
          </ColumnInfo>
        </RowInfo>
      </Content>
    </>
  );
};

export default ClusterDetails;
