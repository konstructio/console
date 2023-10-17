import React, { FunctionComponent, ReactNode } from 'react';
import Image from 'next/image';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import { BsSlack } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ECHO_BLUE } from '../../constants/colors';

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

import Ray from '@/assets/ray.svg';
import TitleLogo from '@/assets/title.svg';
import Youtube from '@/assets/youtube.svg';

const FOOTER_ITEMS = [
  {
    icon: <HelpOutlineOutlinedIcon />,
    path: 'https://docs.kubefirst.io',
    title: 'Documentation',
  },
  {
    icon: <BsSlack size={24} />,
    path: 'https://kubefirst.io/slack',
    title: 'Slack',
  },
];

export interface NavigationProps {
  domLoaded: boolean;
  handleIsActiveItem: (path: string) => boolean;
  handleOpenContent: () => void;
  handleOpenGame: () => void;
  kubefirstVersion?: string;
  routes: Array<{
    icon: ReactNode;
    path: string;
    title: string;
    isEnabled: boolean;
  }>;
}

const Navigation: FunctionComponent<NavigationProps> = ({
  domLoaded,
  handleIsActiveItem,
  handleOpenContent,
  handleOpenGame,
  kubefirstVersion,
  routes,
}) => {
  const { push } = useRouter();
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
            {routes &&
              routes.map(({ icon, path, title }) => (
                <Link href={path} key={path}>
                  <BreakpointTooltip title={title} placement="right-end">
                    <MenuItem isActive={handleIsActiveItem(path)}>
                      {icon}
                      <Title variant="body1">{title}</Title>
                    </MenuItem>
                  </BreakpointTooltip>
                </Link>
              ))}
          </MenuContainer>
        )}
      </div>
      <FooterContainer>
        {FOOTER_ITEMS.map(({ icon, path, title }) => (
          <Link href={path} key={path} target="_blank">
            <BreakpointTooltip title={title} placement="right-end">
              <MenuItem>
                {icon}
                <Title variant="body1">{title}</Title>
              </MenuItem>
            </BreakpointTooltip>
          </Link>
        ))}
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
      </FooterContainer>
    </Container>
  );
};

export default Navigation;
