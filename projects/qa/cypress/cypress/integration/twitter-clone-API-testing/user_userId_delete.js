/// <reference types="Cypress" />

describe("DELETE user/{userId}", () => {
  // Declaring the variables in order to be used in the entire test suite
  let johnToken;
  let johnId;
  let ronyToken;
  let ronyId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
                Prereq.:
            
                Import the data in "twitter clone API testing/user_userId_delete" in mongoDb
                The data contains the users:
                    1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
    
                    2- Name: Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
                */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\user_userId_delete\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\user_userId_delete\\twitter-clone-db.profiles.json"
    );

    // Sign in as John in order to get John's token and ID
    cy.signInAsJohnAndGetTokenAndIdAsJohnInTwitterCloneApiTesting(
      (token, id) => {
        johnToken = token;
        johnId = id;
      }
    );

    // Sign in as Rony in order to get Rony's token and ID
    cy.signInAsRonyAndGetTokenAndIdAsRonyInTwitterCloneApiTesting(
      (token, id) => {
        ronyToken = token;
        ronyId = id;
      }
    );
  });

  it("1- DELETE users/userId deletes a specific user using this user ID and token ", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/users/${johnId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((deleteResponse) => {
      // Assertion 1: Status is 200
      expect(deleteResponse.status).to.equal(200);

      // Assertion 2: The response body contains the correct data
      expect(deleteResponse.body.user.role).to.equal("user");
      expect(deleteResponse.body.user._id).to.equal(johnId);
      expect(deleteResponse.body.user.name).to.equal("John");
      expect(deleteResponse.body.user.email).to.equal("john@gmail.com");
      expect(deleteResponse.body.user.username).to.equal("john");
    });
  });

  it("2- DELETE users/userId cannot delete a user without his token ", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/users/${johnId}`,
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((deleteResponse) => {
      // Assertion 1: Status is 401
      expect(deleteResponse.status).to.equal(401);
      // Assertion 2: Error message is "You are not authenticated"
      expect(deleteResponse.body.message).to.equal("You are not authenticated");
    });
  });

  it("3- DELETE users/userId cannot delete a user using another user's token ", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/users/${johnId}`,
      headers: {
        Authorization: `Bearer ${ronyToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((deleteResponse) => {
      // Assertion 1: Status is 403
      expect(deleteResponse.status).to.equal(403);
      // Assertion 2: Error message is "You are not authorized"
      expect(deleteResponse.body.message).to.equal("You are not authorized");
    });
  });

  it("4- DELETE users/userId cannot delete a user using a wrong token ", () => {
    // We created a wrong token for testing
    const wrongToken = "12345";

    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/users/${johnId}`,
      headers: {
        Authorization: `Bearer ${wrongToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((deleteResponse) => {
      // Assertion 1: Status is 401
      expect(deleteResponse.status).to.equal(401);
      // Assertion 2: Error message is "You are not authorized"
      expect(deleteResponse.body.message).to.equal("You are not authenticated");
    });
  });
});
