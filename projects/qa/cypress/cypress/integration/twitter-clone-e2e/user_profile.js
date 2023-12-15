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

  it("1- Nominal case: The user enters a profile", () => {
    // 1.1: The user  clicks on "All profiles" button in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // 1.2: The user  clicks on John's profile (John @john)
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john")
      .click();

    /*
    Expected result:
    John's profile is displayed

    We see in John's profile:
    Name: John
    @+ Username: @john
    Joined December 2023
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .next()
      .should("have.text", "John");
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");

    // 1.3: The user  clicks on "All profiles" button in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // 1.4: The user  clicks on Rony's profile (Rony @rony)
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(2)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@rony")
      .click();

    /*
    Expected result: 
    Rony's profile is displayed

    We see in Rony's profile:
    Name: Rony
    @+ Username: @rony
    Joined December 2023
    */
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .next()
      .should("have.text", "Rony");
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@rony");
  });
});
