import styled from 'styled-components';
import Button from '@mui/material/Button';

export const Container = styled.div<{ disabled?: boolean }>`
  width: 100%;

  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
  `}
`;

export const PrimaryButton = styled(Button)`
  box-shadow: none !important;

  &:hover {
    background-color: #6f37ae !important;
  }

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #E4E4E7 !important;
    color: #71717A !important;
    cursor: not-allowed !important;
  `}
`;

export const SecondaryButton = styled(Button)`
  border: 1px solid !important;
  box-shadow: none !important;

  &:hover {
    background-color: #faf5ff !important;
  }

  ${({ disabled }) =>
    disabled &&
    `
    border-color: #71717A !important;
    color: #71717A !important;
    cursor: not-allowed !important;
  `}
`;

export const ErrorButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.danger} !important;

  box-shadow: none !important;

  &:hover {
    background-color: #b91c1c !important;
  }
`;

export const InheritButton = styled(Button)`
  box-shadow: none !important;
  border: 1px solid #e2e8f0;
  color: ${({ theme }) => theme.colors.volcanicSand};
  text-transform: capitalize !important;

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #E4E4E7 !important;
    color: #71717A !important;
    cursor: not-allowed !important;
  `};
`;
