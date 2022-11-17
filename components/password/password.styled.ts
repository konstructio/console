import styled from 'styled-components';
import { MdContentCopy } from 'react-icons/md';

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const InputContainer = styled.div<{ showPassword: boolean }>`
  position: relative;
  height: 34px;

  & div {
    border: none;
  }

  & input {
    color: ${({ theme }) => theme.colors.ultimateGrey};
    cursor: default;
    letter-spacing: ${({ showPassword }) => (showPassword ? 'initial' : '0.1em')};
    line-height: 20px;
  }
`;

export const CopyIcon = styled(MdContentCopy)`
  color: darkgray;
  cursor: pointer;
  font-size: 18px;
  margin-left: 4px;
  margin-bottom: 2px;

  &:hover {
    color: black;
  }
`;
