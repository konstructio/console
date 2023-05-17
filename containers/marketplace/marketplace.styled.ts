import styled from 'styled-components';

import Typography from '../../components/typography';

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
`;

export const Container = styled.div`
  display: flex;
  height: calc(100% - 30px);
  width: 100%;
`;

export const Content = styled.div`
  padding: 24px;
  width: 100%;
`;

export const Filter = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 8px;
  padding: 24px;
  width: 266px;
`;
