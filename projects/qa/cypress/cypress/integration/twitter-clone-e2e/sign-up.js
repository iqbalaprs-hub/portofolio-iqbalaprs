/// <reference types="Cypress" />

describe("Feature: Sign Up", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
    Prereq.:

    Import the data in "twitter clone test data/1- SIGN UP" in mongoDb 
    (The data contains a user named John with username "john", email "john@gmail.com" and password "Clonejohn23")
    */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\sign-up\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\sign-up\\twitter-clone-db.profiles.json"
    );

    // Prereq.: Open Twitter-Clone as an anonymous user
    cy.visit(Cypress.env("twitterCloneBaseUrl"));
  });

  it("1- Nominal case: The user creates an account by signing up", () => {
    // 1.1: Both The "Sign-in" and "Sign Up" button are present in the navigation bar
    cy.get('a[data-cy="nav-signup-link"]').should("exist");
    cy.get('a[data-cy="nav-signin-link"]').should("exist");

    // 1.2: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*   
    1.3: The user fills the "Sign Up" form:
      - Name: Rony
      - Username: rony
      - email: rony@gmail.com
      - Password: Clonerony23
      - Confirm password: Clonerony23
    */
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-name-input"]')
      .type("Rony");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-username-input"]')
      .type("rony");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .type("rony@gmail.com");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .type("Clonerony23");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("Clonerony23");

    // 1.4: The user clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    cy.wait(1000);

    //  Expected result: The user's account is created
    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .first()
      .should("have.text", "Rony");

    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .eq(1)
      .should("have.text", "@rony");

    // Expected result: The user is automatically signed in
    cy.get('a[data-cy="nav-signin-link"]').should("not.exist");

    // Expected result: The user is taken to "Home" page
    cy.get("ul").contains("a", "Home").should("have.class", "active");

    // Expected result: The Sign Up button in the navigation bar disappears
    cy.get('a[data-cy="nav-signup-link"]').should("not.exist");
  });

  it("2- Nominal case: The user must create an account with a unique username", () => {
    // 2.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*
    2.2:
    The user fills the "Sign Up" form:
      - Name: Jhonny
      - Username: john
      - email: jhonny@gmail.com
      - Password: Clonejhonny23
      - Confirm password: Clonejhonny23
    */
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-name-input"]')
      .type("Jhonny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-username-input"]')
      .type("john");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .type("jhonny@gmail.com");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .type("Clonejhonny23");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("Clonejhonny23");

    // 2.3: The user clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: A red sentence appears: "Username already taken"
    cy.get('h1[data-cy="signup-title"]')
      .next("p")
      .should("have.text", "Username already taken")
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("3- Nominal case: The user must create an account with a unique email", () => {
    // 3.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*
    3.2:
    The user fills the "Sign Up" form:
      - Name: Jhonny
      - Username: johnny
      - email: jhon@gmail.com
      - Password: Clonejhonny23
      - Confirm password: Clonejhonny23
    */
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-name-input"]')
      .type("Jhonny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-username-input"]')
      .type("johnny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .type("john@gmail.com");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .type("Clonejhonny23");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("Clonejhonny23");

    // 3.3: The user clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: A red sentence appears: "Email already taken"
    cy.get('h1[data-cy="signup-title"]')
      .next("p")
      .should("have.text", "Email already taken")
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("4- Nominal case: Multiple users can have the same name", () => {
    // 4.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*
    4.2:
    The user fills the "Sign Up" form:
      - Name: Jhon
      - Username: johnny
      - email: jhonny@gmail.com
      - Password: Clonejhonny23
      - Confirm password: Clonejhonny23
    */
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-name-input"]')
      .type("Jhon");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-username-input"]')
      .type("johnny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .type("jhonny@gmail.com");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .type("Clonejhonny23");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("Clonejhonny23");

    // 4.3: The user clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: The user's account is created
    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .first()
      .should("have.text", "Jhon");

    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .eq(1)
      .should("have.text", "@johnny");

    // Expected result: The user is automatically signed in
    cy.get('a[data-cy="nav-signin-link"]').should("not.exist");

    // Expected result: The user is taken to "Home" page
    cy.get("ul").contains("a", "Home").should("have.class", "active");
  });
});
