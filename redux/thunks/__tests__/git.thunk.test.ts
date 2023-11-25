import { makeStore } from '../../store';
import { mockGithubUserFailedResponse, mockGithubUserSuccessResponse } from '../../../utils/mock';
import { getGithubUser, getGithubUserOrganizations } from '../git.thunk';
import { mockGithubUser } from '../../../tests/mocks/mockGithubUser';
import { mockGithubUserOrganizations } from '../../../tests/mocks/mockGithubUserOrganizations';

describe('redux/thunks/git - successful responses', () => {
  beforeAll(() => {
    mockGithubUserSuccessResponse();
  });

  const reduxStore = makeStore();

  test('getGithubUser', async () => {
    const { payload } = await reduxStore.dispatch(getGithubUser('token'));

    const { githubUser } = reduxStore.getState().git;

    expect(payload).toStrictEqual(mockGithubUser);
    expect(payload).toStrictEqual(githubUser);
  });

  test('getGithubUserOrganizations', async () => {
    const { payload } = await reduxStore.dispatch(getGithubUserOrganizations('token'));

    const { githubUserOrganizations } = reduxStore.getState().git;

    expect(payload).toStrictEqual(mockGithubUserOrganizations);
    expect(payload).toStrictEqual(githubUserOrganizations);
  });
});

describe('redux/thunks/git - failed responses', () => {
  beforeAll(() => {
    mockGithubUserFailedResponse();
  });

  const reduxStore = makeStore();

  test('getGithubUser', async () => {
    await reduxStore.dispatch(getGithubUser('token'));

    const { githubUser } = reduxStore.getState().git;

    expect(githubUser).toBe(null);
  });

  test('getGithubUserOrganizations', async () => {
    await reduxStore.dispatch(getGithubUserOrganizations('token'));

    const { githubUserOrganizations } = reduxStore.getState().git;

    expect(githubUserOrganizations).toStrictEqual([]);
  });
});
