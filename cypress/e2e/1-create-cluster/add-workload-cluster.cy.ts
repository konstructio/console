describe('add a workload cluster', () => {
  beforeEach(() => {
    cy.openConsole();
  });

  it('authentication', () => {
      
    cy.get('[data-test-id="add-workload-cluster"]').click();
    
    cy.get('.Mui-checked > .PrivateSwitchBase-input').click();
    cy.get('.Mui-focused > .MuiInputBase-input').click();
    cy.get('.sc-8ad53ea0-0:nth-child(2) .MuiInputBase-input').type('development');
    cy.get('.Mui-focused > .MuiInputBase-input').click();
    cy.get('.sc-8ad53ea0-0:nth-child(3) .MuiInputBase-input').type('development');
    cy.get('#\3Ar1\3A').click();
    cy.get('.Mui-disabled').click();
    cy.get('.sc-1d58281b-2').submit();

    
  });
});
