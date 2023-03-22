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

import { useAppSelector } from '../../redux/store';
import { selectKubefirstVersion } from '../../redux/selectors/config.selector';

import {
  Container,
  FooterContainer,
  MenuContainer,
  KubefirstTitle,
  KubefirstVersion,
  MenuItem,
  Title,
} from './navigation.styled';

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
    title: 'Documentation',
  },
  {
    icon: <BsSlack size={20} />,
    path: 'https://kubefirst.io/slack',
    title: 'Slack',
  },
];

const Navigation: FunctionComponent = () => {
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
    <Container>
      <div>
        <KubefirstTitle>
          <Image alt="k1-image" src={'/static/ray.svg'} height={40} width={48} id="ray" />
          {/* Only visible above md breakpoint 👇 */}
          <Image alt="k1-image" src={'/static/title.svg'} height={40} width={160} id="title" />
          {kubefirstVersion && (
            <KubefirstVersion variant="labelSmall" color="#ABADC6">
              {`V${kubefirstVersion}`}
            </KubefirstVersion>
          )}
        </KubefirstTitle>
        {domLoaded && (
          <MenuContainer>
            {ROUTES.map(({ icon, path, title }) => (
              <Link href={path} key={path}>
                <MenuItem isActive={isActive(path)}>
                  {icon}
                  <Title variant="body1">{title}</Title>
                </MenuItem>
              </Link>
            ))}
          </MenuContainer>
        )}
      </div>
      <FooterContainer>
        {FOOTER_ITEMS.map(({ icon, path, title }) => (
          <Link href={path} key={path} target="_blank">
            <MenuItem>
              {icon}
              <Title variant="body1">{title}</Title>
            </MenuItem>
          </Link>
        ))}
      </FooterContainer>
    </Container>
  );
};

export default Navigation;
