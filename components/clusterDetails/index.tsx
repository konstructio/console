import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import moment from 'moment';

import {
  Container,
  Content,
  ColumnInfo,
  RowInfo,
  StyledLabel,
  StyledValue,
  ExternalLink,
} from './clusterDetails.styled';

import Typography from '@/components/typography';
import Column from '@/components/column';
import {
  Cluster,
  ClusterStatus,
  ClusterType,
  DraftCluster,
  ManagementCluster,
} from '@/types/provision';
import StatusIndicator from '@/components/statusIndicator';
import { BISCAY, VOLCANIC_SAND } from '@/constants/colors';
import Tag from '@/components/tag';

export interface ClusterDetailsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'key'> {
  cluster: Cluster | DraftCluster;
  host: ManagementCluster['gitHost'];
  gitOwner: ManagementCluster['gitAuth']['gitOwner'];
}

const ClusterDetails: FunctionComponent<ClusterDetailsProps> = ({
  cluster,
  host,
  gitOwner,
  ...rest
}) => {
  const {
    adminEmail,
    clusterName,
    cloudProvider,
    cloudRegion,
    creationDate,
    domainName,
    subDomainName,
    gitProvider,
    nodeCount,
    instanceSize,
    environment,
    type,
    status,
    gitAuth: { gitUser } = {},
  } = cluster;

  const [available, setAvailable] = useState(status === ClusterStatus.PROVISIONED ?? false);

  useEffect(() => {
    setTimeout(() => setAvailable(true), 10000);
  });

  const fullDomainName = useMemo(
    () => (subDomainName ? `${subDomainName}.${domainName}` : domainName),
    [subDomainName, domainName],
  );

  return (
    <Container {...rest}>
      <Column style={{ gap: '8px' }}>
        <Typography variant="subtitle1" color={BISCAY}>
          {clusterName}
        </Typography>
        {environment?.name && <Tag text={environment.name} bgColor={environment.color} />}
        {environment?.description && (
          <Typography variant="body2" color={VOLCANIC_SAND}>
            {environment.description}
          </Typography>
        )}
        <Column style={{ gap: '4px' }}>
          <StatusIndicator available>
            <ExternalLink href={`https://argocd.${fullDomainName}/applications/clusters`} available>
              View your Argo CD clusters
            </ExternalLink>
          </StatusIndicator>
          <StatusIndicator available={available}>
            <ExternalLink href={`https://${host}/${gitOwner}`} available={available}>
              View your {gitProvider} cluster configuration
            </ExternalLink>
          </StatusIndicator>
        </Column>
      </Column>

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
            <StyledValue variant="body2" data-test-id="creation-date">
              {creationDate && moment(+creationDate).format('DD MMM YYYY, HH:MM:SS')}
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
          {type !== ClusterType.WORKLOAD_V_CLUSTER && (
            <ColumnInfo>
              <StyledLabel variant="labelLarge">Number of nodes</StyledLabel>
              <StyledValue variant="body2">{nodeCount}</StyledValue>
            </ColumnInfo>
          )}
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
    </Container>
  );
};

export default ClusterDetails;
