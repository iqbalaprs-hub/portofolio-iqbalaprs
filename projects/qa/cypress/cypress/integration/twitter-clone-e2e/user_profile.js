/// <reference types="Cypress" />

describe("Feature: User's profile", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
           Import the data in "twitter clone test data/8- USER'S PROFILE" in mongoDb
            The data contains:
                (1) User John (username: john; email: john@gmail.com; password: Clonejohn23)
                (2) User Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
                (3) User Paul (username: paul; email: paul@gmail.com; password: Clonepaul23)

            The data contains 5 tweets made by John:
                1- Good morning everyone
                2- I hope you are all doing well
                3- I am going to work now
                4- Meet me all at the office
                5- We finish work early today at noon
        */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\users_profile\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\users_profile\\twitter-clone-db.profiles.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat tweets .\\cypress\\fixtures\\twitter-clone-e2e\\users_profile\\twitter-clone-db.tweets.json"
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
  });

  it("My SecondTest case", function () {});
});
