'use client';
import styled from 'styled-components';

import { LIGHT_GREY } from '@/constants/colors';

export const Button = styled.button`
  border: none;
  cursor: pointer;
  background-color: ${LIGHT_GREY};
  padding: 5px 8px;
  border-radius: 4px;
`;
