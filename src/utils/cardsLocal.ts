import { GIT_PROVIDERS } from '../enums/utils';
import ArgoCDLogo from '../assets/argocd.webp';
import GitLabLogo from '../assets/gitlab.png';
import GitHubLogo from '../assets/github.png';
import VaultLogo from '../assets/vault.png';
import AtlantisLogo from '../assets/atlantis.png';
import MetaphorLogo from '../assets/metaphor.png';
import theme from '../../src/theme';
// todo 
// todo 1. get the environment variables to display on the UI properly
// todo 2. send IS_LOCAL and render card 2 
// todo 3. on detokenize we can get these values from viper baked into the deployment / application
// todo 4. a card that only displays on IS_LOCAL


const {
  colors: { bleachedSilk, greenJelly, white },
} = theme;

export type CardsContentProps = {
  gitProvider: string;
  gitHost: string;
  gitOwner: string;
  url: string;
};

export const buildCardsContentLocal = ({
  gitProvider,
  gitOwner,
}: CardsContentProps) => {


  return [
    {
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
          url: `http://locahost:8080/actions-runner-components`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [
        `https://github.com/${gitOwner}/gitops`,
        `https://github.com/${gitOwner}/metaphor`,
      ],
      logo: GitHubLogo,
    },
    {
      appName: 'Argo CD',
      companyName: 'Intuit',
      tags: [
        {
          value: 'Docs',
          url: `https://docs.kubefirst.io/kubefirst/${gitProvider}/argocd.html`,
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${argoCdUrl}/argocd`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [argoCdUrl],
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
          url: `${argoUrl}/argo-workflows-cwfts`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [argoWorkflowsUrl],
      logo: ArgoCDLogo,
    },
    {
      appName: 'Vault',
      companyName: 'Hashicorp',
      tags: [
        {
          value: 'Docs',
          url: `https://docs.kubefirst.io/kubefirst/${gitProvider}/vault.html`,
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${argoUrl}/vault`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [`${vaultUrl}/ui/vault/auth?with=userpass`],
      logo: VaultLogo,
    },
    {
      appName: 'Atlantis',
      tags: [
        {
          value: 'Docs',
          url: `https://docs.kubefirst.io/kubefirst/${gitProvider}/terraform.html`,
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${argoUrl}/atlantis`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [atlantisUrl],
      logo: AtlantisLogo,
    },
    {
      appName: 'Metaphor DEV',
      companyName: 'Kubefirst',
      tags: [
        {
          value: 'Docs',
          url: `https://docs.kubefirst.io/common/metaphors.html`,
          backgroundColor: bleachedSilk,
        },
        {
          value: 'Argo CD',
          url: `${argoUrl}/metaphor-development`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [
        `https://metaphor-development.${hostedZoneName}/app`,
        `https://metaphor-go-development.${hostedZoneName}/app`,
        `https://metaphor-frontend-development.${hostedZoneName}`,
      ],
      logo: MetaphorLogo,
    },
    {
      appName: 'Metaphor STG',
      companyName: 'Kubefirst',
      tags: [
        {
          value: 'Argo CD',
          url: `${argoUrl}/applications/metaphor-staging`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [
        `https://metaphor-staging.${hostedZoneName}/app`,
        `https://metaphor-go-staging.${hostedZoneName}/app`,
        `https://metaphor-frontend-staging.${hostedZoneName}`,
      ],
      logo: MetaphorLogo,
    },
    {
      appName: 'Metaphor PROD',
      companyName: 'Kubefirst',
      tags: [
        {
          value: 'Argo CD',
          url: `${argoUrl}/applications/metaphor-production`,
          backgroundColor: greenJelly,
          color: white,
        },
      ],
      links: [
        `https://metaphor-production.${hostedZoneName}/app`,
        `https://metaphor-go-production.${hostedZoneName}/app`,
        `https://metaphor-frontend-production.${hostedZoneName}`,
      ],
      logo: MetaphorLogo,
    },
  ];
};

export default {
    buildCardsContentLocal,
};
