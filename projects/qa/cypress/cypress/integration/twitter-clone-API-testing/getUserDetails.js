/// <reference types="Cypress" />

describe("Feature:Get user details", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  var johnsToken;
  var johnsId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
              Prereq.:
          
              Import the data in "twitter clone test data/GET USER DETAILS" in mongoDb
              The data contains the users:
                  1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
  
                  2- Name: Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
              */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-API-testing\\getUserDetails\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone--API-testing\\getUserDetails\\twitter-clone-db.profiles.json"
    );

    // Sign in as John in order to get the John's token and ID
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "John",
        password: "Clonejohn23",
      },
    }).then((loginResponse) => {
      expect(loginResponse.status).to.equal(200);
      johnsToken = loginResponse.body.token;
      johnsId = loginResponse.body.user._id;
      cy.log(johnsToken);
      cy.log(johnsId);
    });
  });

  it("1- GET /users/{userId} provide user details", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/users/${johnsId}`,
      headers: {
        Authorization: `Bearer ${johnsToken}`,
      },
    }).then((response) => {
      // Assertion 1: status is 200
      expect(response.status).to.equal(200);

      // Assertion 2: content of the response body is true
      expect(response.body.user.role).to.equal("user");
      expect(response.body.user._id).to.equal(johnsId);
      expect(response.body.user.name).to.equal("John");
      expect(response.body.user.email).to.equal("john@gmail.com");
      expect(response.body.user.username).to.equal("john");
    });
  });

  it("2- GET /users/{userId} cannot provide user details with wrong user's token", () => {
    const token = "12345";
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/users/${johnsId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: status is 401
      expect(response.status).to.equal(401);
      // Assertion 2: error message is "You are not authenticated"
      expect(response.body.message).to.equal("You are not authenticated");
    });
  });

  it("3- GET /users/{userId} cannot provide user details with wrong user's ID", () => {
    const ID = "12345";
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/users/${ID}`,
      headers: {
        Authorization: `Bearer ${johnsToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((response) => {
      // Assertion 1: status is 403
      expect(response.status).to.equal(403);
      // Assertion 2: error message is "You are not authorized"
      expect(response.body.message).to.equal("You are not authorized");
    });
  });
});
