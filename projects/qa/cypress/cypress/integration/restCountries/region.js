/// <reference types="Cypress" />

describe("API test for endpoint GET /region/{region}", () => {
  it("1- Test the property 'region' with basic normal endpoint", () => {
    cy.request("GET", "https://restcountries.com/v3.1/region/Oceania").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 27 objects (27 countries)
        cy.wrap(response.body).should("have.length", 27);

        /*

        Assertion 3:

        The countries are:
            1 - Northern Mariana Islands       
            2 - Tuvalu
            3 - Christmas Island      
            4 - French Polynesia
            5 - Cocos (Keeling) Islands    
            6 - Nauru
            7 - Papua New Guinea      
            8 - Norfolk Island
            9 - Tokelau      
            10 - Niue
            11 - Samoa     
            12 - Australia
            13 - Fiji     
            14 - New Caledonia
            15 - Guam    
            16 - Vanuatu
            17 - Pitcairn Islands     
            18 - Cook Islands
            19 - Tonga    
            20 - American Samoa
            21 - Marshall Islands    
            22 - Micronesia
            23 - Solomon Islands     
            24 - Kiribati
            25 - New Zealand     
            26- Wallis and Futuna 27- Palau
        */
        response.body.forEach((country) => {
          // Assert that the country has a "region" property equal to "Oceania"
          expect(country).to.have.property("region").to.equal("Oceania");

          // Access the different properties
          const commonName = country.name.common;
          const officialName = country.name.official;
          const region = country.region;

          cy.log(`Common Name: ${commonName}`);
          cy.log(`Official Name: ${officialName}`);
          cy.log(`Region: ${region}`);
        });
      }
    );
  });

  it("2- Test the property 'region' by showing that the endpoint performs a case-insensitive substring match against the region's name and it can give more than one country", () => {
    cy.request("GET", "https://restcountries.com/v3.1/region/CeaniA").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 27 objects (27 countries)
        cy.wrap(response.body).should("have.length", 27);

        /*

        Assertion 3:

        The countries are:
            1 - Northern Mariana Islands       
            2 - Tuvalu
            3 - Christmas Island      
            4 - French Polynesia
            5 - Cocos (Keeling) Islands    
            6 - Nauru
            7 - Papua New Guinea      
            8 - Norfolk Island
            9 - Tokelau      
            10 - Niue
            11 - Samoa     
            12 - Australia
            13 - Fiji     
            14 - New Caledonia
            15 - Guam    
            16 - Vanuatu
            17 - Pitcairn Islands     
            18 - Cook Islands
            19 - Tonga    
            20 - American Samoa
            21 - Marshall Islands    
            22 - Micronesia
            23 - Solomon Islands     
            24 - Kiribati
            25 - New Zealand     
            26- Wallis and Futuna 27- Palau
        */
        response.body.forEach((country) => {
          // Assert that the country has a "region" property equal to "Oceania"
          expect(country).to.have.property("region").to.equal("Oceania");

          // Access the different properties
          const commonName = country.name.common;
          const officialName = country.name.official;
          const region = country.region;

          cy.log(`Common Name: ${commonName}`);
          cy.log(`Official Name: ${officialName}`);
          cy.log(`Region: ${region}`);
        });
      }
    );
  });

  it("3- Test the property 'region' by showing that the endpoint can perform against the country's subregion", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/region/North America"
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
        // Assert that the country has a "region" property equal to "Oceania"
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

  it("4- Test the property 'region' by showing that the endpoint, have to be a perfect match if it will perform against the country's subregion. We removed a letter, thus we will get an error response of 404", () => {
    cy.request({
      method: "GET",
      url: "https://restcountries.com/v3.1/region/North Americ",
      failOnStatusCode: false, // Do not fail the test on non-2xx status codes
    }).then((response) => {
      // Assertion 1: Response is 404
      expect(response.status).to.eq(404);

      // Assertion 2: The message is "Not Found"
      expect(response.body).to.deep.equal({
        status: 404,
        message: "Not Found",
      });
    });
    cy.wait(1000);
  });

  it("5- Test the property 'region' by showing that the endpoint performs a case-insensitive match against the country's subregion", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/region/NoRtH AmErica"
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
        // Assert that the country has a "region" property equal to "Oceania"
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
