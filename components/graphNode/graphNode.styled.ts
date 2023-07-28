import styled from 'styled-components';
import { Handle } from 'reactflow';
import Image from 'next/image';

import Typography from '../typography';
import Column from '../column';
import Row from '../row';
import Tag from '../tag';

export const NodeLabel = styled(Typography)`
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

export const NodeHandle = styled(Handle)<{ bgColor: string }>`
  right: -8px;
  height: 16px;
  width: 16px;
  border: none;
  background-color: ${({ bgColor }) => bgColor};
`;

export const LabelContainer = styled(Row)`
  align-items: center;
  gap: 8px;

  p {
    font-size: 11px;
    margiin: 0;
  }
`;

export const NodeLabelContainer = styled(Row)`
  align-items: center;
  gap: 4px;

  p {
    font-size: 11px;
    margin: 0;
  }
`;

export const Region = styled.p`
  margin: 0;
  font-size: 11px;
  width: 127px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const MainContainerInfo = styled(Column)`
  margin-left: 45px;
  width: 181px;
  height: 100%;
  justify-content: space-between;
`;

export const OtherContainerInfo = styled(Column)`
  flex: 1;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledTag = styled(Tag)`
  width: fit-content;
`;

export const Img = styled(Image)`
  height: 93px;
  width: 96px;
  position: absolute;
  left: -50px;
  top: -2px;
`;

export const Container = styled(Row)<{ borderColor: string }>`
  height: 64px;
  width: 360px;
  background: white;
  border: 2px solid ${({ borderColor }) => borderColor};
  border-radius: 0 8px 8px 0;
  align-items: center;
  padding: 12px 16px;
  color: #3f3f46;
`;

export const Label = styled(Typography).attrs({
  variant: 'labelSmall',
})`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.exclusivePlum};
  letter-spacing: 0.5px;
`;
