/// <reference types="Cypress" />

describe("Feature: Get tweets and replies", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
            Prereq.:
        
            Import the data in "twitter clone API testing/tweets_get" in mongoDb
            The data contains the users:
              1- Name: John (username: john; email: john@gmail.com; password: Clonejohn23)

              15 tweets writen by John: "Tweet1", "Tweet2", "Tweet3".... "tweet15"

              The tweet with text "Tweet15" has 15 replies named "Reply1", "Reply2", "Reply3"... "Reply15"
            */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\tweets_get\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\tweets_get\\twitter-clone-db.profiles.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db tweets .\\cypress\\fixtures\\twitter-clone-API-testing\\tweets_get\\twitter-clone-db.tweets.json"
    );
  });

  it("1- GET /tweets gives the newest 10 tweets of the the total of 15 tweets", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets`,
    }).then((getTweetsresponse) => {
      // Assertion 1: Status is 200
      expect(getTweetsresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 tweets. Even though the tweet with the text "Tweet15" has 15 replies, the endpoint gives 15 tweets
      expect(getTweetsresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /tweets should behave by default as /tweets?page=1, thus it should be the first page
      expect(getTweetsresponse.body.page).to.equal(1);

      // Assertion 4: The endpoint returns a maximum of 10 tweets (limit is 10). Since there are 15 tweets, they will be divided into 2 pages ( First page has 10 tweets and second page has 5 tweets(We will assert it in the testcase later)).
      expect(getTweetsresponse.body.limit).to.equal(10);
      expect(getTweetsresponse.body.results).to.have.lengthOf(10);
      expect(getTweetsresponse.body.totalPages).to.equal(2);

      // Assertion 5: The first page should display from the newest tweet, which is at the top of the page (this was tested adn proved in the Twitter-Clone End-to-end test). Thus there must be tweets from "Tweet15", "Tweet14"... "Tweet6"
      expect(getTweetsresponse.body.results[0].text).to.equal("Tweet15");
      expect(getTweetsresponse.body.results[1].text).to.equal("Tweet14");
      expect(getTweetsresponse.body.results[2].text).to.equal("Tweet13");
      expect(getTweetsresponse.body.results[3].text).to.equal("Tweet12");
      expect(getTweetsresponse.body.results[4].text).to.equal("Tweet11");
      expect(getTweetsresponse.body.results[5].text).to.equal("Tweet10");
      expect(getTweetsresponse.body.results[6].text).to.equal("Tweet9");
      expect(getTweetsresponse.body.results[7].text).to.equal("Tweet8");
      expect(getTweetsresponse.body.results[8].text).to.equal("Tweet7");
      expect(getTweetsresponse.body.results[9].text).to.equal("Tweet6");
    });
  });

  it("2- GET /tweets?page=1 gives the newest 10 tweets of the the total of 15 tweets", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets?page=1`,
    }).then((getTweetsresponse) => {
      // Both "GET /tweets" and "GET /tweets?page=1" give the same result, thus their assertions are similar
      // Assertion 1: Status is 200
      expect(getTweetsresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 tweets. Even though the tweet with the text "Tweet15" has 15 replies, the endpoint gives 15 tweets
      expect(getTweetsresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /tweets?page=1 gives the first page
      expect(getTweetsresponse.body.page).to.equal(1);

      // Assertion 4: The endpoint returns a maximum of 10 tweets (limit is 10). Since there are 15 tweets, they will be divided into 2 pages ( First page has 10 tweets and second page has 5 tweets(We will assert it in the testcase later)).
      expect(getTweetsresponse.body.limit).to.equal(10);
      expect(getTweetsresponse.body.results).to.have.lengthOf(10);
      expect(getTweetsresponse.body.totalPages).to.equal(2);

      // Assertion 5: The first page should display from newest tweet, which is at the top of the page (this was tested adn proved in the Twitter-Clone End-to-end test). Thus there must be tweets from "Tweet15", "Tweet14"... "Tweet6"
      expect(getTweetsresponse.body.results[0].text).to.equal("Tweet15");
      expect(getTweetsresponse.body.results[1].text).to.equal("Tweet14");
      expect(getTweetsresponse.body.results[2].text).to.equal("Tweet13");
      expect(getTweetsresponse.body.results[3].text).to.equal("Tweet12");
      expect(getTweetsresponse.body.results[4].text).to.equal("Tweet11");
      expect(getTweetsresponse.body.results[5].text).to.equal("Tweet10");
      expect(getTweetsresponse.body.results[6].text).to.equal("Tweet9");
      expect(getTweetsresponse.body.results[7].text).to.equal("Tweet8");
      expect(getTweetsresponse.body.results[8].text).to.equal("Tweet7");
      expect(getTweetsresponse.body.results[9].text).to.equal("Tweet6");
    });
  });

  it("3- /tweets?page=2 gives the last 5 remaining tweets of the the total of 15 tweets", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets?page=2`,
    }).then((getTweetsresponse) => {
      // Assertion 1: Status is 200
      expect(getTweetsresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 tweets. Even though the tweet with the text "Tweet15" has 15 replies, the endpoint gives 15 tweets
      expect(getTweetsresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /tweets?page=2 gives the second page
      expect(getTweetsresponse.body.page).to.equal(2);

      // Assertion 4: The endpoint returns a maximum of 10 tweets (limit is 10). Since there are 15 tweets, they will be divided into 2 pages ( First page has 10 tweets (as shown in the testcase before) and second page has 5 tweets). Thus this endpoint gives 5 tweets
      expect(getTweetsresponse.body.limit).to.equal(10);
      expect(getTweetsresponse.body.results).to.have.lengthOf(5);
      expect(getTweetsresponse.body.totalPages).to.equal(2);

      // Assertion 5: The second page displays the last remainning 5 tweets. THe tweets are "Tweet5", "Tweet4", "Tweet3", "Tweet2", "Tweet1"
      expect(getTweetsresponse.body.results[0].text).to.equal("Tweet5");
      expect(getTweetsresponse.body.results[1].text).to.equal("Tweet4");
      expect(getTweetsresponse.body.results[2].text).to.equal("Tweet3");
      expect(getTweetsresponse.body.results[3].text).to.equal("Tweet2");
      expect(getTweetsresponse.body.results[4].text).to.equal("Tweet1");
    });
  });

  it("4- /tweets?page=3 gives no tweets", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets?page=3`,
    }).then((getTweetsresponse) => {
      // Assertion 1: Status is 200
      expect(getTweetsresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 tweets. Even though the tweet with the text "Tweet15" has 15 replies, the endpoint gives 15 tweets
      expect(getTweetsresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /tweets?page=3 gives the third page
      expect(getTweetsresponse.body.page).to.equal(3);

      // Assertion 4: The endpoint returns a maximum of 10 tweets (limit is 10). Since there are 15 tweets, they will be divided into 2 pages ( First page has 10 tweets (as shown in the testcase before) and second page has 5 tweets (as shown in the testcase before)). Thus this endpoint gives no tweet
      expect(getTweetsresponse.body.limit).to.equal(10);
      expect(getTweetsresponse.body.results).to.be.empty;
      expect(getTweetsresponse.body.totalPages).to.equal(2);
    });
  });

  it("5- GET /tweets?replyTo=65984eb581a8ab0ca4337727 gives the newest 10 replies from a total of 15 replies", () => {
    // In the query parameter "replyTo", you must write the tweet's ID. "65984eb581a8ab0ca4337727" is the ID of the newest tweet which has a text "Tweet15". This tweet has 15 replies
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets?replyTo=65984eb581a8ab0ca4337727`,
    }).then((getReplysresponse) => {
      // Assertion 1: Status is 200
      expect(getReplysresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 replies to the tweet with text "Tweet15".
      expect(getReplysresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /tweets?replyTo=65984eb581a8ab0ca4337727 should behave by default as /tweets?replyTo=65984eb581a8ab0ca4337727&page=1, thus it should be the first page
      expect(getReplysresponse.body.page).to.equal(1);

      // Assertion 4: The endpoint returns a maximum of 10 tweets (limit is 10). Since there are 15 replies, they will be divided into 2 pages ( First page has 10 replies and second page has 5 replies (We will assert it in the testcase later)).
      expect(getReplysresponse.body.limit).to.equal(10);
      expect(getReplysresponse.body.results).to.have.lengthOf(10);
      expect(getReplysresponse.body.totalPages).to.equal(2);

      // Assertion 5: The first page should display from the newest reply, which is at the top of the page. Thus there must be replies from "Reply15", "Reply14"... "Reply6"
      expect(getReplysresponse.body.results[0].text).to.equal("Reply15");
      expect(getReplysresponse.body.results[1].text).to.equal("Reply14");
      expect(getReplysresponse.body.results[2].text).to.equal("Reply13");
      expect(getReplysresponse.body.results[3].text).to.equal("Reply12");
      expect(getReplysresponse.body.results[4].text).to.equal("Reply11");
      expect(getReplysresponse.body.results[5].text).to.equal("Reply10");
      expect(getReplysresponse.body.results[6].text).to.equal("Reply9");
      expect(getReplysresponse.body.results[7].text).to.equal("Reply8");
      expect(getReplysresponse.body.results[8].text).to.equal("Reply7");
      expect(getReplysresponse.body.results[9].text).to.equal("Reply6");
    });
  });

  it("6- GET /tweets?replyTo=65984eb581a8ab0ca4337727&page=1 gives the newest 10 replies from a total of 15 replies", () => {
    // In the query parameter "replyTo", you must write the tweet's ID. "65984eb581a8ab0ca4337727" is the ID of the newest tweet which has a text "Tweet15". This tweet has 15 replies
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets?replyTo=65984eb581a8ab0ca4337727&page=1`,
    }).then((getReplysresponse) => {
      // Assertion 1: Status is 200
      expect(getReplysresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 replies to the tweet with text "Tweet15".
      expect(getReplysresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /tweets?replyTo=65984eb581a8ab0ca4337727&page=1 gives the first page
      expect(getReplysresponse.body.page).to.equal(1);

      // Assertion 4: The endpoint returns a maximum of 10 tweets (limit is 10). Since there are 15 replies, they will be divided into 2 pages ( First page has 10 replies and second page has 5 replies (We will assert it in the testcase later)). Thus this endpoint gives 10 replies
      expect(getReplysresponse.body.limit).to.equal(10);
      expect(getReplysresponse.body.results).to.have.lengthOf(10);
      expect(getReplysresponse.body.totalPages).to.equal(2);

      // Assertion 5: The first page should display from the newest reply, which is at the top of the page. Thus there must be replies from "Reply15", "Reply14"... "Reply6"
      expect(getReplysresponse.body.results[0].text).to.equal("Reply15");
      expect(getReplysresponse.body.results[1].text).to.equal("Reply14");
      expect(getReplysresponse.body.results[2].text).to.equal("Reply13");
      expect(getReplysresponse.body.results[3].text).to.equal("Reply12");
      expect(getReplysresponse.body.results[4].text).to.equal("Reply11");
      expect(getReplysresponse.body.results[5].text).to.equal("Reply10");
      expect(getReplysresponse.body.results[6].text).to.equal("Reply9");
      expect(getReplysresponse.body.results[7].text).to.equal("Reply8");
      expect(getReplysresponse.body.results[8].text).to.equal("Reply7");
      expect(getReplysresponse.body.results[9].text).to.equal("Reply6");
    });
  });

  it("7- GET /tweets?replyTo=65984eb581a8ab0ca4337727&page=2 gives the last 5 remaining replies of the the total of 15 replies", () => {
    // In the query parameter "replyTo", you must write the tweet's ID. "65984eb581a8ab0ca4337727" is the ID of the newest tweet which has a text "Tweet15". This tweet has 15 replies
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets?replyTo=65984eb581a8ab0ca4337727&page=2`,
    }).then((getReplysresponse) => {
      // Assertion 1: Status is 200
      expect(getReplysresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 replies to the tweet with text "Tweet15".
      expect(getReplysresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /tweets?replyTo=65984eb581a8ab0ca4337727&page=2 gives the second page
      expect(getReplysresponse.body.page).to.equal(2);

      // Assertion 4: The endpoint returns a maximum of 10 tweets (limit is 10). Since there are 15 replies, they will be divided into 2 pages ( First page has 10 replies and second page has 5 replies (We will assert it in the testcase later)). Thus this endpoint gives 5 replies
      expect(getReplysresponse.body.limit).to.equal(10);
      expect(getReplysresponse.body.results).to.have.lengthOf(5);
      expect(getReplysresponse.body.totalPages).to.equal(2);

      // Assertion 5: The first page should display from the newest reply, which is at the top of the page. Thus there must be replies from "Reply15", "Reply14"... "Reply6"
      expect(getReplysresponse.body.results[0].text).to.equal("Reply5");
      expect(getReplysresponse.body.results[1].text).to.equal("Reply4");
      expect(getReplysresponse.body.results[2].text).to.equal("Reply3");
      expect(getReplysresponse.body.results[3].text).to.equal("Reply2");
      expect(getReplysresponse.body.results[4].text).to.equal("Reply1");
    });
  });

  it("8- GET /tweets?replyTo=65984eb581a8ab0ca4337727&page=3 gives no replies", () => {
    // In the query parameter "replyTo", you must write the tweet's ID. "65984eb581a8ab0ca4337727" is the ID of the newest tweet which has a text "Tweet15". This tweet has 15 replies
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets?replyTo=65984eb581a8ab0ca4337727&page=3`,
    }).then((getReplysresponse) => {
      // Assertion 1: Status is 200
      expect(getReplysresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 replies to the tweet with text "Tweet15".
      expect(getReplysresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /tweets?replyTo=65984eb581a8ab0ca4337727&page=3 gives the third page
      expect(getReplysresponse.body.page).to.equal(3);

      // Assertion 4: The endpoint returns a maximum of 10 tweets (limit is 10). Since there are 15 replies, they will be divided into 2 pages ( First page has 10 replies and second page has 5 replies). Thus this endpoint gives no replies (It is empty)
      expect(getReplysresponse.body.limit).to.equal(10);
      expect(getReplysresponse.body.results).to.be.empty;
      expect(getReplysresponse.body.totalPages).to.equal(2);
    });
  });

  it("9- GET /tweets?replyTo=  gives no replies", () => {
    // In the query parameter "replyTo", you must write the tweet's ID. But here it is empty
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets?replyTo=`,
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((getReplysresponse) => {
      // Assertion 1: Status is 400
      expect(getReplysresponse.status).to.equal(400);

      // Assertion 2: Error message is "\"replyTo\" is not allowed to be empty"
      expect(getReplysresponse.body.message).to.equal(
        '"replyTo" is not allowed to be empty'
      );
    });
  });

  it("10- GET /tweets?replyTo=(wrong tweet's ID)  gives no replies", () => {
    // In the query parameter "replyTo", you must write the tweet's ID. But here the tweet's ID is wrong
    const wrongTweetId = "12345";
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/tweets?replyTo=${wrongTweetId}`,
      failOnStatusCode: false, // Allows the test to continue even if the status code is not 2xx
    }).then((getReplysresponse) => {
      // Assertion 1: Status is 400
      expect(getReplysresponse.status).to.equal(400);

      // Assertion 2: Error message is "\"replyTo\" must be a valid mongo id"
      expect(getReplysresponse.body.message).to.equal(
        '"replyTo" must be a valid mongo id'
      );
    });
  });
});
