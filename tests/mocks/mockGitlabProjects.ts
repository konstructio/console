import { GitLabProject } from '../../types/gitlab';

export const mockGitlabProjects: GitLabProject[] = [
  {
    id: 4,
    description: '',
    name: 'Diaspora Client',
    name_with_namespace: 'Diaspora / Diaspora Client',
    path: 'diaspora-client',
    path_with_namespace: 'diaspora/diaspora-client',
    ssh_url_to_repo: 'git@gitlab.example.com:diaspora/diaspora-client.git',
    http_url_to_repo: 'https://gitlab.example.com/diaspora/diaspora-client.git',
    web_url: 'https://gitlab.example.com/diaspora/diaspora-client',
  },
];

export const mockGitlabProjectsWithKubefirstRepo: GitLabProject[] = [
  {
    id: 4,
    description: '',
    name: 'metaphor',
    name_with_namespace: 'metaphor',
    path: 'metaphor',
    path_with_namespace: 'diaspora/metaphor',
    ssh_url_to_repo: 'git@gitlab.example.com:metaphor/metaphor.git',
    http_url_to_repo: 'https://gitlab.example.com/diaspora/metaphor.git',
    web_url: 'https://gitlab.example.com/diaspora/metaphor',
  },
];
