import React, { FunctionComponent } from 'react';
import Fade from '@mui/material/Fade';
import { TooltipProps } from '@mui/material/Tooltip';

import Typography from '../typography';

import { StyledTooltip } from './Tooltip.styled';

const Tooltip: FunctionComponent<TooltipProps> = ({ children, title, ...rest }) => (
  <StyledTooltip
    {...rest}
    title={<Typography variant="tooltip">{title}</Typography>}
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 600 }}
    arrow={true}
  >
    <span>{children}</span>
  </StyledTooltip>
);

export default Tooltip;
