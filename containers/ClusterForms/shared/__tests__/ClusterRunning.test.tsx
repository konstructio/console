import React from 'react';
import { render, screen } from '@testing-library/react';

import * as reduxHooks from '../../../../redux/store';
import { getClusters } from '../../../../redux/thunks/api.thunk';
import { ManagementCluster } from '../../../../types/provision';
import { InstallationType } from '../../../../types/redux';
import ClusterRunning from '../ClusterRunning';
import { mockClusterManagement } from '../../../../tests/mocks/mockClusterManagement';

// Mock the redux hooks
jest.mock('@/redux/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock the thunk
jest.mock('@/redux/thunks/api.thunk', () => ({
  getClusters: jest.fn(),
}));

// Mock the components
jest.mock('@/components/ClusterReady/ClusterReady', () => ({
  __esModule: true,
  default: jest.fn(({ clusterName, domainName, cloudProvider, kbotPassword }) => (
    <div data-testid="cluster-ready">
      <div data-testid="cluster-name">{clusterName}</div>
      <div data-testid="domain-name">{domainName}</div>
      <div data-testid="cloud-provider">{cloudProvider}</div>
      <div data-testid="kbot-password">{kbotPassword}</div>
    </div>
  )),
}));

jest.mock('@/components/ClusterProReady/ClusterProReady', () => ({
  __esModule: true,
  default: jest.fn(({ clusterName, domainName, cloudProvider, kbotPassword }) => (
    <div data-testid="cluster-pro-ready">
      <div data-testid="cluster-name">{clusterName}</div>
      <div data-testid="domain-name">{domainName}</div>
      <div data-testid="cloud-provider">{cloudProvider}</div>
      <div data-testid="kbot-password">{kbotPassword}</div>
    </div>
  )),
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
    render(<ClusterRunning />);
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

    render(<ClusterRunning />);

    expect(screen.getByTestId('cluster-ready')).toBeInTheDocument();
    expect(screen.queryByTestId('cluster-pro-ready')).not.toBeInTheDocument();
    expect(screen.getByTestId('cluster-name')).toHaveTextContent('test-cluster');
    expect(screen.getByTestId('domain-name')).toHaveTextContent('test.com');
    expect(screen.getByTestId('cloud-provider')).toHaveTextContent('aws');
    expect(screen.getByTestId('kbot-password')).toHaveTextContent('test-password');
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

    render(<ClusterRunning />);

    expect(screen.getByTestId('cluster-pro-ready')).toBeInTheDocument();
    expect(screen.queryByTestId('cluster-ready')).not.toBeInTheDocument();
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

    render(<ClusterRunning />);

    expect(screen.getByTestId('domain-name')).toHaveTextContent('sub.test.com');
  });

  it('handles missing managementCluster data', () => {
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      managementCluster: null,
    });

    render(<ClusterRunning />);

    expect(screen.getByTestId('cluster-pro-ready')).toBeInTheDocument();
    expect(screen.getByTestId('cluster-name')).toBeInTheDocument();
    expect(screen.getByTestId('domain-name')).toBeInTheDocument();
    expect(screen.getByTestId('cloud-provider')).toBeInTheDocument();
    expect(screen.getByTestId('kbot-password')).toBeInTheDocument();
  });
});
