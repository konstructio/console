import { GithubOrganizationRepos } from '../../types/github';

export const mockGithubOrgRepositories: GithubOrganizationRepos[] = [
  {
    id: 1296269,
    name: 'Hello-World',
    full_name: 'octocat/Hello-World',
    html_url: 'https://github.com/octocat/Hello-World',
    description: 'This your first repo!',
    url: 'https://api.github.com/repos/octocat/Hello-World',
  },
];

export const mockGithubOrgRepositoriesWithKubefirstRepo: GithubOrganizationRepos[] = [
  {
    id: 1296270,
    name: 'gitops',
    full_name: 'octocat/gitops',
    html_url: 'https://github.com/octocat/gitops',
    description: 'This your kubefirst gitops repo!',
    url: 'https://api.github.com/repos/octocat/gitops',
  },
];
