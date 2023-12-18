'use client';
import Box, { BoxProps } from '@mui/material/Box';
import styled from 'styled-components';

import FormContainer from '../../components/formContainer';
import { media } from '../../utils/media';

import { FormContent as Content } from '@/components/formContainer/formContainer.styled';
import { LIGHT_GREY } from '@/constants/colors';
import Row from '@/components/row';

export const AdvancedOptionsContainer = styled(FormContainer)`
  margin: 16px 0;
  width: calc(100% - 80px);

  ${Content} {
    gap: 32px;
  }

  ${media.greaterThan<{ hasInfo: boolean }>('lg')`
    width: 1024px;
  `};
`;

export const Form = styled(Box)<BoxProps>`
  height: 100%;
  overflow: auto;
`;

export const FormFooter = styled(Row)`
  border-top: 1px solid ${LIGHT_GREY};
  padding: 20px;
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

  ${Content} {
    gap: 32px;
  }

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

  ${media.greaterThan('lg')`
    width: 1024px;

    ${({ hasInfo }: { hasInfo: boolean }) =>
      hasInfo &&
      `
        width: 680px;
    `}
  `};
`;
