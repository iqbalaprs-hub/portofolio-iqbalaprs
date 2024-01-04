/// <reference types="Cypress" />

describe("Feature: Delete a tweet", () => {
  // Declaring the variables tweetId and JohnsToken here in order to be use in the entire test suite
  let johnToken;
  let ronyToken;
  let tweetId;

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
    }).then((johnLoginResponse) => {
      johnToken = johnLoginResponse.body.token;

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

    // Sign in as Rony in order to get Rony's token
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "Rony",
        password: "Clonerony23",
      },
    }).then((ronyLoginResponse) => {
      // Assertion: status is 200
      ronyToken = ronyLoginResponse.body.token;
    });
  });

  it("1- DELETE /tweets/{tweetId} deletes a tweet with a specific tweet's ID using the tweet creator's token", () => {
    // Delete the tweet using John's token adn this tweet's ID
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/tweets/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
    }).then((deleteResponse) => {
      // Assertion 1: Status is 200
      expect(deleteResponse.status).to.equal(200);

      // Assertion 2: The response body contains the correct data
      expect(deleteResponse.body.tweet.text).to.equal("Hello");
      expect(deleteResponse.body.tweet._id).to.equal(tweetId);

      // Assertion 3: The tweet "Hello" was deleted
      cy.request({
        method: "GET",
        url: `http://localhost:3001/api/tweets/${tweetId}`,
        failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
      }).then((getResponse) => {
        // Status is 404
        expect(getResponse.status).to.equal(404);

        // Error message is "Tweet not found"
        expect(getResponse.body.message).to.equal("Tweet not found");
      });
    });
  });

  it("2- DELETE /tweets/{tweetId} cannot delete the tweet with a wrong tweet's ID", () => {
    // We are using a wrong tweet's ID
    const wrongTweetId = "12345";
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/tweets/${wrongTweetId}`,
      headers: {
        Authorization: `Bearer ${johnToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((deleteResponse) => {
      // Assertion 1: Status is 400
      expect(deleteResponse.status).to.equal(400);
      // Assertion 2: Error message is ""tweetId" must be a valid mongo id"
      expect(deleteResponse.body.message).to.equal(
        '"tweetId" must be a valid mongo id'
      );
    });
  });

  it("3- DELETE /tweets/{tweetId} cannot delete the tweet with a wrong tweet creator's token", () => {
    // We are using a wrong tweet creator's token
    const wrongToken = "12345";
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/tweets/${tweetId}`,
      headers: {
        Authorization: `Bearer ${wrongToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((deleteResponse) => {
      // Assertion 1: Status is 401
      expect(deleteResponse.status).to.equal(401);
      // Assertion 2: Error message is "You are not authenticated"
      expect(deleteResponse.body.message).to.equal("You are not authenticated");
    });
  });

  it("4- DELETE /tweets/{tweetId} cannot delete a tweet by using other than the tweet creator's token", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/tweets/${tweetId}`,
      headers: {
        Authorization: `Bearer ${ronyToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((deleteResponse) => {
      // Assertion 1: Status is 403
      expect(deleteResponse.status).to.equal(403);
      // Assertion 2: Error message is "You cannot delete someone's tweet"
      expect(deleteResponse.body.message).to.equal(
        "You cannot delete someone's tweet"
      );
    });
  });

  it("5- DELETE /tweets/{tweetId} cannot delete the tweet without a token", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/tweets/${tweetId}`,
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((deleteResponse) => {
      // Assertion 1: Status is 401
      expect(deleteResponse.status).to.equal(401);
      // Assertion 2: Error message is "You are not authenticated"
      expect(deleteResponse.body.message).to.equal("You are not authenticated");
    });
  });
});
