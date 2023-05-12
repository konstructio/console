import {
  StepConnector,
  stepConnectorClasses,
  stepLabelClasses,
  StepLabel,
  styled as muiStyled,
} from '@mui/material';
import styled from 'styled-components';

import { theme } from '../../theme';
import { BISCAY, PORT_GORE, SALTBOX_BLUE } from '../../constants/colors';

export const Label = muiStyled(StepLabel)(() => ({
  [`& .${stepLabelClasses.label}`]: {
    color: `${SALTBOX_BLUE}`,
  },
  [`& .${stepLabelClasses.active}`]: {
    color: `${BISCAY}`,
  },
  [`& .${stepLabelClasses.disabled}`]: {
    color: theme.colors.saltboxBlue,
  },
  [`& .${stepLabelClasses.alternativeLabel}`]: {
    marginTop: '4px !important',
  },
}));

export const ColorlibConnector = muiStyled(StepConnector)(({ theme: muiTheme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    left: 'calc(-50% + 26px)',
    right: 'calc(50% + 26px)',
    top: 25,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: muiTheme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: muiTheme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: `${PORT_GORE}`,
    borderRadius: 1,
  },
}));

export const ColorlibStepIconRoot = muiStyled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme: muiTheme, ownerState }) => ({
  backgroundColor: 'transparent',
  border: `2px solid ${PORT_GORE}`,
  zIndex: 1,
  color: theme.colors.saltboxBlue,
  width: 52,
  height: 52,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    border: `2px solid ${muiTheme.palette.primary.main}`,
    backgroundColor: muiTheme.palette.primary.main,
    color: '#fff',
  }),
  ...(ownerState.completed && {
    border: `2px solid ${muiTheme.palette.primary.main}`,
    backgroundColor: 'transparent',
    color: '#fff',
  }),
}));

export const CompletedStep = muiStyled('div')(({ theme: muiTheme }) => ({
  backgroundColor: 'transparent',
  border: `2px solid ${muiTheme.palette.primary.main}`,
  zIndex: 1,
  color: theme.colors.saltboxBlue,
  width: 52,
  height: 52,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.childOfLight};
  display: flex;
  justify-content: center;
  padding: 21px 0;
  width: 100%;
`;
