import React, { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import { CardProps } from '../card/Card';
import Typography from '../typography';
import { InstallationType } from '../../types';
import k3dLogo from '../../assets/k3d_logo.svg';
import awsLogo from '../../assets/aws_logo.svg';
import civoLogo from '../../assets/civo_logo.svg';
import digitalOceanLogo from '../../assets/digital_ocean_logo.svg';
import vultrLogo from '../../assets/vultr_logo.svg';
import Tag from '../tag/Tag';

import {
  CardContainer,
  DetailsContainer,
  LinkContent,
  LabelContainer,
} from './CloudProviderCard.styled';

const PROVIDER_OPTIONS: Record<
  InstallationType,
  {
    logoSrc: any;
    label: string;
    description: string;
    height: number;
    width: number;
    learnMoreLink?: string;
    beta?: boolean;
  }
> = {
  [InstallationType.LOCAL]: {
    logoSrc: k3dLogo,
    label: 'Run Locally',
    description:
      'The fastest way to explore all you can do with Kubefirst. Run Kubefirst for free on a local K3D cluster in less than 5 minutes - without any cloud costs or domain prerequisites.',
    height: 88,
    width: 50,
  },
  [InstallationType.AWS]: {
    logoSrc: awsLogo,
    label: 'AWS',
    description:
      'Our AWS cloud platform can accommodate all of the needs of your enterprise and leverages the free Github system at github.com.',
    height: 30,
    width: 50,
  },
  [InstallationType.CIVO]: {
    logoSrc: civoLogo,
    label: 'CIVO',
    description:
      'A powerful open source cloud native tool set for identity and infrastructure management, application delivery, and secrets managament.',
    height: 17,
    width: 50,
  },
  [InstallationType.DIGITAL_OCEAN]: {
    logoSrc: digitalOceanLogo,
    label: 'Digital Ocean',
    description:
      'A powerful open source cloud native tool set for identity and infrastructure management, application delivery, and secrets managament.',
    height: 50,
    width: 50,
    beta: true,
  },
  [InstallationType.VULTR]: {
    logoSrc: vultrLogo,
    label: 'Vultr',
    description:
      'A powerful open source cloud native tool set for identity and infrastructure management, application delivery, and secrets managament.',
    learnMoreLink: '#',
    height: 43,
    width: 50,
    beta: true,
  },
};

export interface CloudProviderCardProps extends CardProps {
  option: InstallationType;
  active?: boolean;
}

const CloudProviderCard: FC<CloudProviderCardProps> = ({
  option,
  withHoverEffect = true,
  ...rest
}) => {
  const { logoSrc, label, description, learnMoreLink, height, width, beta } =
    PROVIDER_OPTIONS[option];
  return (
    <CardContainer {...rest} withHoverEffect={withHoverEffect}>
      <Image src={logoSrc} alt="logo" width={width} height={height} />
      <DetailsContainer>
        <LabelContainer>
          <Typography variant="subtitle2">{label}</Typography>
          {beta && <Tag text="BETA" bgColor="light-orange" />}
        </LabelContainer>
        <Typography variant="body2">
          {description}
          {learnMoreLink && (
            <Link href={learnMoreLink}>
              <LinkContent> Learn More</LinkContent>
            </Link>
          )}
        </Typography>
      </DetailsContainer>
    </CardContainer>
  );
};

export default styled(CloudProviderCard)``;
