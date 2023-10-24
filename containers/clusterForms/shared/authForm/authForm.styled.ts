'use client';
import styled from 'styled-components';

import { BISCAY, SNOW } from '../../../../constants/colors';

export const GitContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;

  & > button {
    gap: 16px;
    height: 55px;
    width: 132px;

    & > img {
      width: 24px;
    }

    & > h6 {
      color: ${BISCAY};
      font-size: 14;
      font-weight: 400;
      line-height: '20px';
      letter-spacing: 0.1;
    }
  }
`;

export const FormContainer = styled.div<{ isVisible?: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 32px;
`;

export const GitUserField = styled.div``;

export const GitUserFieldInput = styled.div`
  background-color: ${SNOW};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.volcanicSand};
  height: 20px;
  margin-top: 8px;
  padding: 8px 12px;
  overflow: ellipsis;
  display: inline-block;
  width: 192px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
