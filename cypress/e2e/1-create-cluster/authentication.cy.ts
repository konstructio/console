const GIT_TOKEN = Cypress.env('GIT_TOKEN');
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
    cy.get('[data-test-id="gitlab-button"]').click();
    cy.get('[data-test-id="cloud-section"]').contains('Now select your cloud adventure');
    cy.get('[data-test-id="civo-button"]').click();
    cy.get('[data-test-id="next-button"]').click();

    cy.get('[data-test-id="form-section"]').contains('Now, let’s get you authenticated');
    cy.get("[name='gitToken']").type(GIT_TOKEN);

    cy.get('[data-test-id="gitUser"]').contains('Jared Edwards');
    cy.get("[name='gitOwner']").type(GIT_OWNER);
    cy.get('.MuiAutocomplete-popper li[data-option-index="1"]').click();

    cy.get("[name='civo_auth.token']").type(CIVO_TOKEN);

    cy.get('[data-test-id="next-button"]').click();
    cy.get("[name='alertsEmail']").type(ALERTS_EMAIL);
    cy.get("[name='cloudRegion']").click(); // click cloudRegion multiselect to open menu
    cy.get('.MuiAutocomplete-popper li[data-option-index="2"]').click(); // select LON1

    cy.get("[name='dnsProvider']").click(); // click dnsProvider multiselect to open menu
    cy.get('.MuiAutocomplete-popper li[data-option-index="1"]').click(); // select Cloudflare

    cy.get("[name='cloudflareToken']").type(CLOUDFLARE_TOKEN);
    cy.get("[name='cloudflareOriginCaIssuerKey']").type(CLOUDFLARE_ORIGIN_CA_KEY);

    cy.get("[name='domainName']").click(); // click domainName multiselect to open menu
    cy.get('.MuiAutocomplete-popper li[data-option-index="13"]').click(); // select kubesecond.com

    cy.get("[name='clusterName']").type('je-cy002');
    cy.get("[name='advancedOptions']").click(); // click advanced options button

    cy.get("[name='gitopsTemplateBranch']").type('civo-gitlab-workload-clusters');
    cy.get('[data-test-id="next-button"]').click(); // create management cluster
    cy.get('[data-test-id="next-button"]').click(); // create management cluster
    
    cy.get('[data-test-id="launch-console"]').click()
    
  });
});
