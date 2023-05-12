export type GitLabGroup = {
  id: number;
  name: string;
  path: string;
  description: string;
};

export type GitLabUser = {
  id: number;
  username: string;
  name: string;
  commit_email: string;
};

export type GitLabProject = {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
};
