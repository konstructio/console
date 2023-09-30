import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
import { createRandomTwoCharacters } from 'utils/createRandomTwoCharacters';

dotenv.config();

export default defineConfig({
  env: {
    CONSOLE_BASE_URL: process.env.CONSOLE_BASE_URL,
    GIT_PROVIDER: process.env.GIT_PROVIDER,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITLAB_TOKEN: process.env.GITLAB_TOKEN,
    GITHUB_USER: process.env.GITHUB_USER,
    GITLAB_USER: process.env.GITLAB_USER,
    GITLAB_OWNER: process.env.GITLAB_OWNER,
    GITHUB_OWNER: process.env.GITHUB_OWNER,
    CIVO_TOKEN: process.env.CIVO_TOKEN,
    CIVO_CLOUD_REGION: process.env.CIVO_CLOUD_REGION,
    DNS_PROVIDER: process.env.DNS_PROVIDER,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    ALERTS_EMAIL: process.env.ALERTS_EMAIL,
    CLOUDFLARE_TOKEN: process.env.CLOUDFLARE_TOKEN,
    CLOUDFLARE_ORIGIN_CA_KEY: process.env.CLOUDFLARE_ORIGIN_CA_KEY,
    CLUSTER_NAME: process.env.CLUSTER_NAME,
    SUB_DOMAIN: process.env.SUB_DOMAIN,
    WORKLOAD_ENVIRONMENT: process.env.WORKLOAD_ENVIRONMENT,
    WORKLOAD_CLUSTER_NAME: process.env.WORKLOAD_CLUSTER_NAME,
    GITOPS_TEMPLATE_BRANCH: process.env.GITOPS_TEMPLATE_BRANCH,
    RANDOM_TWO_CHARACTERS: createRandomTwoCharacters(),
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN,
    AWS_CLOUD_REGION: process.env.AWS_CLOUD_REGION,
    IMAGE_REPO: process.env.IMAGE_REPO,
    CLOUD_PROVIDER: process.env.CLOUD_PROVIDER,
    GOOGLE_KEY_FILE: process.env.GOOGLE_KEY_FILE,
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    DIGI_OCEAN_AUTH_TOKEN: process.env.DIGI_OCEAN_AUTH_TOKEN,
    DIGI_OCEAN_SPACES_KEY: process.env.DIGI_OCEAN_SPACES_KEY,
    DIGI_OCEAN_SPACES_SECRET: process.env.DIGI_OCEAN_SPACES_SECRET,
    VULTR_TOKEN: process.env.VULTR_TOKEN,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1440,
  viewportHeight: 900,
});
