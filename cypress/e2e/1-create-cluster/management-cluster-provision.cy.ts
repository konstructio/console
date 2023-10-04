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
// const CIVO_CLOUD_REGION = Cypress.env('CIVO_CLOUD_REGION');
const DNS_PROVIDER = Cypress.env('DNS_PROVIDER');
const DOMAIN_NAME = Cypress.env('DOMAIN_NAME');
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

describe('create github aws management cluster', () => {
  beforeEach(() => {
    cy.openConsole();
  });

  const GIT_TOKEN = GIT_PROVIDER === GitProvider.GITHUB ? GITHUB_TOKEN : GITLAB_TOKEN;
  const GIT_USER = GIT_PROVIDER === GitProvider.GITHUB ? GITHUB_USER : GITLAB_USER;
  const GIT_OWNER = GIT_PROVIDER === GitProvider.GITHUB ? GITHUB_OWNER : GITLAB_OWNER;
  const AUTH_TOKEN = CLOUD_PROVIDER === InstallationType.CIVO ? CIVO_TOKEN : VULTR_TOKEN;

  it('authentication', () => {
    cy.get(`[data-test-id="${GIT_PROVIDER}-button"]`).click();
    cy.get('[data-test-id="cloud-section"]').contains('Now select your cloud adventure');
    cy.get(`[data-test-id="${CLOUD_PROVIDER}-button"]`).click();
    cy.get('[data-test-id="next-button"]').click();

    cy.get('[data-test-id="form-section"]').contains('Now, let’s get you authenticated');
    cy.get("[name='gitToken']").type(GIT_TOKEN, { log: false });

    cy.get('[data-test-id="gitUser"]').contains(GIT_USER);
    cy.get("[name='gitOwner']").click();
    // grab popper element and select option that contains GITLAB_OWNER
    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(GIT_OWNER).click();
    });

    if (CLOUD_PROVIDER === InstallationType.AWS) {
      cy.get("[name='aws_auth.access_key_id']").type(AWS_ACCESS_KEY_ID, { log: false });
      cy.get("[name='aws_auth.secret_access_key']").type(AWS_SECRET_KEY, { log: false });
      cy.get("[name='aws_auth.session_token']").type(AWS_SESSION_TOKEN, { log: false });
    }

    if (CLOUD_PROVIDER === InstallationType.GOOGLE) {
      cy.get("[name='google_auth.key_file']").type(GOOGLE_KEY_FILE, {
        log: false,
        parseSpecialCharSequences: false,
      });
      cy.get("[name='google_auth.project_id']").type(GOOGLE_PROJECT_ID, { log: false });
    }

    if (CLOUD_PROVIDER === InstallationType.CIVO || CLOUD_PROVIDER === InstallationType.VULTR) {
      cy.get(`[name='${CLOUD_PROVIDER}_auth.token']`).type(AUTH_TOKEN, { log: false });
    }

    if (CLOUD_PROVIDER === InstallationType.DIGITAL_OCEAN) {
      cy.get("[name='do_auth.token']").type(DIGI_OCEAN_AUTH_TOKEN, { log: false });
      cy.get("[name='do_auth.spaces_key']").type(DIGI_OCEAN_SPACES_KEY, { log: false });
      cy.get("[name='do_auth.spaces_secret']").type(DIGI_OCEAN_SPACES_SECRET, { log: false });
    }

    cy.get('[data-test-id="next-button"]').click();
    cy.get("[name='alertsEmail']").type(ALERTS_EMAIL);
    cy.get("[name='cloudRegion']").click(); // click cloudRegion multiselect to open menu
    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(AWS_CLOUD_REGION).click();
    });

    cy.get("[name='dnsProvider']").click(); // click dnsProvider multiselect to open menu

    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(DNS_PROVIDER).click();
    });

    if (DNS_PROVIDER === 'Cloudflare') {
      cy.get("[name='cloudflareToken']").type(CLOUDFLARE_TOKEN, { log: false });
      cy.get("[name='cloudflareOriginCaIssuerKey']").type(CLOUDFLARE_ORIGIN_CA_KEY, { log: false });
    }

    cy.get("[name='domainName']").click(); // click domainName multiselect to open menu
    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(DOMAIN_NAME).click();
    });

    if (SUB_DOMAIN) {
      cy.get("[name='subDomain']").type(SUB_DOMAIN);
    }

    cy.get("[name='clusterName']").type(CLUSTER_NAME + RANDOM_TWO_CHARACTERS);

    cy.get("[name='advancedOptions']").click(); // click advanced options button

    if (GITOPS_TEMPLATE_BRANCH) {
      cy.get("[name='gitopsTemplateBranch']").type(GITOPS_TEMPLATE_BRANCH);
    }

    cy.get("[name='imageRepository']").check(IMAGE_REPO);

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
