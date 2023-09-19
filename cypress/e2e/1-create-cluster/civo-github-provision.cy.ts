const GITHUB_TOKEN = Cypress.env('GITHUB_TOKEN');
const GITHUB_USER = Cypress.env('GITHUB_USER');
const GIT_OWNER = Cypress.env('GIT_OWNER');
const CIVO_TOKEN = Cypress.env('CIVO_TOKEN');
const ALERTS_EMAIL = Cypress.env('ALERTS_EMAIL');
const CLOUDFLARE_TOKEN = Cypress.env('CLOUDFLARE_TOKEN');
const CLOUDFLARE_ORIGIN_CA_KEY = Cypress.env('CLOUDFLARE_ORIGIN_CA_KEY');

describe('create cluster - setup', () => {
  beforeEach(() => {
    cy.openConsole();
  });

  it('authentication', () => {
    cy.get('[data-test-id="github-button"]').click();
    cy.get('[data-test-id="cloud-section"]').contains('Now select your cloud adventure');
    cy.get('[data-test-id="civo-button"]').click();
    cy.get('[data-test-id="next-button"]').click();

    cy.get('[data-test-id="form-section"]').contains('Now, let’s get you authenticated');
    cy.get("[name='gitToken']").type(GITHUB_TOKEN);

    cy.get('[data-test-id="gitUser"]').contains(GITHUB_USER);
    cy.get("[name='gitOwner']").click();
    cy.get('.MuiAutocomplete-popper li[data-option-index="3"]').click();

    cy.get("[name='civo_auth.token']").type(CIVO_TOKEN);

    cy.get('[data-test-id="next-button"]').click();
    cy.get("[name='alertsEmail']").type(ALERTS_EMAIL);
    cy.get("[name='cloudRegion']").click(); // click cloudRegion multiselect to open menu
    cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click(); // select LON1

    cy.get("[name='dnsProvider']").click(); // click dnsProvider multiselect to open menu
    cy.get('.MuiAutocomplete-popper li[data-option-index="1"]').click(); // select Cloudflare

    cy.get("[name='cloudflareToken']").type(CLOUDFLARE_TOKEN);
    // cy.get("[name='cloudflareOriginCaIssuerKey']").type(CLOUDFLARE_ORIGIN_CA_KEY);

    cy.get("[name='domainName']").click(); // click domainName multiselect to open menu
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click(); // select kubesecond.com

    cy.get("[name='clusterName']").type('dh-cypress-1');
    // cy.get("[name='advancedOptions']").click(); // click advanced options button

    // cy.get("[name='gitopsTemplateBranch']").type('civo-gitlab-workload-clusters');
    cy.get('[data-test-id="next-button"]').click(); // create management cluster
    // // proceed to cluster provision completion page

    cy.wait(2000); // give some time to make sure disabled prop is applied to next button

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
