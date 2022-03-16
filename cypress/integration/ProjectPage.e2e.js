describe("Project Page E2E", () => {

  it("should create a new task add a message and delete it", () => {
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
    cy.get("#name").type("{selectall}{backspace}Cypress test task").should("have.value", "Cypress test task");
    cy.get("#description").type("{selectall}{backspace}Cypress test task description").should("have.value", "Cypress test task description");
    cy.intercept("POST", "**/Group").as("createGroup");
    cy.contains("Save").click();
    cy.wait("@createGroup");
    cy.contains("Cypress test task").should("exist");
    cy.contains("Cypress test task description").should("exist");

    cy.get(".group-card-link:last-child").click();
    cy.get("#panel1a-header").click();
    cy.get("#title").type("Task title").should("have.value", "Task title");
    cy.get("#description").type("Task description").should("have.value", "Task description");
    cy.intercept("POST", "**/Post").as("createPost");
    cy.get(".add-new-task-button").click();
    cy.wait("@createPost");

    cy.get("#post-panel1a-header:first-child").click();
    cy.get("#messageBody").type("Message body").should("have.value", "Message body");
    cy.intercept("POST", "**/Form").as("createForm");
    cy.get(".post-send-button").click();
    cy.wait("@createForm");

    cy.visit("/groups");
    cy.get(".group-card-link:last-child .moreVert").click();
    cy.intercept("DELETE", "**/Group/*").as("deleteGroup");
    cy.contains("Delete").click();
    cy.wait("@deleteGroup");

    cy.contains("Cypress test task").should("not.exist");
    cy.contains("Cypress test task description").should("not.exist");
  });

});