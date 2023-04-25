import styled, { css } from 'styled-components';

export const Button = styled.button<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 88px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  gap: 24px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ active, theme }) =>
    active &&
    css`
      border-color: ${theme.colors.primary};
    `}
`;
