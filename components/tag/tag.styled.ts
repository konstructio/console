'use client';
import styled, { css, keyframes } from 'styled-components';
import Image from 'next/image';

import Row from '../row/';

const spinAnimation = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

export const IconImage = styled(Image)<{ spin?: boolean }>`
  margin-right: 4px;

  ${({ spin }) =>
    spin &&
    css`
      animation: ${spinAnimation} 1s ease infinite;
    `}
`;

export const RemovalButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  height: 14px;
  width: 14px;
`;

export const TagContainer = styled(Row)<{ bg?: string; textColor?: string }>`
  align-items: flex-end;
  border-radius: 4px;
  padding: 4px;
  text-transform: capitalize;
  background-color: ${({ bg }) => bg};
  color: ${({ textColor }) => textColor};
  width: fit-content;

  ${RemovalButton} {
    & svg {
      padding: 0;
      height: 14px;
      width: 14px;
      color: ${({ textColor }) => textColor};
    }
  }
`;
