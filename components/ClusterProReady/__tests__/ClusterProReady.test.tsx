import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';

import ClusterProReady from '../ClusterProReady';
import { muiTheme } from '../../../theme/muiTheme';
import { theme } from '../../../theme';
import { ThemeProvider } from '../../../app/lib/styled-components';

// Custom render function that includes ThemeProvider
const customRender = (ui: React.ReactElement) => {
  return render(
    <ThemeProviderMUI theme={muiTheme}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </ThemeProviderMUI>,
  );
};

// Mock next/image since it's not supported in jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

// Mock react-copy-to-clipboard
jest.mock('react-copy-to-clipboard', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ children, onCopy }: any) => <button onClick={onCopy}>{children}</button>,
}));

describe('ClusterReady', () => {
  const mockProps = {
    domainName: 'example.com',
    kbotPassword: 'test-password',
    clusterName: 'test-cluster',
    cloudProvider: 'aws',
    onOpenConsole: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders correctly with all props', () => {
    customRender(<ClusterProReady {...mockProps} />);

    expect(
      screen.getByText(`Your management cluster ${mockProps.clusterName} is now up and running!`),
    ).toBeInTheDocument();
    expect(screen.getByText('KBot')).toBeInTheDocument();
    expect(screen.getByText('Open Kubefirst Pro')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('handles copy button click correctly', () => {
    customRender(<ClusterProReady {...mockProps} />);

    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);

    expect(screen.getByText('Copied!')).toBeInTheDocument();

    // Fast-forward timer to test reset of copy label
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('renders correct Kubefirst Pro link with domain name', () => {
    customRender(<ClusterProReady {...mockProps} />);

    const kubefirstProLink = screen.getByRole('link', { name: 'Open Kubefirst Pro' });
    expect(kubefirstProLink).toHaveAttribute('href', `https://kubefirst.${mockProps.domainName}/`);
  });

  it('renders correct KBot documentation link with cloud provider', () => {
    customRender(<ClusterProReady {...mockProps} />);

    const kbotLink = screen.getByText('KBot');
    expect(kbotLink).toHaveAttribute(
      'href',
      `https://kubefirst.konstruct.io/docs/${mockProps.cloudProvider}/quick-start/install/ui#step-2-install-your-kubefirst-management-cluster`,
    );
  });
});
