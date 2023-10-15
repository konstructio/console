import { InstallationType } from '../../../types/redux';
import { GitProvider } from '../../../types';

const GIT_PROVIDER = Cypress.env('GIT_PROVIDER');
const CLOUD_PROVIDER = Cypress.env('CLOUD_PROVIDER');
const GITHUB_TOKEN = Cypress.env('GITHUB_TOKEN');
const GITLAB_TOKEN = Cypress.env('GITLAB_TOKEN');
const GITHUB_USER = Cypress.env('GITHUB_USER');
const GITLAB_USER = Cypress.env('GITLAB_USER');
const GITHUB_OWNER = Cypress.env('GITHUB_OWNER');
const GITLAB_OWNER = Cypress.env('GITLAB_OWNER');
const CIVO_TOKEN = Cypress.env('CIVO_TOKEN');
const CIVO_CLOUD_REGION = Cypress.env('CIVO_CLOUD_REGION');
const DNS_PROVIDER = Cypress.env('DNS_PROVIDER');
const ALERTS_EMAIL = Cypress.env('ALERTS_EMAIL');
const CLOUDFLARE_TOKEN = Cypress.env('CLOUDFLARE_TOKEN');
const CLOUDFLARE_ORIGIN_CA_KEY = Cypress.env('CLOUDFLARE_ORIGIN_CA_KEY');
const CLUSTER_NAME = Cypress.env('CLUSTER_NAME');
const SUB_DOMAIN = Cypress.env('SUB_DOMAIN');
const RANDOM_TWO_CHARACTERS = Cypress.env('RANDOM_TWO_CHARACTERS');
const GITOPS_TEMPLATE_BRANCH = Cypress.env('GITOPS_TEMPLATE_BRANCH');
const AWS_ACCESS_KEY_ID = Cypress.env('AWS_ACCESS_KEY_ID');
const AWS_SECRET_KEY = Cypress.env('AWS_SECRET_KEY');
const AWS_SESSION_TOKEN = Cypress.env('AWS_SESSION_TOKEN');
const AWS_CLOUD_REGION = Cypress.env('AWS_CLOUD_REGION');
const IMAGE_REPO = Cypress.env('IMAGE_REPO');
const GOOGLE_PROJECT_ID = Cypress.env('GOOGLE_PROJECT_ID');
const GOOGLE_KEY_FILE = Cypress.env('GOOGLE_KEY_FILE');
const DIGI_OCEAN_AUTH_TOKEN = Cypress.env('DIGI_OCEAN_AUTH_TOKEN');
const DIGI_OCEAN_SPACES_KEY = Cypress.env('DIGI_OCEAN_SPACES_KEY');
const DIGI_OCEAN_SPACES_SECRET = Cypress.env('DIGI_OCEAN_SPACES_SECRET');
const VULTR_TOKEN = Cypress.env('VULTR_TOKEN');
const AWS_DOMAIN_NAME = Cypress.env('AWS_DOMAIN_NAME');
const CIVO_DOMAIN_NAME = Cypress.env('CIVO_DOMAIN_NAME');
const CLOUDFLARE_DOMAIN_NAME = Cypress.env('CLOUDFLARE_DOMAIN_NAME');
const DIGITAL_OCEAN_DOMAIN_NAME = Cypress.env('DIGITAL_OCEAN_DOMAIN_NAME');
const VULTR_DOMAIN_NAME = Cypress.env('VULTR_DOMAIN_NAME');
const GOOGLE_DOMAIN_NAME = Cypress.env('GOOGLE_DOMAIN_NAME');
const VULTR_CLOUD_REGION = Cypress.env('VULTR_CLOUD_REGION');
const DIGITAL_OCEAN_CLOUD_REGION = Cypress.env('DIGITAL_OCEAN_CLOUD_REGION');
const GOOGLE_CLOUD_REGION = Cypress.env('GOOGLE_CLOUD_REGION');
const USE_HTTPS = Cypress.env('USE_HTTPS');
const FORCE_DESTROY_TERRAFORM = Cypress.env('FORCE_DESTROY_TERRAFORM');

const GIT_PROVIDER_CONFIG: Record<
  GitProvider,
  { GIT_TOKEN: string; GIT_USER: string; GIT_OWNER: string }
> = {
  [GitProvider.GITHUB]: { GIT_TOKEN: GITHUB_TOKEN, GIT_USER: GITHUB_USER, GIT_OWNER: GITHUB_OWNER },
  [GitProvider.GITLAB]: { GIT_TOKEN: GITLAB_TOKEN, GIT_USER: GITLAB_USER, GIT_OWNER: GITLAB_OWNER },
};

const INSTALLATION_CONFIG: Record<
  InstallationType,
  { AUTH_TOKEN?: string; DOMAIN_NAME: string; CLOUD_REGION: string }
> = {
  [InstallationType.AWS]: { DOMAIN_NAME: AWS_DOMAIN_NAME, CLOUD_REGION: AWS_CLOUD_REGION },
  [InstallationType.CIVO]: {
    AUTH_TOKEN: CIVO_TOKEN,
    DOMAIN_NAME: CIVO_DOMAIN_NAME,
    CLOUD_REGION: CIVO_CLOUD_REGION,
  },
  [InstallationType.DIGITAL_OCEAN]: {
    AUTH_TOKEN: DIGI_OCEAN_AUTH_TOKEN,
    DOMAIN_NAME: DIGITAL_OCEAN_DOMAIN_NAME,
    CLOUD_REGION: DIGITAL_OCEAN_CLOUD_REGION,
  },
  [InstallationType.GOOGLE]: {
    DOMAIN_NAME: GOOGLE_DOMAIN_NAME,
    CLOUD_REGION: GOOGLE_CLOUD_REGION,
  },
  [InstallationType.VULTR]: {
    AUTH_TOKEN: VULTR_TOKEN,
    DOMAIN_NAME: VULTR_DOMAIN_NAME,
    CLOUD_REGION: VULTR_CLOUD_REGION,
  },
  // Needs to be implemented
  [InstallationType.LOCAL]: {
    AUTH_TOKEN: '',
    DOMAIN_NAME: '',
    CLOUD_REGION: '',
  },
};

describe('provision management cluster using any git provider, cloud provider, and dns provider', () => {
  beforeEach(() => {
    cy.openConsole();
  });

  const { GIT_TOKEN, GIT_USER, GIT_OWNER } = GIT_PROVIDER_CONFIG[GIT_PROVIDER];

  const { AUTH_TOKEN, DOMAIN_NAME, CLOUD_REGION } = INSTALLATION_CONFIG[CLOUD_PROVIDER];

  const DOMAIN_NAME_FINAL = DNS_PROVIDER === 'Cloudflare' ? CLOUDFLARE_DOMAIN_NAME : DOMAIN_NAME;

  it('authentication', () => {
    cy.get(`[data-test-id="${GIT_PROVIDER}-button"]`).click();
    cy.get('[data-test-id="cloud-section"]').contains('Now select your cloud adventure');
    cy.get(`[data-test-id="${CLOUD_PROVIDER}-button"]`).click();
    cy.get('[data-test-id="next-button"]').click();

    cy.get('[data-test-id="form-section"]').contains('Now, let’s get you authenticated');
    cy.get("[name='gitToken']").type(GIT_TOKEN, { log: false, delay: 0 });

    cy.get('[data-test-id="gitUser"]').contains(GIT_USER);
    cy.get("[name='gitOwner']").click();
    // grab popper element and select option that contains GITLAB_OWNER
    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(GIT_OWNER).click();
    });

    if (CLOUD_PROVIDER === InstallationType.AWS) {
      cy.get("[name='aws_auth.access_key_id']").type(AWS_ACCESS_KEY_ID, { log: false, delay: 0 });
      cy.get("[name='aws_auth.secret_access_key']").type(AWS_SECRET_KEY, { log: false, delay: 0 });
      cy.get("[name='aws_auth.session_token']").type(AWS_SESSION_TOKEN, { log: false, delay: 0 });
    }

    if (CLOUD_PROVIDER === InstallationType.GOOGLE) {
      cy.get("[name='google_auth.key_file']").type(GOOGLE_KEY_FILE, {
        log: false,
        parseSpecialCharSequences: false,
        delay: 0,
      });
      cy.get("[name='google_auth.project_id']").type(GOOGLE_PROJECT_ID, { log: false, delay: 0 });
    }

    if (
      CLOUD_PROVIDER !== InstallationType.AWS &&
      CLOUD_PROVIDER !== InstallationType.GOOGLE &&
      CLOUD_PROVIDER !== InstallationType.DIGITAL_OCEAN
    ) {
      cy.get(`[name='${CLOUD_PROVIDER}_auth.token']`).type(AUTH_TOKEN, { log: false, delay: 0 });
    }

    if (CLOUD_PROVIDER === InstallationType.DIGITAL_OCEAN) {
      cy.get("[name='do_auth.token']").type(AUTH_TOKEN, { log: false, delay: 0 });
      cy.get("[name='do_auth.spaces_key']").type(DIGI_OCEAN_SPACES_KEY, { log: false, delay: 0 });
      cy.get("[name='do_auth.spaces_secret']").type(DIGI_OCEAN_SPACES_SECRET, {
        log: false,
        delay: 0,
      });
    }

    cy.get('[data-test-id="next-button"]').click();
    cy.get("[name='alertsEmail']").type(ALERTS_EMAIL, { delay: 0 });
    cy.get("[name='cloudRegion']").click(); // click cloudRegion multiselect to open menu
    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(CLOUD_REGION).click();
    });

    cy.get("[name='dnsProvider']").click(); // click dnsProvider multiselect to open menu

    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(DNS_PROVIDER).click();
    });

    if (DNS_PROVIDER === 'Cloudflare') {
      cy.get("[name='cloudflareToken']").type(CLOUDFLARE_TOKEN, { log: false, delay: 0 });
      cy.get("[name='cloudflareOriginCaIssuerKey']").type(CLOUDFLARE_ORIGIN_CA_KEY, {
        log: false,
        delay: 0,
      });
    }

    cy.get("[name='domainName']").click(); // click domainName multiselect to open menu
    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(DOMAIN_NAME_FINAL).click();
    });

    if (DNS_PROVIDER === 'Cloudflare' && SUB_DOMAIN) {
      cy.get("[name='subDomain']").type(SUB_DOMAIN, { delay: 0 });
    }

    cy.get("[name='clusterName']").type(CLUSTER_NAME + RANDOM_TWO_CHARACTERS, { delay: 0 });

    if (CLOUD_PROVIDER === InstallationType.GOOGLE && FORCE_DESTROY_TERRAFORM) {
      // default set to true. this is an controlled input wrapped by a label so it does
      // not act like a checkbox for cypress (hence no check/uncheck call)
      cy.get('[data-test-id="forceDestroyTerraform"]').type('false');
    }

    cy.get("[name='advancedOptions']").click(); // click advanced options button

    if (GITOPS_TEMPLATE_BRANCH) {
      cy.get("[name='gitopsTemplateBranch']").type(GITOPS_TEMPLATE_BRANCH, { delay: 0 });
    }

    if (CLOUD_PROVIDER === InstallationType.AWS) {
      cy.get("[name='imageRepository']").check(IMAGE_REPO);
    }

    if (USE_HTTPS) {
      cy.get("[name='useHttps']").check();
    }

    cy.get('[data-test-id="next-button"]').click(); // create management cluster
    // proceed to cluster provision completion page

    cy.wait(2000); // give some time to make sure disabled prop is applied to next button

    // recursive function to check for enabled next button when provisioning management cluster
    function waitForEnabledButton() {
      cy.get('[data-test-id="next-button"]').then((element) => {
        if (!element.prop('disabled')) {
          cy.wrap(element).click();
        } else {
          cy.wait(10000);
          waitForEnabledButton();
        }
      });
    }

    waitForEnabledButton();

    cy.get('[data-test-id="launch-console"]').click();
  });
});
