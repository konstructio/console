import MockAdapter from 'axios-mock-adapter';

import { makeStore } from '../../store';
import {
  getGitHubOrgRepositories,
  getGitHubOrgTeams,
  getGitLabProjects,
  getGitLabSubgroups,
  getGithubUser,
  getGithubUserOrganizations,
  getGitlabGroups,
  getGitlabUser,
} from '../git.thunk';
import { mockGithubUser } from '../../../tests/mocks/mockGithubUser';
import { mockGitlabUser } from '../../../tests/mocks/mockGitlabUser';
import { mockGithubUserOrganizations } from '../../../tests/mocks/mockGithubUserOrganizations';
import {
  mockGitlabGroups,
  mockGitlabGroupsWithKubefirstTeam,
} from '../../../tests/mocks/mockGitlabGroups';
import { githubApi } from '../../../services/github';
import { gitlabApi } from '../../../services/gitlab';
import { clearGitState, setGitOwner } from '../../slices/git.slice';
import {
  mockGithubOrgRepositories,
  mockGithubOrgRepositoriesWithKubefirstRepo,
} from '../../../tests/mocks/mockGithubOrgRepositories';
import { createGitOrgErrorMessage } from '../../../utils/createGitOrgErrorMessage';
import { GitProvider } from '../../../types';
import {
  mockGithubOrgTeams,
  mockGithubOrgTeamsWithKubefirstTeam,
} from '../../../tests/mocks/mockGithubOrgTeams';
import {
  mockGitlabProjects,
  mockGitlabProjectsWithKubefirstRepo,
} from '../../../tests/mocks/mockGitlabProjects';

describe('redux/thunks/git', () => {
  const githubMock = new MockAdapter(githubApi);
  const gitlabMock = new MockAdapter(gitlabApi);
  const reduxStore = makeStore();

  beforeEach(() => {
    githubMock.reset();
    reduxStore.dispatch(clearGitState());
  });

  test('getGithubUser - successful responses', async () => {
    githubMock.onGet().reply(200, mockGithubUser);
    const githubToken = 'token';
    await reduxStore.dispatch(getGithubUser(githubToken));

    const { githubUser, token, isTokenValid } = reduxStore.getState().git;

    expect(githubUser).toStrictEqual(mockGithubUser);
    expect(token).toStrictEqual(githubToken);
    expect(isTokenValid).toStrictEqual(true);
  });

  test('getGithubUser - unsuccessful response', async () => {
    githubMock.onGet().reply(400);
    await reduxStore.dispatch(getGithubUser('token'));

    const { githubUser, isTokenValid, responseError } = reduxStore.getState().git;

    expect(githubUser).toBe(null);
    expect(isTokenValid).toBe(false);
    expect(responseError).toBe('Request failed with status code 400');
  });

  test('getGithubUserOrganizations - successful response', async () => {
    githubMock.onGet().reply(200, mockGithubUserOrganizations);

    const { payload } = await reduxStore.dispatch(getGithubUserOrganizations('token'));

    const { githubUserOrganizations } = reduxStore.getState().git;

    expect(payload).toStrictEqual(mockGithubUserOrganizations);
    expect(payload).toStrictEqual(githubUserOrganizations);
  });

  test('getGithubUserOrganizations - unsuccessful response', async () => {
    githubMock.onGet().reply(500);
    await reduxStore.dispatch(getGithubUserOrganizations('token'));

    const { githubUserOrganizations, isTokenValid, responseError } = reduxStore.getState().git;

    expect(githubUserOrganizations).toStrictEqual([]);
    expect(isTokenValid).toBe(false);
    expect(responseError).toBe('Request failed with status code 500');
  });

  test('getGithubOrgRepositories - successful response', async () => {
    githubMock.onGet().reply(200, mockGithubOrgRepositories);

    const { payload } = await reduxStore.dispatch(
      getGitHubOrgRepositories({ token: 'token', organization: 'kubefirst' }),
    );

    expect(payload).toStrictEqual(mockGithubOrgRepositories);
  });

  test('getGithubOrgRepositories - successful response - with kubefirst repos error', async () => {
    githubMock.onGet().reply(200, mockGithubOrgRepositoriesWithKubefirstRepo);

    const mockGitOwner = 'octocat';
    reduxStore.dispatch(setGitOwner(mockGitOwner));

    const { payload } = await reduxStore.dispatch(
      getGitHubOrgRepositories({ token: 'token', organization: mockGitOwner }),
    );

    const expectedError = createGitOrgErrorMessage({
      git: GitProvider.GITHUB,
      type: 'repo',
      gitOwner: mockGitOwner,
    });

    const { errors } = reduxStore.getState().git;

    expect(payload).toStrictEqual(mockGithubOrgRepositoriesWithKubefirstRepo);
    expect(errors.includes(expectedError)).toBeTruthy();
  });

  test('getGithubOrgRepositories - unsuccessful response', async () => {
    githubMock.onGet().reply(400);

    await reduxStore.dispatch(
      getGitHubOrgRepositories({ token: 'token', organization: 'kubefirst' }),
    );

    const { isTokenValid, responseError } = reduxStore.getState().git;

    expect(isTokenValid).toBe(false);
    expect(responseError).toBe('Request failed with status code 400');
  });

  test('getGithubOrgTeams - successful response', async () => {
    githubMock.onGet().reply(200, mockGithubOrgTeams);

    const { payload } = await reduxStore.dispatch(
      getGitHubOrgTeams({ token: 'token', organization: 'kubefirst' }),
    );

    expect(payload).toStrictEqual(mockGithubOrgTeams);
  });

  test('getGitHubOrgTeams - successful response - with kubefirst teams error', async () => {
    githubMock.onGet().reply(200, mockGithubOrgTeamsWithKubefirstTeam);

    const mockGitOwner = 'octocat';
    reduxStore.dispatch(setGitOwner(mockGitOwner));

    const { payload } = await reduxStore.dispatch(
      getGitHubOrgTeams({ token: 'token', organization: mockGitOwner }),
    );

    const expectedError = createGitOrgErrorMessage({
      git: GitProvider.GITHUB,
      type: 'team',
      gitOwner: mockGitOwner,
    });

    const { errors } = reduxStore.getState().git;

    expect(payload).toStrictEqual(mockGithubOrgTeamsWithKubefirstTeam);
    expect(errors.includes(expectedError)).toBeTruthy();
  });

  test('getGitHubOrgTeams - unsuccessful response', async () => {
    githubMock.onGet().reply(402);

    await reduxStore.dispatch(getGitHubOrgTeams({ token: 'token', organization: 'kubefirst' }));

    const { isTokenValid, responseError } = reduxStore.getState().git;

    expect(isTokenValid).toBe(false);
    expect(responseError).toBe('Request failed with status code 402');
  });

  test('getGitlabUser - successful responses', async () => {
    gitlabMock.onGet().reply(200, mockGitlabUser);
    const gitlabToken = 'token';
    await reduxStore.dispatch(getGitlabUser(gitlabToken));

    const { gitlabUser, token, isTokenValid } = reduxStore.getState().git;

    expect(gitlabUser).toStrictEqual(mockGitlabUser);
    expect(token).toStrictEqual(gitlabToken);
    expect(isTokenValid).toStrictEqual(true);
  });

  test('getGitLabUser - unsuccessful response', async () => {
    gitlabMock.onGet().reply(400);
    await reduxStore.dispatch(getGitlabUser('token'));

    const { gitlabUser, isTokenValid, responseError } = reduxStore.getState().git;

    expect(gitlabUser).toBe(null);
    expect(isTokenValid).toBe(false);
    expect(responseError).toBe('Request failed with status code 400');
  });

  test('getGitlabGroups - successful response', async () => {
    gitlabMock.onGet().reply(200, mockGitlabGroups);
    await reduxStore.dispatch(getGitlabGroups('token'));

    const { gitlabGroups, isTokenValid } = reduxStore.getState().git;

    expect(gitlabGroups).toStrictEqual(mockGitlabGroups);
    expect(isTokenValid).toBe(true);
  });

  test('getGitlabGroups - unsuccessful response', async () => {
    gitlabMock.onGet().reply(403);
    await reduxStore.dispatch(getGitlabGroups('token'));

    const { isTokenValid, responseError } = reduxStore.getState().git;

    expect(isTokenValid).toBe(false);
    expect(responseError).toBe('Request failed with status code 403');
  });

  test('getGitLabProjects - successful response', async () => {
    gitlabMock.onGet().reply(200, mockGitlabProjects);

    const mockGitOwner = 'starfox';
    reduxStore.dispatch(setGitOwner(mockGitOwner));

    const { payload } = await reduxStore.dispatch(
      getGitLabProjects({ token: 'token', group: mockGitOwner }),
    );

    const { errors } = reduxStore.getState().git;

    expect(payload).toStrictEqual(mockGitlabProjects);
    expect(errors).toStrictEqual([]);
  });

  test('getGitLabProjects - successful response - with kubefirst teams error', async () => {
    gitlabMock.onGet().reply(200, mockGitlabProjectsWithKubefirstRepo);

    const mockGitOwner = 'starfox';
    reduxStore.dispatch(setGitOwner(mockGitOwner));

    const { payload } = await reduxStore.dispatch(
      getGitLabProjects({ token: 'token', group: mockGitOwner }),
    );

    const expectedError = createGitOrgErrorMessage({
      git: GitProvider.GITLAB,
      type: 'repo',
      gitOwner: mockGitOwner,
    });

    const { errors } = reduxStore.getState().git;

    expect(payload).toStrictEqual(mockGitlabProjectsWithKubefirstRepo);
    expect(errors.includes(expectedError)).toBeTruthy();
  });

  test('getGitLabProjects - unsuccessful response', async () => {
    gitlabMock.onGet().reply(500);

    await reduxStore.dispatch(getGitLabProjects({ token: 'token', group: 'starfox' }));

    const { isTokenValid, responseError } = reduxStore.getState().git;

    expect(isTokenValid).toBe(false);
    expect(responseError).toBe('Request failed with status code 500');
  });

  test('getGitLabSubgroups - successful response', async () => {
    // using mockGitlabGroups as return type contains the same info we need
    gitlabMock.onGet().reply(200, mockGitlabGroups);

    const mockGitOwner = 'starfox';
    reduxStore.dispatch(setGitOwner(mockGitOwner));

    const { payload } = await reduxStore.dispatch(
      getGitLabSubgroups({ token: 'token', group: mockGitOwner }),
    );

    const { errors } = reduxStore.getState().git;

    expect(payload).toStrictEqual(mockGitlabGroups);
    expect(errors).toStrictEqual([]);
  });

  test('getGitLabSubgroups - successful response - with kubefirst teams error', async () => {
    gitlabMock.onGet().reply(200, mockGitlabGroupsWithKubefirstTeam);

    const mockGitOwner = 'starfox';
    reduxStore.dispatch(setGitOwner(mockGitOwner));

    const { payload } = await reduxStore.dispatch(
      getGitLabSubgroups({ token: 'token', group: mockGitOwner }),
    );

    const expectedError = createGitOrgErrorMessage({
      git: GitProvider.GITLAB,
      type: 'team',
      gitOwner: mockGitOwner,
    });

    const { errors } = reduxStore.getState().git;

    expect(payload).toStrictEqual(mockGitlabGroupsWithKubefirstTeam);
    expect(errors.includes(expectedError)).toBeTruthy();
  });

  test('getGitLabSubgroups - unsuccessful response', async () => {
    gitlabMock.onGet().reply(500);

    await reduxStore.dispatch(getGitLabSubgroups({ token: 'token', group: 'starfox' }));

    const { isTokenValid, responseError } = reduxStore.getState().git;

    expect(isTokenValid).toBe(false);
    expect(responseError).toBe('Request failed with status code 500');
  });
});
