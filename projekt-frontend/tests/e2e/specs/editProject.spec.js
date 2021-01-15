describe("editProject.vue", () => {
  // beforeEach(() => {
  //   cy.visit("/profile");
  // });
  it("updates the project", () => {
    cy.visit("/profile");

    cy.get("[data-cy=login-email]")
      .type("johndoe@example.com")
      .should("have.value", "johndoe@example.com");
    cy.get("[data-cy=login-password]")
      .type("password")
      .should("have.value", "password");

    cy.get("[data-cy=login-form]").submit();
    cy.url().should("contain", "/profile");

    cy.get('[data-cy=project]').first().click()
    cy.url().should("contain", "/project/2");
    
    cy.get('[data-cy=edit-project]').click()
    cy.url().should("contain", "/project/2/edit");

    cy.get("[data-cy=project-title]")
      .type("!")

    cy.get("[data-cy=project-description]")
      .type("Lorem ipsum")

    cy.get('[data-cy=image]').attachFile('logo.png')
    cy.get('[data-cy=upload-button').click()

    cy.get("[data-cy=edit-project-form]").submit();
    cy.url().should("contain", "/profile");
  });
});
