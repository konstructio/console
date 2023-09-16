const GIT_TOKEN = Cypress.env('GIT_TOKEN');
const GIT_OWNER = Cypress.env('GIT_OWNER');
const CIVO_TOKEN = Cypress.env('CIVO_TOKEN');

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
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();

    cy.get("[name='civo_auth.token']").type(CIVO_TOKEN);

    cy.get('[data-test-id="next-button"]').click();
  });
});
