import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  env: {
    CONSOLE_BASE_URL: process.env.CONSOLE_BASE_URL,
    GIT_TOKEN: process.env.GIT_TOKEN,
    GIT_OWNER: process.env.GIT_OWNER,
    CIVO_TOKEN: process.env.CIVO_TOKEN,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
