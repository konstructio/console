import { makeStore } from '../../store';
import { mockFailedResponse, mockSuccessResponse } from '../../../utils/mock';
import { getGithubUser, getGithubUserOrganizations } from '../git.thunk';
import { mockGithubUser } from '../../../constants/mockGithubUser';
import { mockGithubUserOrganizations } from '../../../constants/mockGithubUserOrganizations';

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
    const result = await reduxStore.dispatch(getGithubUser('token'));

    const { githubUser, error } = reduxStore.getState().git;

    expect(githubUser).toBe(null);
    expect(result.error.message).toBe('Request failed with status code 403');
    expect(error).toStrictEqual('Request failed with status code 403');
  });

  test('getGithubUserOrganizations', async () => {
    const result = await reduxStore.dispatch(getGithubUserOrganizations('token'));

    const { githubUserOrganizations, error } = reduxStore.getState().git;

    expect(githubUserOrganizations).toStrictEqual([]);
    expect(result.error.message).toBe('Request failed with status code 403');
    expect(error).toStrictEqual('Request failed with status code 403');
  });
});
