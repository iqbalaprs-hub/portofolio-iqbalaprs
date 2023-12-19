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

  it("1- Nominal case: The anonymous user cannot delete the tweet in the Home page", () => {
    // 1.1: Expected result: In the "Home" page, The "X" button which deletes the tweet "Hello everyone", is not present on the tweet
    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(1)")
      .find('button[class*="DeleteButton"]')
      .should("not.exist");
  });

  it("2- Nominal case: The anonymous user cannot delete the tweet in the tweet section of the user's profile", () => {
    // 2.1: The anonymous user clicks on the "All profiles" button
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // 2.2: The anonymous user clicks on the profile link related to John
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john")
      .click();

    // Expected result: In the John's profile, The "X" button which deletes the tweet "Hello everyone", is not present on the tweet
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(1)")
      .find('button[class*="DeleteButton"]')
      .should("not.exist");
  });

  it("3- Nominal case: The anonymous user cannot reply to a tweet in the Home page", () => {
    // 3.1: The anonymous user clicks on the tweet
    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(1)")
      .find('div[class*="TweetBottomGroup"]')
      .find("button:nth-child(1)")
      .click();

    // 3.2: The anonymous user clicks on the text box, type "Hello" and click Enter
    cy.get('form[class*="CommentForm"]')
      .find('input[class*="CommentInput"]')
      .type("Hello")
      .type("{enter}");

    // Expected result: The anonymous user is automatically sent to the "Sign In" page
    cy.get("ul").contains("a", "Sign In").should("have.class", "active");
  });

  it("4- Nominal case: The anonymous user cannot like a tweet in the Home page", () => {
    // 4.1: The anonymous user clicks on the like button of the tweet
    cy.get('div[class*="Homepage"]')
      .find("ul li:nth-child(1)")
      .find('div[class*="TweetBottomGroup"]')
      .find("button:nth-child(2)")
      .click();

    // Expected result: The anonymous user is automatically sent to the "Sign In" page
    cy.get("ul").contains("a", "Sign In").should("have.class", "active");

    // 4.2: The anonymous user returns to "Home" page
    cy.get("ul").contains("a", "Home").click();

    /*
    Expected result:
    The tweet "Hello everyone" has not been liked
    The number next to the like button is zero
    The heart is transparent
    */
    cy.get('div[class*="Homepage"]')
      .find('div[class*="TweetBottomGroup"]')
      .find("button:nth-child(2)")
      .should("have.text", " 0");

    cy.get('div[class*="Homepage"]')
      .find('div[class*="TweetBottomGroup"]')
      .find('span[class*="LikeIcon"]')
      .should("have.css", "color", "rgb(122, 122, 122)");
  });

  it("5- Nominal case: The anonymous user cannot reply to a tweet in the tweet section of the user's profile", () => {
    // 5.1: The anonymous user clicks on the "All profiles" button
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // 5.2: The anonymous user clicks on the profile link related to John
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john")
      .click();

    // 5.3: The anonymous user clicks on the tweet
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(1)")
      .click();

    // 5.4: The anonymous user clicks on the text box, type "Hello" and click Enter
    cy.get('div[class*="CommentContainer"]')
      .find('input[class*="CommentInput"]')
      .type("Hello")
      .type("{enter}");

    // Expected result: The anonymous user is automatically sent to the "Sign In" page
    cy.get("ul").contains("a", "Sign In").should("have.class", "active");
  });

  it("6- Nominal case: The anonymous user cannot like a tweet in the tweet section of the user's profile", () => {
    // 6.1: The anonymous user clicks on the "All profiles" button
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    // 6.2: The anonymous user clicks on the profile link related to John
    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john")
      .click();

    // 6.3: The anonymous user clicks on the like button of the tweet
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul li:nth-child(1)")
      .find("button:nth-child(2)")
      .click();

    // Expected result: The anonymous user is automatically sent to the "Sign In" page
    cy.get("ul").contains("a", "Sign In").should("have.class", "active");
  });

  it("7- Nominal case: The anonymous user cannot tweet", () => {
    // 7.1: Expected result: The tweet button is not present in the navigation bar
    cy.contains("button", "Tweet").should("not.exist");

    // 7.2: The user John signs in
    cy.signInTwitterClone("john", "Clonejohn23");

    // Expected result: The tweet button is visible in the navigation bar
    cy.contains("button", "Tweet").should("exist");
  });
});
