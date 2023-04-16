import MockAdapter from 'axios-mock-adapter';

import { githubApi } from '../../api';
import { mockGithubUser } from '../../tests/mocks/mockGithubUser';
import { mockGithubUserOrganizations } from '../../tests/mocks/mockGithubUserOrganizations';

export function mockSuccessResponse() {
  const mock = new MockAdapter(githubApi);

  mock.onGet('/user').reply(200, mockGithubUser);
  mock.onGet('/user/orgs').reply(200, mockGithubUserOrganizations);
}

export function mockFailedResponse() {
  const mock = new MockAdapter(githubApi);

  mock.onGet('/user').reply(403);
  mock.onGet('/user/orgs').reply(403);
}
