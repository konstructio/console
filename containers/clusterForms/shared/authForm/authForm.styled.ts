import styled from 'styled-components';

import { BISCAY } from '../../../../constants/colors';

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
