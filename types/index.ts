import { ReactNode } from 'react';

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

export interface Row {
  [key: string]: unknown | ReactNode;
  id: string;
  selected?: boolean;
}

export type NodeStatus = 'available' | 'unavailable' | 'draft' | 'deleting';

export type NodeType = 'management' | 'worker' | 'draft';
