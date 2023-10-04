import { ClusterEnvironment, ImageRepository } from '../provision';

export interface GitValues {
  gitToken?: string;
  gitOwner?: string;
  gitProtocol?: string;
}

export interface AdvancedOptions extends GitValues {
  gitopsTemplateUrl?: string;
  gitopsTemplateBranch?: string;
  useHttps?: boolean;
  dnsProvider?: string;
  cloudflareToken?: string;
  cloudflareOriginCaIssuerKey?: string;
  subDomain?: string;
  imageRepository?: ImageRepository;
}

export interface AuthValues {
  aws_auth?: {
    access_key_id: string;
    secret_access_key: string;
    session_token: string;
  };
  civo_auth?: {
    token: string;
  };
  do_auth?: {
    token: string;
    spaces_key: string;
    spaces_secret: string;
  };
  vultr_auth?: {
    token: string;
  };
  google_auth?: {
    key_file?: string;
    project_id?: string;
  };
}

export interface ClusterValues extends AuthValues {
  alertsEmail?: string;
  cloudRegion?: string;
  domainName?: string;
  clusterName?: string;
  forceDestroyTerraform?: boolean;
}

export interface AwsInstallValues {
  profile?: string;
  domainName?: string;
  isValid?: boolean;
}

export type AwsClusterValues = AwsInstallValues & ClusterValues & GitValues;

export interface CivoInstallValues extends ClusterValues {
  civoToken?: string;
  userName?: string;
}
export type CivoClusterValues = CivoInstallValues & ClusterValues & GitValues;

export type InstallValues = AwsClusterValues & AdvancedOptions & CivoInstallValues;

export enum InstallationType {
  LOCAL = 'k3d',
  AWS = 'aws',
  CIVO = 'civo',
  DIGITAL_OCEAN = 'digitalocean',
  VULTR = 'vultr',
  GOOGLE = 'google',
}

export enum InstallMethod {
  AWS = 'aws-marketplace',
  CIVO = 'civo-marketplace',
  DIGITAL_OCEAN = 'digitalocean-marketplace',
  VULTR = 'vultr-marketplace',
}

export const INSTALLATION_TYPES = Object.values(InstallationType);

export type InstallationInfo = {
  title: string;
  description: string | string[];
  code?: string;
  ctaDescription?: string;
  ctaLink?: string;
};

export type AuthKeys = {
  authKey: string;
  fieldKeys: Array<{
    name: string;
    label: string;
    helperText?: string;
  }>;
};

export type EnvCache = Record<ClusterEnvironment['name'], boolean>;
