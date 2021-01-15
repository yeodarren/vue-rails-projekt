// https://docs.cypress.io/api/introduction/api.html

describe("Login.vue", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("logs user in", () => {
    cy.get("[data-cy=login-email]")
      .type("johndoe@example.com")
      .should("have.value", "johndoe@example.com");
    cy.get("[data-cy=login-password]")
      .type("password")
      .should("have.value", "password");

    cy.get("[data-cy=login-form]").submit();
    cy.url().should("contain", "/profile");
  });
});
