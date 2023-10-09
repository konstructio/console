import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { Divider } from '@mui/material';
import styled from 'styled-components';

import NextLink from '../../components/nextLink';
import { InstallationType } from '../../types/redux';

import { Text } from './learnMore.styled';

export interface LearnMoreProps extends ComponentPropsWithoutRef<'div'> {
  description: string;
  href: string;
  linkTitle: string;
  installType?: InstallationType;
  withoutDivider?: boolean;
}

const LearnMore: FunctionComponent<LearnMoreProps> = ({
  description,
  href,
  installType,
  linkTitle,
  withoutDivider,
  ...rest
}) => {
  const docsDomainLink = `https://docs.kubefirst.io/${
    installType && [InstallationType.DIGITAL_OCEAN, InstallationType.VULTR].includes(installType)
      ? 'k3d'
      : installType
  }`;

  return (
    <div {...rest}>
      {!withoutDivider && <Divider sx={{ m: '-20px', p: '8px 0' }} />}
      <Text variant="labelLarge">
        {description}{' '}
        <NextLink
          href={
            href ||
            `${docsDomainLink}/explore/gitops#using-your-own-gitops-template-repository-fork`
          }
          target="_blank"
        >
          {linkTitle}
        </NextLink>
      </Text>
    </div>
  );
};

export default styled(LearnMore)<LearnMoreProps>``;
