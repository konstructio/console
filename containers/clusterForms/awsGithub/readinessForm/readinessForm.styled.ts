import styled from 'styled-components';

export const Message = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.volcanicSand};
  gap: 8px;
  margin-top: 24px;

  & > span > svg {
    color: #a1a1aa;
  }
`;
