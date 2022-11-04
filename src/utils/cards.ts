import { GIT_PROVIDERS } from '../enums/utils';
import ArgoCDLogo from '../assets/argocd.webp';
import GitLabLogo from '../assets/gitlab.png';
import GitHubLogo from '../assets/github.png';
import VaultLogo from '../assets/vault.png';
import AtlantisLogo from '../assets/atlantis.png';
import MetaphorLogo from '../assets/metaphor.png';
import theme from '../theme';

const {
  colors: { bleachedSilk, caribeanSea, ferntastic, greenJelly, white },
} = theme;

export type CardsContentProps = {
  gitProvider: string;
  gitHost: string;
  gitOwner: string;
  hostedZoneName: string;

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
    argoUrl && argoUrl.includes('//localhost')
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
  argoWorkflowsUrl,
  vaultUrl,
  argoUrl,
  atlantisUrl,
  metaphor,
  metaphorStaging,
  metaphorProduction,
}: CardsContentProps) => {
  const gitTile =
    gitProvider === GIT_PROVIDERS.GITHUB
      ? {
          appName: 'GitHub',
          tags: [
            buildDocsTag('github/github-repositories.html'),
            buildArgoCDTag(argoUrl, 'actions-runner-contoller'),
          ],
          links: [
            `https://${gitHost}/${gitOwner}/gitops`,
            `https://${gitHost}/${gitOwner}/metaphor`,
          ],
          logo: GitHubLogo,
        }
      : {
          appName: 'Gitlab',
          tags: [buildDocsTag('gitlab/gitlab.html'), buildArgoCDTag(argoUrl, 'gitlab')],
          links: [`https://gitlab.${hostedZoneName}`],
          logo: GitLabLogo,
        };

  return [
    gitTile,
    {
      appName: 'Argo CD',
      tags: [buildDocsTag(`${gitProvider}/argocd.html`), buildArgoCDTag(argoUrl, 'argocd')],
      links: [argoUrl],
      logo: ArgoCDLogo,
    },
    {
      appName: 'Argo Workflows',
      tags: [buildDocsTag('tooling/argo.html'), buildArgoCDTag(argoUrl, 'argo-workflows-cwfts')],
      links: [argoWorkflowsUrl],
      logo: ArgoCDLogo,
    },
    {
      appName: 'Vault',
      tags: [buildDocsTag(`${gitProvider}/vault.html`), buildArgoCDTag(argoUrl, 'vault')],
      links: [`${vaultUrl}/ui/vault/auth?with=userpass`],
      logo: VaultLogo,
    },
    {
      appName: 'Atlantis',
      tags: [buildDocsTag(`${gitProvider}/terraform.html`), buildArgoCDTag(argoUrl, 'atlantis')],
      links: [atlantisUrl],
      logo: AtlantisLogo,
    },
    {
      appName: 'ReactJS',
      tags: [
        buildDocsTag('metaphors.html', 'common'),
        buildTag('ReactJS', 'https://reactjs.org', greenJelly),
      ],
      links: [metaphor.reactUrl, metaphorStaging.reactUrl, metaphorProduction.reactUrl],
      logo: MetaphorLogo,
    },
    {
      appName: 'NodeJS',
      tags: [
        buildDocsTag('metaphors.html', 'common'),
        buildTag('NodeJS', 'https://expressjs.com', ferntastic),
      ],
      links: [metaphor.nodeJsUrl, metaphorStaging.nodeJsUrl, metaphorProduction.nodeJsUrl],
      logo: MetaphorLogo,
    },
    {
      appName: 'Golang',
      tags: [
        buildDocsTag('metaphors.html', 'common'),
        buildTag('Golang', 'https://go.dev', caribeanSea),
      ],
      links: [metaphor.goUrl, metaphorStaging.goUrl, metaphorProduction.goUrl],
      logo: MetaphorLogo,
    },
  ];
};

export default {
  buildCardsContent,
};
