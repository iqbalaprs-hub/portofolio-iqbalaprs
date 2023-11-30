/// <reference types="Cypress" />

describe("API test for endpoint GET /region/{region}", () => {
  it("1- Request for a country by its region (normal usage)", () => {
    cy.request("GET", "https://restcountries.com/v3.1/region/Oceania").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 27 objects (27 countries)
        cy.wrap(response.body).should("have.length", 27);
        cy.log("There are 27 countries");

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
        // An array countriesNamesToCheck is defined, containing the common names of the countries you want to assert the presence of in the API response
        const countriesNamesToCheck = [
          "Papua New Guinea",
          "Christmas Island",
          "Samoa",
          "Kiribati",
          "Guam",
          "Tonga",
          "Australia",
          "New Caledonia",
          "New Zealand",
          "Marshall Islands",
          "French Polynesia",
          "Vanuatu",
          "Palau",
          "Northern Mariana Islands",
          "Solomon Islands",
          "Cocos (Keeling) Islands",
          "American Samoa",
          "Nauru",
          "Niue",
          "Micronesia",
          "Pitcairn Islands",
          "Cook Islands",
          "Tokelau",
          "Wallis and Futuna",
          "Fiji",
          "Tuvalu",
          "Norfolk Island",
        ];
        // Check if each country is present in the response
        countriesNamesToCheck.forEach((country) => {
          // The find method looks for an item in the array where the common name (item.name.common) matches the current country in the loop
          const foundCountry = response.body.find(
            (item) => item.name.common === country
          );
          // The expect(foundCountry).to.exist statement asserts that the country is found in the response. If the country is not found, the test will fail
          expect(foundCountry).to.exist; // Assert that the country is found
        });

        // Display all countries with cy.log()
        response.body.forEach((country, index) => {
          // Assert that the country has a "region" property equal to "Oceania"
          expect(country).to.have.property("region").to.equal("Oceania");

          // Access the different properties
          const commonName = country.name.common;
          const region = country.region;

          cy.log(`Common Name ${index + 1}: ${commonName}`);
          cy.log(`Region ${index + 1}: ${region}`);
        });
      }
    );
  });

  it("2- Test the property 'region' by showing that the endpoint performs a case-insensitive substring match against the country's region and it can give more than one country", () => {
    cy.request("GET", "https://restcountries.com/v3.1/region/CeaniA").then(
      (response) => {
        // Assertion 1: Response is 200
        expect(response.status).to.equal(200);

        // Assertion 2: The array contains 27 objects (27 countries)
        cy.wrap(response.body).should("have.length", 27);
        cy.log("There are 27 countries");

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
        // An array countriesNamesToCheck is defined, containing the common names of the countries you want to assert the presence of in the API response
        const countriesNamesToCheck = [
          "Papua New Guinea",
          "Christmas Island",
          "Samoa",
          "Kiribati",
          "Guam",
          "Tonga",
          "Australia",
          "New Caledonia",
          "New Zealand",
          "Marshall Islands",
          "French Polynesia",
          "Vanuatu",
          "Palau",
          "Northern Mariana Islands",
          "Solomon Islands",
          "Cocos (Keeling) Islands",
          "American Samoa",
          "Nauru",
          "Niue",
          "Micronesia",
          "Pitcairn Islands",
          "Cook Islands",
          "Tokelau",
          "Wallis and Futuna",
          "Fiji",
          "Tuvalu",
          "Norfolk Island",
        ];
        // Check if each country is present in the response
        countriesNamesToCheck.forEach((country) => {
          // The find method looks for an item in the array where the common name (item.name.common) matches the current country in the loop
          const foundCountry = response.body.find(
            (item) => item.name.common === country
          );
          // The expect(foundCountry).to.exist statement asserts that the country is found in the response. If the country is not found, the test will fail
          expect(foundCountry).to.exist; // Assert that the country is found
        });

        // Display all countries with cy.log()
        response.body.forEach((country, index) => {
          // Assert that the country has a "region" property equal to "Oceania"
          expect(country).to.have.property("region").to.equal("Oceania");

          // Access the different properties
          const commonName = country.name.common;
          const region = country.region;

          cy.log(`Common Name ${index + 1}: ${commonName}`);
          cy.log(`Region ${index + 1}: ${region}`);
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

      // An array countriesNamesToCheck is defined, containing the common names of the countries you want to assert the presence of in the API response
      const countriesNamesToCheck = [
        "United States Minor Outlying Islands",
        "Saint Pierre and Miquelon",
        "Greenland",
        "United States",
        "Canada",
        "Mexico",
        "Bermuda",
      ];
      // Check if each country is present in the response
      countriesNamesToCheck.forEach((country) => {
        // The find method looks for an item in the array where the common name (item.name.common) matches the current country in the loop
        const foundCountry = response.body.find(
          (item) => item.name.common === country
        );
        // The expect(foundCountry).to.exist statement asserts that the country is found in the response. If the country is not found, the test will fail
        expect(foundCountry).to.exist; // Assert that the country is found
      });

      // Display all countries with cy.log()
      response.body.forEach((country, index) => {
        // Assert that the country has a "region" property equal to "Oceania"
        expect(country).to.have.property("subregion").to.equal("North America");

        // Access the different properties
        const commonName = country.name.common;
        const region = country.region;
        const subregion = country.subregion;

        cy.log(`Common Name ${index + 1}: ${commonName}`);
        cy.log(`Region ${index + 1}: ${region}`);
        cy.log(`Subregion ${index + 1}: ${subregion}`);
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

      // An array countriesNamesToCheck is defined, containing the common names of the countries you want to assert the presence of in the API response
      const countriesNamesToCheck = [
        "United States Minor Outlying Islands",
        "Saint Pierre and Miquelon",
        "Greenland",
        "United States",
        "Canada",
        "Mexico",
        "Bermuda",
      ];
      // Check if each country is present in the response
      countriesNamesToCheck.forEach((country) => {
        // The find method looks for an item in the array where the common name (item.name.common) matches the current country in the loop
        const foundCountry = response.body.find(
          (item) => item.name.common === country
        );
        // The expect(foundCountry).to.exist statement asserts that the country is found in the response. If the country is not found, the test will fail
        expect(foundCountry).to.exist; // Assert that the country is found
      });

      // Display all countries with cy.log()
      response.body.forEach((country, index) => {
        expect(country).to.have.property("subregion").to.equal("North America");

        // Access the different properties
        const commonName = country.name.common;
        const region = country.region;
        const subregion = country.subregion;

        cy.log(`Common Name ${index + 1}: ${commonName}`);
        cy.log(`Region ${index + 1}: ${region}`);
        cy.log(`Subregion ${index + 1}: ${subregion}`);
      });
    });
  });

  it("6- Test the query parameter 'fields' and get only 2 properties 'name', 'capital'", () => {
    cy.request(
      "GET",
      "https://restcountries.com/v3.1/region/Oceania?fields=name,capital"
    ).then((response) => {
      // Assertion 1: Response is 200
      expect(response.status).to.equal(200);

      // Assertion 2: The array contains 27 objects (27 countries)
      cy.wrap(response.body).should("have.length", 27);
      cy.log("There are 27 countries");

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

      // An array countriesNamesToCheck is defined, containing the common names of the countries you want to assert the presence of in the API response
      const countriesNamesToCheck = [
        "Papua New Guinea",
        "Christmas Island",
        "Samoa",
        "Kiribati",
        "Guam",
        "Tonga",
        "Australia",
        "New Caledonia",
        "New Zealand",
        "Marshall Islands",
        "French Polynesia",
        "Vanuatu",
        "Palau",
        "Northern Mariana Islands",
        "Solomon Islands",
        "Cocos (Keeling) Islands",
        "American Samoa",
        "Nauru",
        "Niue",
        "Micronesia",
        "Pitcairn Islands",
        "Cook Islands",
        "Tokelau",
        "Wallis and Futuna",
        "Fiji",
        "Tuvalu",
        "Norfolk Island",
      ];
      // Check if each country is present in the response
      countriesNamesToCheck.forEach((country) => {
        // The find method looks for an item in the array where the common name (item.name.common) matches the current country in the loop
        const foundCountry = response.body.find(
          (item) => item.name.common === country
        );
        // The expect(foundCountry).to.exist statement asserts that the country is found in the response. If the country is not found, the test will fail
        expect(foundCountry).to.exist; // Assert that the country is found
      });

      // Display all countries with cy.log()
      response.body.forEach((country, index) => {
        // Access the different properties
        const commonName = country.name.common;

        cy.log(`Common Name ${index + 1}: ${commonName}`);
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
