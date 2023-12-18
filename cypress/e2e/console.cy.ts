describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/provision');
    cy.get('[data-test-id="gitlab-button"]');
    cy.get('[data-test-id="civo-button"] > .cloudProviderCard-styled__DetailsContainer-*');
  });
});

// workaround for typescript throwing --isolateModules error
// more info => https://github.com/vercel/next.js/commit/5bd155e22032185c1b3f821793db7292d1ff68cd
export {};
