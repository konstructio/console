import styled, { css } from 'styled-components';

import { CardProps } from '.';

export const CardContainer = styled.div<CardProps>`
  border: 2px solid ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;

  ${({ withHoverEffect }) =>
    withHoverEffect &&
    css`
      &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
      }
    `}

  ${({ active, theme }) =>
    active &&
    css`
      border-color: ${theme.colors.primary};
    `}
`;
