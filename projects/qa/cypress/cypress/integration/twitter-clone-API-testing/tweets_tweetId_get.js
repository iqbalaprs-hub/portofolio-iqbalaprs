/// <reference types="Cypress" />

describe("GET /tweets/{tweetId}", () => {
  // Declaring the variables in order to be used in the entire test suite
  let johnToken;
  let johnId;
  let ronyToken;
  let ronyId;
  let tweetId;
  let tweetAuthorId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
            Prereq.:
        
            Import the data in "twitter clone API testing/tweets_tweetId_get" in mongoDb
            The data contains the users:
              1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
            */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\tweets_tweetId_get\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\tweets_tweetId_get\\twitter-clone-db.profiles.json"
    );

    // Sign in as John in order to get John's token and then create a tweet using John's token in order to get this tweet's ID
    cy.signInAsJohnAndGetTokenAndIdAndCreateTweetAndGetTweetIdAndAuthorIdInTwitterCloneApiTesting(
      (token, id, tId, tAuthorId) => {
        johnToken = token;
        johnId = id;
        tweetId = tId;
        tweetAuthorId = tAuthorId;
      }
    );
  });

  it("1- GET /tweets/{tweetId} gives you the tweet with the specific tweet ID", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets/${tweetId}`,
    }).then((getTweetResponse) => {
      // The GET response status is 200
      expect(getTweetResponse.status).to.equal(200);

      // The response body which is the user data are correct
      expect(getTweetResponse.body.tweet._id).to.equal(tweetId);
      expect(getTweetResponse.body.tweet.text).to.equal("Hello");
      expect(getTweetResponse.body.tweet.author._id).to.equal(tweetAuthorId);
      expect(getTweetResponse.body.tweet.author.name).to.equal("John");
      expect(getTweetResponse.body.tweet.author.username).to.equal("john");
    });
  });

  it("2- GET /tweets/{tweetId} cannot give you a tweet usign an invalid tweet ID", () => {
    // We are using a wrong tweet ID for testing
    const wrongTweetId = "12345";

    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets/${wrongTweetId}`,
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((getTweetResponse) => {
      // Assertion 1: Status is 400
      expect(getTweetResponse.status).to.equal(400);
      // Assertion 2: Error message is "\"tweetId\" must be a valid mongo id"
      expect(getTweetResponse.body.message).to.equal(
        '"tweetId" must be a valid mongo id'
      );
    });
  });
});
