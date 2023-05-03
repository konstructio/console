import styled from 'styled-components';

import Card from '../card';

export const CardContainer = styled(Card)`
  display: flex;
  align-items: center;
  max-width: 540px;
  min-width: 365px;
  padding: 24px;
  height: 84px;
`;

export const DetailsContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-left: 24px;

  p {
    color: ${({ theme }) => theme.colors.saltboxBlue};
    margin-top: 4px;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const LinkContent = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;
