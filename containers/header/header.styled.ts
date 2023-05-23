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

export const ClusterIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #22c55e;
`;

export const ClusterMenu = styled.div`
  align-items: center;
  background: #fafafa;
  border: 1px solid #f4f4f5;
  display: flex;
  height: 28px;
  gap: 8px;
  justify-content: center;
  padding: 0 8px;
  text-transform: uppercase;
`;
