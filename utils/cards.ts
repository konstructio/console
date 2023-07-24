import { GitProvider } from 'types';

import { theme } from '../theme';

const {
  colors: { bleachedSilk, caribeanSea, ferntastic, greenJelly, white },
} = theme;

export type CardsContentProps = {
  gitProvider: string;
  gitHost: string;
  gitOwner: string;
  hostedZoneName: string;
  isLocal: boolean;

  argoWorkflowsUrl: string;
  vaultUrl: string;
  argoUrl: string;
  atlantisUrl: string;

  metaphor: {
    goUrl: string;
    nodeJsUrl: string;
    reactUrl: string;
  };
  metaphorStaging: {
    goUrl: string;
    nodeJsUrl: string;
    reactUrl: string;
  };
  metaphorProduction: {
    goUrl: string;
    nodeJsUrl: string;
    reactUrl: string;
  };
};

const buildTag = (name: string, url: string, backgroundColor: string) => ({
  value: name,
  url,
  backgroundColor: backgroundColor,
  color: white,
});

const buildArgoCDTag = (argoUrl: string, component: string) => ({
  value: 'Argo CD',
  url:
    argoUrl && argoUrl.includes('localdev.me')
      ? `${argoUrl}/applications/${component}`
      : `${argoUrl}/auth/login?return_url=${encodeURIComponent(
          `${argoUrl}/applications/${component}`,
        )}`,
  backgroundColor: greenJelly,
  color: white,
});

const buildDocsTag = (pageUrl: string, path?: string) => ({
  value: 'Docs',
  url: `https://docs.kubefirst.io/${path ? path : 'kubefirst'}/${pageUrl}`,
  backgroundColor: bleachedSilk,
});

export const buildCardsContent = ({
  gitProvider,
  gitHost,
  gitOwner,
  hostedZoneName,
  isLocal,
  argoWorkflowsUrl,
  vaultUrl,
  argoUrl,
  atlantisUrl,
  metaphor,
  metaphorStaging,
  metaphorProduction,
}: CardsContentProps) => {
  const argoUrlAuth =
    argoUrl && argoUrl.includes('localdev.me')
      ? argoUrl
      : `${argoUrl}/auth/login?return_url=${encodeURIComponent(`${argoUrl}/applications/`)}`;

  const gitTile =
    gitProvider === GitProvider.GITHUB
      ? {
          appName: 'GitHub',
          tags: [
            buildDocsTag(`${isLocal ? 'local' : 'github'}/github-repositories.html`),
            buildArgoCDTag(argoUrl, 'actions-runner-contoller'),
          ],
          links: [
            `https://${gitHost}/${gitOwner}/gitops`,
            `https://${gitHost}/${gitOwner}/metaphor${isLocal ? '-frontend' : ''}`,
          ],
          logo: 'GitHubLogo',
        }
      : {
          appName: 'Gitlab',
          tags: [buildDocsTag('gitlab/gitlab.html'), buildArgoCDTag(argoUrl, 'gitlab')],
          links: [`https://gitlab.${hostedZoneName}`],
          logo: 'GitLabLogo',
        };

  return [
    gitTile,
    {
      appName: 'Vault',
      tags: [buildDocsTag('vault.html', 'common'), buildArgoCDTag(argoUrl, 'vault')],
      links: [`${vaultUrl}/ui/vault/auth?with=userpass`],
      logo: 'VaultLogo',
    },
    {
      appName: 'Argo CD',
      tags: [buildDocsTag('argocd.html', 'common'), buildArgoCDTag(argoUrl, 'argocd')],
      links: [argoUrlAuth],
      logo: 'ArgoCDLogo',
    },
    {
      appName: 'Argo Workflows',
      tags: [buildDocsTag('argo.html', 'tooling'), buildArgoCDTag(argoUrl, 'argo-workflows-cwfts')],
      links: [argoWorkflowsUrl],
      logo: 'ArgoCDLogo',
    },
    {
      appName: 'Atlantis',
      tags: [buildDocsTag('terraform.html', 'common'), buildArgoCDTag(argoUrl, 'atlantis')],
      links: [atlantisUrl],
      logo: 'AtlantisLogo',
    },
    {
      appName: isLocal ? 'Metaphor' : 'ReactJS',
      tags: [
        buildDocsTag('metaphor.html', 'common'),
        buildTag('ReactJS', 'https://reactjs.org', greenJelly),
      ],
      links: [metaphor.reactUrl, metaphorStaging.reactUrl, metaphorProduction.reactUrl],
      logo: 'MetaphorLogo',
    },
    !isLocal
      ? {
          appName: 'NodeJS',
          tags: [
            buildDocsTag('metaphor.html', 'common'),
            buildTag('NodeJS', 'https://expressjs.com', ferntastic),
          ],
          links: [metaphor.nodeJsUrl, metaphorStaging.nodeJsUrl, metaphorProduction.nodeJsUrl],
          logo: 'MetaphorLogo',
        }
      : {},
    !isLocal
      ? {
          appName: 'Golang',
          tags: [
            buildDocsTag('metaphor.html', 'common'),
            buildTag('Golang', 'https://go.dev', caribeanSea),
          ],
          links: [metaphor.goUrl, metaphorStaging.goUrl, metaphorProduction.goUrl],
          logo: 'MetaphorLogo',
        }
      : {},
  ];
};
