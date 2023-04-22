import styled from 'styled-components';

import Card from '../card/Card';

export const LabelContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;

  p {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.saltboxBlue};
  }
`;

export const LinkContent = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CardContainer = styled(Card)`
  display: flex;
  align-items: center;
  max-width: 540px;
  min-width: 365px;
  padding: 24px;
`;
