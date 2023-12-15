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

  it("My SecondTest case", function () {});
});
