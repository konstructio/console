import React, { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import HelpIcon from '@mui/icons-material/Help';
// import HomeIcon from '@mui/icons-material/Home';
// import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
// import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { BsSlack } from 'react-icons/bs';
import Link from 'next/link';

import Typography from '../typography/';
import { useAppSelector } from '../../redux/store';
import { selectKubefirstVersion } from '../../redux/selectors/config.selector';

import { Container, FooterContainer, MenuContainer, MenuItem, Title } from './navigation.styled';

const ROUTES = [
  // {
  //   icon: <HomeIcon />,
  //   path: '/',
  //   title: 'Home',
  // },
  // {
  //   icon: <ScatterPlotIcon />,
  //   path: '/',
  //   title: 'Cluster Management',
  // },
  {
    icon: <GridViewOutlinedIcon />,
    path: '/services',
    title: 'Services',
  },
  // {
  //   icon: <PeopleOutlineSharpIcon />,
  //   path: '/users',
  //   title: 'Users',
  // },
];

const FOOTER_ITEMS = [
  {
    icon: <HelpIcon />,
    path: 'https://docs.kubefirst.io',
    title: 'Help Documentation',
  },
  {
    icon: <BsSlack size={20} />,
    path: 'https://bit.ly/kubefirst-slack',
    title: 'Slack',
  },
];

export interface NavigationProps {
  collapsible?: boolean;
}

const Navigation: FunctionComponent<NavigationProps> = ({ collapsible }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const { asPath } = useRouter();
  const kubefirstVersion = useAppSelector(selectKubefirstVersion());

  const isActive = (route: string) => {
    if (typeof window !== 'undefined') {
      const linkPathname = new URL(route as string, window?.location?.href).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, window?.location?.href).pathname;

      return linkPathname === activePathname;
    }
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <Container collapsible={collapsible}>
      <div>
        <Title collapsible={collapsible}>
          <Image
            alt="k1-image"
            src={collapsible ? '/static/ray.svg' : '/static/title.svg'}
            height={40}
            width={collapsible ? 48 : 160}
          />
          {kubefirstVersion && (
            <Typography
              variant="labelSmall"
              color="#ABADC6"
              sx={{ position: 'absolute', left: 70, bottom: -10 }}
            >
              {`V${kubefirstVersion}`}
            </Typography>
          )}
        </Title>
        {domLoaded && (
          <MenuContainer>
            {ROUTES.map(({ icon, path, title }) => (
              <Link href={path} key={path}>
                <MenuItem isActive={isActive(path)} collapsible={collapsible}>
                  {icon}
                  {!collapsible && <Typography variant="body1">{title}</Typography>}
                </MenuItem>
              </Link>
            ))}
          </MenuContainer>
        )}
      </div>
      <FooterContainer>
        {FOOTER_ITEMS.map(({ icon, path, title }) => (
          <Link href={path} key={path} target="_blank">
            <MenuItem collapsible={collapsible}>
              {icon}
              {!collapsible && <Typography variant="body1">{title}</Typography>}
            </MenuItem>
          </Link>
        ))}
      </FooterContainer>
    </Container>
  );
};

export default Navigation;
