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
    cy.get('form[data-cy="signin-form"]')
      .find('button[data-cy="signin-button"]')
      .click();
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

  it("2- Nominal case: The user can enter the Edit profile form, only from his own profile (Only a user can modify his own profile)", () => {
    // 2.1: The user  clicks on "All profiles" button in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // 2.2: The user  clicks on John's profile (John @john)
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john")
      .click();

    // 2.3: The user clicks on the "Edit profile" button
    cy.get('a[class*="EditProfileButton"]')
      .should("have.text", "Edit Profile")
      .click();

    // Expected result: The user in the "Edit profile" form
    cy.url().should("include", "/edit-profile");

    // 2.4: The user  clicks on "All profiles" button in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // 2.5: The user  clicks on Rony's profile (Rony @rony)
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(2)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@rony")
      .click();

    // Expected result: The user enters Rony's profile but "Edit profile" button is not present
    cy.get('a[class*="EditProfileButton"]').should("not.exist");

    cy.get('button[class*="FollowProfileButton"]')
      .should("have.text", "Follow")
      .should("exist");
  });

  it.only("3- Nominal case: The user can see the tweets in the tweet section of the user's profile", () => {
    // 3.1: The user  clicks on "All profiles" button in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // 3.2: The user  clicks on John's profile (John @john)
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john")
      .click();

    /*
        The user sees 5 tweets in the tweet section

        The tweets are sorted from newest (Top) to oldest (Bottom)
    */
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul")
      .should("have.length", 1)
      .find("li")
      .should("have.length", 5);

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(1)")
      .find("p")
      .should("have.text", "We finish work early today at noon");

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(2)")
      .find("p")
      .should("have.text", "Meet me all at the office");

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(3)")
      .find("p")
      .should("have.text", "I am going to work now");

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(4)")
      .find("p")
      .should("have.text", "I hope you are all doing well");

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(5)")
      .find("p")
      .should("have.text", "Good morning everyone");

    // 3.3: The user  clicks on "All profiles" button in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // 3.4: The user  clicks on Rony's profile (Rony @rony)
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(2)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@rony")
      .click();

    /*
    Expected result:
        The tweet section is empty since Rony didn't tweet
        There is a sentence: There are no tweets to display
    */
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul")
      .find("li")
      .should("not.exist");

    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul p")
      .should("have.text", "There are no tweets to display");
  });
});
