'use client';
import styled from 'styled-components';
import { ControlButton } from 'reactflow';

import { PASTEL_LIGHT_BLUE, ROCK_BLUE } from '../../../constants/colors';

export const StyledControlButton = styled(ControlButton)`
  height: 36px;
  width: 32px;
  flex-shrink: 0;
  background-color: white;
  border: 1px solid ${PASTEL_LIGHT_BLUE};
  padding: 0;

  svg {
    max-height: unset;
    max-width: unset;
    height: 20px;
    width: 20px;
    color: ${ROCK_BLUE};
  }
`;

export const FitViewButton = styled(StyledControlButton)`
  border-radius: 4px 0px 0px 4px;
`;

export const ZoomInButton = styled(StyledControlButton)`
  border-left: none;
  border-right: none;
`;

export const ZoomOutButton = styled(StyledControlButton)`
  border-radius: 0px 4px 4px 0px;
`;
