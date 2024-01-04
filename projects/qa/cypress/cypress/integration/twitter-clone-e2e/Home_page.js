/// <reference types="Cypress" />

describe("Feature: Home page", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
          Import the data in "twitter clone test data/4- VISIT HOME PAGE" in mongoDb
          The data contains the user John (Username: john; email: john@gmail.com; password: Clonejohn23)

          There are 30 tweets done by John:
              Task1 was accomplished
              Task2 was accomplished
              Task3 was accomplished
              Task4 was accomplished
              Task5 was accomplished
              Task6 was accomplished
              Task7 was accomplished
              Task8 was accomplished
              Task9 was accomplished
              Task10 was accomplished
              Task11 was accomplished
              Task12 was accomplished
              Task13 was accomplished
              Task14 was accomplished
              Task15 was accomplished
              Task16 was accomplished
              Task17 was accomplished
              Task18 was accomplished
              Task19 was accomplished
              Task20 was accomplished
              Task21 was accomplished
              Task22 was accomplished
              Task23 was accomplished
              Task24 was accomplished
              Task25 was accomplished
              Task26 was accomplished
              Task27 was accomplished
              Task28 was accomplished
              Task29 was accomplished
              Task30 was accomplished
      */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-e2e\\home_page\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-e2e\\home_page\\twitter-clone-db.profiles.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db tweets .\\cypress\\fixtures\\twitter-clone-e2e\\home_page\\twitter-clone-db.tweets.json"
    );

    // Prereq.: Open Twitter-Clone as an anonymous user
    cy.visit(Cypress.env("twitterCloneBaseUrl"));

    // Prereq.: The user sign in as John
    cy.signInTwitterClone("john", "Clonejohn23");
  });

  it("1- Nominal case: The user can see all 30 tweets, which are ordered from newest (Top) to oldest (bottom) ", () => {
    // 1.1: The user is already in the "Home" page

    cy.wait(2000);
    cy.get('div[class*="TweetsBoard"]')
      .find("button")
      .should("have.text", "Load More")
      .click();

    cy.scrollTo("bottom");

    cy.wait(2000);
    for (let i = 1; i <= 30; i++) {
      cy.get('div[class*="Homepage"]')
        .find(`ul li:nth-child(${i})`)
        .should("exist");
    }

    // The user can see all the tweets ordered from newest (Top) to oldest (bottom)
    const totalTweets = 30; // Assuming you have 2 tweets

    for (let i = totalTweets; i >= 1; i--) {
      const tweetText = `Task${i} was accomplished`;

      cy.get('div[class*="Homepage"]')
        .find(`ul li:nth-child(${totalTweets - i + 1})`)
        .find("p")
        .should("have.text", tweetText);
    }

    // 1.2:The user go to his profile
    cy.get('button[data-cy="auth-nav-dropdown-button"]').click();
    cy.get("a#option-0--menu--1").click();

    cy.wait(2000);
    cy.get('div[class*="TweetsBoard___StyledDiv"]')
      .find("button")
      .should("have.text", "Load More")
      .click();

    cy.scrollTo("bottom");

    cy.wait(2000);
    for (let i = 1; i <= 30; i++) {
      cy.get('div[class*="ProfileTweetsBoard"]')
        .find(`ul li:nth-child(${i})`)
        .should("exist");
    }

    // The user can see all the tweets ordered from newest (Top) to oldest (bottom)
    for (let i = totalTweets; i >= 1; i--) {
      const tweetText = `Task${i} was accomplished`;

      cy.get('div[class*="ProfileTweetsBoard"]')
        .find(`ul li:nth-child(${totalTweets - i + 1})`)
        .find("p")
        .should("have.text", tweetText);
    }
  });
});
