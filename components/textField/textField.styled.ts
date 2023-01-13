import styled from 'styled-components';

export const Container = styled.div`
  & > label {
    margin-bottom: 8px;
  }
`;

export const Required = styled.div`
  color: ${({ theme }) => theme.colors.danger};
`;
