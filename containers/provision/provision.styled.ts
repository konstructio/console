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
`;

export const FormContent = styled(FormContainer)<{ hasInfo: boolean; isLastStep: boolean }>`
  background-color: ${({ isLastStep, theme }) => (isLastStep ? 'transparent' : theme.colors.white)};
  box-shadow: ${({ isLastStep }) => isLastStep && 'none'};
  gap: 32px;
  width: 1024px;

  ${({ hasInfo }) =>
    hasInfo &&
    `
      width: 680px;
  `}
`;
