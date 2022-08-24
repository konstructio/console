import styled from 'styled-components';

import Copy from '../../assets/copy.png';

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const InputContainer = styled.div<{ showPassword: boolean }>`
  position: relative;
  height: 34px;
  width: 100%;

  & input {
    color: ${({ theme }) => theme.colors.ultimateGrey};
    cursor: default;
    letter-spacing: ${({ showPassword }) => (showPassword ? 'initial' : '0.1em')};
    line-height: 20px;
  }
`;

export const CopyIcon = styled.img.attrs({ src: Copy })`
  cursor: pointer;
  height: 20px;
  margin-left: 10px;
  width: 20px;
`;
