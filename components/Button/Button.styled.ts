'use client';
import styled from 'styled-components';
import Button from '@mui/material/Button';

import {
  ASMANI_SKY,
  DR_WHITE,
  EXCLUSIVE_PLUM,
  LIGHT_GREY,
  PASTEL_LIGHT_BLUE,
  VOLCANIC_SAND,
} from '../../constants/colors';

export const Container = styled.div<{ disabled?: boolean; fullWidth?: boolean }>`
  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

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

export const SecondaryDarkButton = styled(Button)`
  border: 1px solid !important;
  box-shadow: none !important;
  border-color: ${PASTEL_LIGHT_BLUE} !important;
  color: ${VOLCANIC_SAND} !important;

  &:hover {
    background-color: ${DR_WHITE} !important;
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

export const TextButton = styled(Button)`
  background-color: inherit;
  box-shadow: none !important;
  color: ${({ theme }) => theme.colors.saltboxBlue} !important;

  &:hover {
    color: ${({ theme }) => theme.colors.primary} !important;
    background-color: ${({ theme }) => theme.colors.magnolia};
  }
`;

export const SubscriptionButton = styled(Button)`
  background-color: inherit;
  box-shadow: none !important;
  color: ${ASMANI_SKY} !important;
  border-color: ${ASMANI_SKY} !important;

  &:hover {
    color: ${ASMANI_SKY} !important;
  }
`;
