import styled from 'styled-components';

import row from '../../components/row';

export const Container = styled(row)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 4px rgba(31, 41, 55, 0.06);
  display: flex;
  height: 46px;
  justify-content: center;
  width: 100%;
  z-index: 1500;
`;

export const ClusterIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #22c55e;
`;

export const ClusterMenu = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: center;
  text-transform: uppercase;

  background: #fafafa;
  border: 1px solid #f4f4f5;
  padding: 0 8px;
`;
