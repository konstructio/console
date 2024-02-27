import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import Typography from '../Typography/Typography';

import { LabelContainer } from './GitProviderLabel.styled';

import { GitProvider } from '@/types';
import gitlabLogo from '@/assets/gitlab.svg';
import githubLogo from '@/assets/github.svg';
import { GIT_PROVIDER_DISPLAY_NAME } from '@/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GIT_LOGO: Record<GitProvider, any> = {
  [GitProvider.GITHUB]: githubLogo,
  [GitProvider.GITLAB]: gitlabLogo,
};

interface GitProviderLabelProps extends ComponentPropsWithoutRef<'div'> {
  gitProvider: GitProvider;
  withIcon?: boolean;
}

const GitProviderLabel: FunctionComponent<GitProviderLabelProps> = ({ gitProvider, withIcon }) => (
  <LabelContainer>
    {withIcon && <Image src={GIT_LOGO[gitProvider]} alt={`${gitProvider}-logo`} />}
    <Typography variant="body2">{GIT_PROVIDER_DISPLAY_NAME[gitProvider]}</Typography>
  </LabelContainer>
);

export default styled(GitProviderLabel)<GitProviderLabelProps>``;
