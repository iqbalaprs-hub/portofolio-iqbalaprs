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

        cy.log(`Common Name: ${commonName}`);
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

        cy.log(`Common Name: ${commonName}`);
        cy.log(`Region: ${region}`);
        cy.log(`Subregion: ${subregion}`);
      });
    });
  });
});
