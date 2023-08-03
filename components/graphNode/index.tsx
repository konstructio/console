import React, { FunctionComponent } from 'react';
import { Node, NodeProps, Position, HandleType } from 'reactflow';

import greenPolygon from '../../assets/managementIcon.svg';
import pinkClusterIcon from '../../assets/cluster.svg';
import unavailableClusterSrc from '../../assets/cluster-unavailable.svg';
import { BLUE_REFLECTION, MAGIC_MINT, SASSY_PINK } from '../../constants/colors';
import { TAG_CONFIG } from '../../constants';
import { NodeStatus, NodeType } from '../../types';

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

export type NodeData = {
  label?: string;
  cloud?: string;
  region?: string;
  status: NodeStatus;
  nodeCount?: number;
};

const nodeConfig: Record<
  NodeType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { handle: HandleType; position: Position; imageSrc: any; nodeColor: string }
> = {
  draft: {
    handle: 'target',
    position: Position.Left,
    imageSrc: unavailableClusterSrc,
    nodeColor: BLUE_REFLECTION,
  },
  management: {
    handle: 'source',
    position: Position.Right,
    imageSrc: greenPolygon,
    nodeColor: MAGIC_MINT,
  },
  worker: {
    handle: 'target',
    position: Position.Left,
    imageSrc: pinkClusterIcon,
    nodeColor: SASSY_PINK,
  },
};

export type CustomGraphNode = Node<NodeData, NodeType>;

export const GraphNode: FunctionComponent<NodeProps<NodeData>> = ({
  data,
  isConnectable,
  type,
}) => {
  const { label, cloud, region, nodeCount, status } = data;

  const { iconLabel, iconType, bgColor } = TAG_CONFIG[status];
  const { handle, position, imageSrc, nodeColor } = nodeConfig[type as NodeType];

  return (
    <Container borderColor={nodeColor}>
      <MainContainerInfo>
        <NodeLabel>{label}</NodeLabel>
        <LabelContainer>
          <Label>CLOUD:</Label>
          {cloud && <p>{cloud}</p>}
        </LabelContainer>
        <LabelContainer>
          <Label>REGION:</Label>
          {region && <Region>{region}</Region>}
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
