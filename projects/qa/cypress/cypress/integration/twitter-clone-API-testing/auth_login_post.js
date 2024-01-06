/// <reference types="Cypress" />

describe("Feature: POST /auth/login", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
        Prereq.:
    
        Import the data in "twitter clone API testing/ auth_login_post" in mongoDb
        (The data contains a user named John with username "john", email "john@gmail.com" and password "Clonejohn23")
        */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\auth_login_post\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\auth_login_post\\twitter-clone-db.profiles.json"
    );
  });

  it("1- POST /auth/login signs in using the username", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "John",
        password: "Clonejohn23",
      },
    }).then((response) => {
      // Assertion 1: Status is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The response body contains the correct data (name, email, username)
      expect(response.body.user.name).to.equal("John");
      expect(response.body.user.email).to.equal("john@gmail.com");
      expect(response.body.user.username).to.equal("john");

      // Assertion 3: The response body contains a token
      expect(response.body.token).to.not.be.empty;
    });
  });

  it("2- POST /auth/login signs in using the email", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "john@gmail.com",
        password: "Clonejohn23",
      },
    }).then((response) => {
      // Assertion 1: status is 200
      expect(response.status).to.equal(200);

      // Assertion 2: Assert that the response body contains the correct data (name, email, username)
      expect(response.body.user.name).to.equal("John");
      expect(response.body.user.email).to.equal("john@gmail.com");
      expect(response.body.user.username).to.equal("john");

      // Assertion 3: The response body contains a token
      expect(response.body.token).to.not.be.empty;
    });
  });

  it("3- POST /auth/login cannot sign in with a wrong username or email ", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "joh",
        password: "Clonejohn23",
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: Status is 400
      expect(response.status).to.equal(400);
      // Assertion 2: Error message is "Invalid login credentials"
      expect(response.body.message).to.equal("Invalid login credentials");
    });
  });

  it("4- POST /auth/login cannot sign in with a wrong password ", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "john",
        password: "Clonejohn2",
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: Status is 400
      expect(response.status).to.equal(400);
      // Assertion 2: Error message is "Invalid login credentials"
      expect(response.body.message).to.equal("Invalid login credentials");
    });
  });

  it("5- POST /auth/login cannot sign in with an empty password ", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "john",
        password: "",
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: Status is 400
      expect(response.status).to.equal(400);
      // Assertion 2: Error message is "\"password\" is not allowed to be empty"
      expect(response.body.message).to.equal(
        '"password" is not allowed to be empty'
      );
    });
  });

  it("6- POST /auth/login cannot sign in without a password in the payload", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "john",
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: Status is 400
      expect(response.status).to.equal(400);
      // Assertion 2: Error message is "\"password\" is required"
      expect(response.body.message).to.equal('"password" is required');
    });
  });

  it("7- POST /auth/login cannot sign in with both username and password being empty", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "",
        password: "",
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: Status is 400
      expect(response.status).to.equal(400);
      // Assertion 2: Error message is "\"username\" is not allowed to be empty"
      expect(response.body.message).to.equal(
        '"username" is not allowed to be empty'
      );
    });
  });

  it("8- POST /auth/login cannot sign in without both username and password in the payload", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {},
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: Status is 400
      expect(response.status).to.equal(400);
      // Assertion 2: Error message is "\"username\" is required"
      expect(response.body.message).to.equal('"username" is required');
    });
  });
});
