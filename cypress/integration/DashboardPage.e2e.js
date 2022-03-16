describe("Dashboard Page E2E", () => {

  it("should create update and delete the project", () => {
    cy.intercept("GET", "**/User/user-info").as("getUser");
    cy.intercept("GET", "**/Group/?userId=1").as("getGroups");
    cy.visit("/sign-in");
    cy.get("#email").type("elonmusk@gmail.com");
    cy.get("#password").type("123");
    cy.get(".submitButton").click();
    cy.wait("@getUser");
    cy.wait("@getGroups");

    cy.get(".add").click();
    cy.contains("Create a project").click();
    cy.get("#name").type("{selectall}{backspace}Cypress test").should("have.value", "Cypress test");
    cy.get("#description").type("{selectall}{backspace}Cypress test description").should("have.value", "Cypress test description");
    cy.intercept("POST", "**/Group").as("createGroup");
    cy.contains("Save").click();
    cy.wait("@createGroup");
    cy.contains("Cypress test").should("exist");
    cy.contains("Cypress test description").should("exist");

    cy.get(".group-card-link:last-child .moreVert").click();
    cy.contains("Edit").click();
    cy.get("#name").type("{selectall}{backspace}Cypress test edit").should("have.value", "Cypress test edit");
    cy.get("#description").type("{selectall}{backspace}Cypress test description edit").should("have.value", "Cypress test description edit");
    cy.intercept("PUT", "**/Group").as("updateGroup");
    cy.contains("Save").click();
    cy.wait("@updateGroup");

    cy.get(".group-card-link:last-child .moreVert").click();
    cy.intercept("DELETE", "**/Group/*").as("deleteGroup");
    cy.contains("Delete").click();
    cy.wait("@deleteGroup");

    cy.contains("Cypress test edit").should("not.exist");
    cy.contains("Cypress test description edit").should("not.exist");
  });

});
