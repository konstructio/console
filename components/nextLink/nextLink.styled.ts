'use client';
import styled from 'styled-components';

export const LinkContainer = styled.div`
  cursor: pointer;

  & a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.primary};
  }

  & svg {
    font-size: 14px;
  }
`;
