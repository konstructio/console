'use client';
import React, { FunctionComponent } from 'react';
import { ControlProps, Controls } from 'reactflow';
import styled from 'styled-components';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import { FitViewButton, ZoomInButton, ZoomOutButton } from './Controls.styled';

const CustomReactFlowControls: FunctionComponent<ControlProps> = ({
  onFitView,
  onZoomIn,
  onZoomOut,
  ...rest
}) => (
  <Controls
    {...rest}
    showFitView={false}
    showZoom={false}
    showInteractive={false}
    style={{ display: 'flex' }}
  >
    <FitViewButton onClick={onFitView}>
      <FullscreenIcon />
    </FitViewButton>
    <ZoomInButton onClick={onZoomIn}>
      <ZoomInIcon />
    </ZoomInButton>
    <ZoomOutButton onClick={onZoomOut}>
      <ZoomOutIcon />
    </ZoomOutButton>
  </Controls>
);

export default styled(CustomReactFlowControls)`
  border: none;
  box-shadow: none;
`;
