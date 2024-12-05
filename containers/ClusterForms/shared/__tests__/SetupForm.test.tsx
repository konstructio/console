import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ThemeProvider } from 'styled-components';

import * as reduxHooks from '../../../../redux/store';
import { theme } from '../../../../theme';
import SetupForm from '../SetupForm';
import { InstallationType } from '../../../../types/redux';

// Add these mocks at the top of your test file
jest.mock('@/redux/store', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn((selector) =>
    selector({
      api: {
        cloudDomains: [],
        cloudRegions: ['region-1', 'region-2'],
        cloudZones: ['zone-1', 'zone-2'],
        instanceSizes: ['small', 'medium', 'large'],
        resourceGroups: ['group-1', 'group-2'],
      },
      installation: {
        installType: 'aws',
        installationStep: 1,
        values: {
          gitToken: 'mock-token',
          alertsEmail: '',
          cloudRegion: '',
          instanceSize: 'small',
          nodeCount: 1,
          dnsProvider: 'aws',
          domainName: '',
          clusterName: '',
        },
      },
      featureFlags: {
        flags: {
          showCloudflareCaIssuerField: false,
        },
      },
    }),
  ),
}));

jest.mock('@/redux/slices/installation.slice', () => ({
  setInstallationStep: jest.fn(),
}));

jest.mock('@/redux/slices/api.slice', () => ({
  clearDomains: jest.fn(),
}));

// Create a wrapper component to provide form context
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      alertsEmail: '',
      cloudRegion: '',
      instanceSize: '',
      nodeCount: 1,
      dnsProvider: '',
      domainName: '',
      clusterName: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('SetupForm', () => {
  const renderSetupForm = () => {
    return render(
      <ThemeProvider theme={theme}>
        <FormWrapper>
          <SetupForm />
        </FormWrapper>
      </ThemeProvider>,
    );
  };

  it('renders all required form fields', () => {
    renderSetupForm();

    expect(screen.getByText(/alerts email/i)).toBeInTheDocument();
    expect(screen.getByText(/cloud region/i)).toBeInTheDocument();
    expect(screen.getByText(/instance size/i)).toBeInTheDocument();
    expect(screen.getByText(/number of nodes/i)).toBeInTheDocument();
    expect(screen.getByText(/dns provider/i)).toBeInTheDocument();
    expect(screen.getByText(/cluster name/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderSetupForm();

    const emailInput = screen.getByRole('textbox', { name: /alerts email/i });

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.queryByText(/Invalid email address/i)).not.toBeInTheDocument();
    });
  });

  it('validates cluster name format', async () => {
    renderSetupForm();

    const clusterNameInput = screen.getByLabelText(/cluster name/i);
    fireEvent.change(clusterNameInput, { target: { value: 'INVALID_NAME' } });
    fireEvent.blur(clusterNameInput);

    await waitFor(() => {
      expect(
        screen.getByText(/Name must only contain lowercase alphanumeric characters/i),
      ).toBeInTheDocument();
    });

    fireEvent.change(clusterNameInput, { target: { value: 'valid-name' } });
    fireEvent.blur(clusterNameInput);

    await waitFor(() => {
      expect(
        screen.queryByText(/Name must only contain lowercase alphanumeric characters/i),
      ).not.toBeInTheDocument();
    });
  });

  it('shows Google-specific fields when Google is selected as installation type', () => {
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      installType: InstallationType.GOOGLE,
      cloudDomains: [],
      cloudRegions: [],
      cloudZones: [],
      instanceSizes: [],
      installationStep: 1,
      values: {},
    });

    renderSetupForm();

    expect(screen.getByLabelText(/cloud zone/i)).toBeInTheDocument();
    expect(screen.getByText(/Enable Force Destroy on Terraform resources/i)).toBeInTheDocument();
  });

  it('shows Azure-specific fields when Azure is selected as installation type', () => {
    (reduxHooks.useAppSelector as jest.Mock).mockReturnValue({
      installType: InstallationType.AZURE,
      cloudDomains: [],
      cloudRegions: [],
      cloudZones: [],
      instanceSizes: [],
      installationStep: 1,
      values: {},
    });

    renderSetupForm();

    expect(screen.getByLabelText(/resource group/i)).toBeInTheDocument();
  });
});
