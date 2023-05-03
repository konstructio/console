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
