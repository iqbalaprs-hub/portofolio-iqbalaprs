/// <reference types="Cypress" />

describe("Feature: Create a tweet", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
          Prereq.:
      
          Import the data in "twitter clone test data/3- CREATE TWEET" in mongoDb
          The data contains the users:
            1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)
          */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-API-testing\\createTweet\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone--API-testing\\createTweet\\twitter-clone-db.profiles.json"
    );
  });

  it("1- POST /tweets creates a tweet", () => {
    // Get the current date (year-month-day) for the assertion of createdAt and updatedAt
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = currentDate.getFullYear();
    const formattedDateTime = `${year}-${month}-${day}`;

    // John signs in
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "John",
        password: "Clonejohn23",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      const token = response.body.token;

      // Create a tweet using the token
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/tweets",
        body: {
          text: "Hello",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((tweetResponse) => {
        // Assertion 1: status is 201
        expect(tweetResponse.status).to.equal(201);

        // Assert on the tweet details in the response body
        expect(tweetResponse.body.tweet.repliesCount).to.equal(0);
        expect(tweetResponse.body.tweet.likes).to.deep.equal([]);
        expect(tweetResponse.body.tweet.retweets).to.deep.equal([]);
        expect(tweetResponse.body.tweet.text).to.equal("Hello");
        expect(tweetResponse.body.tweet.createdAt).to.include(
          formattedDateTime
        );
        expect(tweetResponse.body.tweet.updatedAt).to.include(
          formattedDateTime
        );
      });
    });
  });

  it("2- POST /tweets cannot create a tweet with an invalid user's token ", () => {
    const token = "12345";

    // John signs in
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "John",
        password: "Clonejohn23",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);

      // Create a tweet using the token
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/tweets",
        body: {
          text: "Hello",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
      }).then((tweetResponse) => {
        // Assertion 1: status is 401
        expect(tweetResponse.status).to.equal(401);
        // Assertion 2: error message is "You are not authenticated"
        expect(tweetResponse.body.message).to.equal(
          "You are not authenticated"
        );
      });
    });
  });

  it("3- POST /tweets cannot create a tweet with more than 280 characters ", () => {
    // John signs in
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "John",
        password: "Clonejohn23",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      const token = response.body.token;

      // Create a tweet using the token
      cy.request({
        method: "POST",
        url: "http://localhost:3001/api/tweets",
        body: {
          text: "Hello everyone. Today is a very beautiful morning. My breakfeast consisted of eggs and bacons and pancakes with syrup and a big glass of lemonade. I looked outside the window, the nature was green and clean, the sky was blue, there was no annoying car noises anywhere. I want to stay",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
      }).then((tweetResponse) => {
        // Assertion 1: status is 401
        expect(tweetResponse.status).to.equal(400);
        // Assertion 2: error message is ""text" length must be less than or equal to 280 characters long"
        expect(tweetResponse.body.message).to.equal(
          '"text" length must be less than or equal to 280 characters long'
        );
      });
    });
  });
});
