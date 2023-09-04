import styled from 'styled-components';

import row from '../../components/row';

export const Container = styled(row)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 4px rgba(31, 41, 55, 0.06);
  display: flex;
  min-height: 64px;
  justify-content: center;
  width: 100%;
`;
