describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/provision');
    cy.get('[data-test-id="gitlab-button"]');
    cy.get('[data-test-id="civo-button"] > .cloudProviderCard-styled__DetailsContainer-*');
  });
});
