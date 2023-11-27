import MockAdapter from 'axios-mock-adapter';

import { githubApi } from '../../services/github';
import { mockGithubUser } from '../../tests/mocks/mockGithubUser';
import { mockGithubUserOrganizations } from '../../tests/mocks/mockGithubUserOrganizations';

export function mockGithubUserSuccessResponse() {
  const mock = new MockAdapter(githubApi);

  mock.onGet('/user').reply(200, mockGithubUser);
  mock.onGet('/user/orgs?per_page=100').reply(200, mockGithubUserOrganizations);
}

export function mockGithubUserFailedResponse() {
  const mock = new MockAdapter(githubApi);

  mock.onGet('/user').reply(403);
  mock.onGet('/user/orgs?per_page=100').reply(403);
}
