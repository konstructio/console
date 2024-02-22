import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import NextLink from '../nextLink';
import { ITypographyProps, Variant } from '../typography';

import { Text } from './LearnMore.styled';

import { InstallationType } from '@/types/redux';

export interface LearnMoreProps extends Omit<ITypographyProps, 'variant' | 'children'> {
  description: string;
  href: string;
  linkTitle: string;
  installType?: InstallationType;
  variant?: Variant;
}

const LearnMore: FunctionComponent<LearnMoreProps> = ({
  description,
  href,
  installType,
  linkTitle,
  variant = 'labelLarge',
  ...rest
}) => {
  const docsDomainLink = `https://docs.kubefirst.io/${
    installType && [InstallationType.DIGITAL_OCEAN, InstallationType.VULTR].includes(installType)
      ? 'k3d'
      : installType
  }`;

  return (
    <Text variant={variant} {...rest}>
      {description}{' '}
      <NextLink
        href={
          href || `${docsDomainLink}/explore/gitops#using-your-own-gitops-template-repository-fork`
        }
        target="_blank"
      >
        {linkTitle}
      </NextLink>
    </Text>
  );
};

export default styled(LearnMore)<LearnMoreProps>``;
