'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';

import KubefirstContent from '../kubefirstContent';
import NavigationComponent from '../../components/navigation';
import FlappyKray from '../../components/flappyKray';
// import useFeatureFlag from '../../hooks/useFeatureFlag';
import useModal from '../../hooks/useModal';
import { useAppSelector } from '../../redux/store';

import { selectConfig } from '@/redux/selectors/config.selector';
import useFeatureFlag from '@/hooks/useFeatureFlag';
import { selectCluster } from '@/redux/selectors/cluster.selector';
import { InstallationType } from '@/types/redux';
import { FeatureFlag } from '@/types/config';

const Navigation: FunctionComponent = () => {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isModalContentOpen,
    openModal: openModalContent,
    closeModal: closeModalContent,
  } = useModal();

  const asPath = usePathname();
  const { kubefirstVersion, isClusterZero } = useAppSelector(selectConfig());
  const { selectedCluster } = useAppSelector(selectCluster());

  const { isEnabled: isMultiClusterEnabled } = useFeatureFlag(FeatureFlag.MULTICLUSTER_MANAGEMENT);

  const routes = useMemo(
    () =>
      [
        {
          icon: <ScatterPlotIcon />,
          path: '/dashboard/cluster-management',
          title: 'Cluster Management',
          isEnabled:
            isMultiClusterEnabled &&
            !isClusterZero &&
            selectedCluster?.cloudProvider !== InstallationType.LOCAL,
        },
        {
          icon: <GridViewOutlinedIcon />,
          path: '/dashboard/services',
          title: 'Services',
          isEnabled: !isClusterZero,
        },
        {
          icon: <CollectionsOutlinedIcon />,
          path: '/dashboard/environments',
          title: 'Environments',
          isEnabled: !isClusterZero && selectedCluster?.cloudProvider !== InstallationType.LOCAL,
        },
      ].filter(({ isEnabled }) => isEnabled),
    [isMultiClusterEnabled, isClusterZero, selectedCluster?.cloudProvider],
  );

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
    <>
      <NavigationComponent
        domLoaded={domLoaded}
        kubefirstVersion={kubefirstVersion}
        routes={routes}
        handleIsActiveItem={handleIsActiveItem}
        handleOpenGame={openModal}
        handleOpenContent={openModalContent}
      />
      {isOpen && <FlappyKray isOpen closeModal={closeModal} />}
      {isModalContentOpen && (
        <KubefirstContent isOpen={isModalContentOpen} closeModal={closeModalContent} />
      )}
    </>
  );
};

export default Navigation;
