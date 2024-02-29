import styled from 'styled-components';

import Column from '@/components/Column/Column';
import LearnMore from '@/components/LearnMore/LearnMore';
import Row from '@/components/Row/Row';
import { TRAFFIC_WHITE, VOLCANIC_SAND, WASH_ME } from '@/constants/colors';
import { media } from '@/utils/media';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 32px 40px;
  gap: 24px;
  overflow-y: auto;
`;

export const FormFooter = styled(Row)`
  padding: 16px 24px;
  border-top: 2px solid ${WASH_ME};
  justify-content: flex-end;
  gap: 16px;
`;

export const FormHeader = styled(Row)`
  padding: 16px 24px;
  border-bottom: 2px solid ${WASH_ME};
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

export const Header = styled(Row)`
  justify-content: space-between;
`;

export const HeadingContainer = styled(Column)`
  gap: 8px;

  ${LearnMore} {
    color: ${VOLCANIC_SAND};
  }
`;

export const GitFieldsContainer = styled(Column)`
  gap: 12px;
  flex: 1;

  ${media.greaterThan('sm')`
  flex-direction: row;
  `}
`;

export const GitUserField = styled(Column)`
  width: 100%;
  max-width: 312px;
`;

export const GitUserFieldInput = styled(Row)`
  background-color: ${TRAFFIC_WHITE};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.volcanicSand};
  height: 20px;
  margin-top: 8px;
  padding: 8px 12px;
  overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
