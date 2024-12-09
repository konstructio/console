import React from 'react';
import { screen } from '@testing-library/react';

import * as reduxHooks from '../../../../redux/store';
import { getClusters } from '../../../../redux/thunks/api.thunk';
import { ManagementCluster } from '../../../../types/provision';
import { InstallationType } from '../../../../types/redux';
import ClusterRunning from '../ClusterRunning';
import { mockClusterManagement } from '../../../../tests/mocks/mockClusterManagement';
import customRender from '../../../../tests/setup';

// Mock the redux hooks
jest.mock('@/redux/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock the thunk
jest.mock('@/redux/thunks/api.thunk', () => ({
  getClusters: jest.fn(),
}));

describe('ClusterRunning', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (reduxHooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      managementCluster: null,
    });
  });

  it('dispatches getClusters on mount', () => {
    customRender(<ClusterRunning />);
    expect(mockDispatch).toHaveBeenCalledWith(getClusters());
  });

  it('renders ClusterReady when skipInstallPro is true', () => {
    const mockManagementCluster: ManagementCluster = {
      ...mockClusterManagement,

      clusterName: 'test-cluster',
      domainName: 'test.com',
      cloudProvider: InstallationType.AWS,
      skipInstallPro: true,
      vaultAuth: {
        kbotPassword: 'test-password',
      },
    };

    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      managementCluster: mockManagementCluster,
    });

    customRender(<ClusterRunning />);

    expect(screen.getByText(`You’re all set to use the Kubefirst platform!`)).toBeInTheDocument();
    expect(screen.getByText('KBot')).toBeInTheDocument();
    expect(screen.getByText('Open Argo CD')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('renders ClusterProReady when skipInstallPro is false', () => {
    const mockManagementCluster: ManagementCluster = {
      ...mockClusterManagement,
      clusterName: 'test-cluster',
      domainName: 'test.com',
      cloudProvider: InstallationType.AWS,
      skipInstallPro: false,
      vaultAuth: {
        kbotPassword: 'test-password',
      },
    };

    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      managementCluster: mockManagementCluster,
    });

    customRender(<ClusterRunning />);

    expect(
      screen.getByText(`Your management cluster test-cluster is now up and running!`),
    ).toBeInTheDocument();
    expect(screen.getByText('KBot')).toBeInTheDocument();
    expect(screen.getByText('Open Kubefirst Pro')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('handles subdomain in domain name construction', () => {
    const mockManagementCluster: ManagementCluster = {
      ...mockClusterManagement,
      clusterName: 'test-cluster',
      domainName: 'test.com',
      subDomainName: 'sub',
      cloudProvider: InstallationType.AWS,
      skipInstallPro: true,
      vaultAuth: {
        kbotPassword: 'test-password',
      },
    };

    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      managementCluster: mockManagementCluster,
    });

    customRender(<ClusterRunning />);

    const argocdLink = screen.getByRole('link', { name: 'Open Argo CD' });
    expect(argocdLink).toHaveAttribute('href', `https://argocd.sub.test.com/`);
  });

  it('handles missing managementCluster data', () => {
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      managementCluster: null,
    });

    customRender(<ClusterRunning />);

    expect(screen.getByText('KBot')).toBeInTheDocument();
  });
});
