describe("Team.vue", () => {
  // beforeEach(() => {
  //   cy.visit("/profile");
  // });
  it("routes to team page", () => {
    cy.visit("/profile");

    cy.get("[data-cy=login-email]")
      .type("johndoe@example.com")
      .should("have.value", "johndoe@example.com");
    cy.get("[data-cy=login-password]")
      .type("password")
      .should("have.value", "password");

    cy.get("[data-cy=login-form]").submit();
    cy.url().should("contain", "/profile");

    cy.get('[data-cy=team]').first().click()
    cy.url().should("contain", "/team/1");

    cy.get('[data-cy=edit-button]').click()
    cy.url().should("contain", "/team/1");

    cy.get("[data-cy=team-name]")
      .type("team 1")
      .should("have.value", "team 1");

    cy.get("[data-cy=delete-button]").first().click()

    cy.get("[data-cy=user-select]").select(["Jane Doe (janedoe@example.com)", "test (test@example.com)"]);

    cy.get("[data-cy=edit-team-form]").submit();
    cy.url().should("contain", "/profile");
  });
});
