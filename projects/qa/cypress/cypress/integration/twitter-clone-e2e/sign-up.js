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

    /*
    Expected result: The user is automatically signed in
    Expected result: The user is taken to "Home" page
    Expected result: The Sign Up button in the navigation bar disappears
    */
    cy.AssertSuccesfullSignUp();
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
      .type("John");
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
      .should("have.text", "John");

    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .eq(1)
      .should("have.text", "@johnny");

    /*
    Expected result: The user is automatically signed in
    Expected result: The user is taken to "Home" page
    Expected result: The Sign Up button in the navigation bar disappears
    */
    cy.AssertSuccesfullSignUp();
  });

  it("5- Nominal case: The user writes the email wrong (The email must be a string in the form name@example.com)", () => {
    // 5.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*
    5.2:
    The user fills the "Sign Up" form:
      - Name: Jhon
      - Username: johnny
      - email: jhonny#1gmail.com
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
      .type("jhonny#1gmail.com");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .type("Clonejhonny23");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("Clonejhonny23");

    // 5.3: The user clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: An alert appears saying: "Please include an '@' in the email address. 'jhonny#1gmail.com' is missing an '@'
    cy.on("window:alert", (Text) => {
      expect(Text).to.contains(
        "Please include an '@' in the email address. 'jhonny#1gmail.com' is missing an '@'"
      );
    });

    // 5.4: The user writes the email wrong again: "jhonny#1@gmail" and clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .clear();

    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .type("jhonny#1@gmail");

    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: A red sentence appears: "email" must be a valid email
    cy.get('h1[data-cy="signup-title"]')
      .next("p")
      .should("have.text", '"email" must be a valid email')
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("6- Edge case: The user forgot to write his email", () => {
    // 6.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*
    6.2:
    The user fills the "Sign Up" form:
      - Name: Jhonny
      - Username: johnny
      - email: (empty)
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
      .find('input[data-cy="signup-password-input"]')
      .type("Clonejhonny23");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("Clonejhonny23");

    // 6.3: The user clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: A red sentence appears: email is required
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .next("div")
      .should("have.text", "email is required")
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("7- Nominal case: The user writes a password that is not secured", () => {
    // 7.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*
    7.2: 
    The user fills the "Sign Up" form:
      - Name: Jhonny
      - Username: johnny
      - email: jhonny@gmail.com
      - Password: jhonny
      - Confirm password: jhonny
    */
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-name-input"]')
      .type("Jhonny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-username-input"]')
      .type("johnny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .type("jhonny@gmail.com");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .type("jhonny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("jhonny");

    // 7.3: The user clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: A red sentence appears: password must be at least 8 characters
    cy.get('h1[data-cy="signup-title"]')
      .next("p")
      .should("have.text", "password must be at least 8 characters")
      .should("have.css", "color", "rgb(226, 61, 104)");

    // 7.4: The user writes the password: Clonejhonny (of course with the "confirm password" being the same) and clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .type("Clonejhonny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("Clonejhonny");

    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: A red sentence appears: password must contain at least 1 letter and 1 number
    cy.get('h1[data-cy="signup-title"]')
      .next("p")
      .should(
        "have.text",
        "password must contain at least 1 letter and 1 number"
      )
      .should("have.css", "color", "rgb(226, 61, 104)");

    // 7.5: The user writes the password: Clonejhonny23 (of course with the "confirm password" being the same) and clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .type("Clonejhonny23");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("Clonejhonny23");

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
      .should("have.text", "Jhonny");

    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .eq(1)
      .should("have.text", "@johnny");

    /*
    Expected result: The user is automatically signed in
    Expected result: The user is taken to "Home" page
    Expected result: The Sign Up button in the navigation bar disappears
    */
    cy.AssertSuccesfullSignUp();
  });

  it("8- Nominal case: The user does not confirm his password right", () => {
    // 8.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*
    8.2:
    The user fills the "Sign Up" form:
      - Name: Jhonny
      - Username: johnny
      - email: jhonny@gmail.com
      - Password: Clonejhonny23
      - Confirm password: Clonejhonny2
    */
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-name-input"]')
      .type("Jhonny");
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
      .type("Clonejhonny2");

    // 8.3: The user clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: 2 same red sentences appears: password must match
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .next("div")
      .should("have.text", "password must match")
      .should("have.css", "color", "rgb(226, 61, 104)");

    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .next("div")
      .should("have.text", "password must match")
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("9- Edge case: The user submits the Sign Up form with both  password and confirmation password being empty", () => {
    // 9.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*
    9.2:
    The user fills the "Sign Up" form:
      - Name: Jhonny
      - Username: johnny
      - email: jhonny@gmail.com
      - Password: 
      - Confirm password:
    */
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-name-input"]')
      .type("Jhonny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-username-input"]')
      .type("johnny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .type("jhonny@gmail.com");

    // 9.3: The user clicks the "Sign Up" submit button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    /*
    Expected result:
    2 red sentences appears: 
      (1) password is required
      (2) confirmation password is required
    */
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .next("div")
      .should("have.text", "password is required")
      .should("have.css", "color", "rgb(226, 61, 104)");

    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .next("div")
      .should("have.text", "confirmation password is required")
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("10- Nominal case: Username is a string which can only accept 3 special characters: period, dash  and underscore (Any other special characters are not allowed)", () => {
    // 10.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    /*
    10.2:
    The user fills the "Sign Up" form:
      - Name: Jhonny
      - Username: johnny.-_#
      - email: jhonny@gmail.com
      - Password: Clonejhonny23
      - Confirm password: Clonejhonny23
    */
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-name-input"]')
      .type("Jhonny");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-username-input"]')
      .type("johnny.-_#");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-email-input"]')
      .type("jhonny@gmail.com");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password-input"]')
      .type("Clonejhonny23");
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-password2-input"]')
      .type("Clonejhonny23");

    // 10.3: The user clicks on the "Sign Up" button
    cy.get('form[data-cy="signup-form"]')
      .find('button[data-cy="signup-submit"]')
      .click();

    // Expected result: A red sentence appears: User validation failed: username: username must only contain numbers, letters, ".", "-", "_"
    cy.get('h1[data-cy="signup-title"]')
      .next("p")
      .should(
        "have.text",
        'User validation failed: username: username must only contain numbers, letters, ".", "-", "_"'
      )
      .should("have.css", "color", "rgb(226, 61, 104)");

    // 10.4: The user write username as: johnny.-_
    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-username-input"]')
      .clear();

    cy.get('form[data-cy="signup-form"]')
      .find('input[data-cy="signup-username-input"]')
      .type("johnny.-_");

    // 10.5: The user clicks on the "Sign Up" button
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
      .should("have.text", "Jhonny");

    cy.get("reach-portal")
      .children("div")
      .first()
      .children("div")
      .first()
      .children("p")
      .eq(1)
      .should("have.text", "@johnny.-_");

    /*
    Expected result: The user is automatically signed in
    Expected result: The user is taken to "Home" page
    Expected result: The Sign Up button in the navigation bar disappears
    */
    cy.AssertSuccesfullSignUp();
  });

  it("11- Nominal case: The user can go to the Sign In form from the Sign Up page", () => {
    // 11.1: The user clicks on the "Sign Up" button
    cy.get('a[data-cy="nav-signup-link"]').click();

    // 11.2: The user clicks on the "Sign in now" link
    cy.contains("a", "Sign In now").click();

    // Expected result: The user is sent automatically to the Sign In page
    cy.get("ul").contains("a", "Sign In").should("have.class", "active");
  });
});
