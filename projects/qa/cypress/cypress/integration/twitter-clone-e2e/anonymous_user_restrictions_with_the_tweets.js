/// <reference types="Cypress" />

describe("Feature: Anonymous user restrictions with the tweets", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
          Import the data in "twitter clone test data/6- 6- ANONYMOUS USER RESTRICTIONS WITH THE TWEETS" in mongoDb
          The data contains: the user John (username: john; email: john@gmail.com; password: Clonejohn23)
          The data contains also the tweet made by John: "Hello everyone"
      */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\anonymous_users_restrictions_with_the_tweets\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\anonymous_users_restrictions_with_the_tweets\\twitter-clone-db.profiles.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat tweets .\\cypress\\fixtures\\twitter-clone-e2e\\anonymous_users_restrictions_with_the_tweets\\twitter-clone-db.tweets.json"
    );

    // Prereq.: Open Twitter-Clone as an anonymous user
    cy.visit(Cypress.env("twitterCloneBaseUrl"));
  });

  it("My SecondTest case", function () {});
});
