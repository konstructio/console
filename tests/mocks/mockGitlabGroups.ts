import { GitLabGroup } from '../../types/gitlab';

export const mockGitlabGroups: GitLabGroup[] = [
  {
    id: 1,
    name: 'Foobar Group',
    path: 'foo-bar',
    description: 'An interesting group',
  },
];

export const mockGitlabGroupsWithKubefirstTeam: GitLabGroup[] = [
  {
    id: 1,
    name: 'admins',
    path: 'foo-bar',
    description: 'An interesting group',
  },
];
