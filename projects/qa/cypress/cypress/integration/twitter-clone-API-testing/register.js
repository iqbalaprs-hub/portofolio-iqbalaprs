/// <reference types="Cypress" />

describe("Feature: Register", () => {
  beforeEach(() => {
    // Prereq.: The database is empty. There are no users in the database
    cy.exec(".\\cypress\\scripts\\twitter-clone-e2e\\clear_mongo.bat");

    /*
      Prereq.:
  
      Import the data in "twitter clone test data/1- Register" in mongoDb 
      (The data contains a user named John with username "john", email "john@gmail.com" and password "Clonejohn23")
      */
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat users .\\cypress\\fixtures\\twitter-clone-API-testing\\register\\twitter-clone-db.users.json"
    );
    cy.exec(
      ".\\cypress\\scripts\\twitter-clone-e2e\\import_data_to_mongo.bat profiles .\\cypress\\fixtures\\twitter-clone--API-testing\\register\\twitter-clone-db.profiles.json"
    );
  });

  it("1- POST /auth/register creates a user's account", () => {
    // Get the current date (year-month-day) for the assertion of createdAt and updatedAt
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = currentDate.getFullYear();
    const formattedDateTime = `${year}-${month}-${day}`;

    // Define the request payload
    const payload = {
      name: "Rony",
      email: "rony@gmail.com",
      username: "rony",
      password: "Clonerony23",
    };

    // Make the POST request
    cy.request({
      method: "POST",
      url: "http://localhost:3001/api/auth/register",
      body: payload,
    }).then((response) => {
      // Assertion 1: Assert that the response status is 201
      expect(response.status).to.equal(201);

      // Assertion 2: Assert that the response body contains the correct data (name, email, username, createdAt, updatedAt)
      expect(response.body.user).to.have.property("name", "Rony");
      expect(response.body.user).to.have.property("email", "rony@gmail.com");
      expect(response.body.user).to.have.property("username", "rony");
      expect(response.body.user.createdAt).to.include(formattedDateTime);
      expect(response.body.user.updatedAt).to.include(formattedDateTime);

      //   Assertion 3: Assert that the user's account was truly created after registration (Sign Up). We will get the user details by using user's ID and user's token and assert the data is correct
      const userId = response.body.user._id;
      const token = response.body.token;
      cy.request({
        method: "GET",
        url: `http://localhost:3001/api/users/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((getUserResponse) => {
        // Assert that the GET response status is 200
        expect(getUserResponse.status).to.equal(200);

        // Assert that the user details are correct in the GET response
        expect(getUserResponse.body.user).to.have.property("name", "Rony");
        expect(getUserResponse.body.user).to.have.property(
          "email",
          "rony@gmail.com"
        );
        expect(getUserResponse.body.user).to.have.property("username", "rony");
        expect(getUserResponse.body.user.createdAt).to.include(
          formattedDateTime
        );
        expect(getUserResponse.body.user.updatedAt).to.include(
          formattedDateTime
        );
      });
    });
  });
});
