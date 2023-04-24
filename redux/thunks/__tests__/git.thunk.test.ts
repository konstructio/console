import { makeStore } from '../../store';
import { mockFailedResponse, mockSuccessResponse } from '../../../utils/mock';
import { getGithubUser, getGithubUserOrganizations } from '../git.thunk';
import { mockGithubUser } from '../../../tests/mocks/mockGithubUser';
import { mockGithubUserOrganizations } from '../../../tests/mocks/mockGithubUserOrganizations';

describe('redux/thunks - successful responses', () => {
  beforeAll(() => {
    mockSuccessResponse();
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

describe('redux/thunks - failed responses', () => {
  beforeAll(() => {
    mockFailedResponse();
  });

  const reduxStore = makeStore();

  test('getGithubUser', async () => {
    await reduxStore.dispatch(getGithubUser('token'));

    const { githubUser, error } = reduxStore.getState().git;

    expect(githubUser).toBe(null);
    expect(error).toStrictEqual('Request failed with status code 403');
  });

  test('getGithubUserOrganizations', async () => {
    await reduxStore.dispatch(getGithubUserOrganizations('token'));

    const { githubUserOrganizations, error } = reduxStore.getState().git;

    expect(githubUserOrganizations).toStrictEqual([]);
    expect(error).toStrictEqual('Request failed with status code 403');
  });
});
