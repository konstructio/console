import styled from 'styled-components';
import Image from 'next/image';

import { media } from '../../theme/media';
import Ray from '../../assets/ray.svg';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-top-right-radius: 20px;
  box-shadow: 1px 1px 5px 0px lightgrey;
  height: 100%;
  width: 120px;
  z-index: 2;

  ${media.lessThan('sm')`
    display: none;
  `}
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
`;

export const Icon = styled(Image).attrs({ src: Ray })`
  height: 80px;
  width: 80px;
`;

export const Row = styled.div<{ shouldShowHoverState?: boolean; isActive?: boolean }>`
  align-items: center;
  background-color: ${({ isActive, theme }) => isActive && theme.colors.bleachedSilk};
  display: flex;
  cursor: pointer;
  font-size: 24px;
  justify-content: center;
  padding: 20px 0;
  width: 100%;

  ${({ shouldShowHoverState, theme }) =>
    shouldShowHoverState &&
    `
      &:hover {
        background-color: ${theme.colors.bleachedSilk};
      }
  `}
`;

export const SidebarItems = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: calc(100% - 140px);
`;
