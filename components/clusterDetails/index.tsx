import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import moment from 'moment';

import { ClusterInfo } from '../clusterTable/clusterTable';

import { Content, Column, Row, StyledLabel, StyledValue } from './clusterDetails.styled';

export interface ClusterDetailsProps extends ComponentPropsWithoutRef<'div'> {
  cluster: ClusterInfo;
}

const ClusterDetails: FunctionComponent<ClusterDetailsProps> = ({ cluster, ...rest }) => {
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
  } = cluster;
  return (
    <Content {...rest}>
      {/* Top Row */}
      <Row>
        <Column>
          <StyledLabel variant="labelLarge">Cluster domain name</StyledLabel>
          <StyledValue variant="body2">{domainName}</StyledValue>
        </Column>
        <Column>
          <StyledLabel variant="labelLarge">Alerts email</StyledLabel>
          <StyledValue variant="body2">{adminEmail}</StyledValue>
        </Column>
      </Row>

      {/* Second Row */}
      <Row>
        <Column>
          <StyledLabel variant="labelLarge">Created</StyledLabel>
          <StyledValue variant="body2">
            {moment(new Date(creationDate as string)).format('DD MMM YYYY, HH:mm:ss')}
          </StyledValue>
        </Column>
        <Column>
          <StyledLabel variant="labelLarge">Created by</StyledLabel>
          <StyledValue variant="body2">{gitUser}</StyledValue>
        </Column>
      </Row>

      {/* Third Row */}
      <Row>
        <Column>
          <StyledLabel variant="labelLarge">GIT provider</StyledLabel>
          <StyledValue variant="body2">{gitProvider}</StyledValue>
        </Column>
        <Column>
          <StyledLabel variant="labelLarge">Cloud provider</StyledLabel>
          <StyledValue variant="body2">{cloudProvider}</StyledValue>
        </Column>
      </Row>

      {/* Fourth Row */}
      <Row>
        <Column>
          <StyledLabel variant="labelLarge">Cloud region</StyledLabel>
          <StyledValue variant="body2">{cloudRegion}</StyledValue>
        </Column>
        <Column>
          <StyledLabel variant="labelLarge">Number of nodes</StyledLabel>
          <StyledValue variant="body2">{nodes}</StyledValue>
        </Column>
      </Row>

      {/* Fifth Row */}
      <Row>
        <Column>
          <StyledLabel variant="labelLarge">Instance size</StyledLabel>
          <StyledValue variant="body2" style={{ width: '100%' }}>
            {instanceSize}
          </StyledValue>
        </Column>
      </Row>
    </Content>
  );
};

export default ClusterDetails;
