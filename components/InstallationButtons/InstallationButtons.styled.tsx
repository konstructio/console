import styled from 'styled-components';

import Row from '../row/Row';

export const Container = styled(Row)`
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  gap: 16px;
  justify-content: flex-end;
  height: 64px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};

  & button {
    text-transform: capitalize;
  }

  #next {
    margin-right: 80px;
  }
`;
