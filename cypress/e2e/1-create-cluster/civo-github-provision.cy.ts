const GITHUB_TOKEN = Cypress.env('GITHUB_TOKEN');
const GITHUB_USER = Cypress.env('GITHUB_USER');
const GITHUB_OWNER = Cypress.env('GITHUB_OWNER');
const CIVO_TOKEN = Cypress.env('CIVO_TOKEN');
const CIVO_CLOUD_REGION = Cypress.env('CIVO_CLOUD_REGION');
const DNS_PROVIDER = Cypress.env('DNS_PROVIDER');
const DOMAIN_NAME = Cypress.env('DOMAIN_NAME');
const ALERTS_EMAIL = Cypress.env('ALERTS_EMAIL');
const CLOUDFLARE_TOKEN = Cypress.env('CLOUDFLARE_TOKEN');
const CLOUDFLARE_ORIGIN_CA_KEY = Cypress.env('CLOUDFLARE_ORIGIN_CA_KEY');
const CLUSTER_NAME = Cypress.env('CLUSTER_NAME');
const SUB_DOMAIN = Cypress.env('SUB_DOMAIN');
const RANDOM_TWO_CHARACTERS = Cypress.env('RANDOM_TWO_CHARACTERS');
const GITOPS_TEMPLATE_BRANCH = Cypress.env('GITOPS_TEMPLATE_BRANCH');

describe('create civo github management cluster', () => {
  beforeEach(() => {
    cy.openConsole();
  });

  it('authentication', () => {
    cy.get('[data-test-id="github-button"]').click();
    cy.get('[data-test-id="cloud-section"]').contains('Now select your cloud adventure');
    cy.get('[data-test-id="civo-button"]').click();
    cy.get('[data-test-id="next-button"]').click();

    cy.get('[data-test-id="form-section"]').contains('Now, let’s get you authenticated');
    cy.get("[name='gitToken']").type(GITHUB_TOKEN, { log: false });

    cy.get('[data-test-id="gitUser"]').contains(GITHUB_USER);
    cy.get("[name='gitOwner']").click();
    // grab popper element and select option that contains GITLAB_OWNER
    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(GITHUB_OWNER).click();
    });

    cy.get("[name='civo_auth.token']").type(CIVO_TOKEN, { log: false });

    cy.get('[data-test-id="next-button"]').click();
    cy.get("[name='alertsEmail']").type(ALERTS_EMAIL);
    cy.get("[name='cloudRegion']").click(); // click cloudRegion multiselect to open menu
    cy.get('.MuiAutocomplete-popper').then((popper) => {
      cy.wrap(popper).contains(CIVO_CLOUD_REGION).click();
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
