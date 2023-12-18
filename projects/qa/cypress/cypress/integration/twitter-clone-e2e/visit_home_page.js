/// <reference types="Cypress" />

describe("Feature: Visit home page", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
          Import the data in "twitter clone test data/4- VISIT HOME PAGE" in mongoDb
            The data contains the user John (Username: john; email: john@gmail.com; password: Clonejohn23)
      */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\visit_home_page\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\visit_home_page\\twitter-clone-db.profiles.json"
    );

    // Prereq.: Open Twitter-Clone as an anonymous user
    cy.visit(Cypress.env("twitterCloneBaseUrl"));

    // Prereq.: The user sign in as John
    cy.SignInTwitterClone("john", "Clonejohn23");
  });

  it("1- Nominal case: Tweets are sorted from newest (top) to oldest (bottom) ", () => {
    // 1.1: The user creates the first tweet: "Hello everyone, tomorrow we have work to do. We talked about the tasks yesterday"
    cy.contains("button", "Tweet").click();
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .type(
        "Hello everyone, tomorrow we have work to do. We talked about the tasks yesterday"
      );
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .click();

    // 1.2: The user creates the second tweet: "Rony, you have to accomplish task 1"
    cy.contains("button", "Tweet").click();
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .type("Rony, you have to accomplish task 1");
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .click();

    // 1.3: The user creates the third tweet: "Paul, you have to accomplish task 2"
    cy.contains("button", "Tweet").click();
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .type("Paul, you have to accomplish task 2");
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .click();

    // 1.4: The user creates the fourth tweet: "Julia, you have to accomplish task 3"
    cy.contains("button", "Tweet").click();
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .type("Julia, you have to accomplish task 3");
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .click();

    // 1.5: The user creates the fifth tweet: "Carla, you have to accomplish task 4"
    cy.contains("button", "Tweet").click();
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .type("Carla, you have to accomplish task 4");
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .click();

    /*
    Expected result:
    All tweets appears in the "Home" page from newest (top) to oldest (bottom) 

    The order are from top to bottom:
        - Carla, you have to accomplish task 4
        - Julia, you have to accomplish task 3
        - Paul, you have to accomplish task 2
        - Rony, you have to accomplish task 1
        - Hello everyone, tomorrow we have work to do. We talked about the tasks yesterday
    */
    cy.get('div[class*="Homepage"]')
      .find("ul")
      .should("have.length", 1)
      .find("li")
      .should("have.length", 5);

    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(1)")
      .find("p")
      .should("have.text", "Carla, you have to accomplish task 4");

    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(2)")
      .find("p")
      .should("have.text", "Julia, you have to accomplish task 3");

    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(3)")
      .find("p")
      .should("have.text", "Paul, you have to accomplish task 2");

    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(4)")
      .find("p")
      .should("have.text", "Rony, you have to accomplish task 1");

    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(5)")
      .find("p")
      .should(
        "have.text",
        "Hello everyone, tomorrow we have work to do. We talked about the tasks yesterday"
      );

    // 1.6: The user go to his profile
    cy.get('button[data-cy="auth-nav-dropdown-button"]').click();
    cy.get("a#option-0--menu--1").click();

    /*
    All tweets appears in the tweet section of the user's profile from newest (top) to oldest (bottom) 


    The order are from top to bottom:
        - Carla, you have to accomplish task 4
        - Julia, you have to accomplish task 3
        - Paul, you have to accomplish task 2
        - Rony, you have to accomplish task 1
        - Hello everyone, tomorrow we have work to do. We talked about the tasks yesterday
    */
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul")
      .should("have.length", 1)
      .find("li")
      .should("have.length", 5);

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(1)")
      .find("p")
      .should("have.text", "Carla, you have to accomplish task 4");

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(2)")
      .find("p")
      .should("have.text", "Julia, you have to accomplish task 3");

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(3)")
      .find("p")
      .should("have.text", "Paul, you have to accomplish task 2");

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(4)")
      .find("p")
      .should("have.text", "Rony, you have to accomplish task 1");

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(5)")
      .find("p")
      .should(
        "have.text",
        "Hello everyone, tomorrow we have work to do. We talked about the tasks yesterday"
      );
  });
});
