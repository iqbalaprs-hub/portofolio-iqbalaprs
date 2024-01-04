/// <reference types="Cypress" />

describe("Feature:Get user details", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  let johnToken;
  let johnId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
              Prereq.:
          
              Import the data in "twitter clone API testing/users_userId_get" in mongoDb
              The data contains the users:
                  1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
  
                  2- Name: Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
              */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\users_userId_get\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\users_userId_get\\twitter-clone-db.profiles.json"
    );

    // Sign in as John in order to get John's token and ID
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "John",
        password: "Clonejohn23",
      },
    }).then((loginResponse) => {
      johnToken = loginResponse.body.token;
      johnId = loginResponse.body.user._id;
    });
  });

  it("1- GET /users/{userId} provide user's details", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/users/${johnId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((response) => {
      // Assertion 1: Status is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The response body contains the correct data
      expect(response.body.user.role).to.equal("user");
      expect(response.body.user._id).to.equal(johnId);
      expect(response.body.user.name).to.equal("John");
      expect(response.body.user.email).to.equal("john@gmail.com");
      expect(response.body.user.username).to.equal("john");
    });
  });

  it("2- GET /users/{userId} cannot provide user's details with a wrong user's token", () => {
    // We are creating a wrong token for testing
    const wrongToken = "12345";
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/users/${johnId}`,
      headers: {
        Authorization: `Bearer ${wrongToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: Status is 401
      expect(response.status).to.equal(401);
      // Assertion 2: Error message is "You are not authenticated"
      expect(response.body.message).to.equal("You are not authenticated");
    });
  });

  it("3- GET /users/{userId} cannot provide user's details without a user's token", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/users/${johnId}`,
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: Status is 401
      expect(response.status).to.equal(401);
      // Assertion 2: Error message is "You are not authenticated"
      expect(response.body.message).to.equal("You are not authenticated");
    });
  });

  it("4- GET /users/{userId} cannot provide user details with wrong user's ID", () => {
    // We are creating a wrong ID for testing
    const wrongID = "12345";
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/users/${wrongID}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: Status is 403
      expect(response.status).to.equal(403);
      // Assertion 2: Error message is "You are not authorized"
      expect(response.body.message).to.equal("You are not authorized");
    });
  });
});
