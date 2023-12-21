import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import Image from 'next/image';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import { BsSlack } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import groupBy from 'lodash/groupBy';
import { sortBy } from 'lodash';

import {
  Container,
  FooterContainer,
  MenuContainer,
  KubefirstTitle,
  KubefirstVersion,
  MenuItem,
  Title,
  BreakpointTooltip,
} from './navigation.styled';

import { noop } from '@/utils/noop';
import { ECHO_BLUE } from '@/constants/colors';
import Ray from '@/assets/ray.svg';
import TitleLogo from '@/assets/title.svg';
import Youtube from '@/assets/youtube.svg';

const FOOTER_ITEMS = [
  {
    icon: <HelpOutlineOutlinedIcon />,
    path: 'https://docs.kubefirst.io',
    title: 'Documentation',
    color: '',
  },
  {
    icon: <BsSlack size={24} />,
    path: 'https://kubefirst.io/slack',
    title: 'Slack',
    color: '',
  },
];

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
  footerItems?: Array<{
    icon: ReactNode;
    path: string;
    title: string;
    color?: string;
  }>;
}

const Navigation: FunctionComponent<NavigationProps> = ({
  domLoaded,
  handleIsActiveItem,
  handleOpenContent,
  handleOpenGame,
  isSubscriptionEnabled,
  kubefirstVersion,
  routes,
  footerItems = FOOTER_ITEMS,
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
        <KubefirstTitle onClick={() => push('/')}>
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
                      <Link href={path} key={path}>
                        <BreakpointTooltip title={title} placement="right-end">
                          <MenuItem isActive={handleIsActiveItem(path)}>
                            {icon}
                            <Title variant="body1">{title}</Title>
                          </MenuItem>
                        </BreakpointTooltip>
                      </Link>
                    ))}
                  </>
                );
              })}
          </MenuContainer>
        )}
      </div>
      <FooterContainer>
        {footerItems.map(({ icon, path, title, color }) => (
          <Link href={path} key={path} target={path.includes('http') ? '_blank' : '_self'}>
            <BreakpointTooltip title={title} placement="right-end">
              <MenuItem>
                {icon}
                <Title variant="body1" color={color}>
                  {title}
                </Title>
              </MenuItem>
            </BreakpointTooltip>
          </Link>
        ))}
        {!isSubscriptionEnabled && (
          <>
            <BreakpointTooltip title="Kubefirst channel" placement="right-end">
              <MenuItem onClick={handleOpenContent}>
                <Image src={Youtube} alt="youtube" />
                <Title variant="body1">Kubefirst channel</Title>
              </MenuItem>
            </BreakpointTooltip>
            <BreakpointTooltip title="Flappy K-ray" placement="right-end">
              <MenuItem onClick={handleOpenGame}>
                <VideogameAssetOutlinedIcon />
                <Title variant="body1">Flappy K-ray</Title>
              </MenuItem>
            </BreakpointTooltip>
          </>
        )}
      </FooterContainer>
    </Container>
  );
};

export default Navigation;
