import styled from 'styled-components';

import CardComponent from '@/components/card';
import TagComponent from '@/components/tag';

export const Container = styled.div`
  padding: 28px;
  width: calc(100% - 56px);
`;

export const Card = styled(CardComponent)`
  display: flex;
  justify-content: space-between;
  max-width: 200px;
  min-width: 200px;
  padding: 24px;
  height: 28px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Tag = styled(TagComponent)`
  height: 16px;
`;
