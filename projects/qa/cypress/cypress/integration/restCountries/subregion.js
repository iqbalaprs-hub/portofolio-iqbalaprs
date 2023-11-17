/// <reference types="Cypress" />

describe("API test for endpoint GET /subregion/{subregion}", () => {
  it("1- Test the property 'subregion' with basic normal endpoint", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/subregion/North America"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains 7 objects (7 countries)
      cy.wrap(response.body).should("have.length", 7);
      cy.log("There are 7 countries");

      /*
    Assertion 3:
    The countries are:
        1- Saint Pierre and Miquelon     
        2- Mexico
        3- United States    
        4- United States Minor Outlying Islands
        5- Bermuda     
        6- Canada     
        7- Greenland
    */
      response.body.forEach((country) => {
        expect(country).to.have.property("subregion").to.equal("North America");

        // Access the different properties
        const commonName = country.name.common;
        const region = country.region;
        const subregion = country.subregion;

        cy.log(`COMMON NAME: ${commonName}`);
        cy.log(`Region: ${region}`);
        cy.log(`Subregion: ${subregion}`);
      });
    });
  });

  it("2- Test the property 'subregion' by showing that the endpoint performs a case-insensitive substring match against the country's subregion name and it can give more than one country", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/subregion/OrtH Ameri"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains 7 objects (7 countries)
      cy.wrap(response.body).should("have.length", 7);
      cy.log("There are 7 countries");

      /*
      Assertion 3:
      The countries are:
          1- Saint Pierre and Miquelon     
          2- Mexico
          3- United States    
          4- United States Minor Outlying Islands
          5- Bermuda     
          6- Canada     
          7- Greenland
      */
      response.body.forEach((country) => {
        expect(country).to.have.property("subregion").to.equal("North America");

        // Access the different properties
        const commonName = country.name.common;
        const region = country.region;
        const subregion = country.subregion;

        cy.log(`COMMON NAME: ${commonName}`);
        cy.log(`Region: ${region}`);
        cy.log(`Subregion: ${subregion}`);
      });
    });
  });

  it("3- Test the query parameter 'fields' and get 2 properties 'name' and 'capital'", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/subregion/North America?fields=name,capital"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains 7 objects (7 countries)
      cy.wrap(response.body).should("have.length", 7);
      cy.log("There are 7 countries");

      /*
            Assertion 3:
            The countries are:
                1- Saint Pierre and Miquelon     
                2- Mexico
                3- United States    
                4- United States Minor Outlying Islands
                5- Bermuda     
                6- Canada     
                7- Greenland
      */
      response.body.forEach((country, index) => {
        // Access the different properties
        const commonName = country.name.common;
        const capital = country.capital[0];

        cy.log(`Common name ${index + 1}: ${commonName}`);
        cy.log(`Capital ${index + 1}: ${capital}`);
      });

      // Assertion 4: Only properties (name and capital) related to all the countries mentioned above are present
      const expectedProperties = ["name", "capital"];

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
});
