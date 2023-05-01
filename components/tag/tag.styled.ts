import styled, { css } from 'styled-components';

import Typography, { ITypographyProps } from '../typography';

import { TagColor } from '.';

export const TagContainer = styled(Typography)<{ bgColor?: TagColor } & ITypographyProps>`
  border-radius: 4px;
  padding: 4px;

  ${({ bgColor }) =>
    bgColor === 'neon-green'
      ? css`
          background-color: #ecfccb;
          color: #4d7c0f;
        `
      : bgColor === 'light-orange'
      ? css`
          background-color: #fef3c7;
          color: #d97706;
        `
      : bgColor === 'pink'
      ? css`
          background-color: #fce7f3;
          color: #be185d;
        `
      : bgColor === 'light-blue'
      ? css`
          background-color: #ecfeff;
          color: #0e7490;
        `
      : bgColor === 'sky-blue'
      ? css`
          background-color: #e0f2fe;
          color: #0369a1;
        `
      : bgColor === 'dark-sky-blue'
      ? css`
          background-color: #dbeafe;
          color: #1d4ed8;
        `
      : bgColor === 'purple'
      ? css`
          background-color: #ede9fe;
          color: #6d28d9;
        `
      : bgColor === 'yellow'
      ? css`
          background-color: #fef9c3;
          color: #a16207;
        `
      : bgColor === 'green'
      ? css`
          background-color: #d1fae5;
          color: #059669;
        `
      : css`
          background-color: none;
          color: #71717a;
        `}
`;
