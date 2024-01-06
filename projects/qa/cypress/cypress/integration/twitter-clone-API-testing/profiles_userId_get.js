/// <reference types="Cypress" />

describe("GET /profiles/{userId}", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  let johnToken;
  let johnId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
                Prereq.:
            
                Import the data in "twitter clone API testing/profiles_userId_get" in mongoDb
                The data contains the users:
                    1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
    
                */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\profiles_userId_get\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\profiles_userId_get\\twitter-clone-db.profiles.json"
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

  it("1- GET /profiles/{userId} provides the user's profile", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/profiles/${johnId}`,
    }).then((getProfileResponse) => {
      // Assertion 1: Status is 200
      expect(getProfileResponse.status).to.equal(200);

      // Assertion 2: The response body contains the correct data
      expect(getProfileResponse.body.profile.user._id).to.equal(johnId);
      expect(getProfileResponse.body.profile.user.name).to.equal("John");
      expect(getProfileResponse.body.profile.user.username).to.equal("john");
    });
  });

  it("2- GET /profiles/{userId} cannot provide user's profile with a wrong user's ID", () => {
    // Create a wrong user's ID for testing
    const wrongUserId = "12345";
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/profiles/${wrongUserId}`,
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((getProfileResponse) => {
      // Assertion 1: Status is 400
      expect(getProfileResponse.status).to.equal(400);
      // Assertion 2: Error message is "\"userId\" must be a valid mongo id"
      expect(getProfileResponse.body.message).to.equal(
        '"userId" must be a valid mongo id'
      );
    });
  });
});
