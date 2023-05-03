import styled from 'styled-components';

import ColumnComponent from '../column';
import RowComponent from '../row';

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;

  & svg {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
`;

export const Column = styled(ColumnComponent)`
  gap: 8px;
  justify-content: space-between;
  width: 100%;
`;

export const Row = styled(RowComponent)`
  width: 100%;
`;
