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

export type NestedKeyOf<T extends object, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;

export type JSONValue = string | number | boolean | JSONObject | JSONValue[];

export interface JSONObject {
  [x: string]: JSONValue;
}

export enum GitProtocol {
  HTTPS = 'https',
  SSH = 'ssh',
}
