import styled from '@/app/lib/styled-components';
import Typography from '@/components/Typography/Typography';
import { media } from '@/utils/media';
import Column from '@/components/Column/Column';

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
    overflow: auto;
  `}
`;

export const FooterContainer = styled(Column)`
  gap: 10px;
  margin-bottom: 24px;

  & a {
    text-decoration: none;
  }
`;

export const MenuContainer = styled(Column)`
  gap: 10px;

  & a {
    text-decoration: none;
  }
`;

export const Title = styled(Typography)`
  display: none;

  ${media.greaterThan('md')`
      display: block;
  `}
`;

export const KubefirstVersion = styled(Typography)``;

export const KubefirstTitle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  padding: 12px;
  position: relative;

  #title {
    display: none;
  }

  ${media.greaterThan('md')`
    align-items: flex-start;
    margin-bottom: 32px;
    padding: 24px 16px 0;

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

export const RouterCard = styled.div`
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  display: none;
  height: 135px;
  padding: 0 16px;
  width: 176px;

  ${media.greaterThan('md')`
    display: flex;
  `}
`;

export const ContentCard = styled.div``;
