import styled, { css } from 'styled-components';
import Image from 'next/image';

import Row from '../row/';

import { TagColor } from '.';

export const TagContainer = styled(Row)<{ bgColor?: TagColor }>`
  border-radius: 4px;
  padding: 4px;
  text-transform: capitalize;

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
      : bgColor === 'fuscia'
      ? css`
          background-color: #fdf4ff;
          color: #a21caf;
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
          background-color: #dcfce7;
          color: #15803d;
        `
      : bgColor === 'emerald'
      ? css`
          background-color: #ecfdf5;
          color: #047857;
        `
      : bgColor === 'grey'
      ? css`
          background-color: #f8fafc;
          color: #71717a;
        `
      : bgColor === 'indigo'
      ? css`
          background-color: #e0e7ff;
          color: #4338ca;
        `
      : css`
          background-color: none;
          color: #71717a;
        `}
`;

export const IconImage = styled(Image)`
  margin-right: 4px;
`;
