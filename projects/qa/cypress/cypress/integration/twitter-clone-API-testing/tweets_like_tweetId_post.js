/// <reference types="Cypress" />

describe("POST tweets/like/{tweetId}", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  let johnToken;
  let johnId;
  let tweetId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
              Prereq.:
          
              Import the data in "twitter clone API testing/tweets_like_tweetId_post" in mongoDb
              The data contains the user:
                  1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
              */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\tweets_like_tweetId_post\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\tweets_like_tweetId_post\\twitter-clone-db.profiles.json"
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

  it("1- POST /tweets/like/{tweetId} likes the tweet", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:3001/api/tweets/like/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((likeResponse) => {
      // Assertion 1: Status is 200
      expect(likeResponse.status).to.equal(200);

      // Assertion 2: The response body contains the correct data
      expect(likeResponse.body.tweet.text).to.equal("Hello");
      expect(likeResponse.body.tweet.likes).to.have.lengthOf(1);
      expect(likeResponse.body.tweet.likes[0]).to.equal(johnId);
    });
  });

  it("2- POST /tweets/like/{tweetId} do not delete like when done twice", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:3001/api/tweets/like/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((likeResponse) => {
      expect(likeResponse.status).to.equal(200);
      expect(likeResponse.body.tweet.likes).to.have.lengthOf(1);

      cy.request({
        method: "POST",
        url: `http://localhost:3001/api/tweets/like/${tweetId}`,
        headers: {
          Authorization: `Bearer ${johnToken}`,
        },
        failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
      }).then((likeTwiceresponse) => {
        // Assertion 1: Status is 400
        expect(likeTwiceresponse.status).to.equal(400);

        // Assertion 2: Error message is "User already likes a tweet"
        expect(likeTwiceresponse.body.message).to.equal(
          "User already likes a tweet"
        );
      });
    });
  });

  it("3- POST /tweets/like/{tweetId} cannot like a tweet using wrong tweet ID", () => {
    const wrongID = "12345";
    cy.request({
      method: "POST",
      url: `http://localhost:3001/api/tweets/like/${wrongID}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((likeResponse) => {
      // Assertion 1: Status is 400
      expect(likeResponse.status).to.equal(400);

      // Assertion 2: Error message is "\"tweetId\" must be a valid mongo id"
      expect(likeResponse.body.message).to.equal(
        '"tweetId" must be a valid mongo id'
      );
    });
  });

  it("4- POST /tweets/like/{tweetId} cannot like a tweet with a wrong user's token", () => {
    const wrongToken = "12345";
    cy.request({
      method: "POST",
      url: `http://localhost:3001/api/tweets/like/${tweetId}`,
      headers: {
        Authorization: `Bearer ${wrongToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((likeResponse) => {
      // Assertion 1: Status is 401
      expect(likeResponse.status).to.equal(401);

      // Assertion 2: Error message is "You are not authenticated"
      expect(likeResponse.body.message).to.equal("You are not authenticated");
    });
  });

  it("5- POST /tweets/like/{tweetId} cannot like a tweet without user's token", () => {
    cy.request({
      method: "POST",
      url: `http://localhost:3001/api/tweets/like/${tweetId}`,

      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((likeResponse) => {
      // Assertion 1: Status is 401
      expect(likeResponse.status).to.equal(401);

      // Assertion 2: Error message is "You are not authenticated"
      expect(likeResponse.body.message).to.equal("You are not authenticated");
    });
  });
});
