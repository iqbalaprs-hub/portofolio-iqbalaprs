/// <reference types="Cypress" />

describe("Feature: DELETE /tweets/like/{tweetId}", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  let johnToken;
  let johnId;
  let tweetId;
  let ronyToken;
  let ronyId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
            Prereq.:
        
            Import the data in "twitter clone API testing/tweets_tweetId_delete" in mongoDb
            The data contains the users:
                1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)

                2- Name: Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
            */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\tweets_tweetId_delete\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\tweets_tweetId_delete\\twitter-clone-db.profiles.json"
    );

    // Sign in as John in order to get John's token
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

      // Create a tweet using John's token in order to get this tweet's ID
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/tweets",
        body: {
          text: "Hello",
        },
        headers: {
          Authorization: `Bearer ${johnToken}`,
        },
      }).then((tweetResponse) => {
        tweetId = tweetResponse.body.tweet._id;
      });
    });
  });

  it("1- DELETE /tweets/like/{tweetId} removes the like", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:3001/api/tweets/like/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((likeResponse) => {
      // Status is 200
      expect(likeResponse.status).to.equal(200);

      // The response body contains the correct data
      expect(likeResponse.body.tweet.text).to.equal("Hello");
      expect(likeResponse.body.tweet.likes).to.have.lengthOf(1);
      expect(likeResponse.body.tweet.likes[0]).to.equal(johnId);

      // Remove the like
      cy.request({
        method: "DELETE",
        url: `http://localhost:3001/api/tweets/like/${tweetId}`,
        headers: {
          Authorization: `Bearer ${johnToken}`,
        },
      }).then((removeLikeResponse) => {
        // Assertion 1: Status is 200
        expect(removeLikeResponse.status).to.equal(200);

        // Assertion 2: The response body contains the correct data
        expect(removeLikeResponse.body.tweet.text).to.equal("Hello");
        expect(removeLikeResponse.body.tweet.likes).to.have.lengthOf(0);
        expect(removeLikeResponse.body.tweet.likes).to.be.an("array").that.is
          .empty;
      });
    });
  });

  it("2- DELETE /tweets/like/{tweetId} cannot remove the like with a wrong tweet ID", () => {
    // We created a wrong tweet ID for testing the like removal
    const wrongTweetId = "12345";
    cy.request({
      method: "POST",
      url: `http://localhost:3001/api/tweets/like/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((likeResponse) => {
      // Status is 200
      expect(likeResponse.status).to.equal(200);

      // The response body contains the correct data
      expect(likeResponse.body.tweet.likes).to.have.lengthOf(1);

      // Remove the like
      cy.request({
        method: "DELETE",
        url: `http://localhost:3001/api/tweets/like/${wrongTweetId}`,
        headers: {
          Authorization: `Bearer ${johnToken}`,
        },
        failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
      }).then((removeLikeResponse) => {
        // Assertion 1: Status is 400
        expect(removeLikeResponse.status).to.equal(400);

        // Assertion 2: Error message is "\"tweetId\" must be a valid mongo id"
        expect(removeLikeResponse.body.message).to.equal(
          '"tweetId" must be a valid mongo id'
        );
      });
    });
  });

  it("3- DELETE /tweets/like/{tweetId} cannot remove the like with a wrong user's token", () => {
    // We created a wrong tweet ID for testing the like removal
    const wrongToken = "12345";
    cy.request({
      method: "POST",
      url: `http://localhost:3001/api/tweets/like/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((likeResponse) => {
      // Status is 200
      expect(likeResponse.status).to.equal(200);

      // The response body contains the correct data
      expect(likeResponse.body.tweet.likes).to.have.lengthOf(1);

      // Remove the like
      cy.request({
        method: "DELETE",
        url: `http://localhost:3001/api/tweets/like/${tweetId}`,
        headers: {
          Authorization: `Bearer ${wrongToken}`,
        },
        failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
      }).then((removeLikeResponse) => {
        // Assertion 1: Status is 401
        expect(removeLikeResponse.status).to.equal(401);

        // Assertion 2: Error message is "You are not authenticated"
        expect(removeLikeResponse.body.message).to.equal(
          "You are not authenticated"
        );
      });
    });
  });

  it("4- DELETE /tweets/like/{tweetId} cannot remove the like without a user's token", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:3001/api/tweets/like/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((likeResponse) => {
      // Status is 200
      expect(likeResponse.status).to.equal(200);

      // The response body contains the correct data
      expect(likeResponse.body.tweet.likes).to.have.lengthOf(1);

      // Remove the like
      cy.request({
        method: "DELETE",
        url: `http://localhost:3001/api/tweets/like/${tweetId}`,
        failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
      }).then((removeLikeResponse) => {
        // Assertion 1: Status is 401
        expect(removeLikeResponse.status).to.equal(401);

        // Assertion 2: Error message is "You are not authenticated"
        expect(removeLikeResponse.body.message).to.equal(
          "You are not authenticated"
        );
      });
    });
  });
});
