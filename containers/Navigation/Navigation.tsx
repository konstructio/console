'use client';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import NavigationComponent from '@/components/Navigation/Navigation';
import { useAppSelector } from '@/redux/store';
import { noop } from '@/utils/noop';
import { selectConfig } from '@/redux/selectors/config.selector';

export interface NavigationProps {
  handleOpenFlappy: typeof noop;
  handleOpenKubefirstModal: typeof noop;
}

const Navigation: FunctionComponent<NavigationProps> = ({
  handleOpenFlappy,
  handleOpenKubefirstModal,
}) => {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);

  const asPath = usePathname();
  const { kubefirstVersion } = useAppSelector(selectConfig());

  const handleIsActiveItem = useCallback(
    (route: string) => {
      if (typeof window !== 'undefined') {
        const linkPathname = new URL(route, window?.location?.href).pathname;

        // Using URL().pathname to get rid of query and hash
        const activePathname = new URL(asPath as string, window?.location?.href).pathname;

        return linkPathname === activePathname;
      }

      return false;
    },
    [asPath],
  );

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <NavigationComponent
      domLoaded={domLoaded}
      kubefirstVersion={kubefirstVersion}
      routes={[]}
      handleIsActiveItem={handleIsActiveItem}
      handleOpenGame={handleOpenFlappy}
      handleOpenContent={handleOpenKubefirstModal}
      footerItems={[]}
    />
  );
};

export default Navigation;
