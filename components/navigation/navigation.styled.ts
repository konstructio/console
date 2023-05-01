import styled, { css } from 'styled-components';

import Typography from '../../components/typography';
import { media } from '../../utils/media';
import { MIDNIGHT_EXPRESS } from '../../constants/colors';

export const Container = styled.nav`
  background-color: ${({ theme }) => theme.colors.moonlessMystery};
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 72px;
  transition: width 0.5s ease;

  ${media.greaterThan('md')`
    width: 256px;
  `}
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;

  & a {
    text-decoration: none;
  }
`;

export const MenuContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & a {
    text-decoration: none;
  }
`;

export const MenuItem = styled.div<{ isActive?: boolean }>`
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #9ea2c6;
  cursor: pointer;
  display: flex;
  gap: 18px;
  height: 24px;
  margin: 0 8px;
  padding: 10px;
  width: 40px;
  transition: width 0.5s ease;

  &:hover {
    background-color: ${MIDNIGHT_EXPRESS};
    color: white;

    svg {
      color: white;
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${MIDNIGHT_EXPRESS};
      color: white;

      svg {
        color: white;
      }
    `}

  ${media.greaterThan('md')`
    padding: 12px 18px;
    width: 204px;
    justify-content: flex-start;
  `}
`;

export const Title = styled(Typography)`
  display: none;

  ${media.greaterThan('md')`
      display: block;
  `}
`;

export const KubefirstVersion = styled(Typography)``;

export const KubefirstTitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  padding: 12px;

  #title {
    display: none;
  }

  ${media.greaterThan('md')`
    margin-bottom: 32px;
    padding: 24px 16px 0;
    align-items: flex-start;

    ${KubefirstVersion}{
      margin-left: 55px;
    } 

    #ray {
      display: none;
    }
    #title {
      display: block;
    } 
  `}
`;
