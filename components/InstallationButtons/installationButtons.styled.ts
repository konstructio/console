import styled from 'styled-components';

import Row from '../row';

export const Container = styled(Row)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  gap: 16px;
  height: 64px;
  justify-content: flex-end;
  width: 100%;

  & button {
    text-transform: capitalize;
  }

  #next {
    margin-right: 80px;
  }
`;
