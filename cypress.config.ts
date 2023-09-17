import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  env: {
    CONSOLE_BASE_URL: process.env.CONSOLE_BASE_URL,
    GIT_TOKEN: process.env.GIT_TOKEN,
    GIT_OWNER: process.env.GIT_OWNER,
    CIVO_TOKEN: process.env.CIVO_TOKEN,
    ALERTS_EMAIL: process.env.ALERTS_EMAIL,
    CLOUDFLARE_TOKEN: process.env.CLOUDFLARE_TOKEN,
    CLOUDFLARE_ORIGIN_CA_KEY: process.env.CLOUDFLARE_ORIGIN_CA_KEY,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
