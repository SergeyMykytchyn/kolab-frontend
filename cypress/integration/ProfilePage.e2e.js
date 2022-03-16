describe("Profile Page E2E", () => {

  it("should update user data", () => {
    cy.intercept("GET", "**/User/user-info").as("getUser");
    cy.visit("/sign-in");
    cy.get("#email").type("elonmusk@gmail.com");
    cy.get("#password").type("123");
    cy.get(".submitButton").click();
    cy.wait("@getUser");

    cy.intercept("GET", "**/User/user-info").as("getUser1");
    cy.visit("/profile");
    cy.wait("@getUser1");
    cy.get("#firstName").type("{selectall}{backspace}Elon edit").should("have.value", "Elon edit");
    cy.get("#lastName").type("{selectall}{backspace}Musk edit").should("have.value", "Musk edit");
    cy.intercept("PUT", "**/User/update").as("userUpdate");
    cy.get(".submitButton").click();
    cy.wait("@userUpdate");
    cy.contains("Ok").click();

    cy.intercept("GET", "**/Group/?userId=1").as("getGroups");
    cy.visit("/groups");
    cy.wait("@getGroups");
    cy.contains("Elon edit").should("exist");
    cy.contains("Musk edit").should("exist");

    cy.intercept("GET", "**/User/user-info").as("getUser2");
    cy.visit("/profile");
    cy.wait("@getUser2");
    cy.get("#firstName").type("{selectall}{backspace}Elon").should("have.value", "Elon");
    cy.get("#lastName").type("{selectall}{backspace}Musk").should("have.value", "Musk");
    cy.intercept("PUT", "**/User/update").as("userUpdate");
    cy.get(".submitButton").click();
    cy.wait("@userUpdate");
    cy.contains("Ok").click();

    cy.intercept("GET", "**/Group/?userId=1").as("getGroups");
    cy.visit("/groups");
    cy.wait("@getGroups");
    cy.contains("Elon").should("exist");
    cy.contains("Musk").should("exist");
  });

});