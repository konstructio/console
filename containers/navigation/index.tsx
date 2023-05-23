import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

import NavigationComponent from '../../components/navigation';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import { useAppSelector } from '../../redux/store';

const Navigation: FunctionComponent = () => {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const { asPath } = useRouter();
  const { kubefirstVersion, selectedCluster } = useAppSelector(({ config, cluster }) => ({
    kubefirstVersion: config.kubefirstVersion,
    selectedCluster: cluster.selectedCluster,
  }));
  const { isEnabled, flagsAreReady } = useFeatureFlag('cluster-management');
  const { isEnabled: isClusterProvisioningEnabled } = useFeatureFlag('cluster-provisioning');

  const routes = useMemo(
    () =>
      [
        {
          icon: <ScatterPlotIcon />,
          path: '/cluster-management',
          title: 'Cluster Management',
          isEnabled: flagsAreReady && isEnabled,
        },
        {
          icon: <ScatterPlotIcon />,
          path: '/provision',
          title: 'Cluster Provisioning',
          isEnabled: flagsAreReady && isClusterProvisioningEnabled,
        },
        {
          icon: <GridViewOutlinedIcon />,
          path: '/services',
          title: 'Services',
          isEnabled: !!selectedCluster?.clusterName,
        },
      ].filter(({ isEnabled }) => isEnabled),
    [flagsAreReady, isClusterProvisioningEnabled, isEnabled, selectedCluster?.clusterName],
  );

  const handleIsActiveItem = useCallback(
    (route: string) => {
      if (typeof window !== 'undefined') {
        const linkPathname = new URL(route, window?.location?.href).pathname;

        // Using URL().pathname to get rid of query and hash
        const activePathname = new URL(asPath, window?.location?.href).pathname;

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
      routes={routes}
      handleIsActiveItem={handleIsActiveItem}
    />
  );
};

export default Navigation;
