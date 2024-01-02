/// <reference types="Cypress" />

describe("Feature: Delete a tweet", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  var johnsToken;
  var tweetId;

  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
              Prereq.:
          
              Import the data in "twitter clone test data/REPLY TWEET " in mongoDb
              The data contains the users:
                1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)

                2- Name: Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
              */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-API-testing\\replyTweet\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone--API-testing\\replyTweet\\twitter-clone-db.profiles.json"
    );

    // Sign in as John in order to get the John's token
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

      // Create a tweet using John's token in order to get this tweet's ID
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/tweets",
        body: {
          text: "Hello",
        },
        headers: {
          Authorization: `Bearer ${johnsToken}`,
        },
      }).then((tweetResponse) => {
        expect(tweetResponse.status).to.equal(201);
        tweetId = tweetResponse.body.tweet._id;
      });
    });
  });

  it("1- POST /tweets can create a reply to a tweet", () => {
    // The user John reply to his tweet "Hello"
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/tweets",
      body: {
        text: "Reply",
        replyTo: tweetId,
      },
      headers: {
        Authorization: `Bearer ${johnsToken}`,
      },
    }).then((replyTweetResponse) => {
      // Assertion 1: status is 201
      expect(replyTweetResponse.status).to.equal(201);

      // Assertion 2: content of the response body is true
      expect(replyTweetResponse.body.tweet.repliesCount).to.equal(0);
      expect(replyTweetResponse.body.tweet.likes).to.deep.equal([]);
      expect(replyTweetResponse.body.tweet.retweets).to.deep.equal([]);
      expect(replyTweetResponse.body.tweet.text).to.equal("Reply");
      expect(replyTweetResponse.body.tweet.replyTo).to.equal(tweetId);

      // We are extracting the ID of the tweet's reply and we are asserting that this reply is created
      var replyTweetId = replyTweetResponse.body.tweet._id;
      cy.request({
        method: "GET",
        url: `http://localhost:3001/api/tweets/${replyTweetId}`,
      }).then((getTweetResponse) => {
        expect(getTweetResponse.body.tweet.text).to.equal("Reply");
        expect(getTweetResponse.body.tweet._id).to.equal(replyTweetId);
      });
    });
  });

  it("2- POST /tweets cannot create a reply with more than 280 characters", () => {
    // The user John reply to his tweet "Hello everyone. Today is a very beautiful morning. My breakfeast consisted of eggs and bacons and pancakes with syrup and a big glass of lemonade. I looked outside the window, the nature was green and clean, the sky was blue, there was no annoying car noises anywhere. I want to stay"
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/tweets",
      body: {
        text: "Hello everyone. Today is a very beautiful morning. My breakfeast consisted of eggs and bacons and pancakes with syrup and a big glass of lemonade. I looked outside the window, the nature was green and clean, the sky was blue, there was no annoying car noises anywhere. I want to stay",
        replyTo: tweetId,
      },
      headers: {
        Authorization: `Bearer ${johnsToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((replyTweetResponse) => {
      // Assertion 1: status is 400
      expect(replyTweetResponse.status).to.equal(400);
      // Assertion 2: error message is ""text" length must be less than or equal to 280 characters long"
      expect(replyTweetResponse.body.message).to.equal(
        '"text" length must be less than or equal to 280 characters long'
      );
    });
  });
});
