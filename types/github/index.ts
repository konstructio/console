// based off of https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user - response schema
export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  email: string | null;
};

// based off of https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#list-organizations-for-the-authenticated-user - response schema
export type GithubUserOrganization = {
  login: string;
  id: number;
  url: string;
  description: string | null;
};

export type GithubOrganizationRepos = {
  id: number;
  name: string;
  visibility: string;
  full_name: string;
  html_url: string;
  description: string;
  url: string;
};

export type GithubOrganizationTeams = {
  id: number;
  url: string;
  html_url: string;
  name: string;
  slug: string;
  description: string;
};
