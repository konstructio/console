'use client';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

export const FragmentContainer = styled.div`
  position: relative;
`;

export const Close = styled(CloseIcon)`
  cursor: pointer;
  position: fixed;
  top: 40px;
  right: 40px;
`;
