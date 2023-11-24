/// <reference types="Cypress" />

describe("API test for endpoint GET all", function () {
  it("1- /all returns all countries with all properties", () => {
    cy.request("GET", "https://restcountries.com/v3.1/all").then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains all objects (all countries)
      cy.wrap(response.body).should("have.length", 250);
      cy.log("There are 250 countries");

      response.body.forEach((country, index) => {
        // Access the different properties
        const commonName = country.name.common;
        cy.log(`Common Name ${index + 1}: ${commonName}`);
      });
    });
  });

  it("2- Test the query parameter 'fields' and get only 3 properties 'name' and 'capital', currencies", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/all?fields=name,capital,currencies"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains all objects (all countries)
      cy.wrap(response.body).should("have.length", 250);
      cy.log("There are 250 countries");

      // Assertion 3: Only properties (name, capital and currencies) related to each country are present
      const expectedProperties = ["name", "capital", "currencies"];

      // This code is using the forEach method to iterate over each element in the response.body array. In this case, each element represents a country in the JSON response. The (country, index) parameters in the callback function represent the current country object and its index in the array
      response.body.forEach((country, index) => {
        // Check if each expected property exists for the current country
        // Within the outer loop, there's another loop using forEach, this time iterating over the expectedProperties array. This array contains the names of properties that are expected to exist for each country (in this case, "name" and "capital")
        expectedProperties.forEach((property) => {
          // This line uses the Chai assertion library, which is commonly used with Cypress. It checks whether the country object has the specified property (property). If the property exists, the test continues; otherwise, it fails
          expect(country).to.have.property(property);
          // This line logs a message using cy.log(). It indicates that the specific property (property) exists for the current country (Country ${index + 1})
          cy.log(`Country ${index + 1}: ${property} exists`);
        });
      });
    });
  });

  it("3- Test the query parameter 'fields' with the property 'capital' which is written wrong. We will get empty objects", () => {
    cy.request("GET", "https://restcountries.com/v3.1/all?fields=capita").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains all objects (all countries)
        cy.wrap(response.body).should("have.length", 250);
        cy.log("There are 250 countries");

        //  Assertion 3: We get empty objects
        response.body.forEach((country, index) => {
          // Assert that the country object is empty (has no properties)
          expect(country).to.be.empty;
          cy.log(`Country ${index + 1} is empty`);
        });
      }
    );
  });
});
