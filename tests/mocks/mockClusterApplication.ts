import { ClusterApplication } from '@/types/applications';

export const mockClusterApplication: ClusterApplication = {
  name: 'github',
  default: true,
  description:
    'The git repositories contain all the Infrastructure as Code and Gitops configurations.',
  image: 'https://assets.kubefirst.com/console/github.svg',
  links: ['https://github.com/kubefirst-me/gitops', 'https://github.com/kubefirst-me/metaphor'],
  status: '',
};
