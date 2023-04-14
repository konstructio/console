import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { BISCAY } from '../../constants/colors';

export const StyledTooltip = muiStyled(({ className, ...rest }: TooltipProps) => (
  <Tooltip {...rest} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.arrow}`]: {
    color: `${BISCAY}`,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    alignItems: 'center',
    backgroundColor: `${BISCAY}`,
    borderRadius: '2px',
    boxShadow: '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    height: '34px',
    maxWidth: 'min-content',
    whiteSpace: 'nowrap',
  },
});
