import { Services } from '../enums/services';

const {
  ATLANTIS,
  ARGO,
  ARGOCD,
  GITHUB,
  GITLAB,
  METAPHOR,
  METAPHOR_STG,
  METAPHOR_PRODUCTION,
  VAULT,
} = Services;

export type Config = {
  ADMIN_EMAIL?: string;
  HOSTED_ZONE_NAME?: string;
  IS_GITHUB_ENABLED?: boolean;
  [ATLANTIS]?: {
    ATLANTIS_URL: string;
  };
  [ARGO]?: {
    ARGO_URL: string;
  };
  [ARGOCD]?: {
    ARGOCD_USERNAME: string;
    ARGOCD_PASSWORD: string;
    ARGOCD_URL: string;
  };
  [GITHUB]: {
    GITHUB_GITOPS: string;
    GITHUB_METAPHOR: string;
  };
  [GITLAB]?: {
    GITLAB_URL: string;
    GITLAB_USERNAME: string;
    GITLAB_PASSWORD: string;
  };
  [METAPHOR]?: {
    URL: string;
    GO_URL: string;
    FRONT_URL: string;
  };
  [METAPHOR_STG]?: {
    URL: string;
    GO_URL: string;
    FRONT_URL: string;
  };
  [METAPHOR_PRODUCTION]?: {
    URL: string;
    GO_URL: string;
    FRONT_URL: string;
  };
  [VAULT]?: {
    VAULT_URL: string;
    VAULT_TOKEN: string;
  };
};
