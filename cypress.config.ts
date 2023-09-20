import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
import { createRandomTwoCharacters } from 'utils/createRandomTwoCharacters';

dotenv.config();

export default defineConfig({
  env: {
    CONSOLE_BASE_URL: process.env.CONSOLE_BASE_URL,
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
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1440,
  viewportHeight: 900,
});
