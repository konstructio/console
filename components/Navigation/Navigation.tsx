import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import Image from 'next/image';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import { useRouter } from 'next/navigation';
import groupBy from 'lodash/groupBy';
import { sortBy } from 'lodash';

import NavigationRoute from '../NavigationRoute/NavigationRoute';

import {
  Container,
  FooterContainer,
  MenuContainer,
  KubefirstTitle,
  KubefirstVersion,
  Title,
} from './Navigation.styled';

import { noop } from '@/utils/noop';
import { ECHO_BLUE } from '@/constants/colors';
import Ray from '@/assets/ray.svg';
import TitleLogo from '@/assets/title.svg';
import Youtube from '@/assets/youtube.svg';
import { Route } from '@/constants';

export interface FooterItem {
  icon: ReactNode;
  path: string;
  title: string;
  color?: string;
}
export interface NavigationProps {
  domLoaded: boolean;
  handleIsActiveItem: (path: string) => boolean;
  handleOpenContent: typeof noop;
  handleOpenGame: typeof noop;
  isSubscriptionEnabled: boolean;
  kubefirstVersion?: string;
  routes: Array<{
    group?: string;
    groupOrder?: number;
    icon: ReactNode;
    path: string;
    title: string;
    isEnabled: boolean;
  }>;
  footerItems?: Array<FooterItem>;
}

const Navigation: FunctionComponent<NavigationProps> = ({
  domLoaded,
  handleIsActiveItem,
  handleOpenContent,
  handleOpenGame,
  isSubscriptionEnabled,
  kubefirstVersion,
  routes,
  footerItems,
}) => {
  const { push } = useRouter();

  const routesFilteredByGroup = useMemo(
    () =>
      sortBy(
        groupBy(routes, ({ group }) => group),
        'groupOrder',
      ),
    [routes],
  );

  return (
    <Container>
      <div>
        <KubefirstTitle onClick={() => push(Route.HOME)}>
          <Image alt="k1-image" src={Ray} height={40} width={48} id="ray" />
          {/* Only visible above md breakpoint 👇 */}
          <Image alt="k1-image" src={TitleLogo} height={40} width={160} id="title" />
          {kubefirstVersion && (
            <KubefirstVersion variant="labelSmall" color={ECHO_BLUE}>
              {`${kubefirstVersion}`}
            </KubefirstVersion>
          )}
        </KubefirstTitle>
        {domLoaded && (
          <MenuContainer>
            {routesFilteredByGroup &&
              Object.values(routesFilteredByGroup).map((value) => {
                const key = value[0].group;
                return (
                  <>
                    {key && (
                      <Title variant="labelMedium" color="white" sx={{ pl: 2, m: 1 }}>
                        {key}
                      </Title>
                    )}
                    {value.map(({ icon, path, title }) => (
                      <NavigationRoute
                        key={path}
                        icon={icon}
                        href={path}
                        title={title}
                        menuItemIsActive={handleIsActiveItem(path)}
                      />
                    ))}
                  </>
                );
              })}
          </MenuContainer>
        )}
      </div>
      <FooterContainer>
        {footerItems &&
          footerItems.map(({ icon, path, title, color }) => (
            <NavigationRoute
              href={path}
              key={path}
              target={path.includes('http') ? '_blank' : '_self'}
              title={title}
              titleColor={color}
              icon={icon}
            />
          ))}
        {!isSubscriptionEnabled && (
          <>
            <NavigationRoute
              title="Kubefirst channel"
              icon={<Image src={Youtube} alt="youtube" />}
              onMenuItemClick={handleOpenContent}
            />
            <NavigationRoute
              title="Flappy K-ray"
              icon={<VideogameAssetOutlinedIcon />}
              onMenuItemClick={handleOpenGame}
            />
          </>
        )}
      </FooterContainer>
    </Container>
  );
};

export default Navigation;
