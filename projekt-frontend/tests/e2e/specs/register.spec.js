describe("Login.vue", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("registers new user", () => {
    cy.get("[data-cy=name]")
      .type("test")
      .should("have.value", "test");

    cy.get("[data-cy=register-email]")
      .type("test@example.com")
      .should("have.value", "test@example.com");

    cy.get("[data-cy=register-password]")
      .type("testing")
      .should("have.value", "testing");

    cy.get("[data-cy=register-form]").submit();
    cy.url().should("contain", "/profile");
  });

});
