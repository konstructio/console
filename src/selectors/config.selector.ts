import { createSelector } from '@reduxjs/toolkit';

import { IConfigState } from '../slices/config.slice';
import { RootState } from '../store';
import ArgoCDLogo from '../assets/argocd.webp';
import GitLabLogo from '../assets/gitlab.png';
import GitHubLogo from '../assets/github.png';
import VaultLogo from '../assets/vault.png';
import AtlantisLogo from '../assets/atlantis.png';
import MetaphorLogo from '../assets/metaphor.png';
import theme from '../theme';

const {
  colors: { bleachedSilk, greenJelly, white },
} = theme;

const configSelector = (state: RootState): IConfigState => state.config;

const selectGitTitle = ({ config: { configs: configValues } }: RootState) => {
  if (configValues.IS_GITHUB_ENABLED) {
    return {
      appName: 'GitHub',
      companyName: 'GitHub',
      tags: [
        {
          value: 'Docs',
          url: 'https://docs.kubefirst.io/kubefirst/github/github-repositories.html',
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${configValues.ARGOCD?.ARGOCD_URL}/applications/github`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [configValues.GITHUB?.GITHUB_GITOPS, configValues.GITHUB?.GITHUB_METAPHOR],
      logo: GitHubLogo,
    };
  }

  return {
    appName: 'Gitlab',
    companyName: 'Gitlab',
    tags: [
      {
        value: 'Docs',
        url: 'https://docs.kubefirst.io/kubefirst/gitlab/gitlab.html',
        backgroundColor: bleachedSilk,
      },
      {
        value: 'Argo CD',
        url: `${configValues.ARGOCD?.ARGOCD_URL}/applications/gitlab`,
        backgroundColor: greenJelly,
        color: white,
      },
    ],
    links: [configValues.GITLAB?.GITLAB_URL],
    logo: GitLabLogo,
  };
};

export const selectConfigCardValues = () =>
  createSelector(configSelector, selectGitTitle, ({ configs: configValues }, gitTile) => {
    const gitPath = configValues.IS_GITHUB_ENABLED ? 'github' : 'gitlab';

    return configValues
      ? [
          gitTile,
          {
            appName: 'Argo CD',
            companyName: 'Intuit',
            tags: [
              {
                value: 'Docs',
                url: `https://docs.kubefirst.io/kubefirst/${gitPath}/argocd.html`,
                backgroundColor: bleachedSilk,
              },
              {
                value: 'Argo CD',
                url: `${configValues.ARGOCD?.ARGOCD_URL}/applications/argocd`,
                backgroundColor: greenJelly,
                color: white,
              },
            ],
            links: [configValues.ARGOCD?.ARGOCD_URL],
            logo: ArgoCDLogo,
          },
          {
            appName: 'Argo Workflows',
            companyName: 'Intuit',
            tags: [
              {
                value: 'Docs',
                url: 'https://docs.kubefirst.io/tooling/argo.html',
                backgroundColor: bleachedSilk,
              },
              {
                value: 'Argo CD',
                url: `${configValues.ARGOCD?.ARGOCD_URL}/applications/argo-workflows-cwfts`,
                backgroundColor: greenJelly,
                color: white,
              },
            ],
            links: [configValues.ARGO?.ARGO_URL],
            logo: ArgoCDLogo,
          },
          {
            appName: 'Vault',
            companyName: 'Hashicorp',
            tags: [
              {
                value: 'Docs',
                url: `https://docs.kubefirst.io/kubefirst/${gitPath}/vault.html`,
                backgroundColor: bleachedSilk,
              },
              {
                value: 'Argo CD',
                url: `${configValues.ARGOCD?.ARGOCD_URL}/applications/vault`,
                backgroundColor: greenJelly,
                color: white,
              },
            ],
            links: [`${configValues.VAULT?.VAULT_URL}/ui/vault/auth?with=userpass`],
            logo: VaultLogo,
          },
          {
            appName: 'Atlantis',
            tags: [
              {
                value: 'Docs',
                url: `https://docs.kubefirst.io/kubefirst/${gitPath}/terraform.html`,
                backgroundColor: bleachedSilk,
              },
              {
                value: 'Argo CD',
                url: `${configValues.ARGOCD?.ARGOCD_URL}/applications/atlantis`,
                backgroundColor: greenJelly,
                color: white,
              },
            ],
            links: [configValues.ATLANTIS?.ATLANTIS_URL],
            logo: AtlantisLogo,
          },
          {
            appName: 'Metaphor DEV',
            companyName: 'Kubefirst',
            tags: [
              {
                value: 'Docs',
                url: `https://docs.kubefirst.io/kubefirst/${gitPath}/metaphors.html`,
                backgroundColor: bleachedSilk,
              },
              {
                value: 'Argo CD',
                url: `${configValues.ARGOCD?.ARGOCD_URL}/applications/metaphor-development`,
                backgroundColor: greenJelly,
                color: white,
              },
            ],
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
            tags: [
              {
                value: 'Argo CD',
                url: `${configValues.ARGOCD?.ARGOCD_URL}/applications/metaphor-staging`,
                backgroundColor: greenJelly,
                color: white,
              },
            ],
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
            tags: [
              {
                value: 'Argo CD',
                url: `${configValues.ARGOCD?.ARGOCD_URL}/applications/metaphor-production`,
                backgroundColor: greenJelly,
                color: white,
              },
            ],
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
