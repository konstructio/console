import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { useInstallation } from 'hooks/useInstallation';

import KubefirstContent from '../kubefirstContent';
import NavigationComponent from '../../components/navigation';
import FlappyKray from '../../components/flappyKray';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import useModal from '../../hooks/useModal';
import { useAppSelector } from '../../redux/store';
import { InstallationType } from '../../types/redux';
import { GitProvider } from '../../types';

const Navigation: FunctionComponent = () => {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isModalContentOpen,
    openModal: openModalContent,
    closeModal: closeModalContent,
  } = useModal();

  const { asPath } = useRouter();
  const { kubefirstVersion, selectedCluster, installationStep, installType, gitProvider } =
    useAppSelector(({ config, cluster, installation }) => ({
      kubefirstVersion: config.kubefirstVersion,
      selectedCluster: cluster.selectedCluster,
      ...installation,
    }));

  const { isEnabled: isClusterManagementEnabled, flagsAreReady } =
    useFeatureFlag('cluster-management');
  const { isEnabled: isClusterProvisioningEnabled } = useFeatureFlag('cluster-provisioning');

  const isProvisionEnabled = useMemo(() => {
    if (!isClusterManagementEnabled) {
      return !selectedCluster?.clusterName;
    }

    return true;
  }, [isClusterManagementEnabled, selectedCluster?.clusterName]);

  const { isProvisionStep } = useInstallation(
    installType as InstallationType,
    gitProvider as GitProvider,
    installationStep,
  );

  const routes = useMemo(
    () =>
      [
        {
          icon: <ScatterPlotIcon />,
          path: '/cluster-management',
          title: 'Cluster Management',
          isEnabled: flagsAreReady && isClusterManagementEnabled,
        },
        {
          icon: <ScatterPlotIcon />,
          path: '/provision',
          title: 'Cluster Provisioning',
          isEnabled: flagsAreReady && isClusterProvisioningEnabled && isProvisionEnabled,
        },
        {
          icon: <GridViewOutlinedIcon />,
          path: '/services',
          title: 'Services',
          isEnabled: !!selectedCluster?.clusterName,
        },
      ].filter(({ isEnabled }) => isEnabled),
    [
      flagsAreReady,
      isClusterManagementEnabled,
      isClusterProvisioningEnabled,
      isProvisionEnabled,
      selectedCluster?.clusterName,
    ],
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
    <>
      <NavigationComponent
        domLoaded={domLoaded}
        kubefirstVersion={kubefirstVersion}
        routes={routes}
        handleIsActiveItem={handleIsActiveItem}
        handleOpenGame={openModal}
        handleOpenContent={openModalContent}
        isProvisionStep={isProvisionStep}
      />
      {isOpen && <FlappyKray isOpen closeModal={closeModal} />}
      {isModalContentOpen && (
        <KubefirstContent isOpen={isModalContentOpen} closeModal={closeModalContent} />
      )}
    </>
  );
};

export default Navigation;
