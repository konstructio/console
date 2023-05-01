import { GithubUserOrganization } from '../github';

export interface GithubValues {
  githubToken?: string;
  githubOrganization?: GithubUserOrganization['login'];
}

export interface LocalInstallValues extends GithubValues {
  gitOpsBranch?: string;
  templateRepoUrl?: string;
}

export interface ClusterValues {
  alertsEmail?: string;
  kbotPassword?: string;
  cloudRegion?: string;
  clusterName?: string;
}

export interface AwsInstallValues {
  profile?: string;
  awsNodesSpot?: boolean;
  hostedZoneValid?: boolean;
  hostedZoneName?: string;
  isValid?: boolean;
}

export type AwsClusterValues = AwsInstallValues & ClusterValues;

export type AwsGithubClusterValues = AwsClusterValues & GithubValues;

export interface CivoInstallValues extends ClusterValues {
  civoToken?: string;
  githubToken?: string;
  userName?: string;
  githubOrganization?: string;
  domainName?: string;
}
export type CivoClusterValues = CivoInstallValues & ClusterValues;
export type CivoGithubClusterValues = CivoClusterValues & GithubValues;

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
  ctaDescription: string;
  ctaLink?: string;
};
