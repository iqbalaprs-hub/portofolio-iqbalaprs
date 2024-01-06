/// <reference types="Cypress" />

describe("DELETE /profiles/follow/{userId}", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  let johnToken;
  let johnId;
  let ronyId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
                      Prereq.:
                  
                      Import the data in "twitter clone API testing/profiles_follow_userId_delete" in mongoDb
                      The data contains the users:
                          1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
  
                           2- Name: Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
                      */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\profiles_follow_userId_delete\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\profiles_follow_userId_delete\\twitter-clone-db.profiles.json"
    );

    // Sign in as Rony in order to get Rony's ID
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "Rony",
        password: "Clonerony23",
      },
    }).then((ronyLoginResponse) => {
      // Assertion: status is 200
      ronyId = ronyLoginResponse.body.user._id;
    });

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

      cy.request({
        method: "POST",
        url: `http://localhost:3001/api/profiles/follow/${ronyId}`,
        headers: {
          Authorization: `Bearer ${johnToken}`,
        },
      });
    });
  });

  it("1- DELETE /profiles/follow/{userId} makes a user unfollow another user", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/profiles/follow/${ronyId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((followUserResponse) => {
      // Assertion 1: Status is 200
      expect(followUserResponse.status).to.equal(200);

      // Assertion 2: The response body contains the correct data
      expect(followUserResponse.body.profile.following).to.have.lengthOf(0);
      expect(followUserResponse.body.profile.following).to.be.an("array").that
        .is.empty;
      expect(followUserResponse.body.profile.user).to.equal(johnId);
    });
  });

  it("2- DELETE /profiles/follow/{userId} cannot make a user unfollow another user using a wrong user's ID", () => {
    // Create a user's ID
    const wrongUserId = "12345";
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/profiles/follow/${wrongUserId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((unfollowUserResponse) => {
      // Assertion 1: Status is 400
      expect(unfollowUserResponse.status).to.equal(400);

      // Assertion 2: Error message is "\"tweetId\" must be a valid mongo id"
      expect(unfollowUserResponse.body.message).to.equal(
        '"userId" must be a valid mongo id'
      );
    });
  });

  it("3- DELETE /profiles/follow/{userId} cannot make a user unfollow his own profile", () => {
    // Create a user's ID
    const wrongUserId = "12345";
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/profiles/follow/${johnId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((unfollowUserResponse) => {
      // Assertion 1: Status is 400
      expect(unfollowUserResponse.status).to.equal(400);

      // Assertion 2: Error message is "You cannot unfollow your own profile"
      expect(unfollowUserResponse.body.message).to.equal(
        "You cannot unfollow your own profile"
      );
    });
  });

  it("4- DELETE /profiles/follow/{userId} cannot make a user unfollow another user using a wrong user's token", () => {
    // Create a user's ID
    const wrongToken = "12345";
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/profiles/follow/${ronyId}`,
      headers: {
        Authorization: `Bearer ${wrongToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((unfollowUserResponse) => {
      // Assertion 1: Status is 401
      expect(unfollowUserResponse.status).to.equal(401);

      // Assertion 2: Error message is "You are not authenticated"
      expect(unfollowUserResponse.body.message).to.equal(
        "You are not authenticated"
      );
    });
  });

  it("-5 DELETE /profiles/follow/{userId} cannot make a user unfollow another user without a user's token", () => {
    // Create a user's ID
    const wrongToken = "12345";
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/profiles/follow/${ronyId}`,
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((unfollowUserResponse) => {
      // Assertion 1: Status is 401
      expect(unfollowUserResponse.status).to.equal(401);

      // Assertion 2: Error message is "You are not authenticated"
      expect(unfollowUserResponse.body.message).to.equal(
        "You are not authenticated"
      );
    });
  });

  it("6- POST /profiles/follow/{userId} cannot make a user unfollow another user twice in a row", () => {
    // John unfollows Rony the first time
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/profiles/follow/${ronyId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    });

    // John unfollows Rony the second time (activate the "unfollow" function the second time in a row)
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/profiles/follow/${ronyId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((followUserResponse) => {
      // Assertion 1: Status is 400
      expect(followUserResponse.status).to.equal(400);

      // Assertion 2: Error message is "You already follow that profile"
      expect(followUserResponse.body.message).to.equal(
        "You do not follow that profile"
      );
    });
  });
});
