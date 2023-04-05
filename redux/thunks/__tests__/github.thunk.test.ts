import { makeStore } from '../../store';
import { mockFailedResponse, mockSuccessResponse } from '../../../utils/mock';
import { getUser, getUserOrganizations } from '../github.thunk';
import { mockGithubUser } from '../../../constants/mockGithubUser';
import { mockGithubUserOrganizations } from '../../../constants/mockGithubUserOrganizations';

describe('redux/thunks - successful responses', () => {
  beforeAll(() => {
    mockSuccessResponse();
  });

  const reduxStore = makeStore();

  test('getUser', async () => {
    const { payload } = await reduxStore.dispatch(getUser('token'));

    const { user } = reduxStore.getState().githubUser;

    expect(payload).toStrictEqual(mockGithubUser);
    expect(payload).toStrictEqual(user);
  });

  test('getUserOrganizations', async () => {
    const { payload } = await reduxStore.dispatch(getUserOrganizations('token'));

    const { organizations } = reduxStore.getState().githubUser;

    expect(payload).toStrictEqual(mockGithubUserOrganizations);
    expect(payload).toStrictEqual(organizations);
  });
});

describe('redux/thunks - failed responses', () => {
  beforeAll(() => {
    mockFailedResponse();
  });

  const reduxStore = makeStore();

  test('getUser', async () => {
    const result = await reduxStore.dispatch(getUser('token'));

    const { user, error } = reduxStore.getState().githubUser;

    expect(user).toBe(null);
    expect(result.error.message).toBe('Request failed with status code 403');
    expect(error).toStrictEqual('Request failed with status code 403');
  });

  test('getUserOrganizations', async () => {
    const result = await reduxStore.dispatch(getUserOrganizations('token'));

    const { organizations, error } = reduxStore.getState().githubUser;

    expect(organizations).toStrictEqual([]);
    expect(result.error.message).toBe('Request failed with status code 403');
    expect(error).toStrictEqual('Request failed with status code 403');
  });
});
