describe("CreateProject.vue", () => {
  // beforeEach(() => {
  //   cy.visit("/profile");
  // });
  it("creates new project", () => {
    cy.visit("/profile");

    cy.get("[data-cy=login-email]")
      .type("johndoe@example.com")
      .should("have.value", "johndoe@example.com");
    cy.get("[data-cy=login-password]")
      .type("password")
      .should("have.value", "password");

    cy.get("[data-cy=login-form]").submit();
    cy.url().should("contain", "/profile");

    cy.get("[data-cy=create-project]").click();
    cy.url().should("contain", "/create_project");

    cy.get("[data-cy=project-title]")
      .type("title")
      .should("have.value", "title");
    cy.get("[data-cy=project-description]")
      .type("description")
      .should("have.value", "description");

    cy.get("[data-cy=image]").attachFile("logo.png");
    cy.get('[data-cy=upload-button').click()

    cy.get("[data-cy=team-select").select("Projekt Team");

    cy.get("[data-cy=create-project-form]").submit();
    cy.url().should("contain", "/profile");
  });
});
