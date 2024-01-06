/// <reference types="Cypress" />

describe("Feature: PATCH /profiles/{userId}", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  let johnToken;
  let johnId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
                  Prereq.:
              
                  Import the data in "twitter clone API testing/profiles_userId_patch" in mongoDb
                  The data contains the users:
                      1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
      
                  */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\profiles_userId_patch\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\profiles_userId_patch\\twitter-clone-db.profiles.json"
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

  it("1- PATCH /profiles/{userId} change the bio, location, website and background image of the user", () => {
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/profiles/${johnId}`,
      body: {
        bio: "Blood type A+   Age 23",
        location: "Boulevard street 10+",
        website: "john.com",
        backgroundImage: "https://picsum.photos/id/866/600/400",
      },
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((changeBioLocationWebsiteBackgroundimageResponse) => {
      // Assertion 1: Status is 200
      expect(changeBioLocationWebsiteBackgroundimageResponse.status).to.equal(
        200
      );

      // Assertion 2: The response body contains the correct data
      expect(
        changeBioLocationWebsiteBackgroundimageResponse.body.profile.user
      ).to.equal(johnId);
      expect(
        changeBioLocationWebsiteBackgroundimageResponse.body.profile.bio
      ).to.equal("Blood type A+   Age 23");
      expect(
        changeBioLocationWebsiteBackgroundimageResponse.body.profile.location
      ).to.equal("Boulevard street 10+");
      expect(
        changeBioLocationWebsiteBackgroundimageResponse.body.profile.website
      ).to.equal("john.com");
      expect(
        changeBioLocationWebsiteBackgroundimageResponse.body.profile
          .backgroundImage
      ).to.equal("https://picsum.photos/id/866/600/400");
    });
  });

  it("2- PATCH /profiles/{userId} cannot change bio, location, website and background image of the user if body is empty", () => {
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/profiles/${johnId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((editProfileResponse) => {
      // Assertion 1: Status is 400
      expect(editProfileResponse.status).to.equal(400);
      // Assertion 2: Error message is "\"body\" must have at least 1 key"
      expect(editProfileResponse.body.message).to.equal(
        '"body" must have at least 1 key'
      );
    });
  });

  it("3- PATCH /profiles/{userId} cannot change name of the user", () => {
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/profiles/${johnId}`,
      body: {
        name: "Johnny",
      },
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((editProfileResponse) => {
      // Assertion 1: Status is 400
      expect(editProfileResponse.status).to.equal(400);
      // Assertion 2: Error message is "\"name\" is not allowed"
      expect(editProfileResponse.body.message).to.equal(
        '"name" is not allowed'
      );
    });
  });

  it("4- PATCH /profiles/{userId} cannot change avatar of the user", () => {
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/profiles/${johnId}`,
      body: {
        avatar: "https://picsum.photos/200/300?grayscale",
      },
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((editProfileResponse) => {
      // Assertion 1: Status is 400
      expect(editProfileResponse.status).to.equal(400);
      // Assertion 2: Error message is "\"avatar\" is not allowed"
      expect(editProfileResponse.body.message).to.equal(
        '"avatar" is not allowed'
      );
    });
  });

  it("5- PATCH /profiles/{userId} cannot change background image having an invalid URL", () => {
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/profiles/${johnId}`,
      body: {
        backgroundImage: "12345",
      },
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((editProfileResponse) => {
      // Assertion 1: Status is 400
      expect(editProfileResponse.status).to.equal(400);
      // Assertion 2: Error message is "\"backgroundImage\" must be a valid url"
      expect(editProfileResponse.body.message).to.equal(
        '"backgroundImage" must be a valid url'
      );
    });
  });

  it("6- PATCH /profiles/{userId} cannot change bio, location, website and background image of the user using a wrong user's token", () => {
    // Create wrong token for testing
    const wrongToken = "12345";
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/profiles/${johnId}`,
      body: {
        bio: "Blood type A+   Age 23",
        location: "Boulevard street 10+",
        website: "john.com",
        backgroundImage: "https://picsum.photos/id/866/600/400",
      },
      headers: {
        Authorization: `Bearer ${wrongToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((editProfileResponse) => {
      // Assertion 1: Status is 401
      expect(editProfileResponse.status).to.equal(401);
      // Assertion 2: Error message is "You are not authenticated"
      expect(editProfileResponse.body.message).to.equal(
        "You are not authenticated"
      );
    });
  });

  it("7- PATCH /profiles/{userId} cannot change bio, location, website and background image of the user without a user's token", () => {
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/profiles/${johnId}`,
      body: {
        bio: "Blood type A+   Age 23",
        location: "Boulevard street 10+",
        website: "john.com",
        backgroundImage: "https://picsum.photos/id/866/600/400",
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((editProfileResponse) => {
      // Assertion 1: Status is 401
      expect(editProfileResponse.status).to.equal(401);
      // Assertion 2: Error message is "You are not authenticated"
      expect(editProfileResponse.body.message).to.equal(
        "You are not authenticated"
      );
    });
  });

  it("8- PATCH /profiles/{userId} cannot change bio, location, website and background image of the user using a wrong user's ID", () => {
    // Create wrong token for testing
    const wrongUserId = "12345";
    cy.request({
      method: "PATCH",
      url: `http://localhost:3001/api/profiles/${wrongUserId}`,
      body: {
        bio: "Blood type A+   Age 23",
        location: "Boulevard street 10+",
        website: "john.com",
        backgroundImage: "https://picsum.photos/id/866/600/400",
      },
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((editProfileResponse) => {
      // Assertion 1: Status is 403
      expect(editProfileResponse.status).to.equal(403);
      // Assertion 2: Error message is "You are not authorized"
      expect(editProfileResponse.body.message).to.equal(
        "You are not authorized"
      );
    });
  });
});
