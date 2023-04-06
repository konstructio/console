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
  adminEmail?: string;
  kbotPassword?: string;
  region?: string;
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

export interface CivoInstallValues {
  hostedDomainName?: string;
  hostedDomainValid?: boolean;
  civoToken?: string;
}
export type CivoClusterValues = CivoInstallValues & ClusterValues;
export type CivoGithubClusterValues = CivoClusterValues & GithubValues;

export enum InstallationType {
  LOCAL = 'local',
  AWS_GITHUB = 'aws-github',
  AWS_GITLAB = 'aws-gitlab',
  CIVO_GITHUB = 'civo-github',
  CIVO_GITLAB = 'civo-gitlab',
}
