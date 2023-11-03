import React, { FunctionComponent, useMemo } from 'react';
import { Node, NodeProps, Position, HandleType } from 'reactflow';

import managementCluster from '../../assets/managementIcon.svg';
import vCluster from '../../assets/vCluster.svg';
import vClusterAvailable from '../../assets/vClusterAvailable.svg';
import cluster from '../../assets/cluster.svg';
import clusterAvailable from '../../assets/clusterAvailable.svg';
import { BUBBLE_GUM_BABY_GIRL } from '../../constants/colors';
import { CLUSTER_TAG_CONFIG } from '../../constants';
import { Cluster, ClusterStatus, ClusterType, DraftCluster } from '../../types/provision';
import Typography from '../typography';

import {
  Container,
  CloudProvider,
  LabelContainer,
  MainContainerInfo,
  NodeHandle,
  ClusterName,
  StatusTag,
  EnvironmentTag,
  LeftPanel,
  Nodes,
  Img,
} from './graphNode.styled';

const GRAPH_NODE_CONFIG: Record<
  ClusterType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { handle: HandleType; position: Position; iconSrc: any }
> = {
  [ClusterType.MANAGEMENT]: {
    handle: 'source',
    position: Position.Right,
    iconSrc: managementCluster,
  },
  [ClusterType.WORKLOAD]: {
    handle: 'target',
    position: Position.Left,
    iconSrc: cluster,
  },
  [ClusterType.WORKLOAD_V_CLUSTER]: {
    handle: 'target',
    position: Position.Left,
    iconSrc: vCluster,
  },
};

export type CustomGraphNode = Node<Cluster | DraftCluster>;

export const GraphNode: FunctionComponent<NodeProps<Cluster>> = ({
  data,
  isConnectable,
  selected,
}) => {
  const {
    clusterId,
    status,
    type,
    clusterName,
    cloudProvider,
    cloudRegion,
    nodeCount,
    environment,
  } = data ?? {};

  const { iconLabel, iconType, bgColor } = CLUSTER_TAG_CONFIG[status ?? ClusterStatus.PROVISIONED];
  const { handle, position, iconSrc } = GRAPH_NODE_CONFIG[type ?? ClusterType.WORKLOAD];

  const draftNode = useMemo(() => clusterId === 'draft', [clusterId]);
  const managementCluster = useMemo(() => type === ClusterType.MANAGEMENT, [type]);

  const imageSrc = useMemo(() => {
    if (status === ClusterStatus.PROVISIONED && clusterId !== 'draft') {
      if (type === ClusterType.WORKLOAD) {
        return clusterAvailable;
      } else if (type === ClusterType.WORKLOAD_V_CLUSTER) {
        return vClusterAvailable;
      }
    }
    return iconSrc;
  }, [iconSrc, status, type, clusterId]);

  return (
    <Container selected={selected} managementCluster={managementCluster}>
      <MainContainerInfo>
        <LeftPanel>
          <ClusterName>{clusterName}</ClusterName>
          {cloudProvider && cloudRegion && (
            <LabelContainer>
              <CloudProvider>{cloudProvider}:</CloudProvider>
              <Typography variant="body3">{cloudRegion}</Typography>
            </LabelContainer>
          )}
          {nodeCount && (
            <LabelContainer>
              <Nodes>NODES:</Nodes>
              <Typography variant="body3">{nodeCount}</Typography>
            </LabelContainer>
          )}
          {environment && <EnvironmentTag text={environment.name} bgColor={environment.color} />}
        </LeftPanel>
      </MainContainerInfo>
      <StatusTag
        text={draftNode ? 'DRAFT' : iconLabel}
        bgColor={draftNode ? 'gray' : bgColor}
        icon={!draftNode ? iconType : undefined}
        spinImage={status === ClusterStatus.PROVISIONING}
      />
      <NodeHandle
        type={handle}
        position={position}
        isConnectable={isConnectable}
        bgColor={BUBBLE_GUM_BABY_GIRL}
      />
      <Img src={imageSrc} alt="cluster" />
    </Container>
  );
};
