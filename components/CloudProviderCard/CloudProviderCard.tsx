import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

import { CardProps } from '../Card/Card';
import Tag from '../Tag/Tag';

import { CardContainer } from './CloudProviderCard.styled';

import { InstallationType } from '@/types/redux';
import k3dLogo from '@/assets/k3d_logo.svg';
import akamaiLogo from '@/assets/akamai_logo.svg';
import azureLogo from '@/assets/azure_logo.svg';
import awsLogo from '@/assets/aws_logo.svg';
import civoLogo from '@/assets/civo_logo.svg';
import digitalOceanLogo from '@/assets/digital_ocean_logo.svg';
import vultrLogo from '@/assets/vultr_logo.svg';
import googleCloudLogo from '@/assets/google_logo.svg';

const PROVIDER_OPTIONS: Record<
  InstallationType,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logoSrc: any;
    label: string;
    description: string;
    height: number;
    width: number;
    learnMoreLink?: string;
    beta?: boolean;
    isFeatured?: boolean;
  } | null
> = {
  [InstallationType.AKAMAI]: {
    logoSrc: akamaiLogo,
    label: 'Akamai',
    description:
      'The newest beta cloud provider supported by the kubefirst platform offering Linode managed clusters.',
    learnMoreLink: 'https://cloud.linode.com',
    height: 40,
    width: 92,
    beta: true,
  },
  [InstallationType.AZURE]: {
    logoSrc: azureLogo,
    label: 'Azure',
    description: 'Microsoft Azure is a cloud computing service operated by Microsoft.',
    height: 40,
    width: 117,
    beta: true,
  },
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
      'Our AWS cloud platform can accommodate all of the needs of your enterprise and leverages the free GitHub system at github.com ',
    learnMoreLink: 'https://aws.amazon.com/console',
    height: 40,
    width: 67,
  },
  [InstallationType.CIVO]: {
    logoSrc: civoLogo,
    label: 'Civo',
    description:
      'The cloud native service provider, specializing in managed Kubernetes. A faster, simpler and more cost-effective cloud platform. ',
    learnMoreLink:
      'https://www.civo.com/?utm_source=partner&utm_medium=kubefirstdeploy&utm_campaign=kubefirstdeploy',
    height: 32,
    width: 98,
    isFeatured: true,
  },
  [InstallationType.DIGITAL_OCEAN]: {
    logoSrc: digitalOceanLogo,
    label: 'DigitalOcean',
    description:
      'A cloud platform that allows developers to build, deploy, and scale applications. Its simplicity, ease of use and affordable pricing make it a popular choice for small businesses and startups. ',
    learnMoreLink: 'https://www.digitalocean.com/',

    height: 50,
    width: 180,
    beta: false,
  },
  [InstallationType.VULTR]: {
    logoSrc: vultrLogo,
    label: 'Vultr',
    description:
      'A cloud hosting provider that offers high-performance SSD-based cloud servers, block storage, object storage, and dedicated servers in multiple locations worldwide. ',
    learnMoreLink: 'https://www.vultr.com/',
    height: 40,
    width: 168,
    beta: false,
  },
  [InstallationType.GOOGLE]: {
    logoSrc: googleCloudLogo,
    label: 'Google Cloud',
    description:
      'High-performance infrastructure for cloud computing, data analytics & machine learning. Secure, reliable and high performance cloud services.',
    learnMoreLink: 'https://cloud.google.com/',
    height: 32,
    width: 180,
    beta: false,
  },
};

export interface CloudProviderCardProps extends CardProps {
  option: InstallationType;
  active?: boolean;
}

const CloudProviderCard: FunctionComponent<CloudProviderCardProps> = ({
  option,
  withHoverEffect = true,
  ...rest
}) => {
  const { beta, height, isFeatured, logoSrc, width } = PROVIDER_OPTIONS[option] || {};
  return (
    <CardContainer {...rest} withHoverEffect={withHoverEffect} data-test-id={`${option}-button`}>
      {isFeatured && (
        <StarRateRoundedIcon
          fontSize="small"
          color="primary"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        />
      )}
      <Image src={logoSrc} alt="logo" width={width} height={height} />
      {beta && <Tag text="Beta" bgColor="light-orange" />}
    </CardContainer>
  );
};

export default CloudProviderCard;
