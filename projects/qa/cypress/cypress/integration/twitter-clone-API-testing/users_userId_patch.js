/// <reference types="Cypress" />

describe("PATCH users/{userId}", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  let johnToken;
  let johnId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
                Prereq.:
            
                Import the data in "twitter clone API testing/users_userId_patch" in mongoDb
                The data contains the users:
                    1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
    
                */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\users_userId_patch\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\users_userId_patch\\twitter-clone-db.profiles.json"
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
      cy.log(johnToken);
      cy.log(johnId);
    });
  });

  it("1- PATCH /users/{userId} change the name and avatar of the user", () => {
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/users/${johnId}`,
      body: {
        name: "Johnny",
        avatar: "https://picsum.photos/200/300?grayscale",
      },
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((changeNameAndAvatarResponse) => {
      // Assertion 1: Status is 200
      expect(changeNameAndAvatarResponse.status).to.equal(200);

      // Assertion 2: The response body contains the correct data
      expect(changeNameAndAvatarResponse.body.user.role).to.equal("user");
      expect(changeNameAndAvatarResponse.body.user._id).to.equal(johnId);
      expect(changeNameAndAvatarResponse.body.user.name).to.equal("Johnny");
      expect(changeNameAndAvatarResponse.body.user.email).to.equal(
        "john@gmail.com"
      );
      expect(changeNameAndAvatarResponse.body.user.username).to.equal("john");
      expect(changeNameAndAvatarResponse.body.user.avatar).to.equal(
        "https://picsum.photos/200/300?grayscale"
      );
    });
  });

  it("2- PATCH /users/{userId} cannot change the avatar with an invalid URL", () => {
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/users/${johnId}`,
      body: {
        name: "Johnny",
        avatar: "12345",
      },
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((changeAvatarResponse) => {
      // Assertion 1: Status is 400
      expect(changeAvatarResponse.status).to.equal(400);
      // Assertion 2: Error message is "\"avatar\" must be a valid url"
      expect(changeAvatarResponse.body.message).to.equal(
        '"avatar" must be a valid url'
      );
    });
  });

  it("3- PATCH /users/{userId} cannot change the name and avatar with a wrong user's token", () => {
    // We created a wrong token for testing
    const wrongToken = "12345";
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/users/${johnId}`,
      body: {
        name: "Johnny",
        avatar: "https://picsum.photos/200/300?grayscale",
      },
      headers: {
        Authorization: `Bearer ${wrongToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((changeAvatarResponse) => {
      // Assertion 1: Status is 401
      expect(changeAvatarResponse.status).to.equal(401);
      // Assertion 2: Error message is "You are not authenticated"
      expect(changeAvatarResponse.body.message).to.equal(
        "You are not authenticated"
      );
    });
  });

  it("4- PATCH /users/{userId} cannot change the name and avatar without user's token", () => {
    // We created a wrong token for testing
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/users/${johnId}`,
      body: {
        name: "Johnny",
        avatar: "https://picsum.photos/200/300?grayscale",
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((changeAvatarResponse) => {
      // Assertion 1: Status is 401
      expect(changeAvatarResponse.status).to.equal(401);
      // Assertion 2: Error message is "You are not authenticated"
      expect(changeAvatarResponse.body.message).to.equal(
        "You are not authenticated"
      );
    });
  });

  it("5- PATCH /users/{userId} cannot change the name and avatar with a wrong user's ID", () => {
    // We created a wrong token for testing
    const wrongUserId = "12345";
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/users/${wrongUserId}`,
      body: {
        name: "Johnny",
        avatar: "https://picsum.photos/200/300?grayscale",
      },
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((changeAvatarResponse) => {
      // Assertion 1: Status is 403
      expect(changeAvatarResponse.status).to.equal(403);
      // Assertion 2: Error message is "You are not authorized"
      expect(changeAvatarResponse.body.message).to.equal(
        "You are not authorized"
      );
    });
  });
});
