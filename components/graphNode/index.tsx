import React, { FunctionComponent, useMemo } from 'react';
import { Node, NodeProps, Position, HandleType } from 'reactflow';

import managementClusterIcon from '../../assets/managementIcon.svg';
import workloadClusterIcon from '../../assets/cluster.svg';
import unavailableClusterSrc from '../../assets/cluster-unavailable.svg';
import { BLUE_REFLECTION, MAGIC_MINT, SASSY_PINK } from '../../constants/colors';
import { CLUSTER_TAG_CONFIG } from '../../constants';
import { Cluster, ClusterStatus, ClusterType } from '../../types/provision';

import {
  Container,
  Img,
  Label,
  LabelContainer,
  MainContainerInfo,
  NodeHandle,
  NodeLabel,
  NodeLabelContainer,
  OtherContainerInfo,
  Region,
  StyledTag,
} from './graphNode.styled';

const GRAPH_NODE_CONFIG: Record<
  ClusterType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { handle: HandleType; position: Position; nodeColor: string }
> = {
  [ClusterType.DRAFT]: {
    handle: 'target',
    position: Position.Left,
    nodeColor: BLUE_REFLECTION,
  },
  [ClusterType.MANAGEMENT]: {
    handle: 'source',
    position: Position.Right,
    nodeColor: MAGIC_MINT,
  },
  [ClusterType.WORKLOAD]: {
    handle: 'target',
    position: Position.Left,
    nodeColor: SASSY_PINK,
  },
  [ClusterType.WORKLOAD_V_CLUSTER]: {
    handle: 'target',
    position: Position.Left,
    nodeColor: SASSY_PINK,
  },
};

export type CustomGraphNode = Node<Partial<Cluster>>;

export const GraphNode: FunctionComponent<NodeProps<Cluster>> = ({
  data,
  isConnectable,
  selected,
}) => {
  const { status, type, clusterName, cloudProvider, cloudRegion, nodeCount } = data ?? {};

  const { iconLabel, iconType, bgColor } = CLUSTER_TAG_CONFIG[status ?? ClusterType.DRAFT];
  const { handle, position } = GRAPH_NODE_CONFIG[type ?? ClusterType.DRAFT];

  const { nodeColor, imageSrc } = useMemo(
    () =>
      type === ClusterType.MANAGEMENT
        ? { nodeColor: MAGIC_MINT, imageSrc: managementClusterIcon }
        : type === ClusterType.DRAFT || status === ClusterStatus.PROVISIONING
        ? { nodeColor: BLUE_REFLECTION, imageSrc: unavailableClusterSrc }
        : { nodeColor: SASSY_PINK, imageSrc: workloadClusterIcon },
    [type, status],
  );

  return (
    <Container borderColor={nodeColor} selected={selected}>
      <MainContainerInfo>
        <NodeLabel>{clusterName}</NodeLabel>
        <LabelContainer>
          <Label>CLOUD:</Label>
          {cloudProvider && <p>{cloudProvider}</p>}
        </LabelContainer>
        <LabelContainer>
          <Label>REGION:</Label>
          {cloudRegion && <Region>{cloudRegion}</Region>}
        </LabelContainer>
      </MainContainerInfo>
      <OtherContainerInfo>
        <StyledTag text={iconLabel} bgColor={bgColor} icon={iconType} />
        <NodeLabelContainer>
          <Label>NODE COUNT:</Label>
          {nodeCount && <p>{nodeCount}</p>}
        </NodeLabelContainer>
      </OtherContainerInfo>
      <NodeHandle
        type={handle}
        position={position}
        isConnectable={isConnectable}
        bgColor={nodeColor}
      />
      <Img src={imageSrc} alt={`cluster ${type} node`} />
    </Container>
  );
};
