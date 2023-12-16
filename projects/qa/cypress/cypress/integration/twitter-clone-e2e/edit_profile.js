/// <reference types="Cypress" />

describe("Feature: Edit profile", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
        Import the data in "twitter clone test data/9- EDIT PROFILE" in mongoDb
        The data contains:
            (1) User John (username: john; email: john@gmail.com; password: Clonejohn23)
            (2) User Johnny (username: johnny; email: johnny@gmail.com; password: Clonejohnny23)
      */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\edit_profile\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\edit_profile\\twitter-clone-db.profiles.json"
    );

    // Prereq.: Open Twitter-Clone and sign in as John
    cy.visit(Cypress.env("twitterCloneBaseUrl"));
    cy.get('a[data-cy="nav-signin-link"]').click();
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-username-input"]')
      .type("john");
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-password-input"]')
      .type("Clonejohn23");
    cy.get('form[data-cy="signin-form"]')
      .find('button[data-cy="signin-button"]')
      .click();
  });

  it("My SecondTest case", function () {});
});
