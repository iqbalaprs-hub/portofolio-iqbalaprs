/// <reference types="Cypress" />

describe("Feature: Tweet", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
        Import the data in "twitter clone test data/3- TWEET" in mongoDb
        The data contains the users:
            1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
            2- Name: Paul (username: paul; email: paul@gmail.com; password: Clonepaul23)
            3- Name: Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
    */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\tweet\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\tweet\\twitter-clone-db.profiles.json"
    );

    // Prereq.: Open Twitter-Clone as an anonymous user
    cy.visit(Cypress.env("twitterCloneBaseUrl"));

    // Prereq.: The user sign in as John
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

  it("1- Nominal case: The user creates a tweet", () => {
    // 1.1: The user clicks on the "Tweet" button in the navigation bar
    cy.contains("button", "Tweet").click();

    // Expected result: A tweet modal appears
    cy.get('div[class*="DialogContent"]').should(
      "have.attr",
      "aria-modal",
      "true"
    );

    // Expected result: The text box has the placeholder “What’s happening?”
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .should("have.attr", "placeholder", "What's happening?");

    // Expected result: The tweet submit button is disabled since the text box is empty
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .should("be.disabled");

    // 1.2: The user types in the text box: "Hello everyone"
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .type("Hello everyone");

    // Expected result: The tweet submit button is active since the text box is no longer empty
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .should("not.be.disabled");

    // 1.3: The user clicks on the tweet submit button
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .click();

    // Expected result: The tweet appears in the "Home" page
    // The text
    cy.get('div[class*="Homepage"]')
      .find("ul")
      .should("have.length", 1)
      .find("li")
      .should("have.length", 1)
      .find("p")
      .should("have.text", "Hello everyone");

    // Name of the author
    cy.get('div[class*="Homepage"]')
      .find('div[class*="TweetUserGroup"]')
      .find('span[class*="TweetUserName"]')
      .should("have.text", "John");

    // Username of the author
    cy.get('div[class*="Homepage"]')
      .find('div[class*="TweetUserGroup"]')
      .find("span:nth-child(2)")
      .should("have.text", "@john");

    // The tweet date publication
    cy.get('div[class*="Homepage"]')
      .find('div[class*="TweetUserGroup"]')
      .find("span:nth-child(3)")
      .should("have.text", "14 December 2023");

    // Reply button
    cy.get('div[class*="Homepage"]')
      .find('div[class*="TweetBottomGroup"]')
      .find("button:nth-child(1)")
      .should("exist")
      .find("span")
      .should("have.text", "0");

    // Like button
    // cy.get('div[class*="Homepage"]')
    //   .find('div[class*="TweetBottomGroup"]')
    //   .find("button:nth-child(2)")
    //   .should("exist")
    //   .should("have.text", "0");

    // 1.4: The user clicks on his personal menu and opens "profile"
    cy.get("button#menu-button--menu").click();
    cy.get("a#option-0--menu--1").click();

    // Expected result: The user sees the tweet done in step 1.2 in the tweet section
    // The text
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find("ul")
      .should("have.length", 1)
      .find("li")
      .should("have.length", 1)
      .find("p")
      .should("have.text", "Hello everyone");

    // Name of the author
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find('div[class*="TweetUserGroup"]')
      .find('span[class*="TweetUserName"]')
      .should("have.text", "John");

    // Username of the author
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find('div[class*="TweetUserGroup"]')
      .find("span:nth-child(2)")
      .should("have.text", "@john");

    // The tweet date publication
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find('div[class*="TweetUserGroup"]')
      .find("span:nth-child(3)")
      .should("have.text", "14 December 2023");

    // Reply button
    cy.get('div[class*="ProfileTweetsBoard"]')
      .find('div[class*="TweetBottomGroup"]')
      .find("button:nth-child(1)")
      .should("exist")
      .find("span")
      .should("have.text", "0");

    // Like button
    // cy.get('div[class*="ProfileTweetsBoard"]')
    //   .find('div[class*="TweetBottomGroup"]')
    //   .find("button:nth-child(2)")
    //   .should("exist")
    //   .should("have.text", "0");
  });

  it("2- Nominal case: The user cannot write a tweet with more than 280 characters", () => {
    // 2.1: The user John tweet with 283 characters: "Hello everyone. Today is a very beautiful morning. My breakfeast consisted of eggs and bacons and pancakes with syrup and a big glass of lemonade. I looked outside the window, the nature was green and clean, the sky was blue, there was no annoying car noises anywhere. I want to stay"
    cy.contains("button", "Tweet").click();
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .type(
        "Hello everyone. Today is a very beautiful morning. My breakfeast consisted of eggs and bacons and pancakes with syrup and a big glass of lemonade. I looked outside the window, the nature was green and clean, the sky was blue, there was no annoying car noises anywhere. I want to stay"
      );

    // Expected result: The tweet button is disabled
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .should("be.disabled");

    // 2.2: The user John removes the last 2 letters in the tweet "a" and "y" and the tweet have 281 characters
    cy.get('div[class*="DialogContent"]').find("textarea").clear();
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .type(
        "Hello everyone. Today is a very beautiful morning. My breakfeast consisted of eggs and bacons and pancakes with syrup and a big glass of lemonade. I looked outside the window, the nature was green and clean, the sky was blue, there was no annoying car noises anywhere. I want to st"
      );

    // Expected result: The tweet button is still disabled
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .should("be.disabled");

    // 2.3: The user John removes the last letter "t" in the tweet and the tweet will have 280 characters
    cy.get('div[class*="DialogContent"]').find("textarea").clear();
    cy.get('div[class*="DialogContent"]')
      .find("textarea")
      .type(
        "Hello everyone. Today is a very beautiful morning. My breakfeast consisted of eggs and bacons and pancakes with syrup and a big glass of lemonade. I looked outside the window, the nature was green and clean, the sky was blue, there was no annoying car noises anywhere. I want to s"
      );

    // Expected result: The tweet button is active
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .should("not.be.disabled");

    // 2.4: The user John clicks the tweet submit button
    cy.get('div[class*="DialogContent"]')
      .find('button:contains("Tweet")')
      .click();

    /*
    Expected result:
    The tweet "Hello everyone. Today is a very beautiful morning. My breakfeast consisted of eggs and bacons and pancakes with syrup and a big glass of lemonade. I looked outside the window, the nature was green and clean, the sky was blue, there was no annoying car noises anywhere. I want to s"

    Thus the tweet can have a maximum of 280 characters
    */
    cy.get('div[class*="Homepage"]')
      .find("ul")
      .should("have.length", 1)
      .find("li")
      .should("have.length", 1)
      .find("p")
      .should(
        "have.text",
        "Hello everyone. Today is a very beautiful morning. My breakfeast consisted of eggs and bacons and pancakes with syrup and a big glass of lemonade. I looked outside the window, the nature was green and clean, the sky was blue, there was no annoying car noises anywhere. I want to s"
      );
  });
});
