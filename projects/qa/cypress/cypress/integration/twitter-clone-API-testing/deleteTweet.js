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
        
            Import the data in "twitter clone test data/DELETE TWEET" in mongoDb
            The data contains the users:
                1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)

                2- Name: Rony (username: rony; email: rony@gmail.com; password: Clonerony23)
            */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-API-testing\\deleteTweet\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone--API-testing\\deleteTweet\\twitter-clone-db.profiles.json"
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

  it("1- DELETE /tweets/{tweetId} deletes a tweet with a specific tweet's ID using the tweet creator's token", () => {
    // Delete the tweet using John's token adn this tweet's ID
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/tweets/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnsToken}`,
      },
    }).then((deleteResponse) => {
      // Assertion 1: status is 200
      expect(deleteResponse.status).to.equal(200);

      // Assertion 2: content of the response body is true
      expect(deleteResponse.body.tweet.text).to.equal("Hello");
      expect(deleteResponse.body.tweet._id).to.equal(tweetId);

      // Asserting that the tweet "Hello" was deleted
      cy.request({
        method: "GET",
        url: `http://localhost:3001/api/tweets/${tweetId}`,
        failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
      }).then((getResponse) => {
        // Assertion 1: status is 404
        expect(getResponse.status).to.equal(404);

        // Assertion 2: error message is "Tweet not found"
        expect(getResponse.body.message).to.equal("Tweet not found");
      });
    });
  });

  it("2- DELETE /tweets/{tweetId} cannot delete the tweet with a wrong tweet's ID", () => {
    // We are using any wrong tweet's ID, for example: tweetId = "12345"
    tweetId = "12345";
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/tweets/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnsToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((deleteResponse) => {
      // Assertion 1: status is 400
      expect(deleteResponse.status).to.equal(400);
      // Assertion 2: error message is ""tweetId" must be a valid mongo id"
      expect(deleteResponse.body.message).to.equal(
        '"tweetId" must be a valid mongo id'
      );
    });
  });

  it("3- DELETE /tweets/{tweetId} cannot delete the tweet with tweet creator's token being wrong", () => {
    // We are using any wrong tweet creator's token, for example: johnsToken = "12345"
    johnsToken = "12345";
    cy.request({
      method: "DELETE",
      url: `http://localhost:3001/api/tweets/${tweetId}`,
      headers: {
        Authorization: `Bearer ${johnsToken}`,
      },
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((deleteResponse) => {
      // Assertion 1: status is 401
      expect(deleteResponse.status).to.equal(401);
      // Assertion 2: error message is "You are not authenticated"
      expect(deleteResponse.body.message).to.equal("You are not authenticated");
    });
  });

  it("4- DELETE /tweets/{tweetId} cannot delete a tweet by using other than the tweet creator's token", function () {
    // Signs in as Rony
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/login",
      body: {
        username: "Rony",
        password: "Clonerony23",
      },
    }).then((loginResponse) => {
      // Assertion: status is 200
      expect(loginResponse.status).to.equal(200);

      // Assertion: Assert that the response body contains the correct data (name, email, username)
      expect(loginResponse.body.user.name).to.equal("Rony");
      expect(loginResponse.body.user.email).to.equal("rony@gmail.com");
      expect(loginResponse.body.user.username).to.equal("rony");

      // NB: johnsToken is supposed to have john's token for authentication. BUT, in this case since we login as Rony, johnsToken will take rony's token instead of John's token
      johnsToken = loginResponse.body.token;

      cy.request({
        method: "DELETE",
        url: `http://localhost:3001/api/tweets/${tweetId}`,
        headers: {
          Authorization: `Bearer ${johnsToken}`,
        },
        failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
      }).then((deleteResponse) => {
        // Assertion 1: status is 403
        expect(deleteResponse.status).to.equal(403);
        // Assertion 2: error message is "You cannot delete someone's tweet"
        expect(deleteResponse.body.message).to.equal(
          "You cannot delete someone's tweet"
        );
      });
    });
  });
});
