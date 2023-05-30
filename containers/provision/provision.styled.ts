import { Box } from '@mui/material';
import styled from 'styled-components';

import FormContainer from '../../components/formContainer';

export const AdvancedOptionsContainer = styled(FormContainer)`
  background-color: ${({ theme }) => theme.colors.white};
  gap: 32px;
  margin: 16px 0;
  width: 1024px;
`;

export const Form = styled(Box)`
  height: 100%;
  overflow: auto;
`;

export const ErrorContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;
`;

export const FormContent = styled(FormContainer)<{
  hasInfo: boolean;
  isLastStep: boolean;
  isProvisionStep: boolean;
}>`
  background-color: ${({ isLastStep, theme }) => (isLastStep ? 'transparent' : theme.colors.white)};
  box-shadow: ${({ isProvisionStep, isLastStep }) => (isLastStep || isProvisionStep) && 'none'};
  gap: 32px;
  width: 1024px;

  ${({ hasInfo }) =>
    hasInfo &&
    `
      width: 680px;
  `}

  ${({ isProvisionStep }) =>
    isProvisionStep &&
    `
      background-color: transparent;
  `}
`;
