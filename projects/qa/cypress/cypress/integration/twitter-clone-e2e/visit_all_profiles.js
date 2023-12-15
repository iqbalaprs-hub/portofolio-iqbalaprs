/// <reference types="Cypress" />

describe("Feature: Visit all profiles", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
        Import the data in "twitter clone test data/5- VISIT ALL PROFILES" in mongoDb
        The data contains the users:
            (1) Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
            (2) Name: Paul (username: paul; email: paul@gmail.com; password: Clonepaul23)
            (3) Name: Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
            (4) Name: Kevin (username: kevin; email: kevin@gmail.com; password: Clonekevin23)
            (5) Name: Julia (username: julia; email: julia@gmail.com; password: Clonejulia23)
    */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-e2e\\visit_all_profiles\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone-e2e\\visit_all_profiles\\twitter-clone-db.profiles.json"
    );

    // Prereq.: Open Twitter-Clone as an anonymous user
    cy.visit(Cypress.env("twitterCloneBaseUrl"));
  });

  it("1- Nominal case: The anonymous user can see the profiles in the All profiles", () => {
    // 1.1: The anonymous user clicks on "All profiles" button in the navigation bar
    cy.get('nav[class*="MainNav"]').contains("a", "All profiles").click();

    /*
    There are 5 users displayed with their name and username, and they are sorted from oldest member to newest member (left to right; top to bottom)

        John  @john

        Paul  @paul

        Rony  @rony

        Kevin  @kevin

        Julia     @julia
    */
    cy.get('ul[class*="ProfilesList"]')
      .should("have.length", 1)
      .find("li")
      .should("have.length", 5);

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "John");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(1)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@john");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(2)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "Paul");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(2)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@paul");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(3)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "Rony");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(3)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@rony");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(4)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "Kevin");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(4)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@kevin");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(5)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(1)")
      .should("have.text", "Julia");

    cy.get('ul[class*="ProfilesList"]')
      .find("li:nth-child(5)")
      .find('div[class*="TextContainer"]')
      .find("p:nth-child(2)")
      .should("have.text", "@julia");
  });
});
