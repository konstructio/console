import { createSelector } from '@reduxjs/toolkit';

import { IConfigState } from '../slices/config.slice';
import { RootState } from '../store';
import ArgoCDLogo from '../assets/argocd.webp';
import GitLabLogo from '../assets/gitlab.png';
import GitHubLogo from '../assets/github.png';
import VaultLogo from '../assets/vault.png';
import AtlantisLogo from '../assets/atlantis.png';
import MetaphorLogo from '../assets/metaphor.png';

const configSelector = (state: RootState): IConfigState => state.config;

const selectGitTitle = ({ config: { configs: configValues } }: RootState) => {
  if (configValues.IS_GITHUB_ENABLED) {
    return {
      appName: 'GitHub',
      companyName: 'GitHub',
      links: [configValues.GITHUB?.GITHUB_GITOPS, configValues.GITHUB?.GITHUB_METAPHOR],
      username: configValues.GITLAB?.GITLAB_USERNAME,
      password: configValues.GITLAB?.GITLAB_PASSWORD || 'ThisIsAnStrongPassword!@',
      logo: GitHubLogo,
    };
  }

  return {
    appName: 'Gitlab',
    companyName: 'Gitlab',
    links: [configValues.GITLAB?.GITLAB_URL],
    username: configValues.GITLAB?.GITLAB_USERNAME,
    password: configValues.GITLAB?.GITLAB_PASSWORD || 'ThisIsAnStrongPassword!@',
    logo: GitLabLogo,
  };
};

export const selectConfigCardValues = () =>
  createSelector(configSelector, selectGitTitle, ({ configs: configValues }, gitTile) => {
    return configValues
      ? [
          gitTile,
          {
            appName: 'Argo CD',
            companyName: 'Intuit',
            links: [configValues.ARGOCD?.ARGOCD_URL],
            username: configValues.ARGOCD?.ARGOCD_USERNAME,
            password: configValues.ARGOCD?.ARGOCD_PASSWORD,
            logo: ArgoCDLogo,
          },
          {
            appName: 'Argo Workflow',
            companyName: 'Intuit',
            links: [configValues.ARGO?.ARGO_URL],
            logo: ArgoCDLogo,
          },
          {
            appName: 'Vault',
            companyName: 'Hashicorp',
            links: [configValues.VAULT?.VAULT_URL],
            password: configValues.VAULT?.VAULT_TOKEN,
            logo: VaultLogo,
          },
          {
            appName: 'Atlantis',
            links: [configValues.ATLANTIS?.ATLANTIS_URL],
            logo: AtlantisLogo,
          },
          {
            appName: 'Metaphor DEV',
            companyName: 'Kubefirst',
            links: [
              configValues.METAPHOR?.URL,
              configValues.METAPHOR?.GO_URL,
              configValues.METAPHOR?.FRONT_URL,
            ],
            logo: MetaphorLogo,
          },
          {
            appName: 'Metaphor STG',
            companyName: 'Kubefirst',
            links: [
              configValues.METAPHOR_STAGING?.URL,
              configValues.METAPHOR_STAGING?.GO_URL,
              configValues.METAPHOR_STAGING?.FRONT_URL,
            ],
            logo: MetaphorLogo,
          },
          {
            appName: 'Metaphor PROD',
            companyName: 'Kubefirst',
            links: [
              configValues.METAPHOR_PRODUCTION?.URL,
              configValues.METAPHOR_PRODUCTION?.GO_URL,
              configValues.METAPHOR_PRODUCTION?.FRONT_URL,
            ],
            logo: MetaphorLogo,
          },
        ]
      : [];
  });

export const selectConfigAdminEmail = () =>
  createSelector(configSelector, ({ configs }) => configs?.ADMIN_EMAIL || '');

export const selectHostedZoneName = () =>
  createSelector(configSelector, ({ configs }) => configs?.HOSTED_ZONE_NAME || '');
