import React, { FunctionComponent } from 'react';

import { TYPES } from '../../enums/typography';
import CardLocal from '../cardLocal';
import Text from '../text';
import GitHubLogo from "../../assets/github.png"
import ArgoCDLogo from '../../assets/argocd.webp';
import AtlantisLogo from '../../assets/atlantis.png';
import MetaphorLogo from '../../assets/metaphor.png';
import VaultLogo from '../../assets/vault.png';
import { Container, Content, Header } from './home.styled';
import theme from '../../../src/theme';
const { SUBTITLE, TITLE } = TYPES;

export interface IHomeProps {
  adminEmail: string;
  clusterName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cards: Array<any>;
  domain: string;
}

const {
  colors: { bleachedSilk, greenJelly, white },
} = theme;

const { GITHUB_OWNER: gitOwner } = process.env
const atlantisUrl = `http://localhost:4141`;
const argoCdUrl = `http://localhost:8080`;
const argoWorkflowsUrl = `http://localhost:2746`
const vaultUrl = `http://localhost:8200`


const cardz = [
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
      value: 'GitHub',
      url: `http://localhost:8080/actions-runner-components`,
      backgroundColor: greenJelly,
      color: white,
    },
  ],
  links: [
    `https://github.com/${gitOwner}/gitops`,
    `https://github.com/${gitOwner}/metaphor`,
  ],
  logo: GitHubLogo,
},{
  appName: 'Argo CD',
  companyName: 'Intuit',
  tags: [
    {
      value: 'Docs',
      url: `https://docs.kubefirst.io/kubefirst/github/argocd.html`,
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
      url: `https://docs.kubefirst.io/kubefirst/github/argo.html`,
      backgroundColor: bleachedSilk,
    },
    {
      value: 'Argo Workflows',
      url: `${argoCdUrl}/argo`,
      backgroundColor: greenJelly,
      color: white,
    },
  ],
  links: [argoWorkflowsUrl],
  logo: ArgoCDLogo,
},
{
  appName: 'Atlantis',
  tags: [
    {
      value: 'Docs',
      url: `https://docs.kubefirst.io/kubefirst/$github/terraform.html`,
      backgroundColor: bleachedSilk,
    },
    {
      value: 'Atlantis',
      url: `${argoCdUrl}/atlantis`,
      backgroundColor: greenJelly,
      color: white,
    },
  ],
  links: [atlantisUrl],
  logo: AtlantisLogo,
},
{
  appName: 'Vault',
  companyName: 'Hashicorp',
  tags: [
    {
      value: 'Docs',
      url: `https://docs.kubefirst.io/kubefirst/github/argo.html`,
      backgroundColor: bleachedSilk,
    },
    {
      value: 'Vault',
      url: `${vaultUrl}/vault`,
      backgroundColor: greenJelly,
      color: white,
    },
  ],
  links: [`${vaultUrl}`],
  logo: VaultLogo,
},
{
  appName: 'React',
  companyName: 'Kubefirst',
  tags: [
    {
      value: 'Docs',
      url: `https://docs.kubefirst.io/common/metaphors.html`,
      backgroundColor: bleachedSilk,
    },
    {
      value: 'React',
      url: `${argoCdUrl}/metaphor-frontend-development`,
      backgroundColor: greenJelly,
      color: white,
    },
  ],
  links: [
    `http://localhost:3000/app`,
  ],
  logo: MetaphorLogo,
},
{
  appName: 'Node.js',
  companyName: 'Kubefirst',
  tags: [
    {
      value: 'Docs',
      url: `https://docs.kubefirst.io/common/metaphors.html`,
      backgroundColor: bleachedSilk,
    },
    {
      value: 'Node.js',
      url: `${argoCdUrl}/metaphor-development`,
      backgroundColor: greenJelly,
      color: white,
    },
  ],
  links: [
    `http://localhost:3001/app`,
  ],
  logo: MetaphorLogo,
},
{
  appName: 'Golang',
  companyName: 'Kubefirst',
  tags: [
    {
      value: 'Docs',
      url: `https://docs.kubefirst.io/common/metaphors.html`,
      backgroundColor: bleachedSilk,
    },
    {
      value: 'Golang',
      url: `${argoCdUrl}/metaphor-go-development `,
      backgroundColor: greenJelly,
      color: white,
    },
  ],
  links: [
    `http://localhost:3002/app`,

  ],
  logo: MetaphorLogo,
},
]

const Home: FunctionComponent<IHomeProps> = ({
  adminEmail,
  clusterName,
  cards,
  domain,
}) => {
  return (
    <Container data-testid="home-component">
      <Content>
        <Header>
          <Text type={TITLE}>Kubefirst</Text>
          <Text type={SUBTITLE}>{`Admin Email: kubefirst-bot@example.com`}</Text>
          <Text type={SUBTITLE}>{`Cluster Name: kubefirst`}</Text>
        </Header>
        {/*!  cards */}
        {cardz &&
          cardz.map((card) => (
            <CardLocal key={card.appName} {...card} url={domain} />
          ))}
      </Content>
    </Container>
  );
};

export default Home;
