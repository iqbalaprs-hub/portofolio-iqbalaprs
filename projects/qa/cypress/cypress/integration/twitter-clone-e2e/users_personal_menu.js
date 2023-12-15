/// <reference types="Cypress" />

describe("Feature: User's personal menu", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
       Import the data in "twitter clone test data/7- USER'S PERSONAL MENU" in mongoDb
       The user contains the user John (username: john; email: john@gmail.com; password: Clonejohn23)
    */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\users_personal_menu\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\users_personal_menu\\twitter-clone-db.profiles.json"
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

  it("1- Nominal case: The personal menu asserts in which account the user is", () => {
    // 1.1: The user clicks on the personal menu in the navigation bar
    cy.get("button#menu-button--menu").click();

    // Expected result: In the personal menu, the user can see (1) the name "John" and (2) @ + username "john"
    cy.get('div[class*="MenuPopover"]')
      .find("div:nth-child(1) p:nth-child(1)")
      .should("have.text", "John");
    cy.get('div[class*="MenuPopover"]')
      .find("div:nth-child(1) p:nth-child(2)")
      .should("have.text", "@john");
  });

  it("2- Nominal case: The user can go to his profile through his personal menu", () => {
    // 2.1: The user clicks on the personal menu in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 2.2: The user clicks on "Profile"
    cy.get("a#option-0--menu--1").click();

    // Expected result: The user enter his profile
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find("img")
      .next()
      .should("have.text", "John");
    cy.get('div[class*="Profile___StyledDiv4"]')
      .find('span[class*="Profile___StyledSpan2"]')
      .should("have.text", "@john");
  });

  it("3- Nominal case: The user can go to the Edit profile page through the personal menu", () => {
    // 3.1: The user clicks on the personal menu in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 3.2: The user clicks on "Settings"
    cy.get("div#menu--1").find("a#option-1--menu--1").click();

    // Expected result: The user is sent to the Setting page
    cy.get('h1[class*="PrimaryHeading"]').should("have.text", "Settings");
    cy.url().should("include", "/settings");

    // 3.3: The user clicks on the "Edit profile" button
    cy.get('div[class*="ActionsContainer"]')
      .find('a[class*="EditProfileButton"]')
      .click();

    // Expected result: The user is sent to the "Edit profile page"
    cy.url().should("include", "/edit-profile");
  });

  it("4- Nominal case: The user can delete his account ", () => {
    // 4.1: The user clicks on the personal menu in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 4.2: The user clicks on "Settings"
    cy.get("div#menu--1").find("a#option-1--menu--1").click();

    // 4.3: The user clicks on "Delete account" button
    cy.get('div[class*="ActionsContainer"]')
      .find('button[class*="DeleteAccountButton"]')
      .click();

    // 4.4: The user clicks "Yes, delete" button
    cy.get("reach-portal")
      .find('div[class*="Settings___StyledDiv"] button:nth-child(1)')
      .click();

    // Expected result: The user is automatically signed out.The "Sign In" page  opens
    cy.get('a[data-cy="nav-signup-link"]').should("exist");
    cy.get('a[data-cy="nav-signin-link"]').should("exist");
    cy.get("ul").contains("a", "Sign In").should("have.class", "active");

    // 4.5: The user signs in as John
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-username-input"]')
      .type("john");
    cy.get('form[data-cy="signin-form"]')
      .find('input[data-cy="signin-password-input"]')
      .type("Clonejohn23");
    cy.get('form[data-cy="signin-form"]')
      .find('button[data-cy="signin-button"]')
      .click();

    // Expected result: A red sentence appears: "Invalid login credentials"
    cy.contains("h1", "Sign In")
      .next("p")
      .should("have.text", "Invalid login credentials")
      .should("have.css", "color", "rgb(226, 61, 104)");
  });

  it("Edge case: The user can cancel the deletion of his account", () => {
    // 5.1: The user clicks on the personal menu in the navigation bar
    cy.get("button#menu-button--menu").click();

    // 5.2: The user clicks on "Settings"
    cy.get("div#menu--1").find("a#option-1--menu--1").click();

    // 5.3: The user clicks on "Delete account" button
    cy.get('div[class*="ActionsContainer"]')
      .find('button[class*="DeleteAccountButton"]')
      .click();

    // 5.4: The user clicks "Nethermind, don't delete." button
    cy.get("reach-portal")
      .find('div[class*="Settings___StyledDiv"] button:nth-child(2)')
      .click();

    /*
    Expected result:
     The user is returned to settings page

     The account is not deleted

     The user is still signed in
    */
    cy.get('h1[class*="PrimaryHeading"]').should("have.text", "Settings");
    cy.url().should("include", "/settings");
    cy.get('div[class*="MenuPopover"]')
      .find("div:nth-child(1) p:nth-child(1)")
      .should("have.text", "John");
    cy.get('div[class*="MenuPopover"]')
      .find("div:nth-child(1) p:nth-child(2)")
      .should("have.text", "@john");
    cy.get('a[data-cy="nav-signin-link"]').should("not.exist");
  });
});
