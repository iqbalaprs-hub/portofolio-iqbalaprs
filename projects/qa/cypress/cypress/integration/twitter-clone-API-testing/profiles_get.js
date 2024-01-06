/// <reference types="Cypress" />

describe("GET /profiles", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\clear_mongo.bat twitter-clone-db");

    /*
              Prereq.:
          
              Import the data in "twitter clone API testing/tweets_get" in mongoDb
              The data contains 15 users:
                1- Name: User1 (username: user1; email: user1@gmail.com; password: Cloneuser1)
                2- Name: User2 (username: user2; email: user2@gmail.com; password: Cloneuser2)
                3- Name: User3 (username: user3; email: user3@gmail.com; password: Cloneuser3)
                4- Name: User4 (username: user4; email: user4@gmail.com; password: Cloneuser4)
                5- Name: User5 (username: user5; email: user5@gmail.com; password: Cloneuser5)
                6- Name: User6 (username: user6; email: user6@gmail.com; password: Cloneuser6)
                7- Name: User7 (username: user7; email: user7@gmail.com; password: Cloneuser7)
                8- Name: User8 (username: user8; email: user8@gmail.com; password: Cloneuser8)
                9- Name: User9 (username: user9; email: user9@gmail.com; password: Cloneuser9)
                10- Name: User10 (username: user10; email: user10@gmail.com; password: Cloneuser10)
                11- Name: User11 (username: user11; email: user11@gmail.com; password: Cloneuser11)
                12- Name: User12 (username: user12; email: user12@gmail.com; password: Cloneuser12)
                13- Name: User13 (username: user13; email: user13@gmail.com; password: Cloneuser13)
                14- Name: User14 (username: user14; email: user14@gmail.com; password: Cloneuser14)
                15- Name: User15 (username: user15; email: user15@gmail.com; password: Cloneuser15)
              */
    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db users .\\cypress\\fixtures\\twitter-clone-API-testing\\profiles_get\\twitter-clone-db.users.json"
    );

    cy.exec(
      ".\\cypress\\scripts\\import_data_to_mongo.bat twitter-clone-db profiles .\\cypress\\fixtures\\twitter-clone-API-testing\\profiles_get\\twitter-clone-db.profiles.json"
    );
  });

  it("1- GET /profiles returns the first 10 profiles (from oldest member) of the the total of 15 profiles", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/profiles`,
    }).then((getProfilesresponse) => {
      // Assertion 1: Status is 200
      expect(getProfilesresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 profiles.
      expect(getProfilesresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /profiles should behave by default as /profiles?page=1, thus it should be the first page
      expect(getProfilesresponse.body.page).to.equal(1);

      // Assertion 4: The endpoint returns a maximum of 10 profiles (limit is 10). Since there are 15 profiles, they will be divided into 2 pages ( First page has 10 profiles and second page has 5 profiles (We will assert it in the testcase later)).
      expect(getProfilesresponse.body.limit).to.equal(10);
      expect(getProfilesresponse.body.results).to.have.lengthOf(10);
      expect(getProfilesresponse.body.totalPages).to.equal(2);

      // Assertion 5: The profiles displayed in the response body are "User1", "User2"... "User10"
      expect(getProfilesresponse.body.results[0].user.name).to.equal("User1");
      expect(getProfilesresponse.body.results[1].user.name).to.equal("User2");
      expect(getProfilesresponse.body.results[2].user.name).to.equal("User3");
      expect(getProfilesresponse.body.results[3].user.name).to.equal("User4");
      expect(getProfilesresponse.body.results[4].user.name).to.equal("User5");
      expect(getProfilesresponse.body.results[5].user.name).to.equal("User6");
      expect(getProfilesresponse.body.results[6].user.name).to.equal("User7");
      expect(getProfilesresponse.body.results[7].user.name).to.equal("User8");
      expect(getProfilesresponse.body.results[8].user.name).to.equal("User9");
      expect(getProfilesresponse.body.results[9].user.name).to.equal("User10");
    });
  });

  it("2- GET /profiles/?page=1 returns the first 10 profiles (from oldest member) of the the total of 15 profiles", () => {
    // Since both "GET /profiles" and "GET /profiles/?page=1" have the same result, their assertions are similar
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/profiles`,
    }).then((getProfilesresponse) => {
      // Assertion 1: Status is 200
      expect(getProfilesresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 profiles.
      expect(getProfilesresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /profiles/?page=1 returns the first page
      expect(getProfilesresponse.body.page).to.equal(1);

      // Assertion 4: The endpoint returns a maximum of 10 profiles (limit is 10). Since there are 15 profiles, they will be divided into 2 pages ( First page has 10 profiles and second page has 5 profiles (We will assert it in the testcase later)).
      expect(getProfilesresponse.body.limit).to.equal(10);
      expect(getProfilesresponse.body.results).to.have.lengthOf(10);
      expect(getProfilesresponse.body.totalPages).to.equal(2);

      // Assertion 5: The profiles displayed in the response body are "User1", "User2"... "User10"
      expect(getProfilesresponse.body.results[0].user.name).to.equal("User1");
      expect(getProfilesresponse.body.results[1].user.name).to.equal("User2");
      expect(getProfilesresponse.body.results[2].user.name).to.equal("User3");
      expect(getProfilesresponse.body.results[3].user.name).to.equal("User4");
      expect(getProfilesresponse.body.results[4].user.name).to.equal("User5");
      expect(getProfilesresponse.body.results[5].user.name).to.equal("User6");
      expect(getProfilesresponse.body.results[6].user.name).to.equal("User7");
      expect(getProfilesresponse.body.results[7].user.name).to.equal("User8");
      expect(getProfilesresponse.body.results[8].user.name).to.equal("User9");
      expect(getProfilesresponse.body.results[9].user.name).to.equal("User10");
    });
  });

  it("3- GET /profiles/?page=2 returns the 5 remaining profiles of the the total of 15 profiles", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/profiles/?page=2`,
    }).then((getProfilesresponse) => {
      // Assertion 1: Status is 200
      expect(getProfilesresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 profiles.
      expect(getProfilesresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /profiles/?page=2 returns the second page
      expect(getProfilesresponse.body.page).to.equal(2);

      // Assertion 4: The endpoint returns a maximum of 10 profiles (limit is 10). Since there are 15 profiles, they will be divided into 2 pages ( First page has 10 profiles and second page has 5 profiles). Thus GET /profiles/?page=2 returns 5 profiles
      expect(getProfilesresponse.body.limit).to.equal(10);
      expect(getProfilesresponse.body.results).to.have.lengthOf(5);
      expect(getProfilesresponse.body.totalPages).to.equal(2);

      // Assertion 5: The profiles displayed in the response body are "User11", "User12","User13"."User14","User15"
      expect(getProfilesresponse.body.results[0].user.name).to.equal("User11");
      expect(getProfilesresponse.body.results[1].user.name).to.equal("User12");
      expect(getProfilesresponse.body.results[2].user.name).to.equal("User13");
      expect(getProfilesresponse.body.results[3].user.name).to.equal("User14");
      expect(getProfilesresponse.body.results[4].user.name).to.equal("User15");
    });
  });

  it("4- GET /profiles/?page=3 returns no profiles", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3001/api/profiles/?page=3`,
    }).then((getProfilesresponse) => {
      // Assertion 1: Status is 200
      expect(getProfilesresponse.status).to.equal(200);

      // Assertion 2: There is a total of 15 profiles.
      expect(getProfilesresponse.body.totalResults).to.equal(15);

      // Assertion 3: GET /profiles/?page=3 returns the third page
      expect(getProfilesresponse.body.page).to.equal(3);

      // Assertion 4: The endpoint returns a maximum of 10 profiles (limit is 10). Since there are 15 profiles, they will be divided into 2 pages ( First page has 10 profiles and second page has 5 profiles). Thus GET /profiles/?page=3 returns no profiles
      expect(getProfilesresponse.body.limit).to.equal(10);
      expect(getProfilesresponse.body.results).to.be.empty;
      expect(getProfilesresponse.body.totalPages).to.equal(2);
    });
  });
});
