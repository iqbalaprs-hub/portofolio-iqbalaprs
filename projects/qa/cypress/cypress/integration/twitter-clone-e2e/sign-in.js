/// <reference types="Cypress" />

describe("Feature: Sign In", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
      Prereq.:
  
      Import the data in "twitter clone test data/2- SIN IN" in mongoDb
      (The data contains a user named John with username "john", email "john@gmail.com" and password "Clonejohn23")
      */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\sign-in\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\sign-in\\twitter-clone-db.profiles.json"
    );

    // Prereq.: Open Twitter-Clone as an anonymous user
    cy.visit(Cypress.env("twitterCloneBaseUrl"));
  });

  it("1- Nominal case: The user signs in by typing the username", () => {
    // 1.1: Expected result: The "Sign in" button is present in the navigation bar
    cy.get('a[data-cy="nav-signin-link"]').should("exist");

    // 1.2: The user clicks on the "Sign in" button
    cy.get('a[data-cy="nav-signin-link"]').click();

    /*
    1.3:
    The user fills the "Sign in" form:
        - Username: john
        - Password: Clonejohn23
    */
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-username-input"]')
      .type("john");
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-password-input"]')
      .type("Clonejohn23");

    // 1.4: The user clicks the "Log In" submit button
    cy.get('form[data-cy="signin-form"]')
      .find('button[data-cy="signin-button"]')
      .click();

    // Expected result: The user enters his account (the user is signed-in)
    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .first()
      .should("have.text", "John");

    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .eq(1)
      .should("have.text", "@john");

    // Expected result: The user is taken to the “Home” page
    cy.get("ul").contains("a", "Home").should("have.class", "active");

    // Expected result: The “Sign In” button in the navigation bar disappears (Only anonymous user can see the “Sign In” button in the navigation bar
    cy.get('a[data-cy="nav-signin-link"]').should("not.exist");
  });

  it("2- Nominal case: The user signs in by typing the email ", () => {
    /*
    2.1:
    The user enters the "Sign In" page and fills the "Sign in" form:
        - Email: john@gmail.com
        - Password: Clonejohn23
    */
    cy.get('a[data-cy="nav-signin-link"]').click();
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-username-input"]')
      .type("john@gmail.com");
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-password-input"]')
      .type("Clonejohn23");

    // 2.2: The user clicks the "Log In" submit button
    cy.get('form[data-cy="signin-form"]')
      .find('button[data-cy="signin-button"]')
      .click();

    // Expected result: The user enters his account (the user is signed-in)
    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .first()
      .should("have.text", "John");

    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .eq(1)
      .should("have.text", "@john");

    // Expected result: The user is taken to the “Home” page
    cy.get("ul").contains("a", "Home").should("have.class", "active");

    // Expected result: The “Sign In” button in the navigation bar disappears (Only anonymous user can see the “Sign In” button in the navigation bar
    cy.get('a[data-cy="nav-signin-link"]').should("not.exist");
  });

  it("3- Nominal case: The user signs in by typing the username or email wrong ", () => {
    /*
    The user enters the "Sign In" page and fills the "Sign in" form:
        - Username or email: joh
        - Password: Clonejohn23
    */
    cy.get('a[data-cy="nav-signin-link"]').click();
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-username-input"]')
      .type("joh");
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-password-input"]')
      .type("Clonejohn23");

    // 3.2: The user click the "Log In" submit button
    cy.get('form[data-cy="signin-form"]')
      .find('button[data-cy="signin-button"]')
      .click();

    // Expected result: A red sentence appears: "Invalid login credentials"
    cy.contains("h1", "Sign In")
      .next("p")
      .should("have.text", "Invalid login credentials")
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("4- Nominal case: The user signs in by typing the password wrong ", () => {
    /*
    4.1:
    The user enters the "Sign In" page and fills the "Sign in" form:
        - Username: john
        - Password: Clonejohn2
    */
    cy.get('a[data-cy="nav-signin-link"]').click();
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-username-input"]')
      .type("john");
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-password-input"]')
      .type("Clonejohn2");

    // 4.2: The user click the "Log In" submit button
    cy.get('form[data-cy="signin-form"]')
      .find('button[data-cy="signin-button"]')
      .click();

    // Expected result: A red sentence appears: "Invalid login credentials"
    cy.contains("h1", "Sign In")
      .next("p")
      .should("have.text", "Invalid login credentials")
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("5- Edge case: The user signs in by keeping the username or email empty", () => {
    /*
    5.1: 
    The user enters the "Sign In" page and fills the "Sign in" form:
      - Username or email: (empty)
      - Password: Clonejohn23
    */
    cy.get('a[data-cy="nav-signin-link"]').click();
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-password-input"]')
      .type("Clonejohn23");

    // 5.2: The user click the "Log In" submit button
    cy.get('form[data-cy="signin-form"]')
      .find('button[data-cy="signin-button"]')
      .click();

    // Expected result: A red sentence appears: "Username is required"
    cy.get('input[data-cy="signin-username-input"]')
      .next("div")
      .should("have.text", "username is required")
      .should("have.css", "color", "rgb(226, 61, 104)");
  });
});
