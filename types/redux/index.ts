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

export enum InstallationType {
  LOCAL = 'local',
  AWS = 'aws',
  CIVO = 'civo',
  DIGITAL_OCEAN = 'digital-ocean',
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
