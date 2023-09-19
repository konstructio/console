const WORKLOAD_ENVIRONMENT = Cypress.env('WORKLOAD_ENVIRONMENT');
const WORKLOAD_CLUSTER_NAME = Cypress.env('WORKLOAD_CLUSTER_NAME');

describe('add a workload cluster', () => {
  beforeEach(() => {
    cy.openConsole();
  });

  it('creates a workload cluster', () => {
    cy.get('[data-test-id="add-workload-cluster"]').click();

    cy.get("[name='environment']").check(WORKLOAD_ENVIRONMENT);

    cy.get("[name='clusterName']").type(WORKLOAD_CLUSTER_NAME);

    cy.get('[data-test-id="workload-cluster-create-details"]').click();

    // recursive function to check for creation date when provisioning workload cluster
    function waitForCreationDate() {
      cy.get('[data-test-id="creation-date"]').then((element) => {
        if (element.text() == '') {
          cy.wait(10000);
          waitForCreationDate();
        }
      });
    }

    waitForCreationDate();
  });
});
