export default interface IKeyValue<T> {
  [key: string]: T;
}

export type CardOptionInfo = {
  description: string;
  title: string;
};

export enum GitProvider {
  GITHUB = 'github',
  GITLAB = 'gitlab',
}

export const GIT_PROVIDERS = Object.values(GitProvider);
