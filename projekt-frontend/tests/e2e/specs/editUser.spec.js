describe("EditUser.vue", () => {
  // beforeEach(() => {
  //   cy.visit("/profile");
  // });
  it("updates the user", () => {
    cy.visit("/profile");

    cy.get("[data-cy=login-email]")
      .type("johndoe@example.com")
      .should("have.value", "johndoe@example.com");
    cy.get("[data-cy=login-password]")
      .type("password")
      .should("have.value", "password");

    cy.get("[data-cy=login-form]").submit();
    cy.url().should("contain", "/profile");

    cy.get("[data-cy=edit-user]").click();
    cy.url().should("contain", "/edit_user");

    cy.get("[data-cy=edit-user-name]")
      .type("a")
      .should("have.value", "John Doea");
    cy.get("[data-cy=login-email]")
      .should("have.value", "johndoe@example.com");
    cy.get("[data-cy=login-password]")
      .type("password")
      .should("have.value", "password");

    cy.get("[data-cy=edit-user-form]").submit();
    cy.url().should("contain", "/profile");
  });
});
