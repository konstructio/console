export interface GitValues {
  gitToken?: string;
  gitOwner?: string;
  gitopsTemplateRepo: string;
  gitopsTemplateBranch: string;
}

export interface LocalInstallValues extends GitValues {
  gitOpsBranch?: string;
  templateRepoUrl?: string;
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
}

export interface ClusterValues extends AuthValues {
  alertsEmail?: string;
  cloudRegion?: string;
  domainName?: string;
  clusterName?: string;
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

export type InstallValues = AwsClusterValues & LocalInstallValues & CivoInstallValues;

export enum InstallationType {
  LOCAL = 'k3d',
  AWS = 'aws',
  CIVO = 'civo',
  DIGITAL_OCEAN = 'digitalocean',
  VULTR = 'vultr',
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
