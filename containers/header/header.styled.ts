import styled from 'styled-components';

import row from '../../components/row';

export const Container = styled(row)`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 4px rgba(31, 41, 55, 0.06);
  height: 46px;
  width: 100%;
  z-index: 1500;
`;

export const ClusterIndicator = styled.div``;
export const ClusterMenu = styled.div``;
