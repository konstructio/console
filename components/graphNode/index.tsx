import React, { FunctionComponent } from 'react';
import { Node, NodeProps, Position, HandleType } from 'reactflow';

import managementClusterIcon from '../../assets/managementIcon.svg';
import workloadClusterIcon from '../../assets/cluster.svg';
import unavailableClusterSrc from '../../assets/cluster-unavailable.svg';
import { BLUE_REFLECTION, MAGIC_MINT, SASSY_PINK } from '../../constants/colors';
import { CLUSTER_TAG_CONFIG } from '../../constants';
import { ClusterType } from '../../types/provision';
import { ClusterInfo } from '../clusterTable/clusterTable';

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
  { handle: HandleType; position: Position; imageSrc: any; nodeColor: string }
> = {
  [ClusterType.DRAFT]: {
    handle: 'target',
    position: Position.Left,
    imageSrc: unavailableClusterSrc,
    nodeColor: BLUE_REFLECTION,
  },
  [ClusterType.MANAGEMENT]: {
    handle: 'source',
    position: Position.Right,
    imageSrc: managementClusterIcon,
    nodeColor: MAGIC_MINT,
  },
  [ClusterType.WORKLOAD]: {
    handle: 'target',
    position: Position.Left,
    imageSrc: workloadClusterIcon,
    nodeColor: SASSY_PINK,
  },
};

export type GraphNodeInfo = Pick<
  ClusterInfo,
  'status' | 'type' | 'clusterName' | 'cloudProvider' | 'cloudRegion' | 'nodes'
>;

export type CustomGraphNode = Node<Partial<GraphNodeInfo>>;

export const GraphNode: FunctionComponent<NodeProps<GraphNodeInfo>> = ({
  data,
  isConnectable,
  selected,
}) => {
  const { status, type, clusterName, cloudProvider, cloudRegion, nodes } = data ?? {};

  const { iconLabel, iconType, bgColor } = CLUSTER_TAG_CONFIG[status ?? 'draft'];
  const { handle, position, imageSrc, nodeColor } = GRAPH_NODE_CONFIG[type ?? ClusterType.DRAFT];

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
          {nodes && <p>{nodes}</p>}
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
