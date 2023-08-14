import styled from 'styled-components';
import Button from '@mui/material/Button';

import { EXCLUSIVE_PLUM, LIGHT_GREY } from '../../constants/colors';

export const Container = styled.div<{ disabled?: boolean }>`
  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
  `}
`;

export const PrimaryButton = styled(Button)`
  box-shadow: none !important;
  &:hover {
    background-color: ${({ theme }) => theme.colors.royanPurple} !important;
  }
  ${({ disabled }) =>
    disabled &&
    `
    background-color: ${LIGHT_GREY} !important;
    color: ${EXCLUSIVE_PLUM} !important;
    cursor: not-allowed !important;
  `}
`;

export const SecondaryButton = styled(Button)`
  border: 1px solid !important;
  box-shadow: none !important;
  &:hover {
    background-color: ${({ theme }) => theme.colors.magnolia} !important;
  }
  ${({ disabled }) =>
    disabled &&
    `
    border-color: ${EXCLUSIVE_PLUM} !important;
    color: ${EXCLUSIVE_PLUM} !important;
    cursor: not-allowed !important;
  `}
`;

export const ErrorButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.danger} !important;
  box-shadow: none !important;
  &:hover {
    background-color: ${({ theme }) => theme.colors.fireBrick};
  }

  ${({ disabled }) =>
    disabled &&
    `
    background-color: ${LIGHT_GREY} !important;
    border-color: ${EXCLUSIVE_PLUM} !important;
    color: ${EXCLUSIVE_PLUM} !important;
    cursor: not-allowed !important;
  `}
`;

export const InfoButton = styled(Button)`
  background-color: inherit;
  box-shadow: none !important;
  color: ${({ theme }) => theme.colors.saltboxBlue};
`;
