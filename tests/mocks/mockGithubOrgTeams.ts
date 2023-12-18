import { GithubOrganizationTeams } from '../../types/github';

export const mockGithubOrgTeams: GithubOrganizationTeams[] = [
  {
    id: 1,
    url: 'https://api.github.com/teams/1',
    html_url: 'https://github.com/orgs/github/teams/justice-league',
    name: 'Justice League',
    slug: 'justice-league',
    description: 'A great team.',
  },
];

export const mockGithubOrgTeamsWithKubefirstTeam: GithubOrganizationTeams[] = [
  {
    id: 2,
    url: 'https://api.github.com/teams/1',
    html_url: 'https://github.com/orgs/github/teams/developers',
    name: 'developers',
    slug: 'developers',
    description: 'super duper cool team',
  },
];
